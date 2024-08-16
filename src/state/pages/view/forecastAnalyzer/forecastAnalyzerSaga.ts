import { call, put, select, takeLatest } from 'redux-saga/effects';
import { IDFView, dfViewSliceSelector } from '../demandForecastView/dfViewPageState';
import {
  IGroupConfigurationSlice,
  groupConfigurationSliceSelector
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { ApiResponse } from 'types/api';
import {
  AccuracyResponseI,
  AggregatedGraphResponseI,
  FCAnalyzerSkuResponseI,
  IndividualGraphResponseI,
  KPIResponseI,
  PlannedActualObjI,
  PlannedActualResponseI
} from 'types/responses/view/forecastAnalyzer';
import { forecastAnalyzerApi } from 'api';
import { responseValidator } from 'state/helpers/validateHelper';
import {
  fetchAggregatedGraphDataRequestFailure,
  fetchAggregatedGraphDataRequestSuccess,
  fetchIndividualGraphDataRequestFailure,
  fetchIndividualGraphDataRequestSuccess,
  fetchKpiAccuracyRequestFailure,
  fetchKpiAccuracyRequestSuccess,
  fetchKpiDataRequestFailure,
  fetchKpiDataRequestSuccess,
  fetchPlannedActualDataRequestFailure,
  fetchPlannedActualDataRequestSuccess,
  fetchSkuDetailsDataRequestFailure,
  fetchSkuDetailsDataRequestSuccess,
  forecastAnalyzerSliceSelector,
  IForecastAnalyzer
} from './forecastAnalyzerState';
import {
  fcAnalyzerPlannedActualFormatter,
  prepareFcAnalyzerCommonRequestBody,
  prepareFcAnalyzerRequestBody
} from './sagaHelpers/sgH_ForecastAnalyzer';
import { PayloadAction } from '@reduxjs/toolkit';
import { FCAnalyzerType } from 'types/view/forecastAnalyzer';
import {
  IGroupConfig,
  groupConfigSliceSelector
} from 'state/pages/shared/groupConfig/groupConfigState';

function* fetchKpiAccuracyRequestSaga() {
  try {
    const dfState: IDFView = yield select(dfViewSliceSelector);
    const forecastAnalyzerState: IForecastAnalyzer = yield select(forecastAnalyzerSliceSelector);
    const sharedGroupState: IGroupConfig = yield select(groupConfigSliceSelector);
    const selectedGroupKey = sharedGroupState.selectedGroupKey!;
    const searchKey = dfState.dfViewLocalScope.skuSearchKey;
    const globalSkuSelected = dfState.dfViewLocalScope.globalSkuSelected;
    const selectedSkuList = dfState.selectedSkuList;
    const selectedSkuObj = dfState.selectedSku;
    const selectedAnalyzerType = forecastAnalyzerState.fcAnalyzerLocalScope.selectedAnalyzerType;

    const requestBody = prepareFcAnalyzerCommonRequestBody(
      searchKey,
      selectedSkuList,
      selectedSkuObj,
      selectedGroupKey,
      globalSkuSelected,
      selectedAnalyzerType
    );

    const response: ApiResponse<AccuracyResponseI> = yield call(() =>
      forecastAnalyzerApi.fetchKpiAccuracyRequest(requestBody)
    );

    if (response) {
      yield put(fetchKpiAccuracyRequestSuccess(response.data));
    } else {
      yield put(fetchKpiAccuracyRequestFailure());
    }
  } catch (error) {
    console.error('error in get accuracy request ', error);
  }
}
function* fetchIndividualGraphDataRequestSaga() {
  try {
    const dfState: IDFView = yield select(dfViewSliceSelector);
    const sharedGroupState: IGroupConfig = yield select(groupConfigSliceSelector);
    const selectedGroupKey = sharedGroupState.selectedGroupKey!;

    const requestBody = prepareFcAnalyzerRequestBody(dfState, selectedGroupKey);

    const response: ApiResponse<IndividualGraphResponseI[]> = yield call(() =>
      forecastAnalyzerApi.fetchIndividualGraphDataRequest(requestBody)
    );

    if (response) {
      yield put(fetchIndividualGraphDataRequestSuccess(response.data));
    } else {
      yield put(fetchIndividualGraphDataRequestFailure());
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}
function* fetchAggregatedGraphDataRequestSaga() {
  try {
    const dfState: IDFView = yield select(dfViewSliceSelector);
    const sharedGroupState: IGroupConfig = yield select(groupConfigSliceSelector);
    const forecastAnalyzerState: IForecastAnalyzer = yield select(forecastAnalyzerSliceSelector);
    const selectedGroupKey = sharedGroupState.selectedGroupKey!;
    const searchKey = dfState.dfViewLocalScope.skuSearchKey;
    const globalSkuSelected = dfState.dfViewLocalScope.globalSkuSelected;
    const selectedSkuList = dfState.selectedSkuList;
    const selectedSkuObj = dfState.selectedSku;
    const selectedAnalyzerType = forecastAnalyzerState.fcAnalyzerLocalScope.selectedAnalyzerType;

    const requestBody = prepareFcAnalyzerCommonRequestBody(
      searchKey,
      selectedSkuList,
      selectedSkuObj,
      selectedGroupKey,
      globalSkuSelected,
      selectedAnalyzerType
    );

    const response: ApiResponse<AggregatedGraphResponseI[]> = yield call(() =>
      forecastAnalyzerApi.fetchAggregatedGraphDataRequest(requestBody)
    );

    if (response) {
      yield put(fetchAggregatedGraphDataRequestSuccess(response.data));
    } else {
      yield put(fetchAggregatedGraphDataRequestFailure());
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* fetchPlannedActualDataRequestSaga() {
  try {
    const dfState: IDFView = yield select(dfViewSliceSelector);

    const sharedGroupState: IGroupConfig = yield select(groupConfigSliceSelector);
    const selectedGroupKey = sharedGroupState.selectedGroupKey!;
    const requestBody = prepareFcAnalyzerRequestBody(dfState, selectedGroupKey);
    const response: ApiResponse<PlannedActualResponseI[]> = yield call(() =>
      forecastAnalyzerApi.fetchPlannedActualDataRequest(requestBody)
    );

    if (response) {
      const formattedResponse: PlannedActualObjI = fcAnalyzerPlannedActualFormatter(response.data);
      yield put(fetchPlannedActualDataRequestSuccess(formattedResponse));
    } else {
      yield put(fetchPlannedActualDataRequestFailure());
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* fetchKpiDataRequestSaga() {
  try {
    const dfState: IDFView = yield select(dfViewSliceSelector);
    const sharedGroupState: IGroupConfig = yield select(groupConfigSliceSelector);
    const selectedGroupKey = sharedGroupState.selectedGroupKey!;
    const requestBody = prepareFcAnalyzerRequestBody(dfState, selectedGroupKey);
    const response: ApiResponse<KPIResponseI> = yield call(() =>
      forecastAnalyzerApi.fetchKpiDataRequest(requestBody)
    );

    if (response) {
      yield put(fetchKpiDataRequestSuccess(response.data));
    } else {
      yield put(fetchKpiDataRequestFailure());
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* fetchSkuDetailsDataRequestSaga(action: PayloadAction<{ type: FCAnalyzerType }>) {
  try {
    const fcAnalyzerType = action.payload.type;
    const dfState: IDFView = yield select(dfViewSliceSelector);

    const sharedGroupState: IGroupConfig = yield select(groupConfigSliceSelector);
    const forecastAnalyzerState: IForecastAnalyzer = yield select(forecastAnalyzerSliceSelector);
    const selectedGroupKey = sharedGroupState.selectedGroupKey!;
    const searchKey = dfState.dfViewLocalScope.skuSearchKey;
    const globalSkuSelected = dfState.dfViewLocalScope.globalSkuSelected;
    const selectedSkuList = dfState.selectedSkuList;

    const selectedSkuObj = dfState.selectedSku;
    const selectedAnalyzerType = forecastAnalyzerState.fcAnalyzerLocalScope.selectedAnalyzerType;

    const requestBody = prepareFcAnalyzerCommonRequestBody(
      searchKey,
      selectedSkuList,
      selectedSkuObj,
      selectedGroupKey,
      globalSkuSelected,
      selectedAnalyzerType
    );
    const queryParam = {
      type: fcAnalyzerType
    };
    const response: ApiResponse<FCAnalyzerSkuResponseI> = yield call(() =>
      forecastAnalyzerApi.fetchSkuDetailsDataRequest(requestBody, queryParam)
    );

    if (response) {
      yield put(fetchSkuDetailsDataRequestSuccess(response.data));
    } else {
      yield put(fetchSkuDetailsDataRequestFailure());
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* forecastAnalyzerSaga() {
  yield takeLatest('forecastAnalyzer/fetchKpiAccuracyRequest', fetchKpiAccuracyRequestSaga);
  yield takeLatest(
    'forecastAnalyzer/fetchIndividualGraphDataRequest',
    fetchIndividualGraphDataRequestSaga
  );
  yield takeLatest(
    'forecastAnalyzer/fetchAggregatedGraphDataRequest',
    fetchAggregatedGraphDataRequestSaga
  );
  yield takeLatest(
    'forecastAnalyzer/fetchPlannedActualDataRequest',
    fetchPlannedActualDataRequestSaga
  );
  yield takeLatest('forecastAnalyzer/fetchKpiDataRequest', fetchKpiDataRequestSaga);
  yield takeLatest('forecastAnalyzer/fetchSkuDetailsDataRequest', fetchSkuDetailsDataRequestSaga);
}

export default forecastAnalyzerSaga;
