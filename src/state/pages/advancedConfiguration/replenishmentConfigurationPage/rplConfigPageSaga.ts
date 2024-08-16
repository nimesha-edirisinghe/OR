import { PayloadAction } from '@reduxjs/toolkit';
import { forecastConfigApi, replenishmentConfigApi } from 'api';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { IUser, userSliceSelector } from 'state/user/userState';
import { ApiResponse } from 'types/api';
import { ForecastAndInvPlanKeys, RplConfigTableDataI } from 'types/replenishmentConfig';
import {
  IReplenishmentConfigPage,
  executePlanningRunNowFailure,
  executePlanningRunNowSuccess,
  getPlanningEstimatedTimeFailure,
  getPlanningEstimatedTimeSuccess,
  getReplenishmentConfigDataFailure,
  getReplenishmentConfigDataSuccess,
  rplConfigPageSliceSelector,
  saveRplPlanningPeriodFailure,
  saveRplPlanningPeriodSuccess
} from './rplConfigPageState';
import {
  GetRplConfigQueryParamI,
  SaveRplPlanningBodyI
} from 'types/requests/replenishmentConfigRequests';
import { showSuccessToast } from 'state/toast/toastState';
import {
  FCGetEstimatedTimeQueryParamI,
  FCRunNowReqPayloadI
} from 'types/requests/forecastConfigRequests';
import { JobExecutionTypesEnum, JobGroupTypes } from 'utils/enum';
import { SUCCESS_MESSAGES } from 'constants/messages';
import {
  getReplenishmentJobGroupType,
  validateForecastAndInvPlanKeys
} from './sagaHelpers/sgH_PlaningConfig';
import { responseValidator } from 'state/helpers/validateHelper';

function* getReplenishmentConfigDataRequest(
  action: PayloadAction<{ pageNo?: number; searchKey: string }>
) {
  try {
    const { pageNo, searchKey } = action.payload;
    const userState: IUser = yield select(userSliceSelector);
    const rplPlanningPageState: IReplenishmentConfigPage = yield select(rplConfigPageSliceSelector);
    const currentPageNo = rplPlanningPageState.rplPlanningConfigLocalScope.currentPageNo;
    const orgKey = userState.selectedOrg && userState.selectedOrg.orgKey;

    const queryParams: GetRplConfigQueryParamI = {
      groupSearch: searchKey,
      page: pageNo || currentPageNo,
      orgKey,
      limit: 10
    };

    const response: ApiResponse<RplConfigTableDataI[]> = yield call(() =>
      replenishmentConfigApi.getReplenishmentConfigDataRequest(queryParams)
    );

    if (response) {
      const formattedForecastConfig: ApiResponse<RplConfigTableDataI[]> = yield response;
      yield put(getReplenishmentConfigDataSuccess(formattedForecastConfig));
    } else {
      yield put(getReplenishmentConfigDataFailure());
    }
  } catch (error) {
    console.error(error);
  }
}

