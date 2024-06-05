import { groupConfigApi } from 'api';
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { GeneralResponse } from 'state/rootSaga';
import { IUser, userSliceSelector } from 'state/user/userState';
import {
  IGroupConfigurationSlice,
  createGroupFailure,
  createGroupSuccess,
  deleteGroupFailure,
  deleteGroupSuccess,
  getFilterCountSuccess,
  getFilterDataFailure,
  getFilterDataSuccess,
  getGroupListFailure,
  getGroupListRequest,
  getLabelsFailure,
  getLabelsSuccess,
  getStoreGroupListSuccess,
  getWarehouseGroupListSuccess,
  groupConfigurationSliceSelector,
  groupDefinitionRequestFailure,
  groupDefinitionRequestSuccess
} from './groupConfigurationState';
import {
  DeleteGroupRequestI,
  EditGroupRequestBodyI,
  EditGroupRequestParamsI,
  GroupRequestQueryParamI,
  GroupLabelTypes,
  StoreGroupRequestI,
  FilterDataReqQueryParamI,
  FilterDataReqPayloadI,
  CreateGroupRequestBodyI,
  FilterCountReqQueryParamI,
  FilterCountReqPayloadI
} from 'types/requests/groupConfigRequests';
import { PayloadAction } from '@reduxjs/toolkit';
import { showErrorToast, showSuccessToast } from 'state/toast/toastState';
import { ApiResponse } from 'types/api';
import { FilterDataApiResponseI, GroupTypes } from 'types/groupConfig';
import { responseValidator } from 'state/helpers/validateHelper';
import { GroupTypesEnum } from 'utils/enum';
import {
  FilterCountApiResponseI,
  GroupLabelsResponseI
} from 'types/responses/groupConfigResponses';
import {
  filterRequestFormatterForCount,
  filterRequestFormatterForData,
  formatGroupLabels,
  formatPredictorConfiguration,
  rightSidePanelFormatForRequest
} from './sagaHelpers/sgH_groupConfigurations';
import { FILTER_PAGE_SIZE, STORE_GROUP_PAGE_SIZE } from 'utils/constants';
import { getResponseAnchorAndSkuCount } from './stateHelpers/stH_groupConfigurations';

interface FilterDataActionI {
  payload: {
    filterType: string;
    filterCode: number;
    pageNumber: number;
    viewFilter: boolean;
    searchKey?: string;
    onScroll?: boolean;
    whFlag?: 0 | 1 | 2;
    initialRequest?: boolean;
  };
  type: string;
}

function* getGroupListRequestSaga(
  action: PayloadAction<{ pageNumber?: number; groupType: GroupTypes; searchKey?: string }>
) {
  try {
    const { pageNumber, groupType, searchKey } = action.payload;
    const userState: IUser = yield select(userSliceSelector);
    const orgKey = userState.selectedOrg && userState.selectedOrg.orgKey;

    const queryParams: StoreGroupRequestI = {
      orgKey: orgKey,
      type: groupType,
      page: pageNumber ?? 1,
      limit: STORE_GROUP_PAGE_SIZE,
      groupSearch: searchKey
    };

    const response: GeneralResponse = yield call(() =>
      groupConfigApi.getGroupListRequest(queryParams)
    );

    if (response) {
      if (groupType === GroupTypesEnum.STORE) {
        yield put(getStoreGroupListSuccess(response.data));
      } else if (groupType === GroupTypesEnum.WAREHOUSE) {
        yield put(getWarehouseGroupListSuccess(response.data));
      }
    } else {
      yield put(getGroupListFailure());
    }
  } catch (error) {
    // TODO:
  }
}

