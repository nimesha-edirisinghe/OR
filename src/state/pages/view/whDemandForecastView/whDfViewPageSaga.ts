import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { GeneralResponse } from 'state/rootSaga';
import {
  demandForecastChartRequestFailure,
  demandForecastChartRequestSuccess,
  whDfViewSliceSelector,
  downloadDemandForecastReportFailure,
  downloadDemandForecastReportSuccess,
  downloadForecastReportFailure,
  downloadForecastReportSuccess,
  getDemandForecastDataFailure,
  getDemandForecastDataSuccess,
  getDemandForecastSkuListFailure,
  getDemandForecastSkuListSuccess,
  getPredictorsFailure,
  getPredictorsSuccess,
  IWhDFView
} from './whDfViewPageState';
import { demandForecastApi, viewApi } from 'api';
import { insightRequestPayloadFormatter } from '../../insights/sagaHelpers/sgH_insight';
import { InsightFilterRequestPayloadI } from 'types/requests/insightRequest';
import { IInsight, insightSliceSelector } from '../../insights/insightState';
import { IUser, userSliceSelector } from 'state/user/userState';
import { v4 as uuidv4 } from 'uuid';
import { downloadFile } from 'utils/fileDownloadUtils';
import {
  DFPredictorsQueryParamI,
  DemandForecastChartRequestParamI,
  DemandForecastDataRequestQueryI,
  DemandForecastDownloadRequestQueryI
} from 'types/requests/viewRequests';
import { ApiResponse } from 'types/api';
import {
  DFPredictorI,
  DemandForecastChartResponseDataI,
  DemandForecastSkuResponseDataI
} from 'types/responses/viewResponses';
import { DEMAND_FORECAST_PREDICTOR_LIMIT, VIEW_FORECAST_SKU_PAGE_SIZE } from 'utils/constants';
import { responseValidator } from 'state/helpers/validateHelper';
import { rightSidePanelFormatForRequest } from 'state/pages/advancedConfiguration/groupConfiguration/sagaHelpers/sgH_groupConfigurations';
import {
  groupConfigurationSliceSelector,
  IGroupConfigurationSlice
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { GroupFilterI } from 'types/requests/groupConfigRequests';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  groupConfigSliceSelector,
  IGroupConfig
} from 'state/pages/shared/groupConfig/groupConfigState';
import { REACT_APP_VIEW_FORECAST_SKU_PAGE_SIZE } from 'config/constants';
import { showSuccessToast } from 'state/toast/toastState';
import { DOWNLOAD_SUCCESS_MESSAGE } from 'constants/messages';
import { format } from 'date-fns';

