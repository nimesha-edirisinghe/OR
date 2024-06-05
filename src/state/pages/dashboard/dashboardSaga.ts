import { call, put, takeLatest } from 'redux-saga/effects';
import { dashboardApi } from 'api';
import { ApiResponse } from 'types/api';
import { responseValidator } from 'state/helpers/validateHelper';
import { fetchTableauTokenRequestFailure, fetchTableauTokenRequestSuccess } from './dashboardState';

function* fetchTableauTokenRequestSaga() {
  try {
    const response: ApiResponse<string> = yield call(() => dashboardApi.fetchTableauTokenRequest());
    if (!responseValidator(response, true)) {
      return;
    }
    if (response) {
      yield put(fetchTableauTokenRequestSuccess(response.data));
    } else {
      yield put(fetchTableauTokenRequestFailure());
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* commonSaga() {
  yield takeLatest('dashboard/fetchTableauTokenRequest', fetchTableauTokenRequestSaga);
}

export default commonSaga;
