import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
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
  AlertReplenishmentResponseI,
  GetUploadHistoryResponseI,
  ReplenishmentPlanDetailsResI,
  ReplenishmentPlanDetailsStateI,
  ReplenishmentSkuListResI
} from 'types/responses/viewResponses';
import { demandForecastApi, replenishmentViewApi } from 'api';
import { responseValidator } from 'state/helpers/validateHelper';

import { downloadFile } from 'utils/fileDownloadUtils';
import { GeneralResponse } from 'state/rootSaga';
import { replenishmentViewReFormatter } from '../demandForecastView/sagaHelpers/sgH_DfView';
import {
  IRPLWhView,
  downloadRplWHReportFailure,
  downloadRplWHReportSuccess,
  getReplenishmentTotalCountSuccess,
  getReplenishmentWHExpandedSkuDataFailure,
  getReplenishmentWHExpandedSkuDataSuccess,
  getReplenishmentWHSkuDataFailure,
  getReplenishmentWHSkuDataSuccess,
  getRplWHPlanDetailsFailure,
  getRplWHPlanDetailsSuccess,
  rplWHAlertTypeFailure,
  rplWHAlertTypeSuccess,
  rplWHEditFailure,
  rplWHEditSuccess,
  rplWHBulkEditFileUploadFailure,
  rplWHBulkEditFileUploadSuccess,
  rplWHDownloadBulkEditForecastFailure,
  rplWHDownloadBulkEditForecastSuccess,
  rplWHDownloadBulkForecastEditResultFailure,
  rplWHDownloadBulkForecastEditResultSuccess,
  rplWHGetUploadHistoryDataFailure,
  rplWHGetUploadHistoryDataSuccess,
  rplWHUpdateBulkUploadError,
  rplWHViewSliceSelector
} from './whRplViewState';
import { AxiosProgressEvent } from 'axios';
import { DOWNLOAD_SUCCESS_MESSAGE } from 'constants/messages';
import { showErrorToast, showSuccessToast } from 'state/toast/toastState';
import { BULK_EDIT_HISTORY_TABLE_PAGE_SIZE } from 'utils/constants';
import { AlertTypeI, ForecastAlertType } from 'types/alertConfig';
import { ReplenishmentI } from 'types/requests/alertConfigRequest';

