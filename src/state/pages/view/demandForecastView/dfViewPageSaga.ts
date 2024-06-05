import { call, put, select, takeLatest } from 'redux-saga/effects';
import { GeneralResponse } from 'state/rootSaga';
import {
  bulkEditFileUploadFailure,
  bulkEditFileUploadSuccess,
  demandForecastChartRequestFailure,
  demandForecastChartRequestSuccess,
  dfViewSliceSelector,
  downloadBulkEditForecastFailure,
  downloadBulkEditForecastSuccess,
  downloadBulkForecastEditResultFailure,
  downloadBulkForecastEditResultSuccess,
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
  getTrainingSummaryDataFailure,
  getTrainingSummaryDataSuccess,
  getUploadHistoryDataFailure,
  getUploadHistoryDataSuccess,
  IDFView,
  updateBulkUploadError
} from './dfViewPageState';
import { demandForecastApi, trainingSummaryApi, viewApi } from 'api';
import { insightRequestPayloadFormatter } from '../../insights/sagaHelpers/sgH_insight';
import { InsightFilterRequestPayloadI } from 'types/requests/insightRequest';
import { IInsight, insightSliceSelector } from '../../insights/insightState';
import { IUser, userSliceSelector } from 'state/user/userState';
import { v4 as uuidv4 } from 'uuid';
import { downloadFile } from 'utils/fileDownloadUtils';
import {
  BulkEditFileUploadBodyI,
  DFPredictorsQueryParamI,
  DemandForecastChartRequestParamI,
  DemandForecastDataRequestQueryI,
  DemandForecastDownloadRequestQueryI,
  DownloadBulkEditQueryParamI,
  DownloadEditResultRequestBodyI,
  GetUploadHistoryReqBodyI
} from 'types/requests/viewRequests';
import { ApiResponse } from 'types/api';
import {
  DFPredictorI,
  DemandForecastChartResponseDataI,
  DemandForecastSkuResponseDataI,
  GetUploadHistoryResponseI
} from 'types/responses/viewResponses';
import {
  BULK_EDIT_HISTORY_TABLE_PAGE_SIZE,
  DEMAND_FORECAST_PREDICTOR_LIMIT
} from 'utils/constants';
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
import { showErrorToast, showSuccessToast } from 'state/toast/toastState';
import { DOWNLOAD_SUCCESS_MESSAGE } from 'constants/messages';
import { format } from 'date-fns';
import { AxiosProgressEvent } from 'axios';
import { TrainingSummaryDataResponseI } from 'types/responses/trainingSummaryResponse';
import { GetTrainingSummaryDataReqBodyI } from 'types/requests/trainingSummaryRequests';

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
    const dfState: IDFView = yield select(dfViewSliceSelector);
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

    selectedSkuList?.map((sku) => {
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
      predictorType: dfState.aggregateOption.predictorType,
      filters: filters,
      search: skuSearchKey,
      whFlag: 0
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
      whFlag: 0
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
    const dfViewState: IDFView = yield select(dfViewSliceSelector);
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
      whFlag: 0,
      search: searchKey
    };

    const requestBody: GroupFilterI[]  = filters
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
    const dfViewState: IDFView = yield select(dfViewSliceSelector);
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
      // search: searchKey,
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
      whFlag: 0
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

function* bulkEditFileUploadRequestSaga(
  action: PayloadAction<{ file: File; uploadPercentageCallback: (percentage: number) => void }>
) {
  try {
    const { file, uploadPercentageCallback } = action.payload;
    const sharedGroupState: IGroupConfig = yield select(groupConfigSliceSelector);
    const selectedGroupKey = sharedGroupState.selectedGroupKey!;
    const selectedGroupName = sharedGroupState?.groupList?.list?.find(
      (item) => item.key === selectedGroupKey
    )?.value;

    let previousUploadProgressHandler: ((progressEvent: AxiosProgressEvent) => void) | null = null;
    const uploadProgressHandler = async (progressEvent: AxiosProgressEvent) => {
      const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
      uploadPercentageCallback(percentage);
    };
    previousUploadProgressHandler = uploadProgressHandler;

    const reqBody: BulkEditFileUploadBodyI = {
      groupKey: selectedGroupKey!,
      groupDesc: selectedGroupName!
    };

    const response: ApiResponse<any> = yield call(() =>
      demandForecastApi.bulkEditFileUploadRequest(reqBody, file, uploadProgressHandler)
    );

    if (response) {
      yield put(bulkEditFileUploadSuccess());
      if (response.status === 0) {
        yield put(updateBulkUploadError(response.message));
      }
    } else {
      yield put(bulkEditFileUploadFailure());
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* downloadBulkEditForecastRequestSaga(
  action: PayloadAction<{ fileName: string; searchKey?: string }>
) {
  try {
    const { fileName, searchKey } = action.payload;
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

    const queryParams: DownloadBulkEditQueryParamI = {
      fileName,
      groupKey: Number(selectedGroupKey!),
      orgKey,
      search: searchKey
    };

    if (selectedGroupKey) {
      const requestBody: GroupFilterI[] = filters.filter(
        (filter) => !(filter.code === 1 && filter.type === 'group')
      );

      const response: GeneralResponse = yield call(() =>
        demandForecastApi.downloadBulkEditForecastRequest(requestBody, queryParams)
      );

      if (response) {
        const downloadFileName = `${fileName}.csv`;
        const success: boolean = yield call(downloadFile, response, downloadFileName);

        if (success) {
          yield put(downloadBulkEditForecastSuccess());
          yield call(showSuccessToast, DOWNLOAD_SUCCESS_MESSAGE);
        } else {
          yield put(downloadForecastReportFailure());
        }
      } else {
        yield put(downloadBulkEditForecastFailure());
      }
    } else {
      yield call(showErrorToast, 'Please select a Group');
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* getUploadHistoryDataRequestSaga(
  action: PayloadAction<{ searchKey?: string; pageNumber?: number }>
) {
  try {
    const { searchKey, pageNumber } = action.payload;
    const sharedGroupState: IGroupConfig = yield select(groupConfigSliceSelector);
    const selectedGroupKey = sharedGroupState.selectedGroupKey!;
    const groupConfigurationState: IGroupConfigurationSlice = yield select(
      groupConfigurationSliceSelector
    );
    const groupFilter = groupConfigurationState.groupFilter;
    const filters = rightSidePanelFormatForRequest(
      groupFilter.filterLocalScope.rightPanelRetainDataList
    );

    if (selectedGroupKey) {
      const appliedFilters = filters.filter(
        (filter) => !(filter.code === 1 && filter.type === 'group')
      );
      const requestBody: GetUploadHistoryReqBodyI = {
        filters: appliedFilters,
        groupKey: Number(selectedGroupKey),
        limit: BULK_EDIT_HISTORY_TABLE_PAGE_SIZE,
        page: pageNumber || 1,
        search: searchKey || ''
      };

      const response: ApiResponse<GetUploadHistoryResponseI> = yield call(() =>
        demandForecastApi.getUploadHistoryDataRequest(requestBody)
      );

      if (!responseValidator(response, true)) {
        return;
      }

      if (response) {
        yield put(getUploadHistoryDataSuccess(response.data));
      } else {
        yield put(getUploadHistoryDataFailure());
      }
    } else {
      yield call(showErrorToast, 'Please select a Group');
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* downloadBulkForecastEditResultRequestSaga(
  action: PayloadAction<{ fileName: string; uploadId: string }>
) {
  try {
    const { fileName, uploadId } = action.payload;
    const sharedGroupState: IGroupConfig = yield select(groupConfigSliceSelector);
    const selectedGroupKey = sharedGroupState.selectedGroupKey!;

    if (selectedGroupKey) {
      const requestBody: DownloadEditResultRequestBodyI = {
        fileName: fileName,
        uploadId: uploadId
      };

      const response: GeneralResponse = yield call(() =>
        demandForecastApi.downloadBulkForecastEditResultRequest(requestBody)
      );

      if (response) {
        const success: boolean = yield call(downloadFile, response, fileName);

        if (success) {
          yield put(downloadBulkForecastEditResultSuccess());
          yield call(showSuccessToast, DOWNLOAD_SUCCESS_MESSAGE);
        } else {
          yield put(downloadBulkForecastEditResultFailure());
        }
      } else {
        yield put(downloadBulkForecastEditResultFailure());
      }
    } else {
      yield call(showErrorToast, 'Please select a Group');
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* getTrainingSummaryDataRequestSaga() {
  try {
    const sharedGroupState: IGroupConfig = yield select(groupConfigSliceSelector);
    const dfState: IDFView = yield select(dfViewSliceSelector);

    const selectedGroupKey = sharedGroupState.selectedGroupKey!;
    const groupKey = sharedGroupState.selectedGroupKey!;
    const selectedAnchorKey = dfState.selectedSku?.anchorKey!;

    if (selectedGroupKey) {
      const requestBody: GetTrainingSummaryDataReqBodyI = {
        anchorKey: selectedAnchorKey,
        groupKey: groupKey
      };

      const response: ApiResponse<TrainingSummaryDataResponseI> = yield call(() =>
        trainingSummaryApi.getTrainingSummaryData(requestBody)
      );

      if (!responseValidator(response, true)) {
        return;
      }

      if (response) {
        yield put(getTrainingSummaryDataSuccess(response.data));
      } else {
        yield put(getTrainingSummaryDataFailure());
      }
    } else {
      yield call(showErrorToast, 'Please select a Group');
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* userSaga() {
  yield takeLatest('dfView/demandForecastChartRequest', demandForecastChartRequestSaga);
  yield takeLatest('dfView/downloadForecastReportRequest', downloadForecastReportRequest);
  yield takeLatest('dfView/getDemandForecastDataRequest', getDemandForecastDataRequestSaga);
  yield takeLatest(
    'dfView/downloadDemandForecastReportRequest',
    downloadDemandForecastReportRequestSaga
  );
  yield takeLatest('dfView/getPredictorsRequest', getPredictorsRequestSaga);
  yield takeLatest('dfView/getDemandForecastSkuListRequest', getDemandForecastSkuListRequestSaga);
  yield takeLatest('dfView/bulkEditFileUploadRequest', bulkEditFileUploadRequestSaga);
  yield takeLatest('dfView/downloadBulkEditForecastRequest', downloadBulkEditForecastRequestSaga);
  yield takeLatest('dfView/getUploadHistoryDataRequest', getUploadHistoryDataRequestSaga);
  yield takeLatest(
    'dfView/downloadBulkForecastEditResultRequest',
    downloadBulkForecastEditResultRequestSaga
  );
  yield takeLatest('dfView/getTrainingSummaryDataRequest', getTrainingSummaryDataRequestSaga);
}

export default userSaga;
