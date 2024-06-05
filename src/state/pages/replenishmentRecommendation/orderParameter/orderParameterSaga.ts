import { call, put, select, takeLatest } from 'redux-saga/effects';
import { orderParameterApi } from 'api';
import { ApiResponse } from 'types/api';
import { responseValidator } from 'state/helpers/validateHelper';
import { rightSidePanelFormatForRequest } from 'state/pages/advancedConfiguration/groupConfiguration/sagaHelpers/sgH_groupConfigurations';
import {
  groupConfigurationSliceSelector,
  IGroupConfigurationSlice
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { GroupFilterI } from 'types/requests/groupConfigRequests';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  IOrderParameter,
  downloadRplParameterSummaryFailure,
  downloadRplParameterSummarySuccess,
  getRplParameterSummaryFailure,
  getRplParameterSummarySuccess,
  orderParameterSliceSelector
} from './orderParameterState';
import {
  DownloadReplParameterSummaryQueryParamI,
  GetReplParameterSummaryQueryParamI
} from 'types/requests/replenishmentRecommendation/orderParameter';
import { RplParameterSummaryResponseI } from 'types/responses/replenishmentRecommendation/orderParameter';
import { ORDER_PARAMETER_TABLE_PAGE_SIZE } from 'utils/constants';
import { GeneralResponse } from 'state/rootSaga';
import { showSuccessToast } from 'state/toast/toastState';
import { DOWNLOAD_SUCCESS_MESSAGE } from 'constants/messages';
import { downloadFile } from 'utils/fileDownloadUtils';

function* getRplParameterSummaryRequestSaga() {
  try {
    const groupConfigurationState: IGroupConfigurationSlice = yield select(
      groupConfigurationSliceSelector
    );

    const orderParameterState: IOrderParameter = yield select(orderParameterSliceSelector);
    const { searchKey, currentPageNo } = orderParameterState.orderParameterLocalScope;
    const groupFilter = groupConfigurationState.groupFilter;
    const filters = rightSidePanelFormatForRequest(
      groupFilter.filterLocalScope.rightPanelRetainDataList
    );

    const queryParams: GetReplParameterSummaryQueryParamI = {
      limit: ORDER_PARAMETER_TABLE_PAGE_SIZE,
      page: currentPageNo || 1,
      search: searchKey,
      whFlag: 2
    };

    const requestBody: GroupFilterI[] = filters.filter(
      (filter) => !(filter.code === 1 && filter.type === 'group')
    );

    const response: ApiResponse<RplParameterSummaryResponseI> = yield call(() =>
      orderParameterApi.getRplParameterSummaryRequest(requestBody, queryParams)
    );

    if (!responseValidator(response, true)) {
      return;
    }

    if (response) {
      yield put(getRplParameterSummarySuccess(response.data));
    } else {
      yield put(getRplParameterSummaryFailure());
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* downloadRplParameterSummaryRequestSaga(action: PayloadAction<{ fileName?: string }>) {
  try {
    const { fileName } = action.payload || '';
    const groupConfigurationState: IGroupConfigurationSlice = yield select(
      groupConfigurationSliceSelector
    );

    const orderParameterState: IOrderParameter = yield select(orderParameterSliceSelector);
    const { searchKey, currentPageNo } = orderParameterState.orderParameterLocalScope;
    const groupFilter = groupConfigurationState.groupFilter;
    const filters = rightSidePanelFormatForRequest(
      groupFilter.filterLocalScope.rightPanelRetainDataList
    );

    const queryParams: DownloadReplParameterSummaryQueryParamI = {
      fileName: fileName!,
      search: searchKey,
      whFlag: 2
    };

    const requestBody: GroupFilterI[] = filters.filter(
      (filter) => !(filter.code === 1 && filter.type === 'group')
    );

    const response: GeneralResponse = yield call(() =>
      orderParameterApi.downloadRplParameterSummaryRequest(requestBody, queryParams)
    );

    if (response) {
      const formattedFileName = `${fileName}.csv`;
      const success: boolean = yield call(downloadFile, response, formattedFileName);
      if (success) {
        yield put(downloadRplParameterSummarySuccess());
        yield call(showSuccessToast, DOWNLOAD_SUCCESS_MESSAGE);
      } else {
        yield put(downloadRplParameterSummaryFailure());
      }
    } else {
      yield put(downloadRplParameterSummaryFailure());
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* userSaga() {
  yield takeLatest(
    'orderParameter/getRplParameterSummaryRequest',
    getRplParameterSummaryRequestSaga
  );
  yield takeLatest(
    'orderParameter/downloadRplParameterSummaryRequest',
    downloadRplParameterSummaryRequestSaga
  );
}

export default userSaga;
