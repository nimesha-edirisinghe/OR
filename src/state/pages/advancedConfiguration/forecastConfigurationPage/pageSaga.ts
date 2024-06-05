import { call, put, select, takeEvery } from 'redux-saga/effects';
import { GeneralResponse } from 'state/rootSaga';
import {
  IPage,
  getSKUPredictorFailure,
  getSKUPredictorSuccess,
  getAnchorPredictorsConfigSuccess,
  getForecastConfigDataFailure,
  getForecastConfigDataSuccess,
  getTableDataSuccess,
  saveTrainingConfigSettingsFailure,
  saveTrainingConfigSettingsSuccess,
  saveAnchorPredictorsSuccess,
  saveAnchorPredictorsFailure,
  saveSKUPredictorsSuccess,
  saveSKUPredictorsFailure,
  fcConfigPageSliceSelector,
  executeRunNowFailure,
  executeRunNowSuccess,
  getEstimatedTimeSuccess,
  getEstimatedTimeFailure
} from './pageState';
import { forecastConfigApi } from 'api';
import { IUser, userSliceSelector, getUserFailure } from 'state/user/userState';
import { FORECAST_CONFIG_PAGE_DATA_SIZE } from 'utils/constants';
import { getGroupDetailsByRowId, getGroupKeyByRowId } from 'utils/utility';
import { showInfoToast, showSuccessToast } from 'state/toast/toastState';
import {
  candidateAlgorithmValidation,
  exemptionPeriodsValidation,
  hasFromDatabase,
  penalizedErrorValidation
} from 'state/helpers/pageHelpers';
import { ApiResponse } from 'types/api';
import { FCSKUPredictorI, GroupDetailsI } from 'types/forecastConfig';
import {
  FCGetEstimatedTimeQueryParamI,
  FCRunNowReqPayloadI,
  FCSaveAnchorPredI
} from 'types/requests/forecastConfigRequests';
import { PayloadAction } from '@reduxjs/toolkit';
import { getJobGroupType } from './sagaHelpers/sgH_RunNowDrawer';
import { produce } from 'immer';
import { SUCCESS_MESSAGES } from 'constants/messages';
import { JobExecutionTypesEnum } from 'utils/enum';
import { responseValidator } from 'state/helpers/validateHelper';

// Define Forecast Configuration table data Action interface
interface FCActionI {
  payload: {
    pageNo?: number;
    groupName: string;
  };
  type: string;
}

// Define Forecast Configuration Setting Action interface
interface FCSettingActionI {
  payload: {
    rowId: string;
  };
  type: string;
}

function* fcTableDataFetch(action: FCActionI) {
  try {
    const { groupName, pageNo } = action.payload;
    const userState: IUser = yield select(userSliceSelector);
    const orgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
    const pageState: IPage = yield select(fcConfigPageSliceSelector);
    const currentPageNo = pageState.trainingConfigLocalScope.currentPageNo;

    // Restructure the request payload
    const requestBody = {
      orgKeys: [orgKey],
      groupName: groupName
    };

    // Restructure the query parameters
    const queryParams = {
      limit: FORECAST_CONFIG_PAGE_DATA_SIZE,
      page: pageNo || currentPageNo
    };

    // Make the get Forecast config data API call using yield call
    const response: GeneralResponse = yield call(() =>
      forecastConfigApi.getForecastConfigData(requestBody, queryParams)
    );

    if (response) {
      const formattedForecastConfig: GeneralResponse = yield response;
      yield put(getTableDataSuccess(formattedForecastConfig)); // Update success state with payload
    } else {
      yield put(getUserFailure()); // Update success state
    }
  } catch (error) {
    console.error(error);
  }
}

function* trainingConfigDrawerDataFetch(action: FCSettingActionI) {
  try {
    const pageState: IPage = yield select(fcConfigPageSliceSelector); // get page state from reducer
    const userState: IUser = yield select(userSliceSelector);

    // Validate tableData inside the pageState
    if (pageState.tableData) {
      const groupKey = getGroupKeyByRowId(pageState.tableData, action.payload.rowId); // get group key from helper method getGroupKeyByRowId
      const orgKey = userState.selectedOrg && userState.selectedOrg.orgKey;

      // Restructure the query parameters
      const queryParams = {
        orgKey: orgKey,
        groupKey: groupKey
      };

      // Make the get Forecast configuration settings  API call using yield call
      const response: GeneralResponse = yield call(() =>
        forecastConfigApi.fetchForecastSettings(queryParams)
      );

      if (response) {
        const formattedForecastConfig: GeneralResponse = yield response;
        yield put(getForecastConfigDataSuccess(formattedForecastConfig.data)); // Update success state with payload
      } else {
        yield put(getForecastConfigDataFailure()); // Update Failure state
      }
    } else {
      yield put(getForecastConfigDataFailure()); // Update Failure state
    }
  } catch (error) {
    console.error(error);
  }
}