function* editGroupRequest(
  action: PayloadAction<{
    groupKey: number;
    forecastHorizon: number;
    groupName: string;
    groupType: GroupTypes;
  }>
) {
  try {
    const userState: IUser = yield select(userSliceSelector);
    const groupConfigurationState: IGroupConfigurationSlice = yield select(
      groupConfigurationSliceSelector
    );
    const orgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
    const { groupKey, forecastHorizon, groupName, groupType } = action.payload;
    const targetGroup = groupType === GroupTypesEnum.STORE ? 'storeGroup' : 'warehouseGroupe';
    const selectedGroup = groupConfigurationState[targetGroup]?.list.find(
      (group) => group.groupKey === groupKey
    );
    const whFlag = GroupTypesEnum.WAREHOUSE === groupType ? 1 : 0;

    const queryParams: EditGroupRequestParamsI = {
      groupKey,
      orgKey
    };

    const requestBody: EditGroupRequestBodyI = {
      forecastHorizon,
      groupName,
      currentEnableStatus: selectedGroup?.currentEnabledStatus ?? 0,
      previousEnableStatus: selectedGroup?.previousEnabledStatus ?? 0,
      whFlag
    };

    const response: ApiResponse<any> = yield call(() =>
      groupConfigApi.editGroupRequest(queryParams, requestBody)
    );

    if (!responseValidator(response, true)) {
      return;
    }

    const message = response.message;
    if (response) {
      yield call(showSuccessToast, message);
      yield put(getGroupListRequest({ groupType }));
    } else {
      yield call(showErrorToast, message);
    }
  } catch (error) {
    // TODO:
  }
}

function* deleteGroupRequest(
  action: PayloadAction<{
    groupKey: number;
    groupType: GroupTypes;
  }>
) {
  try {
    const userState: IUser = yield select(userSliceSelector);
    const orgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
    const { groupKey, groupType } = action.payload;

    const queryParams: DeleteGroupRequestI = {
      groupKey,
      orgKey: orgKey
    };

    const response: ApiResponse<any> = yield call(() =>
      groupConfigApi.deleteGroupRequest(queryParams)
    );

    if (response) {
      yield put(deleteGroupSuccess());
      yield call(showSuccessToast, response.message);
      yield put(getGroupListRequest({ groupType }));
    } else {
      yield put(deleteGroupFailure());
    }
  } catch (error) {
    // TODO:
  }
}

function* getLabelsRequest(
  action: PayloadAction<{
    labelTypes: GroupLabelTypes;
  }>
) {
  try {
    const userState: IUser = yield select(userSliceSelector);
    const orgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
    const { labelTypes } = action.payload;

    const queryParams: GroupRequestQueryParamI = {
      orgKey: orgKey
    };

    const requestBody: GroupLabelTypes = labelTypes;
    const response: ApiResponse<GroupLabelsResponseI[]> = yield call(() =>
      groupConfigApi.getLabelsRequest(queryParams, requestBody)
    );

    if (response) {
      const formattedLabelResponse = formatGroupLabels(response.data);
      yield put(getLabelsSuccess(formattedLabelResponse));
    } else {
      yield put(getLabelsFailure());
    }
  } catch (error) {
    // TODO:
  }
}

function* createGroupRequestSaga(action: PayloadAction<{ isWarehouseGroup: boolean }>) {
  try {
    const { isWarehouseGroup } = action.payload;
    const userState: IUser = yield select(userSliceSelector);
    const groupConfigurationState: IGroupConfigurationSlice = yield select(
      groupConfigurationSliceSelector
    );
    const groupLabels = groupConfigurationState.groupLabels;
    const groupDetails = groupConfigurationState.groupDetails;
    const groupFilter = groupConfigurationState.groupFilter;
    const orgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
    const filters = rightSidePanelFormatForRequest(
      groupFilter.filterLocalScope.rightPanelRetainDataList
    );
    const anchorAndSku = getResponseAnchorAndSkuCount(groupFilter);

    const queryParams: GroupRequestQueryParamI = {
      orgKey: orgKey
    };

    const formattedPredictorConfigs = formatPredictorConfiguration(
      groupLabels?.filter((x) => x.name == 'predictor') || []
    );

    const requestBody: CreateGroupRequestBodyI = {
      anchorLocation: anchorAndSku.anchor,
      filteredSelectedItems: groupFilter.filterLocalScope.rightPanelRetainDataList,
      filters,
      forecastHorizon: groupDetails.horizon,
      frequencyType: groupDetails.frequency,
      groupName: groupDetails.name,
      predictorConfiguration: formattedPredictorConfigs || null,
      skuLocation: anchorAndSku.sku,
      whFlag: isWarehouseGroup ? 1 : 0
    };
    const response: ApiResponse<GroupLabelsResponseI[]> = yield call(() =>
      groupConfigApi.createGroupRequest(queryParams, requestBody)
    );

    if (!responseValidator(response, true)) {
      return;
    }

    if (response) {
      const formattedLabelResponse = formatGroupLabels(response.data);
      yield call(showSuccessToast, response.message);
      yield put(createGroupSuccess(formattedLabelResponse));
      yield put(
        getGroupListRequest({
          groupType: isWarehouseGroup ? GroupTypesEnum.WAREHOUSE : GroupTypesEnum.STORE
        })
      );
    } else {
      yield put(createGroupFailure());
    }
  } catch (error) {
    console.log('group creation saga error ', error);
  }
}

