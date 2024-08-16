import { call, put, select, takeLatest } from 'redux-saga/effects';
import { homeApi } from 'api';
import {
  getWorkflowTaskCountRequestFailure,
  getWorkflowTaskCountRequestSuccess
} from './homeState';
import { TaskCountI } from 'types/responses/home/home';
import { IUser, userSliceSelector } from 'state/user/userState';
import {
  ISystemConfiguration,
  systemConfigurationSliceSelector
} from '../systemConfiguration/systemConfigurationState';
import { getReportUrlValueByKey } from 'utils/utility';
import { ExternalUrlKeyEnum } from 'utils/enum';

function* getWorkflowTaskCountRequestSaga() {
  try {
    const userState: IUser = yield select(userSliceSelector);
    const dynamicConfigState: ISystemConfiguration = yield select(systemConfigurationSliceSelector);
    const dynamicConfigData = dynamicConfigState.dynamicConfigData?.externalUrls!;
    const vlBaseUrl = getReportUrlValueByKey(dynamicConfigData, ExternalUrlKeyEnum.VL_API_BASE_URL);
    const vlTaskApiUrl = getReportUrlValueByKey(
      dynamicConfigData,
      ExternalUrlKeyEnum.VL_TASK_API_URL
    );

    const path = `${vlBaseUrl}${vlTaskApiUrl}`;
    const userEmail = userState?.userOrgs?.username!;
    const response: TaskCountI = yield call(() =>
      homeApi.getWorkflowTaskCountRequest(path, userEmail)
    );
    if (response) {
      yield put(getWorkflowTaskCountRequestSuccess(response));
    } else {
      yield put(getWorkflowTaskCountRequestFailure());
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* homeSaga() {
  yield takeLatest('home/getWorkflowTaskCountRequest', getWorkflowTaskCountRequestSaga);
}

export default homeSaga;
