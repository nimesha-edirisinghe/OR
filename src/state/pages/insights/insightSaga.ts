import { call, put, select, takeLatest } from 'redux-saga/effects';
import { GeneralResponse } from 'state/rootSaga';
import { insightApi } from 'api';
import { IUser, userSliceSelector } from 'state/user/userState';
import {
  IInsight,
  insightSliceSelector,
  getDemandForecastCardFailure,
  getDemandForecastCardSuccess,
  getDemandForecastDataFailure,
  getDemandForecastDataSuccess,
  getInvReportDataFailure,
  getInvReportDataSuccess,
  getOutOfStockPercentDataFailure,
  getOutOfStockPercentDataSuccess,
  getProjectionDataFailure,
  getProjectionDataSuccess,
  getSummaryFailure,
  getSummarySuccess,
  getFilterDataSuccess,
  getFilterDataFailure,
  getFilterCountSuccess,
  getFilterCountFailure
} from './insightState';
import {
  FilterDataReqQueryParamI,
  InsightFilterRequestPayloadI
} from 'types/requests/insightRequest';
import { FilterDataT } from 'types/insight';
import { ApiResponse } from 'types/api';
import { FilterDataApiResponseI } from 'types/responses/insightResponses';
import { FILTER_PAGE_SIZE } from 'utils/constants';
import {
  filterRequestFormatterForData,
  filterRequestFormatterForCount,
  insightRequestPayloadFormatter
} from './sagaHelpers/sgH_insight';

interface FilterDataActionI {
  payload: {
    filterType: FilterDataT;
    pageNumber?: number;
    searchKey?: string;
    onScroll?: boolean;
  };
  type: string;
}

function* summaryDetailsFetch() {
  try {
    const userState: IUser = yield select(userSliceSelector);
    const insightState: IInsight = yield select(insightSliceSelector);
    const dashboardFilter = insightState.dashboardFilter;
    const formattedFilterOptions: InsightFilterRequestPayloadI =
      insightRequestPayloadFormatter(dashboardFilter);
    const orgKey = userState.selectedOrg.orgKey;

    if (userState && userState.keyCloakInfo) {
      const response: GeneralResponse = yield call(() =>
        insightApi.getSummaryDetails(formattedFilterOptions, { orgKey })
      );
      if (response) {
        yield put(getSummarySuccess(response));
      } else {
        yield put(getSummaryFailure());
      }
    }
  } catch (error) {
    console.error('summaryDetailsFetch error ', error);
  }
}

function* invReportDataFetch() {
  try {
    let userState: IUser = yield select(userSliceSelector);
    const insightState: IInsight = yield select(insightSliceSelector);
    const dashboardFilter = insightState.dashboardFilter;
    const formattedFilterOptions: InsightFilterRequestPayloadI =
      insightRequestPayloadFormatter(dashboardFilter);
    const orgKey = userState.selectedOrg.orgKey;

    if (userState && userState.keyCloakInfo) {
      const response: GeneralResponse = yield call(() =>
        insightApi.getInvReportData(formattedFilterOptions, { orgKey })
      );
      if (response) {
        yield put(getInvReportDataSuccess(response));
      } else {
        yield put(getInvReportDataFailure());
      }
    }
  } catch (error) {
    console.error('invReportDataFetch error ', error);
  }
}

function* outOfStockPercentDataFetch() {
  try {
    let userState: IUser = yield select(userSliceSelector);
    const insightState: IInsight = yield select(insightSliceSelector);
    const dashboardFilter = insightState.dashboardFilter;
    const formattedFilterOptions: InsightFilterRequestPayloadI =
      insightRequestPayloadFormatter(dashboardFilter);
    const orgKey = userState.selectedOrg.orgKey;

    if (userState && userState.keyCloakInfo) {
      const response: GeneralResponse = yield call(() =>
        insightApi.getOutOfStockPercentData(formattedFilterOptions, { orgKey })
      );
      if (response) {
        yield put(getOutOfStockPercentDataSuccess(response));
      } else {
        yield put(getOutOfStockPercentDataFailure());
      }
    }
  } catch (error) {
    console.error('out Of Stock Percent Data Fetch ', error);
  }
}