function* forecastConfigurationSave(action: PayloadAction<{ isDefault: boolean }>) {
  try {
    let groupKey: number | undefined;
    const pageState: IPage = yield select(fcConfigPageSliceSelector); // get page state from reducer
    const userState: IUser = yield select(userSliceSelector);
    const orgKey = userState.selectedOrg && userState.selectedOrg.orgKey;

    if (pageState.tableData) {
      groupKey = getGroupKeyByRowId(pageState.tableData, pageState.selectedRowId); // get group key from helper method getGroupKeyByRowId
    }

    let requestBody = pageState.trainingConfigData;

    if (
      pageState.trainingConfigData.algorithmSettings.advanced_configurations
        .model_selection_criteria === 'PENALIZED_ERROR'
    ) {
      const isPenalizedErrorsValid = penalizedErrorValidation(
        requestBody.algorithmSettings.penalized_error.weight_matrix
      );
      if (!isPenalizedErrorsValid) {
        return;
      }
    }

    if (pageState.trainingConfigLocalScope.exemptionPeriodsCheckboxChecked) {
      const isExemptionPeriodsValid = exemptionPeriodsValidation(
        requestBody.algorithmSettings.advanced_configurations.exemption_periods
      );
      if (!isExemptionPeriodsValid) {
        return;
      }
    } else {
      requestBody = produce(requestBody, (draft) => {
        draft.algorithmSettings.advanced_configurations.exemption_periods = [];
      });
    }

    const isAlgorithmSelectionValid = candidateAlgorithmValidation(
      pageState.trainingConfigData.algorithmSettings.algorithm_selection.configuration
    );

    if (!pageState.trainingConfigData.predictors.every((predictor) => !predictor.isActive)) {
      requestBody = produce(requestBody, (draft) => {
        draft.algorithmSettings.algorithm_selection.configuration.smoothing_algorithms = [];
      });
    }

    if (!isAlgorithmSelectionValid) {
      return;
    }
    // Validate Train Model From date:
    if (
      !pageState.trainingConfigLocalScope.trainModelFromCheckBoxChecked ||
      pageState.trainingConfigData.algorithmSettings.start_date === ''
    ) {
      requestBody = produce(requestBody, (draft) => {
        draft.algorithmSettings.start_date = null;
      });
    }
    requestBody = produce(requestBody, (draft) => {
      draft.algorithmSettings.algorithm_selection.default = action.payload.isDefault;
    });

    // Restructure the query parameters
    const queryParams = {
      orgKey: orgKey,
      groupKey: groupKey,
      configStatus: 'Custom' // TODO: hove to add configStatus. possible values are 'Custom' | 'Default'
    };

    // Make the get Forecast config data API call using yield call
    const response: GeneralResponse = yield call(() =>
      forecastConfigApi.saveTrainingConfigs(requestBody, queryParams)
    );

    if (response) {
      yield put(saveTrainingConfigSettingsSuccess('')); // Update success state with payload
      yield call(showSuccessToast, SUCCESS_MESSAGES.SUCCESSFULLY_SAVED); // Trigger success toast message action
    } else {
      yield put(saveTrainingConfigSettingsFailure('')); // Update success state
    }
  } catch (error) {
    console.error(error);
  }
}

