import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { GeneralResponse } from 'state/rootSaga';
import {
  IUser,
  userSliceSelector,
  fetchOrganizationsFailure,
  fetchOrganizationsSuccess,
  getUserFailure,
  getUserSuccess
} from './userState';
import { userApi } from 'api';
import { ApiResponse } from 'types/api';
import { orgFetchingResponseI } from 'types/responses/userResponses';

function* workGetUserFetch() {
  // try {
    const userState: IUser = yield select(userSliceSelector);
    if (userState && userState.keyCloakInfo) {
      const response: GeneralResponse = yield call(() => userApi.getUserPermissions());
      if (response) {
        const formattedUser: GeneralResponse = yield response;
        yield put(getUserSuccess(formattedUser));
      } else {
        yield put(getUserFailure());
      }
    }
  // } catch (error) {
  //   console.error('error in request ', error);
  // }
}

// Saga function for fetch organization details
function* organizationsFetch() {
    const organizationRes: ApiResponse<orgFetchingResponseI> = yield call(() =>
      userApi.fetchOrgDetails()
    );
    if (organizationRes) {
      const formattedOrg: ApiResponse<orgFetchingResponseI> = yield organizationRes;
      yield put(fetchOrganizationsSuccess(formattedOrg.data));
    } else {
      yield put(fetchOrganizationsFailure());
    }
}

function* userSaga() {
  yield takeLatest('user/getUserFetch', workGetUserFetch);
  yield takeLatest('user/fetchOrganizationsRequest', organizationsFetch);
}

export default userSaga;
