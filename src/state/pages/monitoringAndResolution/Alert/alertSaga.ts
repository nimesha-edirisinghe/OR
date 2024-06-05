import {
  alertConfigApi,
  demandForecastApi,
  groupConfigApi,
  replenishmentViewApi,
  trainingSummaryApi
} from 'api';
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { IUser, userSliceSelector } from 'state/user/userState';
import { ApiResponse } from 'types/api';
import {
  CreateAlertPayloadI,
  DeleteAlertQueryParamI,
  DownloadAlertQueryParamI,
  EditAlertPayloadI,
  EditAlertQueryParamI,
  GetAlertBodyI,
  GetAlertConfigsQueryParamI,
  GetAlertsQueryParamI
} from 'types/requests/alertConfigRequest';
import { GetAlertSummaryI, GetAlertsData } from 'types/responses/alertConfigResponse';
import {
  IAlert,
  alertSliceSelector,
  createAlertFailure,
  createAlertSuccess,
  deleteAlertFailure,
  deleteAlertSuccess,
  downloadAlertFailure,
  downloadAlertSuccess,
  getAlertConfigsFailure,
  getAlertConfigsSuccess,
  getAlertsFailure,
  getAlertsSuccess,
  getAlertDefinitionRequestSuccess,
  updateAlertSuccess,
  getPredictorsSuccess,
  getPredictorsFailure,
  AlertForecastChartRequestSuccess,
  AlertForecastChartRequestFailure,
  getTrainingSummaryDataSuccess,
  getTrainingSummaryDataFailure,
  editAlertDataRequestSuccess,
  editAlertDataRequestFailure,
  getRplPlanDetailsSuccess,
  getRplPlanDetailsFailure,
  getAlertTypeSuccess,
  getAlertTypeFailure,
  alertReplenishmentSuccess,
  alertReplenishmentFailure,
  toggleReplenishmentPanel
} from './alertState';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  IGroupConfigurationSlice,
  groupConfigurationSliceSelector,
  alertDefinitionFilterDataRequestSuccess
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { rightSidePanelFormatForRequest } from 'state/pages/advancedConfiguration/groupConfiguration/sagaHelpers/sgH_groupConfigurations';
import { GeneralResponse } from 'state/rootSaga';
import { showErrorToast, showSuccessToast } from 'state/toast/toastState';
import { downloadFile } from 'utils/fileDownloadUtils';
import { ALERT_VIEW_PAGE_SIZE } from 'utils/constants';
import { responseValidator } from 'state/helpers/validateHelper';
import { getSelectedAnchorCount } from 'state/pages/advancedConfiguration/groupConfiguration/stateHelpers/stH_groupConfigurations';
import { FilterDataApiResponseI } from 'types/groupConfig';
import {
  AlertForecastChartRequestParamI,
  AlertForecastChartResponseDataI,
  AlertPredictorI,
  AlertPredictorsQueryParamI,
  AlertTypeI,
  AlertTypePayloadI,
  AlertTypesT
} from 'types/alertConfig';
import { SUCCESS_MESSAGES } from 'constants/messages';
import { getAlertCardData } from './sagaHelpers/sgH_alert';
import { format } from 'date-fns';
import { GetTrainingSummaryDataReqBodyI } from 'types/requests/trainingSummaryRequests';
import { TrainingSummaryDataResponseI } from 'types/responses/trainingSummaryResponse';
import { GetRplDetailsReqQueryI } from 'types/requests/viewRequests';
import {
  AlertReplenishmentResponseI,
  ReplenishmentPlanDetailsResI,
  ReplenishmentPlanDetailsStateI
} from 'types/responses/viewResponses';
import { replenishmentViewReFormatter } from 'state/pages/view/demandForecastView/sagaHelpers/sgH_DfView';

export const ALERT_FORECAST_PREDICTOR_LIMIT = 50;

interface CallbackAction {
  cb: () => void;
}

