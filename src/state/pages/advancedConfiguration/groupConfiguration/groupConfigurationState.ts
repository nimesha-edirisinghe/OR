import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IRootState } from 'state/rootState';
import {
  FilterDataApiResponseI,
  FilterLoadType,
  FilterLocalScopeI,
  GroupConfigurationLocalScopeI,
  GroupDetailsI,
  GroupDetailsKeyT,
  GroupLabelI,
  GroupTypes,
  InfluencingFactorTypes,
  RightFilterItemContentI
} from 'types/groupConfig';
import { GroupLabelTypes } from 'types/requests/groupConfigRequests';
import {
  FilterCountApiResponseI,
  StoreGroupI,
  StoreGroupListResponse
} from 'types/responses/groupConfigResponses';
import { KeyValueI } from 'types/responses/insightResponses';
import { ScheduleType } from 'types/responses/jobScheduleResponses';
import { GroupTypesEnum, InfluencingFactorTypesEnum } from 'utils/enum';
import {
  updateDefaultHorizonByFrequency,
  updateFilterOutOfCount
} from './stateHelpers/stH_groupConfigurations';
import { GroupDefResponseI } from 'types/responses/groupConfigResponse';

export interface IGroupConfigurationSlice {
  isLoading: boolean;
  isSkuIsLoading: boolean;
  storeGroup: StoreGroupListResponse | null;
  warehouseGroupe: StoreGroupListResponse | null;
  groupLabels: GroupLabelI[] | null;
  groupDetails: GroupDetailsI;
  selectedGroup: StoreGroupI | null;
  groupConfigurationLocalScope: GroupConfigurationLocalScopeI;
  groupFilter: {
    filterAppliedIndicator: boolean;
    filterTotalItemsCount: FilterCountApiResponseI[];
    filterCode: number | null;
    filterType: string | null;
    filterLocalScope: FilterLocalScopeI;
    filterSelectAllCheckboxDisabled: boolean;
    filterItemListData: KeyValueI[] | [];
  };
}

