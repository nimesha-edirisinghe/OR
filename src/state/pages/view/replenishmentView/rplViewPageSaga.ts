import { call, put, select, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { IUser, userSliceSelector } from 'state/user/userState';
import {
  IGroupConfig,
  groupConfigSliceSelector
} from 'state/pages/shared/groupConfig/groupConfigState';
import {
  IGroupConfigurationSlice,
  groupConfigurationSliceSelector
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { rightSidePanelFormatForRequest } from 'state/pages/advancedConfiguration/groupConfiguration/sagaHelpers/sgH_groupConfigurations';
import { REACT_APP_VIEW_FORECAST_SKU_PAGE_SIZE } from 'config/constants';
import {
  BulkEditFileUploadBodyI,
  DownloadBulkEditQueryParamI,
  DownloadEditResultRequestBodyI,
  DownloadRplReqQueryI,
  GetRplDetailsReqQueryI,
  GetUploadHistoryReqBodyI,
  ReplenishmentSkuListReqQueryI
} from 'types/requests/viewRequests';
import { GroupFilterI } from 'types/requests/groupConfigRequests';
import { ApiResponse } from 'types/api';
import {
  GetUploadHistoryResponseI,
  ReplenishmentPlanDetailsResI,
  ReplenishmentPlanDetailsStateI,
  ReplenishmentSkuListResI
} from 'types/responses/viewResponses';
import { replenishmentViewApi } from 'api';
import { responseValidator } from 'state/helpers/validateHelper';
import {
  IRPLView,
  downloadRplReportFailure,
  downloadRplReportSuccess,
  getReplenishmentExpandedSkuDataFailure,
  getReplenishmentExpandedSkuDataSuccess,
  getReplenishmentSkuDataFailure,
  getReplenishmentSkuDataSuccess,
  getReplenishmentTotalCountSuccess,
  getRplPlanDetailsFailure,
  getRplPlanDetailsSuccess,
  rplBulkEditFileUploadFailure,
  rplBulkEditFileUploadSuccess,
  rplDownloadBulkEditForecastFailure,
  rplDownloadBulkEditForecastSuccess,
  rplDownloadBulkForecastEditResultFailure,
  rplDownloadBulkForecastEditResultSuccess,
  rplGetUploadHistoryDataFailure,
  rplGetUploadHistoryDataSuccess,
  rplUpdateBulkUploadError,
  rplViewSliceSelector
} from './rplViewPageState';
import { downloadFile } from 'utils/fileDownloadUtils';
import { GeneralResponse } from 'state/rootSaga';
import { replenishmentViewReFormatter } from '../demandForecastView/sagaHelpers/sgH_DfView';
import { AxiosProgressEvent } from 'axios';
import { showErrorToast, showSuccessToast } from 'state/toast/toastState';
import { DOWNLOAD_SUCCESS_MESSAGE } from 'constants/messages';
import { BULK_EDIT_HISTORY_TABLE_PAGE_SIZE } from 'utils/constants';

function* getReplenishmentSkuDataRequestSaga(action: PayloadAction<{ searchKey?: string }>) {
  try {
    const { searchKey } = action.payload || '';
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

    const queryParams: ReplenishmentSkuListReqQueryI = {
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

      const response: ApiResponse<ReplenishmentSkuListResI> = yield call(() =>
        replenishmentViewApi.getReplenishmentSkuDataRequest(requestBody, queryParams)
      );

      if (!responseValidator(response, true)) {
        return;
      }

      if (response) {
        yield put(getReplenishmentSkuDataSuccess(response.data));
      } else {
        yield put(getReplenishmentSkuDataFailure());
      }
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}
function* getReplenishmentExpandedSkuDataRequestSaga(
  action: PayloadAction<{ searchKey?: string }>
) {
  try {
    const { searchKey } = action.payload || '';
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
    const rplViewState: IRPLView = yield select(rplViewSliceSelector);
    const selectedSKUList = rplViewState.rplSelectedSkuList;

    const isSelectedAll = rplViewState.rplViewLocalScope.globalRplSkuSelected;

    const queryParams: ReplenishmentSkuListReqQueryI = {
      groupKey: selectedGroupKey!,
      limit: Number(REACT_APP_VIEW_FORECAST_SKU_PAGE_SIZE),
      orgKey,
      page: 1,
      search: searchKey,
      whFlag: 0
    };

    if (selectedGroupKey) {
      let requestBody: GroupFilterI[] = filters.filter(
        (filter) => !(filter.code === 1 && filter.type === 'group')
      );

      if (isSelectedAll) {
        const additionalBody: GroupFilterI = {
          code: 1,
          isSelectAll: true,
          search: '',
          selectedItems: [],
          type: 'sku'
        };

        requestBody = [...requestBody, additionalBody];
      } else if (selectedSKUList.length > 0) {
        const additionalBody: GroupFilterI = {
          code: 1,
          isSelectAll: false,
          search: '',
          selectedItems: selectedSKUList.map((sku) => {
            return String(sku.anchorProdKey);
          }),
          type: 'sku'
        };

        requestBody = [...requestBody, additionalBody];
      }

      const response: ApiResponse<ReplenishmentSkuListResI> = yield call(() =>
        replenishmentViewApi.getReplenishmentExpandedSkuDataRequest(requestBody, queryParams)
      );

      if (!responseValidator(response, true)) {
        return;
      }

      if (response) {
        yield put(getReplenishmentExpandedSkuDataSuccess(response.data));

        const responseTotalCount: ApiResponse<{ key: string; value: string }[]> = yield call(() =>
          replenishmentViewApi.getRplPlanTotalCountRequest(requestBody, queryParams)
        );

        if (!responseValidator(responseTotalCount, true)) {
          return;
        }

        if (responseTotalCount) {
          yield put(getReplenishmentTotalCountSuccess(responseTotalCount.data));
        } else {
          yield put(getReplenishmentExpandedSkuDataFailure());
        }
      } else {
        yield put(getReplenishmentExpandedSkuDataFailure());
      }
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* downloadRplReportRequestSaga(action: PayloadAction<{ fileName: string }>) {
  try {
    const { fileName } = action.payload;
    const userState: IUser = yield select(userSliceSelector);
    const sharedGroupState: IGroupConfig = yield select(groupConfigSliceSelector);
    const orgKey = userState.selectedOrg.orgKey;
    const selectedGroupKey = sharedGroupState.selectedGroupKey!;
    const groupConfigurationState: IGroupConfigurationSlice = yield select(
      groupConfigurationSliceSelector
    );
    const rplViewState: IRPLView = yield select(rplViewSliceSelector);
    const groupFilter = groupConfigurationState.groupFilter;
    const filters = rightSidePanelFormatForRequest(
      groupFilter.filterLocalScope.rightPanelRetainDataList
    );
    const startDate = rplViewState.rplViewLocalScope.startDate;
    const endDate = rplViewState.rplViewLocalScope.endDate;
    const selectedSKUList = rplViewState.rplSelectedSkuList;
    const isSelectedAll = rplViewState.rplViewLocalScope.globalRplSkuSelected;
    const searchKey = rplViewState.rplViewLocalScope.rplSkuSearchKey;

    const queryParams: DownloadRplReqQueryI = {
      groupKey: selectedGroupKey!,
      orgKey,
      page: 1,
      whFlag: 0,
      fileName: fileName,
      startDate,
      endDate,
      search: searchKey
    };

    if (selectedGroupKey) {
      let requestBody: GroupFilterI[] = filters.filter(
        (filter) => !(filter.code === 1 && filter.type === 'group')
      );

      if (isSelectedAll) {
        const additionalBody: GroupFilterI = {
          code: 1,
          isSelectAll: true,
          search: '',
          selectedItems: [],
          type: 'sku'
        };

        requestBody = [...requestBody, additionalBody];
      } else if (selectedSKUList.length > 0) {
        const additionalBody: GroupFilterI = {
          code: 1,
          isSelectAll: false,
          search: '',
          selectedItems: selectedSKUList.map((sku) => {
            return String(sku.anchorProdKey);
          }),
          type: 'sku'
        };

        requestBody = [...requestBody, additionalBody];
      }

      const response: GeneralResponse = yield call(() =>
        replenishmentViewApi.downloadRplReportRequest(requestBody, queryParams)
      );

      if (response) {
        const downloadFileName = `${fileName}.csv`;
        const success: boolean = yield call(downloadFile, response, downloadFileName);
        if (success) {
          yield put(downloadRplReportSuccess());
        } else {
          yield put(downloadRplReportFailure());
        }
      } else {
        yield put(downloadRplReportFailure());
      }
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}
function* getRplPlanDetailsRequestSaga() {
  try {
    const userState: IUser = yield select(userSliceSelector);
    const sharedGroupState: IGroupConfig = yield select(groupConfigSliceSelector);
    const orgKey = userState.selectedOrg.orgKey;
    const groupKey = sharedGroupState.selectedGroupKey!;

    const rplViewState: IRPLView = yield select(rplViewSliceSelector);
    const selectedRplSkuObj = rplViewState.rplSelectedSku;
    const anchorProdKey = selectedRplSkuObj?.anchorProdKey!;
    const forecastKey = selectedRplSkuObj?.forecastKey!;
    const invPlanKey = selectedRplSkuObj?.invPlanKey!;

    const queryParams: GetRplDetailsReqQueryI = {
      anchorProdKey,
      forecastKey,
      groupKey,
      invPlanKey,
      orgKey
    };

    const response: ApiResponse<ReplenishmentPlanDetailsResI> = yield call(() =>
      replenishmentViewApi.getRplPlanDetailsRequest(queryParams)
    );

    if (!responseValidator(response, true)) {
      return;
    }

    if (response) {
      const formattedData: ReplenishmentPlanDetailsStateI = replenishmentViewReFormatter(
        response.data
      );
      yield put(getRplPlanDetailsSuccess(formattedData));
    } else {
      yield put(getRplPlanDetailsFailure());
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* rplBulkEditFileUploadRequestSaga(
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
      replenishmentViewApi.rplBulkEditFileUploadRequest(reqBody, file, uploadProgressHandler)
    );

    if (response) {
      yield put(rplBulkEditFileUploadSuccess());
      if (response.status === 0) {
        yield put(rplUpdateBulkUploadError(response.message));
      }
    } else {
      yield put(rplBulkEditFileUploadFailure());
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* rplDownloadBulkEditForecastRequestSaga(
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
    const rplViewState: IRPLView = yield select(rplViewSliceSelector);
    const selectedSKUList = rplViewState.rplSelectedSkuList;
    const isSelectedAll = rplViewState.rplViewLocalScope.globalRplSkuSelected;

    const queryParams: DownloadBulkEditQueryParamI = {
      fileName,
      groupKey: Number(selectedGroupKey!),
      orgKey,
      search: searchKey,
      whFlag: 0
    };

    if (selectedGroupKey) {
      let requestBody: GroupFilterI[] = filters.filter(
        (filter) => !(filter.code === 1 && filter.type === 'group')
      );

      if (isSelectedAll) {
        const additionalBody: GroupFilterI = {
          code: 1,
          isSelectAll: true,
          search: '',
          selectedItems: [],
          type: 'sku'
        };

        requestBody = [...requestBody, additionalBody];
      } else if (selectedSKUList.length > 0) {
        const additionalBody: GroupFilterI = {
          code: 1,
          isSelectAll: false,
          search: '',
          selectedItems: selectedSKUList.map((sku) => {
            return String(sku.anchorProdKey);
          }),
          type: 'sku'
        };

        requestBody = [...requestBody, additionalBody];
      }

      const response: GeneralResponse = yield call(() =>
        replenishmentViewApi.rplDownloadBulkEditForecastRequest(requestBody, queryParams)
      );

      if (response) {
        const downloadFileName = `${fileName}.csv`;
        const success: boolean = yield call(downloadFile, response, downloadFileName);

        if (success) {
          yield put(rplDownloadBulkEditForecastSuccess());
          yield call(showSuccessToast, DOWNLOAD_SUCCESS_MESSAGE);
        } else {
          yield put(rplDownloadBulkEditForecastFailure());
        }
      } else {
        yield put(rplDownloadBulkEditForecastFailure());
      }
    } else {
      yield call(showErrorToast, 'Please select a Group');
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* rplGetUploadHistoryDataRequestSaga(
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
        search: searchKey || '',
        whFlag: 0
      };

      const response: ApiResponse<GetUploadHistoryResponseI> = yield call(() =>
        replenishmentViewApi.rplGetUploadHistoryDataRequest(requestBody)
      );

      if (!responseValidator(response, true)) {
        return;
      }

      if (response) {
        yield put(rplGetUploadHistoryDataSuccess(response.data));
      } else {
        yield put(rplGetUploadHistoryDataFailure());
      }
    } else {
      yield call(showErrorToast, 'Please select a Group');
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* rplDownloadBulkForecastEditResultRequestSaga(
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
        replenishmentViewApi.rplDownloadBulkForecastEditResultRequest(requestBody)
      );

      if (response) {
        const success: boolean = yield call(downloadFile, response, fileName);

        if (success) {
          yield put(rplDownloadBulkForecastEditResultSuccess());
          yield call(showSuccessToast, DOWNLOAD_SUCCESS_MESSAGE);
        } else {
          yield put(rplDownloadBulkForecastEditResultFailure());
        }
      } else {
        yield put(rplDownloadBulkForecastEditResultFailure());
      }
    } else {
      yield call(showErrorToast, 'Please select a Group');
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* rplViewSaga() {
  yield takeLatest('rplView/getReplenishmentSkuDataRequest', getReplenishmentSkuDataRequestSaga);
  yield takeLatest(
    'rplView/getReplenishmentExpandedSkuDataRequest',
    getReplenishmentExpandedSkuDataRequestSaga
  );
  yield takeLatest('rplView/downloadRplReportRequest', downloadRplReportRequestSaga);
  yield takeLatest('rplView/getRplPlanDetailsRequest', getRplPlanDetailsRequestSaga);
  yield takeLatest('rplView/rplBulkEditFileUploadRequest', rplBulkEditFileUploadRequestSaga);
  yield takeLatest(
    'rplView/rplDownloadBulkEditForecastRequest',
    rplDownloadBulkEditForecastRequestSaga
  );
  yield takeLatest('rplView/rplGetUploadHistoryDataRequest', rplGetUploadHistoryDataRequestSaga);
  yield takeLatest(
    'rplView/rplDownloadBulkForecastEditResultRequest',
    rplDownloadBulkForecastEditResultRequestSaga
  );
}

export default rplViewSaga;