function* downloadForecastReportRequest() {
  try {
    const userState: IUser = yield select(userSliceSelector);
    const insightState: IInsight = yield select(insightSliceSelector);
    const dashboardFilter = insightState.dashboardFilter;
    const formattedFilterOptions: InsightFilterRequestPayloadI =
      insightRequestPayloadFormatter(dashboardFilter);
    const orgKey = userState.selectedOrg.orgKey;
    const groupConfigurationState: IGroupConfigurationSlice = yield select(
      groupConfigurationSliceSelector
    );
    const groupFilter = groupConfigurationState.groupFilter;

    const filters = rightSidePanelFormatForRequest(
      groupFilter.filterLocalScope.rightPanelRetainDataList
    );

    const queryParams = {
      orgKey
    };

    const response: GeneralResponse = yield call(() =>
      viewApi.downloadForecastReportRequest(formattedFilterOptions, queryParams)
    );

    if (response) {
      const uniqueId = uuidv4().substring(0, 8);
      const fileName = `Forecast_Report_${uniqueId}.csv`;
      const success: boolean = yield call(downloadFile, response, fileName);
      if (success) {
        yield put(downloadForecastReportSuccess(''));
        yield call(showSuccessToast, DOWNLOAD_SUCCESS_MESSAGE);
      } else {
        yield put(downloadForecastReportFailure());
      }
    } else {
      yield put(downloadForecastReportFailure());
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* demandForecastChartRequestSaga() {
  try {
    const userState: IUser = yield select(userSliceSelector);
    const dfState: IWhDFView = yield select(whDfViewSliceSelector);
    const groupConfigurationState: IGroupConfigurationSlice = yield select(
      groupConfigurationSliceSelector
    );
    const groupFilter = groupConfigurationState.groupFilter;
    const filters = rightSidePanelFormatForRequest(
      groupFilter.filterLocalScope.rightPanelRetainDataList
    );
    const sharedGroupState: IGroupConfig = yield select(groupConfigSliceSelector);

    const orgKey = userState.selectedOrg.orgKey;
    const groupKey = sharedGroupState.selectedGroupKey!;
    const selectedChartType = dfState.aggregateOption.selectedAggregateOption!;
    const selectedSku = dfState.selectedSku;
    const graphDateRange = dfState.graphDateRange;
    const selectedSkuList = dfState.selectedSkuList;
    const globalSkuSelected = dfState.dfViewLocalScope.globalSkuSelected;
    const skuSearchKey = dfState.dfViewLocalScope.skuSearchKey;
    const startDate =
      (graphDateRange?.startDate && format(graphDateRange?.startDate, 'yyyy-MM-dd').toString()) ||
      null;
    const endDate =
      (graphDateRange?.endDate && format(graphDateRange?.endDate, 'yyyy-MM-dd').toString()) || null;

    const queryParams: DemandForecastChartRequestParamI = {
      groupKey,
      orgKey,
      startDate,
      endDate,
      type: selectedChartType
    };

    const obj = {
      anchorKeyList: [] as number[],
      anchorProdKeyList: [] as number[],
      anchorProdModelKeyList: [] as number[],
      forecastKeyList: [] as number[]
    };

    selectedSkuList.map((sku) => {
      obj.anchorKeyList.push(sku.anchorKey);
      obj.anchorProdKeyList.push(sku.anchorProdKey);
      obj.anchorProdModelKeyList.push(sku.anchorProdModelKey);
      obj.forecastKeyList.push(sku.forecastKey!);
    });

    const requestBody = {
      anchorKey:
        selectedChartType !== 'aggregate'
          ? [selectedSku?.anchorKey!]
          : globalSkuSelected
          ? null
          : obj.anchorKeyList,
      anchorProdKey:
        selectedChartType !== 'aggregate'
          ? [selectedSku?.anchorProdKey!]
          : globalSkuSelected
          ? null
          : obj.anchorProdKeyList,
      anchorProdModelKey:
        selectedChartType !== 'aggregate'
          ? [selectedSku?.anchorProdModelKey!]
          : globalSkuSelected
          ? null
          : obj.anchorProdModelKeyList,
      forecastKey:
        selectedChartType !== 'aggregate'
          ? [selectedSku?.forecastKey!]
          : globalSkuSelected
          ? null
          : obj.forecastKeyList,
      compareSelection: Number(dfState.aggregateOption.compareSelection ?? 1),
      filters: filters,
      search: skuSearchKey,
      whFlag: 1
    };

    const response: ApiResponse<DemandForecastChartResponseDataI[]> = yield call(() =>
      demandForecastApi.demandForecastChartRequest(requestBody, queryParams)
    );

    if (!responseValidator(response, true)) {
      return;
    }

    if (response) {
      yield put(demandForecastChartRequestSuccess(response.data));
    } else {
      yield put(demandForecastChartRequestFailure());
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* getDemandForecastDataRequestSaga(action: PayloadAction<{ searchKey: string }>) {
  try {
    const { searchKey } = action.payload;
    const userState: IUser = yield select(userSliceSelector);
    const sharedGroupState: IGroupConfig = yield select(groupConfigSliceSelector);
    const orgKey = userState.selectedOrg.orgKey;
    const selectedGroupKey = sharedGroupState.selectedGroupKey!;
    const groupConfigurationState: IGroupConfigurationSlice = yield select(
      groupConfigurationSliceSelector
    );
    const groupFilter = groupConfigurationState.groupFilter;
    const filters = rightSidePanelFormatForRequest(
      groupFilter.filterLocalScope.rightPanelRetainDataList
    );

    const queryParams: DemandForecastDataRequestQueryI = {
      groupKey: selectedGroupKey!,
      limit: Number(REACT_APP_VIEW_FORECAST_SKU_PAGE_SIZE),
      orgKey,
      page: 1,
      search: searchKey,
      whFlag: 1
    };

    if (selectedGroupKey) {
      const requestBody: GroupFilterI[] = filters.filter(
        (filter) => !(filter.code === 1 && filter.type === 'group')
      );

      const response: ApiResponse<DemandForecastSkuResponseDataI> = yield call(() =>
        demandForecastApi.getDemandForecastDataRequest(requestBody, queryParams)
      );

      if (!responseValidator(response, true)) {
        return;
      }

      if (response) {
        yield put(getDemandForecastDataSuccess(response.data));
      } else {
        yield put(getDemandForecastDataFailure());
      }
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* downloadDemandForecastReportRequestSaga(
  action: PayloadAction<{
    fileName: string;
  }>
) {
  try {
    const { fileName } = action.payload;
    const userState: IUser = yield select(userSliceSelector);
    const dfViewState: IWhDFView = yield select(whDfViewSliceSelector);
    const sharedGroupState: IGroupConfig = yield select(groupConfigSliceSelector);
    const selectedGroupKey = sharedGroupState.selectedGroupKey!;
    const orgKey = userState.selectedOrg.orgKey;
    const searchKey = dfViewState.dfViewLocalScope.skuSearchKey;

    const globalSkuSelected = dfViewState.dfViewLocalScope.globalSkuSelected;
    const groupConfigurationState: IGroupConfigurationSlice = yield select(
      groupConfigurationSliceSelector
    );
    const groupFilter = groupConfigurationState.groupFilter;
    const filters = rightSidePanelFormatForRequest(
      groupFilter.filterLocalScope.rightPanelRetainDataList
    );

    const queryParams: DemandForecastDownloadRequestQueryI = {
      fileName: fileName,
      groupKey: selectedGroupKey!,
      orgKey,
      whFlag: 1,
      search: searchKey
    };

    const requestBody: GroupFilterI[] = filters
      .filter((filter) => !(filter.code === 1 && filter.type === 'group'))
      .map((filter) => {
        if (filter.code === 1) {
          return {
            ...filter,
            selectedItems: globalSkuSelected ? [] : filter.selectedItems
          };
        }
        return filter;
      });

    const response: GeneralResponse = yield call(() =>
      demandForecastApi.downloadDemandForecastReportRequest(requestBody, queryParams)
    );

    if (response) {
      const downloadFileName = `${fileName}.csv`;
      const success: boolean = yield call(downloadFile, response, downloadFileName);
      if (success) {
        yield put(downloadDemandForecastReportSuccess());
      } else {
        yield put(downloadDemandForecastReportFailure());
      }
    } else {
      yield put(downloadDemandForecastReportFailure());
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* getPredictorsRequestSaga() {
  try {
    const userState: IUser = yield select(userSliceSelector);
    const dfViewState: IWhDFView = yield select(whDfViewSliceSelector);
    const sharedGroupState: IGroupConfig = yield select(groupConfigSliceSelector);
    const selectedGroupKey = sharedGroupState.selectedGroupKey;
    const orgKey = userState.selectedOrg.orgKey;
    const searchKey = dfViewState.dfViewLocalScope.skuSearchKey;
    const selectedSkuObject = dfViewState.selectedSku;
    const selectedPredictorType = dfViewState.aggregateOption.predictorType;

    const queryParams: DFPredictorsQueryParamI = {
      anchorProdKey: selectedSkuObject?.anchorProdKey!,
      forecastKey: selectedSkuObject?.forecastKey!,
      groupKey: selectedGroupKey!,
      limit: DEMAND_FORECAST_PREDICTOR_LIMIT,
      orgKey: orgKey,
      page: 1,
      search: searchKey,
      predictorType: selectedPredictorType || null
    };

    const response: ApiResponse<DFPredictorI> = yield call(() =>
      demandForecastApi.getPredictorsRequest(queryParams)
    );

    if (!responseValidator(response, false)) {
      return;
    }

    if (response) {
      yield put(getPredictorsSuccess(response.data));
    } else {
      yield put(getPredictorsFailure());
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* getDemandForecastSkuListRequestSaga(action: PayloadAction<{ searchKey: string }>) {
  try {
    const { searchKey } = action.payload;
    const userState: IUser = yield select(userSliceSelector);
    const sharedGroupState: IGroupConfig = yield select(groupConfigSliceSelector);
    const orgKey = userState.selectedOrg.orgKey;
    const selectedGroupKey = sharedGroupState.selectedGroupKey!;
    const groupConfigurationState: IGroupConfigurationSlice = yield select(
      groupConfigurationSliceSelector
    );
    const groupFilter = groupConfigurationState.groupFilter;
    const filters = rightSidePanelFormatForRequest(
      groupFilter.filterLocalScope.rightPanelRetainDataList
    );

    const queryParams: DemandForecastDataRequestQueryI = {
      groupKey: selectedGroupKey!,
      limit: Number(REACT_APP_VIEW_FORECAST_SKU_PAGE_SIZE),
      orgKey,
      page: 1,
      search: searchKey,
      whFlag: 1
    };

    if (selectedGroupKey) {
      const requestBody: GroupFilterI[] = filters.filter(
        (filter) => !(filter.code === 1 && filter.type === 'group')
      );

      const response: ApiResponse<DemandForecastSkuResponseDataI> = yield call(() =>
        demandForecastApi.getDemandForecastSkuListRequest(requestBody, queryParams)
      );

      if (!responseValidator(response, true)) {
        return;
      }

      if (response) {
        yield put(getDemandForecastSkuListSuccess(response.data));
      } else {
        yield put(getDemandForecastSkuListFailure());
      }
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}
function* userSaga() {
  yield takeLatest('whDfView/demandForecastChartRequest', demandForecastChartRequestSaga);
  yield takeLatest('whDfView/downloadForecastReportRequest', downloadForecastReportRequest);
  yield takeLatest('whDfView/getDemandForecastDataRequest', getDemandForecastDataRequestSaga);
  yield takeLatest(
    'whDfView/downloadDemandForecastReportRequest',
    downloadDemandForecastReportRequestSaga
  );
  yield takeLatest('whDfView/getPredictorsRequest', getPredictorsRequestSaga);
  yield takeLatest('whDfView/getDemandForecastSkuListRequest', getDemandForecastSkuListRequestSaga);
}

export default userSaga;