export const GroupConfigurationSlice = createSlice({
  name: 'groupConfiguration',
  initialState: {
    isLoading: false,
    isSkuIsLoading: false,
    storeGroup: null,
    warehouseGroupe: null,
    warehouseGroup: null,
    groupLabels: null,
    groupFilter: {
      filterAppliedIndicator: false,
      filterTotalItemsCount: [],
      filterCode: null,
      filterType: null,
      filterLocalScope: {
        isOpenFilterDrawer: false,
        isOpenItemSelectionDrawer: false,
        itemSelectionDrawerOpenFrom: 'drawer',
        viewFilter: false,
        viewOutOfCount: 0,
        viewFilterActiveStep: 0,
        rightPanelRetainDataList: [],
        beforeEditFilterOptionsLevel1: [],
        beforeEditFilterOptionsLevel2: []
      },
      filterSelectAllCheckboxDisabled: false,
      filterItemListData: []
    },
    groupDetails: {
      name: '',
      frequency: null,
      horizon: 0
    },
    selectedGroup: null,
    groupConfigurationLocalScope: {
      storeGroupCreationDrawer: false,
      storeGroupViewDrawer: false,
      isWarehouseGroup: false,
      currantPageNumber: 1,
      isFilterApplied: false
    }
  } as IGroupConfigurationSlice,
  reducers: {
    getGroupListRequest: (
      state,
      action: PayloadAction<{ pageNumber?: number; groupType: GroupTypes; searchKey?: string }>
    ) => {},
    getStoreGroupListSuccess: (state, action: PayloadAction<StoreGroupListResponse>) => {
      state.storeGroup = {
        ...action.payload,
        list: action.payload.list.map((group) => ({
          ...group,
          currentEnabledStatus: group.previousEnabledStatus
        }))
      };
    },
    getWarehouseGroupListSuccess: (state, action: PayloadAction<StoreGroupListResponse>) => {
      state.warehouseGroupe = {
        ...action.payload,
        list: action.payload.list.map((group) => ({
          ...group,
          currentEnabledStatus: group.previousEnabledStatus
        }))
      };
    },
    getGroupListFailure: (state) => {},
    setActiveStatus: (
      state,
      action: PayloadAction<{ groupType: GroupTypes; groupKey: number }>
    ) => {
      const { groupKey, groupType } = action.payload;
      const targetGroup =
        groupType === GroupTypesEnum.STORE ? state.storeGroup : state.warehouseGroupe;

      if (targetGroup) {
        targetGroup.list = targetGroup.list.map((group) =>
          group.groupKey === groupKey
            ? { ...group, currentEnabledStatus: group.currentEnabledStatus === 1 ? 0 : 1 }
            : group
        );
      }
    },
    deleteGroupRequest: (state, action: PayloadAction<{ groupKey: number; groupType: string }>) => {
      state.isLoading = true;
    },
    deleteGroupSuccess: (state) => {
      state.isLoading = false;
    },
    deleteGroupFailure: (state) => {
      state.isLoading = false;
    },
    editGroupRequest: (
      state,
      action: PayloadAction<{
        groupKey: number;
        forecastHorizon: number;
        groupName: string;
        groupType: GroupTypes;
      }>
    ) => {},
    cancelEditMode: (
      state,
      action: PayloadAction<{
        groupKey: number;
        groupType: GroupTypes;
      }>
    ) => {
      const { groupKey, groupType } = action.payload;
      const targetGroup =
        groupType === GroupTypesEnum.STORE ? state.storeGroup : state.warehouseGroupe;

      if (targetGroup) {
        targetGroup.list = targetGroup.list.map((group) =>
          group.groupKey === groupKey
            ? { ...group, currentEnabledStatus: group.previousEnabledStatus }
            : group
        );
      }
    },
    getLabelsRequest: (state, action: PayloadAction<{ labelTypes: GroupLabelTypes }>) => {
      state.isLoading = true;
    },
    getLabelsSuccess: (state, action: PayloadAction<GroupLabelI[]>) => {
      state.isLoading = false;
      state.groupLabels = action.payload;
    },
    getLabelsFailure: (state) => {
      state.isLoading = false;
    },
    selectPredictor: (
      state,
      action: PayloadAction<{ factorName: string; type: InfluencingFactorTypes; checked: boolean }>
    ) => {
      const { factorName, type, checked } = action.payload;
      const predictors = state.groupLabels?.filter((x) => x.name === 'predictor');
      if (predictors) {
        const index = predictors.findIndex((item) => item.label === factorName);
        if (index !== -1) {
          if (type === InfluencingFactorTypesEnum.SKU) {
            predictors[index].sku = checked;
          } else if (type === InfluencingFactorTypesEnum.ANCHOR) {
            predictors[index].anchor = checked;
          }
        }
      }
    },
    openGroupConfigDrawer: (state) => {
      state.groupConfigurationLocalScope.storeGroupCreationDrawer = true;
      state.groupDetails = {
        frequency: null,
        horizon: 0,
        name: ''
      };
    },
    closeGroupConfigDrawer: (state) => {
      state.groupConfigurationLocalScope.storeGroupCreationDrawer = false;
    },
    toggleViewGroupConfigDrawer: (
      state,
      action: PayloadAction<{ state: boolean; activeStep?: 0 | 1 | 2 }>
    ) => {
      state.groupConfigurationLocalScope.storeGroupViewDrawer = action.payload.state;
      state.groupFilter.filterLocalScope.viewFilterActiveStep = action.payload.activeStep || 0;
    },
    updateGroupFilter: (state, action: PayloadAction<IGroupConfigurationSlice['groupFilter']>) => {
      state.groupFilter = action.payload;
    },
    createGroupRequest: (state, action: PayloadAction<{ isWarehouseGroup: boolean }>) => {
      state.groupConfigurationLocalScope.isWarehouseGroup = action.payload.isWarehouseGroup;
      state.isLoading = true;
    },
    createGroupSuccess: (state, action) => {
      state.isLoading = false;
      state.groupLabels = action.payload;
    },
    createGroupFailure: (state) => {
      state.isLoading = false;
    },
    setGroupDetails: (
      state,
      action: PayloadAction<{
        key: GroupDetailsKeyT;
        value: string | number | ScheduleType;
      }>
    ) => {
      const { key, value } = action.payload;
      const defaultHorizon = updateDefaultHorizonByFrequency(value as ScheduleType);
      switch (key) {
        case 'name':
          state.groupDetails.name = value as string;
          break;
        case 'frequency':
          state.groupDetails.frequency = value as ScheduleType;
          state.groupDetails.horizon = defaultHorizon;
          break;
        case 'horizon':
          state.groupDetails.horizon = value as number;
          break;
      }
    },
    setSelectedStore: (state, action: PayloadAction<StoreGroupI>) => {
      state.selectedGroup = action.payload;
    },
    getFilterDataRequest: (
      state,
      action: {
        payload: {
          filterType: string;
          filterCode: number;
          pageNumber: number;
          viewFilter: boolean;
          searchKey?: string;
          whFlag?: 0 | 1 | 2;
          initialRequest?: boolean;
        };
      }
    ) => {
      state.groupFilter.filterLocalScope.viewFilter = action.payload.viewFilter;
      state.groupFilter.filterLocalScope.viewOutOfCount = 0;
      state.groupFilter.filterItemListData = [];
      state.isLoading = true;
      state.isSkuIsLoading = true;
    },
    getFilterDataSuccess: (
      state,
      action: {
        payload: FilterDataApiResponseI;
      }
    ) => {
      const groupFilter = state.groupFilter;
      let mutableTotalCount = action.payload.totalCount;
      const filterType = groupFilter.filterType!;
      const filterCode = groupFilter.filterCode!;
      state.groupFilter.filterItemListData = action.payload.list;

      state.groupFilter.filterItemListData = action.payload.list.map((obj) => {
        obj.value = `${obj.key} - ${obj.value}`;
        return obj;
      });

      // Todo: delete code if viewOutOfCount works fine
      if (!state.groupFilter.filterLocalScope.viewFilter) {
        updateFilterOutOfCount(
          filterType,
          filterCode,
          groupFilter.filterLocalScope.rightPanelRetainDataList,
          mutableTotalCount
        );
      }
      state.groupFilter.filterLocalScope.viewOutOfCount = mutableTotalCount;
      state.isLoading = false;
      state.isSkuIsLoading = false;
    },
    getFilterDataFailure: (state) => {
      state.isLoading = false;
      state.isSkuIsLoading = false;
    },
    getFilterCountRequest: (state, action: PayloadAction<{ whFlag: 0 | 1 | 2 }>) => {},
    getFilterCountSuccess: (state, action: { payload: FilterCountApiResponseI[] }) => {
      state.groupFilter.filterTotalItemsCount = action.payload;
    },
    getFilterCountFailure: (state) => {},
    toggleGroupFilterItemSelectionDrawer: (state, action: PayloadAction<boolean>) => {
      state.groupFilter.filterLocalScope.isOpenItemSelectionDrawer = action.payload;
    },
    resetGroupFilter: (state) => {
      state.groupFilter.filterLocalScope.rightPanelRetainDataList = [];
      state.groupFilter.filterTotalItemsCount = [];
    },
    resetFilterFromFilterItself: (state) => {
      state.groupFilter.filterLocalScope.rightPanelRetainDataList =
        state.groupFilter.filterLocalScope.rightPanelRetainDataList.filter(
          (filter) => filter.code === 1 && filter.type === 'group'
        ) || [];
    },
    groupDefinitionRequest: (state) => {
      state.groupFilter.filterLocalScope.viewFilter = true;
    },
    groupDefinitionRequestSuccess: (state, action: PayloadAction<GroupDefResponseI>) => {
      state.groupFilter.filterLocalScope.rightPanelRetainDataList = action.payload.filters;
      let predictors = state.groupLabels?.filter((x) => x.name === 'predictor');
      if (predictors) {
        const newPredictors = action.payload.predictorConfiguration.map((predictor) => {
          return {
            code: predictor.predictorCode,
            name: predictor.predictorName,
            sku: predictor.isSku,
            anchor: predictor.isAnchor
          };
        });

        predictors.forEach((x, i) => {
          let newItem = newPredictors.find((t) => t.name === x.name && t.code === x.code);
          if (newItem) {
            x.sku = newItem.sku;
            x.anchor = newItem.anchor;
          }
        });
      }
    },
    groupDefinitionRequestFailure: (state) => {},
    alertDefinitionFilterDataRequestSuccess: (state, action: PayloadAction<KeyValueI[]>) => {
      state.groupFilter.filterLocalScope.rightPanelRetainDataList = [];
      const skuLocationRItem = {
        code: 1,
        isSelectAll: false,
        selectedItems: action.payload.map((obj) => {
          obj.value = `${obj.key} - ${obj.value}`;
          return obj;
        }),
        type: 'sku'
      };
      state.groupFilter.filterLocalScope.rightPanelRetainDataList = [skuLocationRItem];
    },
    toggleDrawerFilter: (state, action: PayloadAction<{ isOpen: boolean }>) => {
      state.groupFilter.filterLocalScope.isOpenFilterDrawer = action.payload.isOpen;
    },
    updateRightPanelRetainDataList: (state, action: { payload: RightFilterItemContentI[] }) => {
      state.groupFilter.filterLocalScope.rightPanelRetainDataList = action.payload;
    },
    toggleFilterAppliedIndicatorIndicator: (state) => {
      state.groupFilter.filterAppliedIndicator = !!!state.groupFilter.filterAppliedIndicator;
    },
    updateFilterApply: (state) => {
      state.groupConfigurationLocalScope.isFilterApplied =
        !state.groupConfigurationLocalScope.isFilterApplied;
    },
    updateItemSelectionDrawerOpenFrom: (state, action: PayloadAction<FilterLoadType>) => {
      state.groupFilter.filterLocalScope.itemSelectionDrawerOpenFrom = action.payload;
    }
  }
});
export const groupConfigurationSliceSelector = (state: IRootState) => state.groupConfiguration;

