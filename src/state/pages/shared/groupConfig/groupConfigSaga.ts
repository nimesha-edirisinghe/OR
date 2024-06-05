import { viewApi } from 'api';
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { GeneralResponse } from 'state/rootSaga';
import { IUser, userSliceSelector } from 'state/user/userState';
import { ApiResponse } from 'types/api';
import { getGroupListQueryParmI } from 'types/requests/viewRequests';
import { ViewGroupI } from 'types/view';
import {
  getGroupListFailure,
  getGroupListSuccess,
  groupConfigSliceSelector,
  IGroupConfig,
  selectGroupKey
} from './groupConfigState';
import { PayloadAction } from '@reduxjs/toolkit';

function* getGroupListRequestSaga(action: PayloadAction<{ whFlag?: 0 | 1 | 2 }>) {
  try {
    const { whFlag } = action.payload;
    let userState: IUser = yield select(userSliceSelector);
    const sharedGroupState: IGroupConfig = yield select(groupConfigSliceSelector);
    const _selectedGroupKey = sharedGroupState.selectedGroupKey;
    const orgKey = userState.selectedOrg.orgKey;

    const queryParams: getGroupListQueryParmI = {
      orgKey,
      whFlag: whFlag || 0
    };

    if (userState && userState.keyCloakInfo) {
      const response: GeneralResponse = yield call(() => viewApi.getGroupListRequest(queryParams));
      if (response) {
        const formattedResponse: ApiResponse<{ data: ViewGroupI }> = yield response;
        yield put(getGroupListSuccess(formattedResponse.data));
      } else {
        yield put(getGroupListFailure());
      }
    }
  } catch (error) {
    console.error('Group list fetching error', error);
  }
}

function* pageSaga() {
  yield takeLatest('groupConfig/getGroupListRequest', getGroupListRequestSaga);
}

export default pageSaga;
