import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IRootState } from 'state/rootState';
import {
  rightPanelRetainDataListInitial,
  updateFilterOutOfCount
} from './stateHelpers/stH_ActivityLog';
import {
  ActivityLogDataI,
  ActivityLogDataList,
  ActivityLogFilterT,
  ActivityLogLocalScopeI,
  ActivityLogSummaryDataI,
  FilterDateContentI,
  FilterItemContentI,
  FilterLocalScopeI,
  RightPanelRetainDataList
} from 'types/activityLog';
import {
  ActivityLogFilterCountApiResponseI,
  ActivityLogFilterDataApiResponseI,
  ActivityLogFilterGroupDataApiResponseI
} from 'types/responses/activityLogResponses';
import { KeyValueI } from 'types/responses/insightResponses';
import { format } from 'date-fns';

export interface IActivityLogSlice {
  isLoading: boolean;
  isSummaryLoading: boolean;
  jobSummary: ActivityLogSummaryDataI | null;
  selectedRow: ActivityLogDataList | null;
  dashboardFilter: {
    filterTotalItemsCount: ActivityLogFilterCountApiResponseI;
    filterLocalScope: FilterLocalScopeI;
    filterSelectAllCheckboxDisabled: boolean;
    filterItemListData: KeyValueI[] | [];
    filterType: ActivityLogFilterT;
  };
  localScope: ActivityLogLocalScopeI;
  activityLogListData: ActivityLogDataI;
  lastUpdatedDateTime: string;
}