function* getFilterDataRequest(action: FilterDataActionI) {
  try {
    let userState: IUser = yield select(userSliceSelector);
    const groupConfigurationState: IGroupConfigurationSlice = yield select(
      groupConfigurationSliceSelector
    );
    const { initialRequest } = action.payload;
    const groupFilter = groupConfigurationState.groupFilter;
    const filterType = action.payload.filterType;
    const filterCode = action.payload.filterCode;
    const viewFilter = action.payload.viewFilter;
    const searchKey = initialRequest ? '' : action.payload.searchKey;
    const orgKey = userState.selectedOrg.orgKey;
    const whFlag = action.payload.whFlag!;

    const formattedFilterOptions: FilterDataReqPayloadI = filterRequestFormatterForData(
      filterType,
      filterCode,
      orgKey,
      groupFilter,
      viewFilter,
      searchKey,
      whFlag,
      initialRequest
    );

    const queryParams: FilterDataReqQueryParamI = {
      pageNumber: action.payload.pageNumber,
      pageSize: FILTER_PAGE_SIZE,
      orgKey,
      sort: 'ASC',
      type: filterCode
    };

    if (userState && userState.keyCloakInfo) {
      const response: GeneralResponse = yield call(() =>
        groupConfigApi.getFilterDataRequest(formattedFilterOptions, queryParams)
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

function* getFilterCountRequest(action: FilterDataActionI) {
  try {
    let userState: IUser = yield select(userSliceSelector);
    const groupConfigurationState: IGroupConfigurationSlice = yield select(
      groupConfigurationSliceSelector
    );
    const groupFilter = groupConfigurationState.groupFilter;
    const orgKey = userState.selectedOrg.orgKey;
    const whFlag = action.payload.whFlag!;
    const formattedFilterOptions: FilterCountReqPayloadI = filterRequestFormatterForCount(
      orgKey,
      groupFilter,
      whFlag
    );

    const queryParams: FilterCountReqQueryParamI = {};

    if (userState && userState.keyCloakInfo) {
      const response: GeneralResponse = yield call(() =>
        groupConfigApi.getFilterCountRequest(formattedFilterOptions, queryParams)
      );
      if (response) {
        const formattedResponse: ApiResponse<FilterCountApiResponseI[]> = yield response;
        yield put(getFilterCountSuccess(formattedResponse.data));
      } else {
        yield put(getFilterDataFailure());
      }
    }
  } catch (error) {
    console.error('Filter Data Fetch Error', error);
  }
}

function* groupDefinitionRequest() {
  try {
    let userState: IUser = yield select(userSliceSelector);
    const groupConfigurationState: IGroupConfigurationSlice = yield select(
      groupConfigurationSliceSelector
    );
    const orgKey = userState.selectedOrg.orgKey;
    const selectedGroup = groupConfigurationState.selectedGroup;
    const groupKey = selectedGroup?.groupKey;

    const queryParams: FilterCountReqQueryParamI = {
      groupKey,
      orgKey
    };

    if (userState && userState.keyCloakInfo) {
      const response: GeneralResponse = yield call(() =>
        groupConfigApi.groupDefinitionRequest(queryParams)
      );
      if (response) {
        yield put(groupDefinitionRequestSuccess(response.data));
      } else {
        yield put(groupDefinitionRequestFailure());
      }
    }
  } catch (error) {
    console.error('Filter Data Fetch Error', error);
  }
}

function* groupConfigurationSaga() {
  yield takeLatest('groupConfiguration/getGroupListRequest', getGroupListRequestSaga);
  yield takeEvery('groupConfiguration/deleteGroupRequest', deleteGroupRequest);
  yield takeEvery('groupConfiguration/editGroupRequest', editGroupRequest);
  yield takeLatest('groupConfiguration/getLabelsRequest', getLabelsRequest);
  yield takeEvery('groupConfiguration/createGroupRequest', createGroupRequestSaga);
  yield takeLatest('groupConfiguration/getFilterDataRequest', getFilterDataRequest);
  yield takeLatest('groupConfiguration/getFilterCountRequest', getFilterCountRequest);
  yield takeEvery('groupConfiguration/groupDefinitionRequest', groupDefinitionRequest);
}

export default groupConfigurationSaga;