export const {
  getGroupListRequest,
  getStoreGroupListSuccess,
  getWarehouseGroupListSuccess,
  getGroupListFailure,
  setActiveStatus,
  deleteGroupRequest,
  deleteGroupSuccess,
  deleteGroupFailure,
  editGroupRequest,
  getLabelsRequest,
  getLabelsFailure,
  getLabelsSuccess,
  selectPredictor,
  openGroupConfigDrawer,
  closeGroupConfigDrawer,
  updateGroupFilter,
  createGroupRequest,
  createGroupSuccess,
  createGroupFailure,
  setGroupDetails,
  getFilterDataRequest,
  getFilterDataSuccess,
  getFilterDataFailure,
  getFilterCountRequest,
  getFilterCountSuccess,
  getFilterCountFailure,
  toggleGroupFilterItemSelectionDrawer,
  resetGroupFilter,
  resetFilterFromFilterItself,
  cancelEditMode,
  toggleViewGroupConfigDrawer,
  setSelectedStore,
  groupDefinitionRequest,
  groupDefinitionRequestSuccess,
  groupDefinitionRequestFailure,
  alertDefinitionFilterDataRequestSuccess,
  toggleDrawerFilter,
  updateRightPanelRetainDataList,
  toggleFilterAppliedIndicatorIndicator,
  updateFilterApply,
  updateItemSelectionDrawerOpenFrom
} = GroupConfigurationSlice.actions;

export default GroupConfigurationSlice.reducer;
