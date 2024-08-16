import { call, put, select, takeLatest } from 'redux-saga/effects';
import { dashboardApi } from 'api';
import { ApiResponse } from 'types/api';
import { responseValidator } from 'state/helpers/validateHelper';
import { fetchTableauTokenRequestFailure, fetchTableauTokenRequestSuccess } from './dashboardState';
import { GetTokenQueryParamI } from 'types/requests/dashboard/dashboard';
import {
  ISystemConfiguration,
  systemConfigurationSliceSelector
} from '../systemConfiguration/systemConfigurationState';
import { PayloadAction } from '@reduxjs/toolkit';
import { ModuleKeyI } from 'types/dashboard';

function* fetchTableauTokenRequestSaga(action: PayloadAction<ModuleKeyI>) {
  try {
    const moduleKey = action.payload.moduleKey!;
    const dynamicConfigState: ISystemConfiguration = yield select(systemConfigurationSliceSelector);
    const siteName =
      dynamicConfigState.dynamicConfigData?.externalUrls?.[moduleKey].split('/')[0] ?? '';
    const queryParam: GetTokenQueryParamI = {
      siteName
    };
    const response: ApiResponse<string> = yield call(() =>
      dashboardApi.fetchTableauTokenRequest(queryParam)
    );
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