function* projectionDataFetch() {
  try {
    let userState: IUser = yield select(userSliceSelector);
    const insightState: IInsight = yield select(insightSliceSelector);
    const dashboardFilter = insightState.dashboardFilter;
    const formattedFilterOptions: InsightFilterRequestPayloadI =
      insightRequestPayloadFormatter(dashboardFilter);
    const orgKey = userState.selectedOrg.orgKey;

    if (userState && userState.keyCloakInfo) {
      const response: GeneralResponse = yield call(() =>
        insightApi.getProjectionData(formattedFilterOptions, { orgKey })
      );
      if (response) {
        yield put(getProjectionDataSuccess(response));
      } else {
        yield put(getProjectionDataFailure());
      }
    }
  } catch (error) {
    console.error('Projection Data Fetch ', error);
  }
}
function* getDemandForecastDataRequest() {
  try {
    let userState: IUser = yield select(userSliceSelector);
    const insightState: IInsight = yield select(insightSliceSelector);
    const dashboardFilter = insightState.dashboardFilter;
    const formattedFilterOptions: InsightFilterRequestPayloadI =
      insightRequestPayloadFormatter(dashboardFilter);
    const orgKey = userState.selectedOrg.orgKey;
    const startDate = dashboardFilter.filterOptions.duration?.startDate;
    const endDate = dashboardFilter.filterOptions.duration?.endDate;

    if (userState && userState.keyCloakInfo) {
      const response: GeneralResponse = yield call(() =>
        insightApi.getDemandForecastDataRequest(formattedFilterOptions, {
          orgKey,
          startDate,
          endDate
        })
      );
      if (response) {
        yield put(getDemandForecastDataSuccess(response));
      } else {
        yield put(getDemandForecastDataFailure());
      }
    }
  } catch (error) {
    console.error('Demand Forecast Data Fetch ', error);
  }
}
function* getDemandForecastCardRequest() {
  try {
    let userState: IUser = yield select(userSliceSelector);
    const insightState: IInsight = yield select(insightSliceSelector);
    const dashboardFilter = insightState.dashboardFilter;
    const formattedFilterOptions: InsightFilterRequestPayloadI =
      insightRequestPayloadFormatter(dashboardFilter);
    const orgKey = userState.selectedOrg.orgKey;

    if (userState && userState.keyCloakInfo) {
      const response: GeneralResponse = yield call(() =>
        insightApi.getDemandForecastCardRequest(formattedFilterOptions, { orgKey })
      );
      if (response) {
        yield put(getDemandForecastCardSuccess(response));
      } else {
        yield put(getDemandForecastCardFailure());
      }
    }
  } catch (error) {
    console.error('Demand Forecast Data Fetch ', error);
  }
}

function* getFilterCountRequest() {
  try {
    let userState: IUser = yield select(userSliceSelector);
    const insightState: IInsight = yield select(insightSliceSelector);
    const dashboardFilter = insightState.dashboardFilter;
    const formattedFilterOptions: InsightFilterRequestPayloadI =
      filterRequestFormatterForCount(dashboardFilter);
    const orgKey = userState.selectedOrg.orgKey;

    if (userState && userState.keyCloakInfo) {
      const response: GeneralResponse = yield call(() =>
        insightApi.getFilterCountRequest(formattedFilterOptions, { orgKey })
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
    const insightState: IInsight = yield select(insightSliceSelector);
    const dashboardFilter = insightState.dashboardFilter;
    const filterType = action.payload.filterType;
    const searchKey = action.payload.searchKey || '';

    const formattedFilterOptions: InsightFilterRequestPayloadI = filterRequestFormatterForData(
      dashboardFilter,
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
        insightApi.getFilterDataRequest(formattedFilterOptions, queryParams)
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

function* insightSaga() {
  yield takeLatest('insight/getSummaryRequest', summaryDetailsFetch);
  yield takeLatest('insight/getInvReportDataRequest', invReportDataFetch);
  yield takeLatest('insight/getOutOfStockPercentDataRequest', outOfStockPercentDataFetch);
  yield takeLatest('insight/getProjectionDataRequest', projectionDataFetch);
  yield takeLatest('insight/getDemandForecastDataRequest', getDemandForecastDataRequest);
  yield takeLatest('insight/getFilterDataRequest', getFilterDataRequest);
  yield takeLatest('insight/getFilterCountRequest', getFilterCountRequest);
  yield takeLatest('insight/getDemandForecastCardRequest', getDemandForecastCardRequest);
}

export default insightSaga;
