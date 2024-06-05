import { call, put, takeLatest } from 'redux-saga/effects';
import { commonApi } from 'api';
import { ApiResponse } from 'types/api';
import { responseValidator } from 'state/helpers/validateHelper';
import { getCommonLastUpdateDateFailure, getCommonLastUpdateDateSuccess } from './commonState';
import { GetLastUpdatedDataI } from 'types/responses/common/common';

function* getCommonLastUpdateDateRequestSaga() {
  try {
    const response: ApiResponse<GetLastUpdatedDataI> = yield call(() =>
      commonApi.getCommonLastUpdateDateRequest()
    );
    if (!responseValidator(response, true)) {
      return;
    }
    if (response) {
      yield put(getCommonLastUpdateDateSuccess(response.data));
    } else {
      yield put(getCommonLastUpdateDateFailure());
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* commonSaga() {
  yield takeLatest('common/getCommonLastUpdateDateRequest', getCommonLastUpdateDateRequestSaga);
}

export default commonSaga;
