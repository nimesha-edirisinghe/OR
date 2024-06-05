import { call, put, takeEvery } from 'redux-saga/effects';
import { GeneralResponse } from 'state/rootSaga';
import { layoutApi } from 'api';
import { getLeftMenuFailure, getLeftMenuSuccess } from './layoutState';

function* getLeftMenuRequest() {
  try {
    const response: GeneralResponse = yield call(() => layoutApi.getLeftMenuRequest());

    if (response) {
      yield put(getLeftMenuSuccess(response.data));
    } else {
      yield put(getLeftMenuFailure());
    }
  } catch (error) {
    console.error(error);
  }
}
function* pageSaga() {
  yield takeEvery('layout/getLeftMenuRequest', getLeftMenuRequest);
}

export default pageSaga;