function* getReplenishmentWhSkuDataRequestSaga(action: PayloadAction<{ searchKey?: string }>) {
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
      whFlag: 1
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
        yield put(getReplenishmentWHSkuDataSuccess(response.data));
      } else {
        yield put(getReplenishmentWHSkuDataFailure());
      }
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}
function* getReplenishmentWhExpandedSkuDataRequestSaga(
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

    const rplWhViewState: IRPLWhView = yield select(rplWHViewSliceSelector);
    const selectedSKUList = rplWhViewState.rplWhSelectedSkuList;

    const isSelectedAll = rplWhViewState.rplWhViewLocalScope.globalRplWhSkuSelected;

    const queryParams: ReplenishmentSkuListReqQueryI = {
      groupKey: selectedGroupKey!,
      limit: Number(REACT_APP_VIEW_FORECAST_SKU_PAGE_SIZE),
      orgKey,
      page: 1,
      search: searchKey,
      whFlag: 1
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
        yield put(getReplenishmentWHExpandedSkuDataSuccess(response.data));

        const responseTotalCount: ApiResponse<{ key: string; value: string }[]> = yield call(() =>
          replenishmentViewApi.getRplPlanTotalCountRequest(requestBody, queryParams)
        );

        if (!responseValidator(responseTotalCount, true)) {
          return;
        }

        if (responseTotalCount) {
          yield put(getReplenishmentTotalCountSuccess(responseTotalCount.data));
        } else {
          yield put(getReplenishmentWHExpandedSkuDataFailure());
        }
      } else {
        yield put(getReplenishmentWHExpandedSkuDataFailure());
      }
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}
function* downloadRplWhReportRequestSaga(action: PayloadAction<{ fileName: string }>) {
  try {
    const { fileName } = action.payload;
    const userState: IUser = yield select(userSliceSelector);
    const sharedGroupState: IGroupConfig = yield select(groupConfigSliceSelector);
    const orgKey = userState.selectedOrg.orgKey;
    const selectedGroupKey = sharedGroupState.selectedGroupKey!;
    const groupConfigurationState: IGroupConfigurationSlice = yield select(
      groupConfigurationSliceSelector
    );
    const rplViewState: IRPLWhView = yield select(rplWHViewSliceSelector);
    const groupFilter = groupConfigurationState.groupFilter;
    const filters = rightSidePanelFormatForRequest(
      groupFilter.filterLocalScope.rightPanelRetainDataList
    );

    const startDate = rplViewState.rplWhViewLocalScope.startDate;
    const endDate = rplViewState.rplWhViewLocalScope.endDate;
    const selectedSKUList = rplViewState.rplWhSelectedSkuList;
    const isSelectedAll = rplViewState.rplWhViewLocalScope.globalRplWhSkuSelected;
    const searchKey = rplViewState.rplWhViewLocalScope.rplWhSkuSearchKey;

    const queryParams: DownloadRplReqQueryI = {
      groupKey: selectedGroupKey!,
      orgKey,
      page: 1,
      whFlag: 1,
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
        const downloadFileName = `${fileName}.zip`;
        const success: boolean = yield call(downloadFile, response, downloadFileName);
        if (success) {
          yield put(downloadRplWHReportSuccess());
        } else {
          yield put(downloadRplWHReportFailure());
        }
      } else {
        yield put(downloadRplWHReportFailure());
      }
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}
function* getRplWhPlanDetailsRequestSaga() {
  try {
    const userState: IUser = yield select(userSliceSelector);
    const sharedGroupState: IGroupConfig = yield select(groupConfigSliceSelector);
    const orgKey = userState.selectedOrg.orgKey;
    const groupKey = sharedGroupState.selectedGroupKey!;

    const rplViewState: IRPLWhView = yield select(rplWHViewSliceSelector);
    const selectedRplSkuObj = rplViewState.rplWhSelectedSku;
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
        response.data,
        110
      );
      yield put(getRplWHPlanDetailsSuccess(formattedData));
    } else {
      yield put(getRplWHPlanDetailsFailure());
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
    let previousUploadProgressHandler: ((progressEvent: AxiosProgressEvent) => void) | null = null;
    const uploadProgressHandler = async (progressEvent: AxiosProgressEvent) => {
      const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
      uploadPercentageCallback(percentage);
    };
    previousUploadProgressHandler = uploadProgressHandler;

    const response: ApiResponse<any> = yield call(() =>
      replenishmentViewApi.rplBulkEditFileUploadRequest(file, uploadProgressHandler)
    );

    if (response) {
      yield put(rplWHBulkEditFileUploadSuccess());
      if (response.status === 0) {
        yield put(rplWHUpdateBulkUploadError(response.message));
      }
    } else {
      yield put(rplWHBulkEditFileUploadFailure());
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* rplDownloadBulkEditForecastRequestSaga(
  action: PayloadAction<{ groupKey: string; fileName: string; searchKey?: string }>
) {
  try {
    const { fileName, searchKey, groupKey } = action.payload;
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
    const rplViewState: IRPLWhView = yield select(rplWHViewSliceSelector);
    const selectedSKUList = rplViewState.rplWhSelectedSkuList;
    const isSelectedAll = rplViewState.rplWhViewLocalScope.globalRplWhSkuSelected;
    const search = rplViewState.rplWhViewLocalScope.rplWhSkuSearchKey;
    const isSearchEmpty = search.length === 0;

    const queryParams: DownloadBulkEditQueryParamI = {
      fileName,
      groupKey: Number(groupKey!),
      orgKey,
      search: searchKey,
      whFlag: 1
    };

    let requestBody: GroupFilterI[] = filters.filter(
      (filter) => !(filter.code === 1 && filter.type === 'group')
    );

    if (isSelectedAll && isSearchEmpty) {
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
      const downloadFileName = `${groupKey}_${fileName}.csv`;
      const success: boolean = yield call(downloadFile, response, downloadFileName);

      if (success) {
        yield put(rplWHDownloadBulkEditForecastSuccess());
        yield call(showSuccessToast, DOWNLOAD_SUCCESS_MESSAGE);
      } else {
        yield put(rplWHDownloadBulkEditForecastFailure());
      }
    } else {
      yield put(rplWHDownloadBulkEditForecastFailure());
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
        limit: BULK_EDIT_HISTORY_TABLE_PAGE_SIZE,
        page: pageNumber || 1,
        search: searchKey || '',
        whFlag: 1
      };

      const response: ApiResponse<GetUploadHistoryResponseI> = yield call(() =>
        replenishmentViewApi.rplGetUploadHistoryDataRequest(requestBody)
      );

      if (!responseValidator(response, true)) {
        return;
      }

      if (response) {
        yield put(rplWHGetUploadHistoryDataSuccess(response.data));
      } else {
        yield put(rplWHGetUploadHistoryDataFailure());
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
        replenishmentViewApi.rplDownloadBulkForecastEditResultRequest(requestBody)
      );

      if (response) {
        const success: boolean = yield call(downloadFile, response, fileName);

        if (success) {
          yield put(rplWHDownloadBulkForecastEditResultSuccess());
          yield call(showSuccessToast, DOWNLOAD_SUCCESS_MESSAGE);
        } else {
          yield put(rplWHDownloadBulkForecastEditResultFailure());
        }
      } else {
        yield put(rplWHDownloadBulkForecastEditResultFailure());
      }
    } else {
      yield call(showErrorToast, 'Please select a Group');
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* rplEditRequestSaga(action: PayloadAction<ReplenishmentI>) {
  try {
    const replWhView: IRPLWhView = yield select(rplWHViewSliceSelector);
    const response: ApiResponse<AlertReplenishmentResponseI> = yield call(() =>
      demandForecastApi.alertReplenishmentRequest(action.payload as any)
    );

    if (!responseValidator(response, true)) {
      return;
    }
    const message = response.message;
    if (response) {
      yield call(showSuccessToast, message);
      yield put(rplWHEditSuccess());
    } else {
      yield call(showErrorToast, message);
      yield put(rplWHEditFailure());
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* getRPLAlertTypesRequestSaga() {
  try {
    const rplViewState: IRPLWhView = yield select(rplWHViewSliceSelector);
    const sharedGrpConf: IGroupConfig = yield select(groupConfigSliceSelector);

    const anchorProdKey = rplViewState.rplWhSelectedSku?.anchorProdKey!;
    const anchorProdModelKey = rplViewState.rplWhSelectedSku?.anchorProdModelKey!;
    const groupKey = +sharedGrpConf?.selectedGroupKey!;
    const forecastKey = rplViewState.rplWhSelectedSku?.forecastKey!;

    const requestBody: ForecastAlertType = {
      alertType: 'outofstock',
      anchorProdKey,
      anchorProdModelKey,
      groupKey,
      forecastKey
    };

    const response: ApiResponse<AlertTypeI> = yield call(() =>
      demandForecastApi.getAlertTypeRequest(requestBody)
    );

    if (!responseValidator(response, true)) {
      return;
    }

    if (response) {
      yield put(rplWHAlertTypeSuccess(response.data));
    } else {
      yield put(rplWHAlertTypeFailure());
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* rplWhViewSaga() {
  yield takeLatest(
    'rplWhView/getReplenishmentWHSkuDataRequest',
    getReplenishmentWhSkuDataRequestSaga
  );
  yield takeLatest(
    'rplWhView/getReplenishmentWHExpandedSkuDataRequest',
    getReplenishmentWhExpandedSkuDataRequestSaga
  );
  yield takeLatest('rplWhView/downloadRplWHReportRequest', downloadRplWhReportRequestSaga);
  yield takeLatest('rplWhView/getRplWHPlanDetailsRequest', getRplWhPlanDetailsRequestSaga);
  yield takeLatest('rplWhView/rplWHBulkEditFileUploadRequest', rplBulkEditFileUploadRequestSaga);
  yield takeLatest(
    'rplWhView/rplWHDownloadBulkEditForecastRequest',
    rplDownloadBulkEditForecastRequestSaga
  );
  yield takeLatest('rplWhView/rplWHGetUploadHistoryDataRequest', getUploadHistoryDataRequestSaga);
  yield takeLatest(
    'rplWhView/rplWHDownloadBulkForecastEditResultRequest',
    downloadBulkForecastEditResultRequestSaga
  );
  yield takeLatest('rplWhView/rplWHEditRequest', rplEditRequestSaga);
  yield takeLatest('rplWhView/rplWHAlertTypeRequest', getRPLAlertTypesRequestSaga);
}

export default rplWhViewSaga;