function* getAlertConfigsRequest(
  action: PayloadAction<{
    searchKey?: string;
    initRequest?: boolean;
  }>
) {
  try {
    const { searchKey, initRequest } = action.payload;
    const userState: IUser = yield select(userSliceSelector);
    const orgKey = userState.selectedOrg.orgKey;

    const queryParams: GetAlertConfigsQueryParamI = {
      limit: 50,
      orgKey,
      page: 1,
      search: searchKey
    };

    if (userState && userState.keyCloakInfo) {
      const response: ApiResponse<GetAlertSummaryI> = yield call(() =>
        alertConfigApi.getAlertConfigsRequest(queryParams)
      );
      if (!responseValidator(response, true)) {
        return;
      }
      if (response) {
        const formattedResponse: ApiResponse<GetAlertSummaryI> = yield response;
        yield put(
          getAlertConfigsSuccess({
            data: formattedResponse.data,
            initRequest: initRequest!
          })
        );
      } else {
        yield put(getAlertConfigsFailure());
      }
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* getAlertsRequestSaga(
  action: PayloadAction<{
    alertOnly: number;
    selectedAlertType?: AlertTypesT;
  }>
) {
  try {
    const { alertOnly, selectedAlertType } = action.payload;
    const userState: IUser = yield select(userSliceSelector);
    const alertState: IAlert = yield select(alertSliceSelector);
    const groupConfigurationState: IGroupConfigurationSlice = yield select(
      groupConfigurationSliceSelector
    );
    const orgKey = userState.selectedOrg.orgKey;
    const selectedViewAlertObj = alertState.alertLocalScope.selectedViewAlertObj!;
    const selectedAlertTypeObj = alertState.alertLocalScope.selectedAlertTypeObj;
    const searchKey = alertState.alertLocalScope?.skuSearchKey;
    const pageNumber = alertState.alertLocalScope?.pageNumber;
    const groupFilter = groupConfigurationState.groupFilter;
    const formattedFilterOptions = rightSidePanelFormatForRequest(
      groupFilter.filterLocalScope.rightPanelRetainDataList
    );

    const firstAvailableAlert =
      alertState.alertLocalScope.selectedViewAlertObj?.alertDetails[0].alertType;

    const queryParams: GetAlertsQueryParamI = {
      alertKey: selectedViewAlertObj.alertKey,
      limit: ALERT_VIEW_PAGE_SIZE,
      orgKey,
      page: pageNumber || 1,
      alertOnly,
      search: searchKey
    };

    const requestBody: GetAlertBodyI = {
      filters: formattedFilterOptions,
      types: selectedAlertType
        ? [selectedAlertType]
        : [selectedAlertTypeObj.alertType || firstAvailableAlert]
    };

    if (userState && userState.keyCloakInfo) {
      const response: ApiResponse<GetAlertsData> = yield call(() =>
        alertConfigApi.getAlertsRequest(queryParams, requestBody)
      );
      if (!responseValidator(response, true)) {
        return;
      }
      if (response) {
        const formattedResponse: ApiResponse<GetAlertsData> = yield response;
        yield put(getAlertsSuccess(formattedResponse.data));
      } else {
        yield put(getAlertsFailure());
      }
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* createAlertRequest(action: PayloadAction<CallbackAction>) {
  try {
    const userState: IUser = yield select(userSliceSelector);
    const alertState: IAlert = yield select(alertSliceSelector);
    const groupConfigurationState: IGroupConfigurationSlice = yield select(
      groupConfigurationSliceSelector
    );
    const groupFilter = groupConfigurationState.groupFilter;
    const orgKey = userState.selectedOrg.orgKey;
    const formattedFilterOptions = rightSidePanelFormatForRequest(
      groupFilter.filterLocalScope.rightPanelRetainDataList
    );
    const anchorCount = getSelectedAnchorCount(groupFilter, 'sku', 1)!; // get sku location count

    const alertDetails = alertState.defaultAlertTypes
      .filter((alert) => alert.enable)
      .map(({ type, threshold, compareValue, enable }) => ({
        type,
        threshold,
        compareValue,
        enable
      }));

    const requestBody: CreateAlertPayloadI = {
      alertName: alertState.alertName,
      filters: formattedFilterOptions,
      orgKey,
      responseTimeGranularity: userState.selectedOrg.responseTimeGranularity,
      skuLocationCount: anchorCount,
      alertDetails
    };

    if (userState && userState.keyCloakInfo) {
      const response: ApiResponse<any> = yield call(() =>
        alertConfigApi.createAlertRequest(requestBody)
      );
      if (!responseValidator(response, true)) {
        return;
      }
      if (response) {
        yield call(showSuccessToast, response.message);
        yield put(createAlertSuccess());
        action.payload.cb();
      } else {
        yield put(createAlertFailure());
      }
    }
  } catch (error) {
    console.error('error in alert creation request ', error);
  }
}

function* downloadAlertRequestSaga(
  action: PayloadAction<{
    alertOnly: number;
    selectedAlertType?: string;
  }>
) {
  try {
    const userState: IUser = yield select(userSliceSelector);
    const alertState: IAlert = yield select(alertSliceSelector);
    const groupConfigurationState: IGroupConfigurationSlice = yield select(
      groupConfigurationSliceSelector
    );
    const groupFilter = groupConfigurationState.groupFilter;
    const { alertOnly, selectedAlertType } = action.payload;
    const orgKey = userState.selectedOrg.orgKey;
    const selectedViewAlertObj = alertState.alertLocalScope.selectedViewAlertObj!;
    const selectedAlertTypeObj = alertState.alertLocalScope.selectedAlertTypeObj;

    const formattedFilterOptions = rightSidePanelFormatForRequest(
      groupFilter.filterLocalScope.rightPanelRetainDataList
    );

    const selectedAlertType_ = selectedAlertType
      ? selectedAlertType
      : selectedAlertTypeObj.alertType;
    const downloadFileName = `${selectedViewAlertObj.alertName}_${selectedAlertType_}`;

    const queryParams: DownloadAlertQueryParamI = {
      alertKey: selectedViewAlertObj.alertKey,
      orgKey,
      alertOnly
    };
    const requestBody: GetAlertBodyI = {
      filters: formattedFilterOptions,
      types: [selectedAlertType_]
    };

    if (userState && userState.keyCloakInfo) {
      const response: GeneralResponse = yield call(() =>
        alertConfigApi.downloadAlertRequest(queryParams, requestBody)
      );
      if (response) {
        const fileName = `${downloadFileName}.csv`;
        const success: boolean = yield call(downloadFile, response, fileName);
        if (success) {
          yield put(downloadAlertSuccess(''));
        } else {
          yield put(downloadAlertFailure());
        }
      } else {
        yield put(downloadAlertFailure());
      }
    }
  } catch (error) {
    console.error('error in delete alert request ', error);
  }
}

function* deleteAlertRequestSaga() {
  try {
    const userState: IUser = yield select(userSliceSelector);
    const alertState: IAlert = yield select(alertSliceSelector);

    const orgKey = userState.selectedOrg.orgKey;
    const selectedViewAlertObj = alertState.alertLocalScope.selectedViewAlertObj!;

    const queryParams: DeleteAlertQueryParamI = {
      alertKey: selectedViewAlertObj.alertKey,
      orgKey
    };

    if (userState && userState.keyCloakInfo) {
      const response: GeneralResponse = yield call(() =>
        alertConfigApi.deleteAlertRequest(queryParams)
      );
      if (response) {
        yield call(showSuccessToast, 'Success');
        yield put(deleteAlertSuccess());
      } else {
        yield put(deleteAlertFailure());
      }
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* getAlertDefinitionRequestSaga() {
  try {
    const userState: IUser = yield select(userSliceSelector);
    const alertState: IAlert = yield select(alertSliceSelector);

    const orgKey = userState.selectedOrg.orgKey;
    const selectedViewAlertObj = alertState.alertLocalScope.selectedViewAlertObj!;

    const queryParams: EditAlertQueryParamI = {
      alertKey: selectedViewAlertObj.alertKey,
      orgKey
    };

    if (userState && userState.keyCloakInfo) {
      const response: ApiResponse<Partial<CreateAlertPayloadI>> = yield call(() =>
        alertConfigApi.getAlertDefinitionRequest(queryParams)
      );

      if (!responseValidator(response, true)) {
        return;
      }

      if (response) {
        yield put(getAlertDefinitionRequestSuccess(response.data));
        const _response: ApiResponse<FilterDataApiResponseI> = yield call(() =>
          groupConfigApi.getFilterDataRequest(
            {
              code: 1,
              filters: response.data.filters || [],
              orgKey: orgKey,
              pageNumber: 1,
              pageSize: 1000,
              type: 'sku'
            },
            {}
          )
        );

        if (!responseValidator(_response, true)) {
          return;
        }

        if (_response) {
          yield put(alertDefinitionFilterDataRequestSuccess(_response.data.list));
        }
      }
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* updateAlertRequestSaga(action: PayloadAction<CallbackAction>) {
  try {
    const userState: IUser = yield select(userSliceSelector);
    const alertState: IAlert = yield select(alertSliceSelector);
    const groupConfigurationState: IGroupConfigurationSlice = yield select(
      groupConfigurationSliceSelector
    );
    const groupFilter = groupConfigurationState.groupFilter;
    const orgKey = userState.selectedOrg.orgKey;
    const formattedFilterOptions = rightSidePanelFormatForRequest(
      groupFilter.filterLocalScope.rightPanelRetainDataList
    );
    const anchorCount = getSelectedAnchorCount(groupFilter, 'sku', 1)!; // get sku location count
    const selectedViewAlertObj = alertState.alertLocalScope.selectedViewAlertObj!;

    // getAlertCardData function return filtered card data
    const alertDetails = getAlertCardData(alertState);

    const requestBody: EditAlertPayloadI = {
      alertName: alertState.alertName,
      filters: formattedFilterOptions,
      alertKey: selectedViewAlertObj.alertKey,
      orgKey,
      responseTimeGranularity: userState.selectedOrg.responseTimeGranularity,
      skuLocationCount: anchorCount,
      alertDetails
    };

    if (userState && userState.keyCloakInfo) {
      const response: ApiResponse<any> = yield call(() =>
        alertConfigApi.updateAlertRequest(requestBody)
      );
      if (!responseValidator(response, true)) {
        return;
      }
      if (response) {
        yield call(showSuccessToast, SUCCESS_MESSAGES.CHANGE_SUCCESSFULLY_SAVED);
        yield put(updateAlertSuccess());
        action.payload.cb();
      } else {
        yield put(createAlertFailure());
      }
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* getTrainingSummaryDataRequestSaga() {
  try {
    const alertSate: IAlert = yield select(alertSliceSelector);
    const selectedGroupKey = alertSate.selectedSku?.groupCode;
    const groupKey = alertSate.selectedSku?.groupCode!;
    const selectedAnchorKey = alertSate.selectedSku?.anchorKey!;

    if (selectedGroupKey) {
      const requestBody: GetTrainingSummaryDataReqBodyI = {
        anchorKey: selectedAnchorKey,
        groupKey: groupKey
      };

      const response: ApiResponse<TrainingSummaryDataResponseI> = yield call(() =>
        trainingSummaryApi.getTrainingSummaryData(requestBody)
      );

      if (!responseValidator(response, true)) {
        return;
      }

      if (response) {
        yield put(getTrainingSummaryDataSuccess(response.data));
      } else {
        yield put(getTrainingSummaryDataFailure());
      }
    } else {
      yield call(showErrorToast, 'Please select a Group');
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* getPredictorsRequestSaga() {
  try {
    const userState: IUser = yield select(userSliceSelector);
    const alertState: IAlert = yield select(alertSliceSelector);
    const selectedGroupKey = alertState.selectedSku?.groupCode;
    const orgKey = userState.selectedOrg.orgKey;
    const searchKey = alertState.alertLocalScope.skuSearchKey;
    const selectedSkuObject = alertState.selectedSku;
    const selectedPredictorType = alertState.aggregateOption.predictorType;

    const queryParams: AlertPredictorsQueryParamI = {
      anchorProdKey: selectedSkuObject?.anchorProdKey!,
      forecastKey: selectedSkuObject?.forecastKey!,
      groupKey: selectedGroupKey!,
      limit: ALERT_FORECAST_PREDICTOR_LIMIT,
      orgKey: orgKey,
      page: 1,
      predictorType: selectedPredictorType || null
    };

    const response: ApiResponse<AlertPredictorI> = yield call(() =>
      demandForecastApi.getPredictorsRequest(queryParams)
    );

    if (!responseValidator(response, false)) {
      return;
    }

    if (response) {
      yield put(getPredictorsSuccess(response.data));
    } else {
      yield put(getPredictorsFailure());
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* AlertForecastChartRequestSaga() {
  try {
    const userState: IUser = yield select(userSliceSelector);
    const alertSate: IAlert = yield select(alertSliceSelector);
    const groupConfigurationState: IGroupConfigurationSlice = yield select(
      groupConfigurationSliceSelector
    );
    const groupFilter = groupConfigurationState.groupFilter;
    const filters = rightSidePanelFormatForRequest(
      groupFilter.filterLocalScope.rightPanelRetainDataList
    );

    const orgKey = userState.selectedOrg.orgKey;
    const groupKey = alertSate.selectedSku?.groupCode!;
    const selectedChartType = alertSate.aggregateOption.selectedAggregateOption!;
    const selectedSku = alertSate.selectedSku;
    const graphDateRange = alertSate.graphDateRange;
    const selectedSkuList = alertSate.selectedSkuList;
    const skuSearchKey = alertSate.alertLocalScope.skuSearchKey;
    const startDate =
      (graphDateRange?.startDate && format(graphDateRange?.startDate, 'yyyy-MM-dd').toString()) ||
      null;
    const endDate =
      (graphDateRange?.endDate && format(graphDateRange?.endDate, 'yyyy-MM-dd').toString()) || null;

    const queryParams: AlertForecastChartRequestParamI = {
      groupKey,
      orgKey,
      startDate,
      endDate,
      type: selectedChartType
    };

    const obj = {
      anchorKeyList: [] as number[],
      anchorProdKeyList: [] as number[],
      anchorProdModelKeyList: [] as number[],
      forecastKeyList: [] as number[]
    };

    selectedSkuList.map((sku) => {
      obj.anchorKeyList.push(sku.anchorKey);
      obj.anchorProdKeyList.push(sku.anchorProdKey);
      obj.anchorProdModelKeyList.push(sku.anchorProdModelKey);
      obj.forecastKeyList.push(sku.forecastKey!);
    });

    const requestBody = {
      anchorKey: [selectedSku?.anchorKey!],
      anchorProdKey: [selectedSku?.anchorProdKey!],
      anchorProdModelKey: [selectedSku?.anchorProdModelKey!],
      forecastKey: [selectedSku?.forecastKey!],
      compareSelection: Number(alertSate.aggregateOption.compareSelection ?? 1),
      predictorType: alertSate.aggregateOption.predictorType,
      filters: filters,
      search: skuSearchKey,
      whFlag: 0
    };

    const response: ApiResponse<AlertForecastChartResponseDataI[]> = yield call(() =>
      demandForecastApi.demandForecastChartRequest(requestBody, queryParams)
    );

    if (!responseValidator(response, true)) {
      return;
    }

    if (response) {
      yield put(AlertForecastChartRequestSuccess(response.data));
    } else {
      yield put(AlertForecastChartRequestFailure());
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* editAlertDataRequestSaga() {
  try {
    const alertSate: IAlert = yield select(alertSliceSelector);

    const graphPayloadData = alertSate.graphPayloadData;

    const response: ApiResponse<AlertForecastChartResponseDataI> = yield call(() =>
      demandForecastApi.alertGraphRequest(graphPayloadData)
    );

    if (!responseValidator(response, true)) {
      return;
    }

    if (response) {
      yield put(editAlertDataRequestSuccess());
      yield call(showSuccessToast, response.message);
    } else {
      yield put(editAlertDataRequestFailure());
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* getRplPlanDetailsRequestSaga() {
  try {
    const userState: IUser = yield select(userSliceSelector);
    const alertState: IAlert = yield select(alertSliceSelector);
    const orgKey = userState.selectedOrg.orgKey;
    const groupKey = alertState.selectedSku?.groupCode!;
    const selectedRplSkuObj = alertState.selectedSku;
    const anchorProdKey = selectedRplSkuObj?.anchorProdKey!;
    const forecastKey = selectedRplSkuObj?.forecastKey!;
    const invPlanKey = selectedRplSkuObj?.invPlanKey!;

    const queryParams: GetRplDetailsReqQueryI = {
      anchorProdKey,
      forecastKey,
      groupKey,
      invPlanKey,
      orgKey
    };

    const response: ApiResponse<ReplenishmentPlanDetailsResI> = yield call(() =>
      replenishmentViewApi.getRplPlanDetailsRequest(queryParams)
    );

    if (!responseValidator(response, true)) {
      return;
    }

    if (response) {
      const formattedData: ReplenishmentPlanDetailsStateI = replenishmentViewReFormatter(
        response.data
      );
      yield put(getRplPlanDetailsSuccess(formattedData));
    } else {
      yield put(getRplPlanDetailsFailure());
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* getAlertTypesRequestSaga() {
  try {
    const alertState: IAlert = yield select(alertSliceSelector);
    const selectedAlertTypeObj = alertState.alertLocalScope.selectedAlertTypeObj;
    const selectedViewAlertObj = alertState.alertLocalScope.selectedViewAlertObj;
    const selectedRplSkuObj = alertState.selectedSku;

    const alertKey = selectedViewAlertObj?.alertKey!;
    const alertType = selectedAlertTypeObj.alertType!;
    const anchorKey = alertState.selectedSku?.anchorKey!;
    const anchorProdKey = alertState.selectedSku?.anchorProdKey!;
    const anchorProdModelKey = alertState.selectedSku?.anchorProdModelKey!;
    const groupKey = parseInt(alertState.selectedSku?.groupCode!);
    const forecastKey = selectedRplSkuObj?.forecastKey!;

    const requestBody: AlertTypePayloadI = {
      alertKey,
      alertType,
      anchorKey,
      anchorProdKey,
      anchorProdModelKey,
      groupKey,
      forecastKey
    };

    const response: ApiResponse<AlertTypeI> = yield call(() =>
      alertConfigApi.getAlertTypeRequest(requestBody)
    );

    if (!responseValidator(response, true)) {
      return;
    }

    if (response) {
      yield put(getAlertTypeSuccess(response.data));
    } else {
      yield put(getAlertTypeFailure());
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* editReplenishmentDataRequestSaga() {
  try {
    const alertState: IAlert = yield select(alertSliceSelector);
    const response: ApiResponse<AlertReplenishmentResponseI> = yield call(() =>
      demandForecastApi.alertReplenishmentRequest(alertState.editReplenishmentPayload as any)
    );

    if (!responseValidator(response, true)) {
      return;
    }

    if (response) {
      yield put(alertReplenishmentSuccess());
      yield call(showSuccessToast, response.message);
      yield put(toggleReplenishmentPanel());     
    } else {
      yield put(alertReplenishmentFailure());
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* userSaga() {
  yield takeEvery('alert/getAlertConfigsRequest', getAlertConfigsRequest);
  yield takeEvery('alert/getAlertsRequest', getAlertsRequestSaga);
  yield takeEvery('alert/getAlertDefinitionRequest', getAlertDefinitionRequestSaga);
  yield takeEvery('alert/createAlertRequest', createAlertRequest);
  yield takeEvery('alert/downloadAlertRequest', downloadAlertRequestSaga);
  yield takeEvery('alert/deleteAlertRequest', deleteAlertRequestSaga);
  yield takeEvery('alert/updateAlertRequest', updateAlertRequestSaga);
  yield takeLatest('alert/getPredictorsRequest', getPredictorsRequestSaga);
  yield takeLatest('alert/AlertForecastChartRequest', AlertForecastChartRequestSaga);
  yield takeLatest('alert/getTrainingSummaryDataRequest', getTrainingSummaryDataRequestSaga);
  yield takeLatest('alert/getRplPlanDetailsRequest', getRplPlanDetailsRequestSaga);
  yield takeLatest('alert/getAlertTypeRequest', getAlertTypesRequestSaga);
  yield takeEvery('alert/editAlertDataRequest', editAlertDataRequestSaga);
  yield takeEvery('alert/alertReplenishmentRequest', editReplenishmentDataRequestSaga);
}

export default userSaga;
