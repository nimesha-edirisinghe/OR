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
  downloadBulkEditForecastZipFileRequestFailure,
  downloadBulkEditForecastZipFileRequestSuccess,
  downloadBulkForecastEditResultFailure,
  downloadBulkForecastEditResultSuccess,
  downloadDemandForecastReportFailure,
  downloadDemandForecastReportSuccess,
  downloadForecastReportFailure,
  downloadForecastReportSuccess,
  editForecastDataRequestFailure,
  editForecastDataRequestSuccess,
  getAlertTypeFailure,
  getAlertTypeSuccess,
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
  AlertGraphRequestBodyI,
  BulkEditFileUploadBodyI,
  DFPredictorsQueryParamI,
  DemandForecastChartRequestParamI,
  DemandForecastDataRequestQueryI,
  DemandForecastDownloadRequestQueryI,
  DownloadBulkEditQueryParamI,
  DownloadBulkEditZipFileBodyI,
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
import { IAlert, alertSliceSelector } from 'state/pages/monitoringAndResolution/Alert/alertState';
import { generateGroupFilters } from './sagaHelpers/sgH_DfView';
import { getUniqueGroupCodes } from 'pages/MonitoringResolution/PredictiveAlerts/BulkEditAlertsPage/Tabs/DownloadTab/Forecast/helper';
import {
  AlertForecastChartResponseDataI,
  AlertTypeI,
  AlertTypePayloadI,
  ForecastAlertType
} from 'types/alertConfig';

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
    const dfViewState: IDFView = yield select(dfViewSliceSelector);
    const sharedGroupState: IGroupConfig = yield select(groupConfigSliceSelector);
    const orgKey = userState.selectedOrg.orgKey;
    const selectedGroupKey = sharedGroupState.selectedGroupKey!;
    const groupConfigurationState: IGroupConfigurationSlice = yield select(
      groupConfigurationSliceSelector
    );
    const groupFilter = groupConfigurationState.groupFilter;
    const selectedSkuList = dfViewState.selectedSkuList;
    const filters = rightSidePanelFormatForRequest(
      groupFilter.filterLocalScope.rightPanelRetainDataList
    );

    const globalSkuSelected = dfViewState.dfViewLocalScope.globalSkuSelected;
    const queryParams: DemandForecastDataRequestQueryI = {
      groupKey: selectedGroupKey!,
      limit: Number(REACT_APP_VIEW_FORECAST_SKU_PAGE_SIZE),
      orgKey,
      page: 1,
      search: searchKey,
      whFlag: 0
    };

    let additionalFilter: GroupFilterI = {
      code: 1,
      isSelectAll: false,
      search: '',
      selectedItems: [],
      type: 'sku'
    };

    if (selectedGroupKey) {
      if (globalSkuSelected) {
        additionalFilter = { ...additionalFilter, isSelectAll: true };
      } else {
        additionalFilter = {
          ...additionalFilter,
          selectedItems: selectedSkuList.map((sku) => {
            return sku.anchorProdKey.toString();
          })
        };
      }

      let requestBody: GroupFilterI[] = filters.filter(
        (filter) => !(filter.code === 1 && filter.type === 'group')
      );

      requestBody = [...requestBody, additionalFilter];

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
    const selectedSkuList = dfViewState.selectedSkuList;
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

    let additionalFilter: GroupFilterI = {
      code: 1,
      isSelectAll: false,
      search: '',
      selectedItems: [],
      type: 'sku'
    };

    if (globalSkuSelected) {
      additionalFilter = { ...additionalFilter, isSelectAll: true };
    } else {
      additionalFilter = {
        ...additionalFilter,
        selectedItems: selectedSkuList.map((sku) => {
          return sku.anchorProdKey.toString();
        })
      };
    }

    let requestBody: GroupFilterI[] = filters.filter(
      (filter) => !(filter.code === 1 && filter.type === 'group')
    );

    requestBody = [...requestBody, additionalFilter];

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

    let previousUploadProgressHandler: ((progressEvent: AxiosProgressEvent) => void) | null = null;
    const uploadProgressHandler = async (progressEvent: AxiosProgressEvent) => {
      const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
      uploadPercentageCallback(percentage);
    };
    previousUploadProgressHandler = uploadProgressHandler;

    const response: ApiResponse<any> = yield call(() =>
      demandForecastApi.bulkEditFileUploadRequest(file, uploadProgressHandler)
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
  action: PayloadAction<{ fileName: string; groupKey: string }>
) {
  try {
    const { fileName, groupKey } = action.payload;
    const userState: IUser = yield select(userSliceSelector);
    const dfViewState: IDFView = yield select(dfViewSliceSelector);
    const orgKey = userState.selectedOrg.orgKey;
    const groupConfigurationState: IGroupConfigurationSlice = yield select(
      groupConfigurationSliceSelector
    );
    const groupFilter = groupConfigurationState.groupFilter;
    const selectedSkuList = dfViewState.selectedSkuList;
    const searchKey = dfViewState.dfViewLocalScope.skuSearchKey;
    const isSearchEmpty = searchKey.length === 0;
    const filters = rightSidePanelFormatForRequest(
      groupFilter.filterLocalScope.rightPanelRetainDataList
    );
    const globalSkuSelected = dfViewState.dfViewLocalScope.globalSkuSelected;
    const queryParams: DownloadBulkEditQueryParamI = {
      fileName,
      groupKey: Number(groupKey),
      orgKey,
      search: searchKey || ''
    };

    let additionalFilter: GroupFilterI = {
      code: 1,
      isSelectAll: false,
      search: searchKey || '',
      selectedItems: [],
      type: 'sku'
    };

    if (globalSkuSelected) {
      additionalFilter = { ...additionalFilter, isSelectAll: true };
    } else {
      additionalFilter = {
        ...additionalFilter,
        selectedItems: selectedSkuList.map((sku) => {
          return sku.anchorProdKey.toString();
        })
      };
    }

    let requestBody: GroupFilterI[] = filters.filter(
      (filter) => !(filter.code === 1 && filter.type === 'group')
    );

    requestBody = [...requestBody, additionalFilter];

    const response: GeneralResponse = yield call(() =>
      demandForecastApi.downloadBulkEditForecastRequest(requestBody, queryParams)
    );

    if (response) {
      const downloadFileName = `${groupKey}_${fileName}.csv`;
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
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* getUploadHistoryDataRequestSaga(
  action: PayloadAction<{ searchKey?: string; pageNumber?: number }>
) {
  try {
    const { searchKey, pageNumber } = action.payload;
    const groupConfigurationState: IGroupConfigurationSlice = yield select(
      groupConfigurationSliceSelector
    );
    const groupFilter = groupConfigurationState.groupFilter;
    const filters = rightSidePanelFormatForRequest(
      groupFilter.filterLocalScope.rightPanelRetainDataList
    );

    const appliedFilters = filters.filter(
      (filter) => !(filter.code === 1 && filter.type === 'group')
    );
    const requestBody: GetUploadHistoryReqBodyI = {
      filters: appliedFilters,
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
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* downloadBulkForecastEditResultRequestSaga(
  action: PayloadAction<{ fileName: string; uploadId: string }>
) {
  try {
    const { fileName, uploadId } = action.payload;
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

function* downloadBulkEditForecastZipFileRequestSaga(action: PayloadAction<{ fileName: string }>) {
  try {
    const { fileName } = action.payload;
    const userState: IUser = yield select(userSliceSelector);
    const alertState: IAlert = yield select(alertSliceSelector);
    const orgKey = userState.selectedOrg.orgKey;
    const groupConfigurationState: IGroupConfigurationSlice = yield select(
      groupConfigurationSliceSelector
    );
    const groupFilter = groupConfigurationState.groupFilter;
    const filters = rightSidePanelFormatForRequest(
      groupFilter.filterLocalScope.rightPanelRetainDataList
    );
    const isSelectedAll = alertState.alertLocalScope.globalSkuSelected;
    const selectedSKUList = alertState.selectedSkuList;
    const selectedAlertTypeObj = alertState.alertLocalScope.selectedAlertTypeObj;
    const uniqueGroupCodes = getUniqueGroupCodes(selectedSKUList);
    const groupCodes = isSelectedAll ? alertState.alertedGroupDetails?.groupCode : uniqueGroupCodes;
    const skuSearchKey = alertState.alertLocalScope.skuSearchKey;

    const groupFilters = generateGroupFilters(
      filters,
      isSelectedAll,
      selectedSKUList,
      skuSearchKey
    );

    const requestBody: DownloadBulkEditZipFileBodyI = {
      fileName: fileName,
      filters: groupFilters,
      types: [selectedAlertTypeObj.alertType],
      groupKeys: groupCodes!,
      orgKey,
      search: skuSearchKey,
      whFlag: 0
    };

    const response: GeneralResponse = yield call(() =>
      demandForecastApi.downloadBulkEditForecastZipFileRequest(requestBody)
    );

    if (response) {
      const downloadFileName = `${fileName}.zip`;
      const success: boolean = yield call(downloadFile, response, downloadFileName);

      if (success) {
        yield put(downloadBulkEditForecastZipFileRequestSuccess());
        yield call(showSuccessToast, DOWNLOAD_SUCCESS_MESSAGE);
      } else {
        yield put(downloadBulkEditForecastZipFileRequestFailure());
      }
    } else {
      yield put(downloadBulkEditForecastZipFileRequestFailure());
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* getAlertTypesRequestSaga() {
  try {
    const dfState: IDFView = yield select(dfViewSliceSelector);
    const sharedGroupState: IGroupConfig = yield select(groupConfigSliceSelector);
    const selectedSkuObj = dfState.selectedSku;

    const anchorProdKey = dfState.selectedSku?.anchorProdKey!;
    const anchorProdModelKey = dfState.selectedSku?.anchorProdModelKey!;
    const groupKey = parseInt(sharedGroupState.selectedGroupKey!);
    const forecastKey = selectedSkuObj?.forecastKey!;

    const requestBody: ForecastAlertType = {
      anchorProdKey,
      anchorProdModelKey,
      groupKey,
      forecastKey,
      alertType:'growth'
    };

    const response: ApiResponse<AlertTypeI> = yield call(() =>
      demandForecastApi.getAlertTypeRequest(requestBody)
    );

    if (!responseValidator(response, true)) {
      return;
    }

    if (response) {
      yield put(getAlertTypeSuccess(response.data));
    } else {
      yield put(getAlertTypeFailure());
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* editForecastDataRequestSaga(action: PayloadAction<AlertGraphRequestBodyI>) {
  try {
    const dfState: IDFView = yield select(dfViewSliceSelector);
    const response: ApiResponse<AlertForecastChartResponseDataI> = yield call(() =>
      demandForecastApi.alertGraphRequest(action.payload)
    );

    if (!responseValidator(response, true)) {
      return;
    }

    if (response) {
      yield put(editForecastDataRequestSuccess());
      yield call(showSuccessToast, response.message);
    } else {
      yield put(editForecastDataRequestFailure());
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
  yield takeLatest(
    'dfView/downloadBulkEditForecastZipFileRequest',
    downloadBulkEditForecastZipFileRequestSaga
  );
  yield takeLatest('dfView/getAlertTypeRequest', getAlertTypesRequestSaga);
  yield takeLatest('dfView/editForecastDataRequest', editForecastDataRequestSaga);
}

export default userSaga;
