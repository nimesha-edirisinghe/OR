import { call, put, select, takeLatest } from 'redux-saga/effects';
import { ApiResponse } from 'types/api';
import { promotionSummaryApi } from 'api';
import { responseValidator } from 'state/helpers/validateHelper';
import { IUser, userSliceSelector } from 'state/user/userState';
import { PROMOTION_SUMMARY_TABLE_PAGE_SIZE } from 'utils/constants';
import {
    promotionSummaryViewSliceSelector,
    IPromotionSummaryView,
    getPromotionSummaryDataRequestSuccess,
    getPromotionSummaryDataRequestFailure,
    downloadPromotionSummaryDataSuccess,
    downloadPromotionSummaryDataFailure
} from './promotionSummaryViewState';
import { PromotionSummaryViewSkuResponseDataI } from 'types/responses/promotionSummaryViewResponse';
import {
  PromotionSummaryDataDownloadRequestI,
  PromotionSummaryDataDownloadRequestQueryI,
  PromotionSummaryViewDataRequestI
} from 'types/requests/promotionSummaryViewRequest';
import { groupConfigurationSliceSelector, IGroupConfigurationSlice } from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { rightSidePanelFormatForRequest } from 'state/pages/advancedConfiguration/groupConfiguration/sagaHelpers/sgH_groupConfigurations';
import { GroupFilterI } from 'types/requests/groupConfigRequests';
import { PayloadAction } from '@reduxjs/toolkit';
import { downloadFile } from 'utils/fileDownloadUtils';
import { GeneralResponse } from 'state/rootSaga';
import { IGroupConfig, groupConfigSliceSelector } from 'state/pages/shared/groupConfig/groupConfigState';

function* getPromotionSummaryViewDataRequestSaga() {
  try {
    const userState: IUser = yield select(userSliceSelector);
    const promotionSummaryViewState: IPromotionSummaryView = yield select(
        promotionSummaryViewSliceSelector
    );
    const { pageNumber, skuSearchKey } = promotionSummaryViewState.promotionSummaryViewLocalScope
    const groupConfigurationState: IGroupConfigurationSlice = yield select(
        groupConfigurationSliceSelector
    );
    const groupFilter = groupConfigurationState.groupFilter;
    const filters = rightSidePanelFormatForRequest(
        groupFilter.filterLocalScope.rightPanelRetainDataList
    );
    const sharedGroupState: IGroupConfig = yield select(groupConfigSliceSelector);
    const selectedGroupKey = sharedGroupState.selectedGroupKey!;

    const requestBodyFilter: GroupFilterI[] = filters.filter(
      (filter) => !(filter.code === 1 && filter.type === 'group')
    );

    const requestBody: PromotionSummaryViewDataRequestI = {
      filters: requestBodyFilter,
      page: pageNumber,
      groupKey: selectedGroupKey,
      limit: PROMOTION_SUMMARY_TABLE_PAGE_SIZE,
      search: skuSearchKey,
      predictorCode: 10,
    };
    
    if (selectedGroupKey) {
      if (userState && userState.keyCloakInfo) {
        const response: ApiResponse<PromotionSummaryViewSkuResponseDataI> = yield call(() =>
            promotionSummaryApi.getPromotionSummaryViewDataListRequest(requestBody)
        );

        if (!responseValidator(response, true)) {
            return;
        }

        if (response) {
            yield put(getPromotionSummaryDataRequestSuccess(response.data));
        } else {
            yield put(getPromotionSummaryDataRequestFailure());
        }
      }
    }
  } catch (error) {
    console.error('error in request ', error);
  }
}

function* downloadPromotionSummaryDataRequestSaga(
  action: PayloadAction<{
  fileName: string;
  }>
  ) {
    try {
      const { fileName } = action.payload;
      const promotionSummaryViewState: IPromotionSummaryView = yield select(
        promotionSummaryViewSliceSelector
    );
      const searchKey = promotionSummaryViewState.promotionSummaryViewLocalScope.skuSearchKey;
      const groupConfigurationState: IGroupConfigurationSlice = yield select(
        groupConfigurationSliceSelector
      );
      const groupFilter = groupConfigurationState.groupFilter;
      const filters = rightSidePanelFormatForRequest(
        groupFilter.filterLocalScope.rightPanelRetainDataList
      );
      const sharedGroupState: IGroupConfig = yield select(groupConfigSliceSelector);
      const selectedGroupKey = sharedGroupState.selectedGroupKey!;
  
      const queryParams: PromotionSummaryDataDownloadRequestQueryI = {
        fileName: fileName
      };
  
      const requestBodyFilter: GroupFilterI[] = filters.filter(
        (filter) => !(filter.code === 1 && filter.type === 'group')
        );
        
        const requestBody: PromotionSummaryDataDownloadRequestI = {
            filters: requestBodyFilter,
            search: searchKey,
            groupKey: selectedGroupKey
        }
      
      if (selectedGroupKey) {
        const response: GeneralResponse = yield call(() =>
          promotionSummaryApi.downloadPromotionSummaryDataRequest(requestBody, queryParams)
        );
    
        if (response) {
          const downloadFileName = `${fileName}.csv`;
          const success: boolean = yield call(downloadFile, response, downloadFileName);
          if (success) {
            yield put(downloadPromotionSummaryDataSuccess());
          } else {
            yield put(downloadPromotionSummaryDataFailure());
          }
        } else {
          yield put(downloadPromotionSummaryDataFailure());
        }
      }
    } catch (error) {
      console.error('error in request ', error);
    }
}

function* promotionSummaryViewSaga() {
    yield takeLatest('promotionSummaryView/getPromotionSummaryDataRequest', getPromotionSummaryViewDataRequestSaga);
    yield takeLatest('promotionSummaryView/downloadPromotionSummaryDataRequest', downloadPromotionSummaryDataRequestSaga);
}

export default promotionSummaryViewSaga;
