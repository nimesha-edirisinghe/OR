import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { GeneralResponse } from 'state/rootSaga';
import { activityLogApi } from 'api';
import { IUser, userSliceSelector } from 'state/user/userState';
import { ApiResponse } from 'types/api';
import { FilterDataApiResponseI } from 'types/responses/insightResponses';
import { ACTIVITY_LOG_PAGE_SIZE, FILTER_PAGE_SIZE } from 'utils/constants';
import {
  IActivityLogSlice,
  activityLogSliceSelector,
  getActivityLogListFailure,
  getActivityLogListSuccess,
  getActivityLogSummaryFailure,
  getActivityLogSummarySuccess,
  getFilterCountFailure,
  getFilterCountSuccess,
  getFilterDataFailure,
  getFilterDataSuccess
} from './activityLogState';
import {
  ActivityLogFilterRequestPayloadI,
  ActivityLogListQueryParmI,
  ActivityLogSummaryQueryParmI,
  FilterDataReqQueryParamI
} from 'types/requests/activityLogRequests';
import {
  filterRequestFormatterForData,
  filterRequestFormatterForTable
} from './sagaHelpers/sgH_ActivityLog';
import { ActivityLogDataI, ActivityLogFilterT, ActivityLogSummaryDataI } from 'types/activityLog';
import { PayloadAction } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';
interface FilterDataActionI {
  payload: {
    filterType: ActivityLogFilterT;
    pageNumber?: number;
    searchKey?: string;
    onScroll?: boolean;
  };
  type: string;
}

function* getFilterCountRequest() {
  try {
    let userState: IUser = yield select(userSliceSelector);
    const orgKey = userState.selectedOrg.orgKey;

    if (userState && userState.keyCloakInfo) {
      const response: GeneralResponse = yield call(() =>
        activityLogApi.getFilterCountRequest({}, { orgKey })
      );
      if (response) {
        yield put(getFilterCountSuccess(response.data));
      } else {
        yield put(getFilterCountFailure());
      }
    }
  } catch (error) {
    console.error('Demand Forecast Data Fetch ', error);
  }
}

function* getFilterDataRequest(action: FilterDataActionI) {
  try {
    let userState: IUser = yield select(userSliceSelector);
    const activityLogState: IActivityLogSlice = yield select(activityLogSliceSelector);
    const dashboardFilter = activityLogState.dashboardFilter;
    const filterType = action.payload.filterType;
    const searchKey = action.payload.searchKey || '';
    const formattedFilterOptions: ActivityLogFilterRequestPayloadI = filterRequestFormatterForData(
      dashboardFilter,
      filterType,
      searchKey
    );
    const orgKey = userState.selectedOrg.orgKey;

    const queryParams: FilterDataReqQueryParamI = {
      pageNumber: action.payload.pageNumber,
      pageSize: FILTER_PAGE_SIZE,
      orgKey,
      sort: 'ASC',
      type: filterType
    };

    if (userState && userState.keyCloakInfo) {
      const response: GeneralResponse = yield call(() =>
        activityLogApi.getFilterDataRequest(formattedFilterOptions, queryParams)
      );
      if (response) {
        const formattedResponse: ApiResponse<FilterDataApiResponseI> = yield response;
        yield put(getFilterDataSuccess(formattedResponse.data));
      } else {
        yield put(getFilterDataFailure());
      }
    }
  } catch (error) {
    console.error('Filter Data Fetch Error', error);
  }
}

function* getActivityLogListRequest(
  action: PayloadAction<{
    search?: string;
    pageNumber?: number;
    ascendingSort?: boolean;
  }>
) {
  try {
    const { pageNumber } = action.payload;
    let userState: IUser = yield select(userSliceSelector);
    const insightState: IActivityLogSlice = yield select(activityLogSliceSelector);
    const activityLogState: IActivityLogSlice = yield select(activityLogSliceSelector);
    const searchKey = activityLogState.localScope.searchKey;
    const dashboardFilter = cloneDeep(insightState.dashboardFilter);

    if (searchKey) {
      dashboardFilter.filterLocalScope.rightPanelRetainDataList.activity.isSelectAll = true;
    }

    const formattedFilterOptions: any = filterRequestFormatterForTable(dashboardFilter);
    if (searchKey) {
      formattedFilterOptions.activity.isSelectAll = insightState.dashboardFilter.filterLocalScope
        .rightPanelRetainDataList.activity.isSelectAll
        ? true
        : false;
    }
    const orgKey = userState.selectedOrg.orgKey;

    const queryParams: ActivityLogListQueryParmI = {
      pageNumber: pageNumber,
      pageSize: ACTIVITY_LOG_PAGE_SIZE,
      orgKey,
      sort: 'ASC'
    };

    if (userState && userState.keyCloakInfo) {
      const response: ApiResponse<ActivityLogDataI> = yield call(() =>
        activityLogApi.getActivityLogListRequest(formattedFilterOptions, queryParams)
      );
      if (response) {
        yield put(getActivityLogListSuccess(response.data));
      } else {
        yield put(getActivityLogListFailure());
      }
    }
  } catch (error) {
    console.error('Filter Data Fetch Error', error);
  }
}

function* getActivityLogSummaryRequest(
  action: PayloadAction<{
    pageNumber?: number;
    ascendingSort?: boolean;
  }>
) {
  try {
    let userState: IUser = yield select(userSliceSelector);
    const activityLogState: IActivityLogSlice = yield select(activityLogSliceSelector);
    const orgKey = userState.selectedOrg.orgKey;
    const job_group_id = activityLogState.selectedRow?.jobGroupId!;
    const groupKey = activityLogState.selectedRow?.groupKey!;

    const queryParams: ActivityLogSummaryQueryParmI = {
      orgKey,
      job_group_id,
      groupKey
    };

    if (userState && userState.keyCloakInfo) {
      const response: ApiResponse<ActivityLogSummaryDataI> = yield call(() =>
        activityLogApi.getActivityLogSummaryRequest(queryParams)
      );
      if (response) {
        yield put(getActivityLogSummarySuccess(response.data));
      } else {
        yield put(getActivityLogSummaryFailure());
      }
    }
  } catch (error) {
    console.error('Activity Log Summary Fetch Error', error);
  }
}

function* insightSaga() {
  yield takeEvery('activityLog/getFilterCountRequest', getFilterCountRequest);
  yield takeEvery('activityLog/getFilterDataRequest', getFilterDataRequest);
  yield takeEvery('activityLog/getActivityLogListRequest', getActivityLogListRequest);
  yield takeLatest('activityLog/getActivityLogSummaryRequest', getActivityLogSummaryRequest);
}

export default insightSaga;