function* getAnchorPredictorsConfig(action: any) {
  try {
    const pageState: IPage = yield select(fcConfigPageSliceSelector); // get page state from reducer
    const userState: IUser = yield select(userSliceSelector);

    if (pageState.tableData) {
      const groupKey = getGroupKeyByRowId(pageState.tableData, action.payload.rowId); // get group key from helper method getGroupKeyByRowId
      const orgKey = userState.selectedOrg && userState.selectedOrg.orgKey;

      const queryParams = {
        orgKey: orgKey,
        groupKey: groupKey
      };

      const response: GeneralResponse = yield call(() =>
        forecastConfigApi.getAnchorPredictorsConfig(queryParams)
      );

      if (response) {
        const formattedAnchorPredictorConfig: GeneralResponse = yield response;
        yield put(getAnchorPredictorsConfigSuccess(formattedAnchorPredictorConfig.data)); // Update success state with payload
      } else {
        yield put(getForecastConfigDataFailure());
      }
    } else {
      yield put(getForecastConfigDataFailure());
    }
  } catch (error) {
    console.error(error);
  }
}

function* sKUPredictorsFetch(action: FCSettingActionI) {
  try {
    const pageState: IPage = yield select(fcConfigPageSliceSelector);
    const userState: IUser = yield select(userSliceSelector);

    if (pageState.tableData) {
      const groupKey = getGroupKeyByRowId(pageState.tableData, action.payload.rowId);
      const orgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
      const queryParams = {
        orgKey: orgKey,
        groupKey: groupKey
      };

      const response: ApiResponse<FCSKUPredictorI[]> = yield call(() =>
        forecastConfigApi.getSKUPredictors(queryParams)
      );

      if (response) {
        const formattedAnchorPredictors: ApiResponse<FCSKUPredictorI[]> = yield response;
        yield put(getSKUPredictorSuccess(formattedAnchorPredictors.data));
      } else {
        yield put(getSKUPredictorFailure());
      }
    } else {
      yield put(getSKUPredictorFailure());
    }
  } catch (error) {
    console.error(error);
  }
}

function* anchorPredictorSave(action: any) {
  try {
    let groupKey: number | undefined;
    const pageState: IPage = yield select(fcConfigPageSliceSelector);
    const userState: IUser = yield select(userSliceSelector);
    const orgKey = userState.selectedOrg && userState.selectedOrg.orgKey;

    if (pageState.tableData) {
      groupKey = getGroupKeyByRowId(pageState.tableData, pageState.selectedRowId);
    }

    const anchorPredictorConfigs =
      pageState.influencingFactorsConfig.anchorForecastPredictorsConfig;

    const requestBody: FCSaveAnchorPredI[] = anchorPredictorConfigs.map((predictor) => {
      return {
        configType: predictor.config_type,
        predictorCode: predictor.predictor_code,
        predictorName: predictor.predictor_name,
        predictorValue: predictor.predictor_value
      };
    });

    const queryParams = {
      orgKey: orgKey,
      groupKey: groupKey
    };

    const response: GeneralResponse = yield call(() =>
      forecastConfigApi.saveAnchorPredictors(requestBody, queryParams)
    );

    if (response) {
      yield put(saveAnchorPredictorsSuccess(''));
    } else {
      yield put(saveAnchorPredictorsFailure());
    }
  } catch (error) {
    console.error(error);
  }
}

function* sKUPredictorSave(action: any) {
  try {
    let groupKey: number | undefined;
    const pageState: IPage = yield select(fcConfigPageSliceSelector);
    const userState: IUser = yield select(userSliceSelector);
    const orgKey = userState.selectedOrg && userState.selectedOrg.orgKey;

    if (pageState.tableData) {
      groupKey = getGroupKeyByRowId(pageState.tableData, pageState.selectedRowId);
      // groupKey = pageState.selectedRow?.groupDetails.groupKey;
    }

    const anchorPredictorConfigs =
      pageState.influencingFactorsConfig.anchorForecastPredictorsConfig;
    const skuPredictorsConfigs = pageState.influencingFactorsConfig.sKUPredictorsConfig;

    const requestBody: any = skuPredictorsConfigs.map((predictor) => {
      return {
        configType: predictor.configType,
        predictorCode: predictor.predictorCode,
        predictorName: predictor.predictorName,
        predictorValue: predictor.predictorValue
      };
    });

    const queryParams = {
      orgKey: orgKey,
      groupKey: groupKey
    };

    const response: GeneralResponse = yield call(() =>
      forecastConfigApi.saveSKUPredictors(requestBody, queryParams)
    );

    if (response) {
      yield put(saveSKUPredictorsSuccess(''));
      if (hasFromDatabase(anchorPredictorConfigs, skuPredictorsConfigs)) {
        yield call(
          showInfoToast,
          'Please ensure that the latest data is available in the Database'
        );
      }
      yield call(showSuccessToast, SUCCESS_MESSAGES.SUCCESSFULLY_SAVED_PREDICTORS);
    } else {
      yield put(saveSKUPredictorsFailure());
    }
  } catch (error) {
    console.error(error);
  }
}