function* saveRplPlanningPeriodRequest() {
  try {
    const rplPlanningPageState: IReplenishmentConfigPage = yield select(rplConfigPageSliceSelector);

    const userState: IUser = yield select(userSliceSelector);
    const orgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
    const selectedConfigObj = rplPlanningPageState.rplPlanningConfigLocalScope.selectedPlaningObj;

    const requestBody: SaveRplPlanningBodyI = {
      forecastKey: selectedConfigObj?.forecastKey,
      groupKey: selectedConfigObj?.groupKey,
      invPlanKey: selectedConfigObj?.invPlanKey,
      orgKey: orgKey,
      planningPeriod: selectedConfigObj?.planningPeriod!
    };

    const response: ApiResponse<RplConfigTableDataI[]> = yield call(() =>
      replenishmentConfigApi.saveRplPlanningPeriodRequest(requestBody)
    );

    if (!responseValidator(response, true)) {
      yield put(saveRplPlanningPeriodFailure());
      return;
    }

    if (response) {
      const formattedForecastConfig: ApiResponse<any> = yield response;
      yield put(saveRplPlanningPeriodSuccess(formattedForecastConfig));
      yield call(showSuccessToast, SUCCESS_MESSAGES.SUCCESSFULLY_SAVED);
    } else {
      yield put(saveRplPlanningPeriodFailure());
    }
  } catch (error) {
    console.error(error);
  }
}
function* executePlanningRunNowRequest() {
  try {
    const rplPlanningPageState: IReplenishmentConfigPage = yield select(rplConfigPageSliceSelector);

    const userState: IUser = yield select(userSliceSelector);
    const orgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
    const selectedPlaningObj = rplPlanningPageState.rplPlanningConfigLocalScope.selectedPlaningObj;
    const forecastKeyAndInvKey: ForecastAndInvPlanKeys = {
      forecastKey: selectedPlaningObj?.forecastKey,
      invPlanKey: selectedPlaningObj?.invPlanKey
    };

    const isValidForecastKeyAndInvKey = validateForecastAndInvPlanKeys(forecastKeyAndInvKey);
    if (isValidForecastKeyAndInvKey) {
      const requestBody: FCRunNowReqPayloadI = {
        groupKey: selectedPlaningObj?.groupKey,
        jobGroupName: selectedPlaningObj?.groupName,
        jobGroupType: getReplenishmentJobGroupType(selectedPlaningObj?.groupType),
        orgKey: orgKey,
        forecastKey: selectedPlaningObj?.forecastKey,
        invPlanKey: selectedPlaningObj?.invPlanKey,
        execType: JobExecutionTypesEnum.ON_REQUEST,
        skuCount: selectedPlaningObj?.skuCount
      };

      const response: ApiResponse<any> = yield call(() =>
        forecastConfigApi.executeRunNowRequest(requestBody)
      );

      if (!responseValidator(response, true)) {
        yield put(executePlanningRunNowFailure());
        return;
      }

      if (response) {
        yield put(executePlanningRunNowSuccess(''));
        yield call(showSuccessToast, response.message);
      } else {
        yield put(executePlanningRunNowFailure());
      }
    } else {
      yield put(executePlanningRunNowFailure());
    }
  } catch (error) {
    console.error(error);
  }
}

function* getPlanningEstimatedTimeRequest() {
  try {
    const rplPlanningPageState: IReplenishmentConfigPage = yield select(rplConfigPageSliceSelector);

    const userState: IUser = yield select(userSliceSelector);
    const orgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
    const selectedRowId = rplPlanningPageState.selectedRowId;

    const selectedConfigObj = rplPlanningPageState.rplConfigTableData?.find(
      (data) => data.uuid === selectedRowId
    );

    const queryParams: FCGetEstimatedTimeQueryParamI = {
      groupKey: selectedConfigObj?.groupKey,
      jobGroupType: JobGroupTypes.INV_PLAN_GENERATION,
      orgKey,
      skuCount: selectedConfigObj?.skuCount
    };

    const response: ApiResponse<any> = yield call(() =>
      forecastConfigApi.getEstimatedTimeRequest(queryParams)
    );

    if (response) {
      yield put(getPlanningEstimatedTimeSuccess(response));
    } else {
      yield put(getPlanningEstimatedTimeFailure());
    }
  } catch (error) {
    console.error(error);
  }
}

function* rplConfigPageSaga() {
  yield takeEvery(
    'rplConfigPage/getReplenishmentConfigDataRequest',
    getReplenishmentConfigDataRequest
  );
  yield takeEvery('rplConfigPage/saveRplPlanningPeriodRequest', saveRplPlanningPeriodRequest);
  yield takeEvery('rplConfigPage/executePlanningRunNowRequest', executePlanningRunNowRequest);
  yield takeEvery('rplConfigPage/getPlanningEstimatedTimeRequest', getPlanningEstimatedTimeRequest);
}

export default rplConfigPageSaga;
