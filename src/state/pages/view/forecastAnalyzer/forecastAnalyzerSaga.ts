import { call, put, select, takeLatest } from 'redux-saga/effects';
import { IDFView, dfViewSliceSelector } from '../demandForecastView/dfViewPageState';
import {
  IGroupConfigurationSlice,
  groupConfigurationSliceSelector
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { ApiResponse } from 'types/api';
import {
  AccuracyDistributionResponseI,
  AccuracyResponseI,
  AggregatedGraphResponseI,
  ExclusionCriteriaResponseI,
  FCAnalyzerSkuResponseI,
  IndividualGraphResponseI,
  KPIResponseI,
  PlannedActualObjI,
  PlannedActualResponseI
} from 'types/responses/view/forecastAnalyzer';
import { forecastAnalyzerApi } from 'api';
import { responseValidator } from 'state/helpers/validateHelper';
import {
  fetchAccuracyDistributionDataRequestFailure,
  fetchAccuracyDistributionDataRequestSuccess,
  fetchAggregatedGraphDataRequestFailure,
  fetchAggregatedGraphDataRequestSuccess,
  fetchExclusionCriteriaRequestFailure,
  fetchExclusionCriteriaRequestSuccess,
  fetchIndividualGraphDataRequestFailure,
  fetchIndividualGraphDataRequestSuccess,
  fetchKpiAccuracyRequestFailure,
  fetchKpiAccuracyRequestSuccess,
  fetchKpiDataRequestFailure,
  fetchKpiDataRequestSuccess,
  fetchPlannedActualDataRequestFailure,
  fetchPlannedActualDataRequestSuccess,
  fetchSkuDetailsDataRequestFailure,
  fetchSkuDetailsDataRequestSuccess
} from './forecastAnalyzerState';
import {
  fcAnalyzerPlannedActualFormatter,
  prepareAggregatedFcAnalyzerRequestBody,
  prepareIndividualFcAnalyzerRequestBody
} from './sagaHelpers/sgH_ForecastAnalyzer';
import { PayloadAction } from '@reduxjs/toolkit';
import { FCAnalyzerType } from 'types/view/forecastAnalyzer';
import { FCAnalyzerTypeEnum } from 'utils/enum';

function* fetchKpiAccuracyRequestSaga(action: PayloadAction<{ type: FCAnalyzerType }>) {
  try {
    const fcAnalyzerType = action.payload.type;
    const dfState: IDFView = yield select(dfViewSliceSelector);
    const groupConfigurationState: IGroupConfigurationSlice = yield select(
      groupConfigurationSliceSelector
    );
    let requestBody = null;
    if (fcAnalyzerType === FCAnalyzerTypeEnum.AGGREGATED) {
      requestBody = prepareAggregatedFcAnalyzerRequestBody(dfState, groupConfigurationState);
    } else {
      requestBody = prepareIndividualFcAnalyzerRequestBody(dfState, groupConfigurationState);
    }

    const response: ApiResponse<AccuracyResponseI> = yield call(() =>
      forecastAnalyzerApi.fetchKpiAccuracyRequest(requestBody)
    );

    if (!responseValidator(response, true)) {
      return;
    }

    if (response) {
      yield put(fetchKpiAccuracyRequestSuccess(response.data));
    } else {
      yield put(fetchKpiAccuracyRequestFailure());
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}
function* fetchIndividualGraphDataRequestSaga(action: PayloadAction<{ type: FCAnalyzerType }>) {
  try {
    const fcAnalyzerType = action.payload.type;
    const dfState: IDFView = yield select(dfViewSliceSelector);
    const groupConfigurationState: IGroupConfigurationSlice = yield select(
      groupConfigurationSliceSelector
    );
    let requestBody = null;

    if (fcAnalyzerType === FCAnalyzerTypeEnum.AGGREGATED) {
      requestBody = prepareAggregatedFcAnalyzerRequestBody(dfState, groupConfigurationState);
    } else {
      requestBody = prepareIndividualFcAnalyzerRequestBody(dfState, groupConfigurationState);
    }

    const response: ApiResponse<IndividualGraphResponseI[]> = yield call(() =>
      forecastAnalyzerApi.fetchIndividualGraphDataRequest(requestBody)
    );

    if (!responseValidator(response, true)) {
      return;
    }

    if (response) {
      yield put(fetchIndividualGraphDataRequestSuccess(response.data));
    } else {
      yield put(fetchIndividualGraphDataRequestFailure());
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}
function* fetchAggregatedGraphDataRequestSaga(action: PayloadAction<{ type: FCAnalyzerType }>) {
  try {
    const fcAnalyzerType = action.payload.type;
    const dfState: IDFView = yield select(dfViewSliceSelector);
    const groupConfigurationState: IGroupConfigurationSlice = yield select(
      groupConfigurationSliceSelector
    );
    let requestBody = null;

    if (fcAnalyzerType === FCAnalyzerTypeEnum.AGGREGATED) {
      requestBody = prepareAggregatedFcAnalyzerRequestBody(dfState, groupConfigurationState);
    } else {
      requestBody = prepareIndividualFcAnalyzerRequestBody(dfState, groupConfigurationState);
    }

    const response: ApiResponse<AggregatedGraphResponseI[]> = yield call(() =>
      forecastAnalyzerApi.fetchAggregatedGraphDataRequest(requestBody)
    );

    if (!responseValidator(response, true)) {
      return;
    }

    if (response) {
      yield put(fetchAggregatedGraphDataRequestSuccess(response.data));
    } else {
      yield put(fetchAggregatedGraphDataRequestFailure());
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}
function* fetchExclusionCriteriaRequestSaga(action: PayloadAction<{ type: FCAnalyzerType }>) {
  try {
    const fcAnalyzerType = action.payload.type;
    const dfState: IDFView = yield select(dfViewSliceSelector);
    const groupConfigurationState: IGroupConfigurationSlice = yield select(
      groupConfigurationSliceSelector
    );
    let requestBody = null;

    if (fcAnalyzerType === FCAnalyzerTypeEnum.AGGREGATED) {
      requestBody = prepareAggregatedFcAnalyzerRequestBody(dfState, groupConfigurationState);
    } else {
      requestBody = prepareIndividualFcAnalyzerRequestBody(dfState, groupConfigurationState);
    }

    const response: ApiResponse<ExclusionCriteriaResponseI[]> = yield call(() =>
      forecastAnalyzerApi.fetchExclusionCriteriaRequest(requestBody)
    );

    if (!responseValidator(response, true)) {
      return;
    }

    if (response) {
      yield put(fetchExclusionCriteriaRequestSuccess(response.data));
    } else {
      yield put(fetchExclusionCriteriaRequestFailure());
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}
function* fetchPlannedActualDataRequestSaga(action: PayloadAction<{ type: FCAnalyzerType }>) {
  try {
    const fcAnalyzerType = action.payload.type;
    const dfState: IDFView = yield select(dfViewSliceSelector);
    const groupConfigurationState: IGroupConfigurationSlice = yield select(
      groupConfigurationSliceSelector
    );
    let requestBody = null;

    if (fcAnalyzerType === FCAnalyzerTypeEnum.AGGREGATED) {
      requestBody = prepareAggregatedFcAnalyzerRequestBody(dfState, groupConfigurationState);
    } else {
      requestBody = prepareIndividualFcAnalyzerRequestBody(dfState, groupConfigurationState);
    }

    const response: ApiResponse<PlannedActualResponseI[]> = yield call(() =>
      forecastAnalyzerApi.fetchPlannedActualDataRequest(requestBody)
    );

    if (!responseValidator(response, true)) {
      return;
    }

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
function* fetchKpiDataRequestSaga(action: PayloadAction<{ type: FCAnalyzerType }>) {
  try {
    const fcAnalyzerType = action.payload.type;
    const dfState: IDFView = yield select(dfViewSliceSelector);
    const groupConfigurationState: IGroupConfigurationSlice = yield select(
      groupConfigurationSliceSelector
    );
    let requestBody = null;

    if (fcAnalyzerType === FCAnalyzerTypeEnum.AGGREGATED) {
      requestBody = prepareAggregatedFcAnalyzerRequestBody(dfState, groupConfigurationState);
    } else {
      requestBody = prepareIndividualFcAnalyzerRequestBody(dfState, groupConfigurationState);
    }

    const response: ApiResponse<KPIResponseI> = yield call(() =>
      forecastAnalyzerApi.fetchKpiDataRequest(requestBody)
    );

    if (!responseValidator(response, true)) {
      return;
    }

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
    const groupConfigurationState: IGroupConfigurationSlice = yield select(
      groupConfigurationSliceSelector
    );
    let requestBody = null;

    if (fcAnalyzerType === FCAnalyzerTypeEnum.AGGREGATED) {
      requestBody = prepareAggregatedFcAnalyzerRequestBody(dfState, groupConfigurationState);
    } else {
      requestBody = prepareIndividualFcAnalyzerRequestBody(dfState, groupConfigurationState);
    }

    const response: ApiResponse<FCAnalyzerSkuResponseI> = yield call(() =>
      forecastAnalyzerApi.fetchSkuDetailsDataRequest(requestBody)
    );

    if (!responseValidator(response, true)) {
      return;
    }

    if (response) {
      yield put(fetchSkuDetailsDataRequestSuccess(response.data));
    } else {
      yield put(fetchSkuDetailsDataRequestFailure());
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* fetchAccuracyDistributionDataRequestSaga(
  action: PayloadAction<{ type: FCAnalyzerType }>
) {
  try {
    const fcAnalyzerType = action.payload.type;
    const dfState: IDFView = yield select(dfViewSliceSelector);
    const groupConfigurationState: IGroupConfigurationSlice = yield select(
      groupConfigurationSliceSelector
    );
    let requestBody = null;

    if (fcAnalyzerType === FCAnalyzerTypeEnum.AGGREGATED) {
      requestBody = prepareAggregatedFcAnalyzerRequestBody(dfState, groupConfigurationState);
    } else {
      requestBody = prepareIndividualFcAnalyzerRequestBody(dfState, groupConfigurationState);
    }

    const response: ApiResponse<AccuracyDistributionResponseI> = yield call(() =>
      forecastAnalyzerApi.fetchAccuracyDistributionDataRequest(requestBody)
    );

    if (!responseValidator(response, true)) {
      return;
    }

    if (response) {
      yield put(fetchAccuracyDistributionDataRequestSuccess(response.data));
    } else {
      yield put(fetchAccuracyDistributionDataRequestFailure());
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
    'forecastAnalyzer/fetchExclusionCriteriaRequest',
    fetchExclusionCriteriaRequestSaga
  );
  yield takeLatest(
    'forecastAnalyzer/fetchPlannedActualDataRequest',
    fetchPlannedActualDataRequestSaga
  );
  yield takeLatest('forecastAnalyzer/fetchKpiDataRequest', fetchKpiDataRequestSaga);
  yield takeLatest('forecastAnalyzer/fetchSkuDetailsDataRequest', fetchSkuDetailsDataRequestSaga);
  yield takeLatest(
    'forecastAnalyzer/fetchAccuracyDistributionDataRequest',
    fetchAccuracyDistributionDataRequestSaga
  );
}

export default forecastAnalyzerSaga;