export const ActivityLogSlice = createSlice({
  name: 'activityLog',
  initialState: {
    isLoading: false,
    isSummaryLoading: false,
    jobSummary: null,
    selectedRow: null,
    dashboardFilter: {
      filterTotalItemsCount: {},
      filterLocalScope: {
        isOpenFilterDrawer: false,
        isOpenItemSelectionDrawer: false,
        rightPanelRetainDataList: rightPanelRetainDataListInitial
      },
      filterSelectAllCheckboxDisabled: false,
      filterItemListData: [],
      filterType: ''
    },
    localScope: {
      ascendingSort: true,
      currentPageNumber: 1,
      searchKey: ''
    },
    activityLogListData: {
      totalCount: 0,
      list: []
    },
    lastUpdatedDateTime: new Date().toISOString()
  } as IActivityLogSlice,
  reducers: {
    closeFilterDrawer: (state) => {
      state.dashboardFilter.filterLocalScope.isOpenFilterDrawer = false;
    },
    openFilterDrawer: (state) => {
      state.dashboardFilter.filterLocalScope.isOpenFilterDrawer = true;
    },
    closeFilterItemsDrawer: (state) => {
      state.dashboardFilter.filterLocalScope.isOpenItemSelectionDrawer = false;
    },
    openFilterItemsDrawer: (state) => {
      state.dashboardFilter.filterLocalScope.isOpenItemSelectionDrawer = true;
    },
    toggleFilterDateDrawer: (
      state,
      action: PayloadAction<{
        status: boolean;
      }>
    ) => {
      state.dashboardFilter.filterLocalScope.isOpenFilterDateSelectionDrawer =
        action.payload.status;
    },
    getFilterDataRequest: (
      state,
      action: {
        payload: {
          filterType: ActivityLogFilterT;
          pageNumber: number;
          searchKey?: string;
        };
      }
    ) => {
      state.dashboardFilter.filterItemListData = [];
    },
    getFilterDataSuccess: (
      state,
      action: {
        payload: ActivityLogFilterDataApiResponseI | ActivityLogFilterGroupDataApiResponseI;
      }
    ) => {
      const dashboardFilter = state.dashboardFilter;
      let mutableTotalCount = action.payload.totalCount;
      const filterType = dashboardFilter.filterType;

      if (filterType === 'group') {
        state.dashboardFilter.filterItemListData = (action.payload.list as KeyValueI[]).map(
          (obj) => {
            obj.value = `${obj.key} - ${obj.value}`;
            return obj;
          }
        );
      } else {
        state.dashboardFilter.filterItemListData = (action.payload.list as string[]).map(
          (item, key) => {
            const obj = {} as KeyValueI;
            obj.key = item;
            obj.value = item;
            return obj;
          }
        );
      }

      updateFilterOutOfCount(
        dashboardFilter.filterLocalScope.rightPanelRetainDataList,
        filterType,
        mutableTotalCount
      );
    },
    getFilterDataFailure: (state) => {},
    getFilterCountRequest: (state) => {},
    getFilterCountSuccess: (state, action: { payload: ActivityLogFilterCountApiResponseI }) => {
      state.dashboardFilter.filterTotalItemsCount = action.payload;
    },
    getFilterCountFailure: (state) => {},
    updateRightPanelRetainDataList: (state, action: { payload: RightPanelRetainDataList }) => {
      state.dashboardFilter.filterLocalScope.rightPanelRetainDataList = action.payload;
    },
    updateDashboardFilter: (state, action) => {
      state.dashboardFilter = action.payload;
    },
    resetFilter: (state) => {
      state.dashboardFilter.filterItemListData = [];
      state.dashboardFilter.filterLocalScope.rightPanelRetainDataList =
        rightPanelRetainDataListInitial as RightPanelRetainDataList;
    },
    getActivityLogListRequest: (
      state,
      action: PayloadAction<{ search?: string; pageNumber?: number; ascendingSort?: boolean }>
    ) => {
      const search: string | undefined = action.payload.search;
      if (search) {
        state.dashboardFilter.filterLocalScope.rightPanelRetainDataList.activity.search = search;
      }
      state.isLoading = true;
      state.localScope.currentPageNumber = action.payload.pageNumber;
    },
    getActivityLogListSuccess: (state, action: { payload: ActivityLogDataI }) => {
      state.activityLogListData = action.payload;
      state.activityLogListData.list.map((item) => {
        item.groupName = `${item.groupKey} - ${item.groupName}`;
        return item;
      });
      state.isLoading = false;
    },
    getActivityLogListFailure: (state) => {
      state.isLoading = false;
    },
    updateLastUpdatedDateTime: (state) => {
      state.lastUpdatedDateTime = format(new Date(), 'yyyy-MM-dd hh:mm a');
    },
    setCurrentPageNumber: (state, action: PayloadAction<number>) => {
      state.localScope.currentPageNumber = action.payload;
    },
    closeFilteredItems: (state, action: PayloadAction<keyof RightPanelRetainDataList>) => {
      if (action.payload === 'date') {
        const dateItem: FilterDateContentI =
          state.dashboardFilter.filterLocalScope.rightPanelRetainDataList[action.payload];
        dateItem.dateType = '1';
        dateItem.endDate = null;
        dateItem.startDate = null;
      } else {
        const filterItem: FilterItemContentI =
          state.dashboardFilter.filterLocalScope.rightPanelRetainDataList[action.payload];
        filterItem.selectedItems = [];
        filterItem.isSelectAll = false;
        filterItem.outOfCount = 0;
      }
    },
    getActivityLogSummaryRequest: (state, action: PayloadAction<{ rowId: number }>) => {
      state.isSummaryLoading = true;
      state.selectedRow = state.activityLogListData.list.find(
        (logData) => logData.jobGroupId === action.payload.rowId
      )! as ActivityLogDataList;
    },
    getActivityLogSummarySuccess: (state, action: PayloadAction<ActivityLogSummaryDataI>) => {
      state.isSummaryLoading = false;
      state.jobSummary = action.payload;
    },
    getActivityLogSummaryFailure: (state) => {
      state.isSummaryLoading = false;
    },
    clearActivityLogSummary: (state) => {
      state.jobSummary = null;
      state.selectedRow = null;
    },
    setAlgoExecutionSearchKey: (state, action: PayloadAction<string>) => {
      state.localScope.searchKey = action.payload;
    }
  }
});
export const activityLogSliceSelector = (state: IRootState) => state.activityLog;

export const {
  closeFilterDrawer,
  openFilterDrawer,
  closeFilterItemsDrawer,
  openFilterItemsDrawer,
  getFilterDataRequest,
  getFilterDataSuccess,
  getFilterDataFailure,
  updateRightPanelRetainDataList,
  getFilterCountRequest,
  getFilterCountSuccess,
  getFilterCountFailure,
  updateDashboardFilter,
  resetFilter,
  getActivityLogListRequest,
  getActivityLogListSuccess,
  getActivityLogListFailure,
  toggleFilterDateDrawer,
  updateLastUpdatedDateTime,
  setCurrentPageNumber,
  closeFilteredItems,
  getActivityLogSummaryRequest,
  getActivityLogSummarySuccess,
  getActivityLogSummaryFailure,
  clearActivityLogSummary,
  setAlgoExecutionSearchKey
} = ActivityLogSlice.actions;

export default ActivityLogSlice.reducer;
