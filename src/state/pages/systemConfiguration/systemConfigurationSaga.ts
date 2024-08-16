import { call, put, takeLatest } from 'redux-saga/effects';
import { systemConfigurationApi } from 'api';
import { ApiResponse } from 'types/api';
import { responseValidator } from 'state/helpers/validateHelper';
import {
  getDynamicConfigDataRequestFailure,
  getDynamicConfigDataRequestSuccess
} from './systemConfigurationState';
import { ExternalUrlsI } from 'types/responses/systemConfigurations/systemConfigurations';
import { GetDynamicConfigQueryParamI } from 'types/requests/systemConfigurations/systemConfigurations';

function* getDynamicConfigDataRequestSaga() {
  try {
    const queryParams: GetDynamicConfigQueryParamI = {
      type: 'externalUrls'
    };

    const response: ApiResponse<ExternalUrlsI> = yield call(() =>
      systemConfigurationApi.getDynamicConfigDataRequest(queryParams)
    );
    if (!responseValidator(response, false)) {
      return;
    }
    if (response) {
      yield put(getDynamicConfigDataRequestSuccess(response.data));
    } else {
      yield put(getDynamicConfigDataRequestFailure());
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* commonSaga() {
  yield takeLatest(
    'systemConfiguration/getDynamicConfigDataRequest',
    getDynamicConfigDataRequestSaga
  );
}

export default commonSaga;