function* executeRunNowRequest(
  action: PayloadAction<{
    isSelectedTraining: boolean;
    isSelectedForecasting: boolean;
  }>
) {
  try {
    const pageState: IPage = yield select(fcConfigPageSliceSelector);
    const userState: IUser = yield select(userSliceSelector);
    const selectedFcConfigObj = pageState.trainingConfigLocalScope.selectedFcConfigObj;
    const orgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
    const { isSelectedTraining, isSelectedForecasting } = action.payload;

    const requestBody: FCRunNowReqPayloadI = {
      anchorCount: selectedFcConfigObj?.groupDetails.anchorCount,
      skuCount: selectedFcConfigObj?.groupDetails.skuCount,
      groupKey: selectedFcConfigObj?.groupDetails.groupKey,
      jobGroupName: selectedFcConfigObj?.groupDetails.groupName,
      jobGroupType: getJobGroupType(isSelectedTraining, isSelectedForecasting),
      orgKey,
      forecastKey: action.payload.isSelectedForecasting
        ? selectedFcConfigObj?.groupDetails.forecastKey
        : null,
      invPlanKey: null,
      execType: JobExecutionTypesEnum.ON_REQUEST
    };

    const response: ApiResponse<any> = yield call(() =>
      forecastConfigApi.executeRunNowRequest(requestBody)
    );

    if (!responseValidator(response, true)) {
      return;
    }
    if (response) {
      yield put(executeRunNowSuccess(''));
      yield call(showSuccessToast, response.message);
    } else {
      yield put(executeRunNowFailure());
    }
  } catch (error) {
    console.error(error);
  }
}
function* getEstimatedTimeRequest(action: any) {
  try {
    let groupKey: number | undefined;
    let groupDetails: GroupDetailsI | undefined;
    const pageState: IPage = yield select(fcConfigPageSliceSelector);
    const userState: IUser = yield select(userSliceSelector);
    const orgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
    const { isSelectedTraining, isSelectedForecasting } = action.payload;

    if (pageState.tableData) {
      groupKey = getGroupKeyByRowId(pageState.tableData, pageState.selectedRowId);
      groupDetails = getGroupDetailsByRowId(pageState.tableData, pageState.selectedRowId);
    }

    const queryParams: FCGetEstimatedTimeQueryParamI = {
      groupKey,
      jobGroupType: getJobGroupType(isSelectedTraining, isSelectedForecasting),
      orgKey,
      skuCount: groupDetails?.skuCount ?? 0,
      anchorCount: groupDetails?.anchorCount ?? 0
    };

    const response: ApiResponse<any> = yield call(() =>
      forecastConfigApi.getEstimatedTimeRequest(queryParams)
    );

    if (response) {
      yield put(getEstimatedTimeSuccess(response));
    } else {
      yield put(getEstimatedTimeFailure());
    }
  } catch (error) {
    console.error(error);
  }
}

function* pageSaga() {
  yield takeEvery('fcConfigPage/getTableDataRequest', fcTableDataFetch);
  yield takeEvery('fcConfigPage/getForecastConfigDataRequest', trainingConfigDrawerDataFetch);
  yield takeEvery('fcConfigPage/saveTrainingConfigSettingsRequest', forecastConfigurationSave);
  yield takeEvery('fcConfigPage/getAnchorPredictorsConfig', getAnchorPredictorsConfig);
  yield takeEvery('fcConfigPage/getSKUPredictorRequest', sKUPredictorsFetch);
  yield takeEvery('fcConfigPage/saveAnchorPredictorsRequest', anchorPredictorSave);
  yield takeEvery('fcConfigPage/saveSKUPredictorsRequest', sKUPredictorSave);
  yield takeEvery('fcConfigPage/executeRunNowRequest', executeRunNowRequest);
  yield takeEvery('fcConfigPage/getEstimatedTimeRequest', getEstimatedTimeRequest);
}

export default pageSaga;
