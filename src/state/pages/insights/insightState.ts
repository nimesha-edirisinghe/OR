import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IRootState } from 'state/rootState';
import {
  DemandForecastCardDataI,
  InsightReportDataI,
  FilterDataT,
  FilterLocalScopeI,
  StoreWarehouseBtnT,
  SummaryI,
  FilterMode
} from 'types/insight';
import {
  InsightFilterRequestPayloadI,
  HotListIndicatorsT,
  RightPanelRetainDataList
} from 'types/requests/insightRequest';
import {
  FilterCountApiResponseI,
  FilterDataApiResponseI,
  KeyValueI,
  ProjectionDataI
} from 'types/responses/insightResponses';
import { HotListIndicators } from 'utils/enum';
import {
  filterOptionsInitialState,
  getMaxDate,
  getMinDate,
  rightPanelRetainDataListInitial,
  updateFilterOutOfCount
} from './stateHelpers/stH_Insight';
import { produce } from 'immer';
import _ from 'lodash';

export interface IInsight {
  isLoading: boolean;
  isInitialRequest: boolean;
  summary: SummaryI | null;
  invReportData: InsightReportDataI[] | [];
  outOfStockPercentData: InsightReportDataI[] | [];
  demandForecastReportData: InsightReportDataI[] | [];
  demandForecastCardData: DemandForecastCardDataI | null;
  benchmarkOption: string;
  projectionData: ProjectionDataI | null;
  dashboardFilter: {
    filterOptions: InsightFilterRequestPayloadI;
    immutableFilterTotalItemsCount: FilterCountApiResponseI | null;
    filterTotalItemsCount: FilterCountApiResponseI | null;
    filterLocalScope: FilterLocalScopeI;
    filterSelectAllCheckboxDisabled: boolean;
    filterItemListData: KeyValueI[] | [];
    filterType: FilterDataT;
    filterMode: FilterMode;
  };
}

export const InsightSlice = createSlice({
  name: 'insight',
  initialState: {
    isLoading: false,
    isInitialRequest: false,
    summary: {},
    invReportData: [],
    outOfStockPercentData: [],
    demandForecastReportData: [],
    demandForecastCardData: {},
    benchmarkOption: 'atDeployment',
    projectionData: {},
    dashboardFilter: {
      filterOptions: filterOptionsInitialState,
      immutableFilterTotalItemsCount: {},
      filterTotalItemsCount: {},
      filterLocalScope: {
        isOpenFilterDrawer: false,
        isOpenItemSelectionDrawer: false,
        isSelectedWarehouse: true,
        isSelectedSore: true,
        rightPanelRetainDataList: rightPanelRetainDataListInitial,
        minDate: '',
        maxDate: ''
      },
      filterSelectAllCheckboxDisabled: false,
      filterItemListData: [],
      filterType: '',
      filterMode: 'DEFAULT'
    }
  } as IInsight,
  reducers: {
    getSummaryRequest: (state) => {
      state.isLoading = true;
    },
    getSummarySuccess: (state, action) => {
      state.isLoading = false;
      state.summary = action.payload.data;
    },
    getSummaryFailure: (state) => {
      state.isLoading = false;
    },
    getInvReportDataRequest: (state) => {
      state.isLoading = true;
    },
    getInvReportDataSuccess: (state, action) => {
      state.isLoading = false;
      state.invReportData = action.payload.data;
    },
    getInvReportDataFailure: (state) => {
      state.isLoading = false;
    },
    getOutOfStockPercentDataRequest: (state) => {
      state.isLoading = true;
    },
    getOutOfStockPercentDataSuccess: (state, action) => {
      state.isLoading = false;
      state.outOfStockPercentData = action.payload.data;
    },
    getOutOfStockPercentDataFailure: (state) => {
      state.isLoading = false;
    },
    setBenchmarkOption: (
      state,
      action: {
        payload: { benchmarkOption: string };
      }
    ) => {
      state.benchmarkOption = action.payload.benchmarkOption;
    },
    getProjectionDataRequest: (state) => {
      state.isLoading = true;
    },
    getProjectionDataSuccess: (state, action) => {
      state.isLoading = false;
      state.projectionData = action.payload.data;
    },
    getProjectionDataFailure: (state) => {
      state.isLoading = false;
    },
    getDemandForecastDataRequest: {
      reducer: (
        state,
        action: PayloadAction<{
          isInitialRequest: boolean;
        }>
      ) => {
        state.isInitialRequest = action.payload.isInitialRequest;
      },
      prepare: (isInitialRequest: boolean) => {
        return {
          payload: {
            isInitialRequest
          }
        };
      }
    },
    getDemandForecastDataSuccess: (state, action) => {
      state.isLoading = false;
      state.demandForecastReportData = _.sortBy(action.payload.data, 'date');
      if (state.isInitialRequest && state.dashboardFilter.filterOptions.duration) {
        state.dashboardFilter.filterLocalScope.maxDate = getMaxDate(action.payload.data);
        state.dashboardFilter.filterLocalScope.minDate = getMinDate(action.payload.data);
        state.dashboardFilter.filterOptions.duration.startDate =
          state.dashboardFilter.filterLocalScope.minDate;
        state.dashboardFilter.filterOptions.duration.endDate =
          state.dashboardFilter.filterLocalScope.maxDate;
      }
    },
    getDemandForecastDataFailure: (state) => {
      state.isLoading = false;
    },
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
    getFilterDataRequest: (
      state,
      action: {
        payload: {
          filterType: FilterDataT;
          pageNumber: number;
          searchKey?: string;
        };
      }
    ) => {
      state.dashboardFilter.filterItemListData = [];
    },
    getFilterDataSuccess: (state, action: { payload: FilterDataApiResponseI }) => {
      const dashboardFilter = state.dashboardFilter;
      let mutableTotalCount = action.payload.totalCount;
      const filterType = dashboardFilter.filterType;

      state.dashboardFilter.filterItemListData = action.payload.list.map((obj) => {
        obj.value = `${obj.key} - ${obj.value}`;
        return obj;
      });

      updateFilterOutOfCount(
        dashboardFilter.filterLocalScope.rightPanelRetainDataList,
        filterType,
        mutableTotalCount
      );
    },
    getFilterDataFailure: (state) => {
      state.isLoading = false;
    },
    getDemandForecastCardRequest: (state) => {},
    getDemandForecastCardSuccess: (state, action) => {
      state.isLoading = false;
      state.demandForecastCardData = action.payload.data;
    },
    getDemandForecastCardFailure: (state) => {},
    getFilterCountRequest: (state) => {},
    getFilterCountSuccess: (state, action: { payload: FilterCountApiResponseI }) => {
      state.dashboardFilter.filterTotalItemsCount = action.payload;
      if (
        state.dashboardFilter.immutableFilterTotalItemsCount &&
        !Object.keys(state.dashboardFilter.immutableFilterTotalItemsCount).length
      ) {
        state.dashboardFilter.immutableFilterTotalItemsCount = action.payload;
      }
    },
    getFilterCountFailure: (state) => {},
    updateRightPanelRetainDataList: (state, action: { payload: RightPanelRetainDataList }) => {
      state.dashboardFilter.filterLocalScope.rightPanelRetainDataList = action.payload;
    },
    onUpdateFilterOptions: (state, action: { payload: InsightFilterRequestPayloadI }) => {
      state.dashboardFilter.filterOptions = action.payload;
    },
    addHotListIndicators: (state, action: PayloadAction<HotListIndicatorsT>) => {
      if (action.payload === HotListIndicators.ALL) {
        state.dashboardFilter.filterOptions.hotListIndicator = [action.payload];
      } else {
        state.dashboardFilter.filterOptions.hotListIndicator.push(action.payload);
      }
    },
    removeHotListIndicators: (state, action: PayloadAction<HotListIndicatorsT>) => {
      state.dashboardFilter.filterOptions.hotListIndicator =
        state.dashboardFilter.filterOptions.hotListIndicator.filter(
          (item) => item !== action.payload
        );
    },
    setStoreWarehouseOption: (state, action: PayloadAction<StoreWarehouseBtnT>) => {
      if (action.payload === 'store') {
        const status = !state.dashboardFilter.filterLocalScope.isSelectedSore;
        if (!status && !state.dashboardFilter.filterLocalScope.isSelectedWarehouse) return;
        state.dashboardFilter.filterLocalScope.isSelectedSore = status;
      } else {
        const status = !state.dashboardFilter.filterLocalScope.isSelectedWarehouse;
        if (!status && !state.dashboardFilter.filterLocalScope.isSelectedSore) return;
        state.dashboardFilter.filterLocalScope.isSelectedWarehouse = status;
      }
    },
    toggleSelectAll: (state, action: { payload: InsightFilterRequestPayloadI }) => {
      state.dashboardFilter.filterOptions = action.payload;
    },
    updateDashboardFilter: (state, action) => {
      state.dashboardFilter = action.payload;
    },
    resetFilter: (state, action: PayloadAction<{ filterMode: FilterMode }>) => {
      state.dashboardFilter.filterItemListData = [];
      state.dashboardFilter.filterType = '';
      state.dashboardFilter.filterMode = action.payload.filterMode;
      state.dashboardFilter.filterLocalScope.isSelectedSore = true;
      state.dashboardFilter.filterLocalScope.isSelectedWarehouse = true;
      state.dashboardFilter.filterOptions =
        filterOptionsInitialState as InsightFilterRequestPayloadI;
      state.dashboardFilter.filterLocalScope.rightPanelRetainDataList =
        filterOptionsInitialState as RightPanelRetainDataList;
    }
  }
});
export const insightSliceSelector = (state: IRootState) => state.insight;

export const {
  getSummaryRequest,
  getSummarySuccess,
  getSummaryFailure,
  getInvReportDataRequest,
  getInvReportDataSuccess,
  getInvReportDataFailure,
  getOutOfStockPercentDataRequest,
  getOutOfStockPercentDataSuccess,
  getOutOfStockPercentDataFailure,
  setBenchmarkOption,
  getProjectionDataRequest,
  getProjectionDataSuccess,
  getProjectionDataFailure,
  getDemandForecastDataRequest,
  getDemandForecastDataSuccess,
  getDemandForecastDataFailure,
  closeFilterDrawer,
  openFilterDrawer,
  closeFilterItemsDrawer,
  openFilterItemsDrawer,
  getFilterDataRequest,
  getFilterDataSuccess,
  getFilterDataFailure,
  getDemandForecastCardRequest,
  getDemandForecastCardSuccess,
  getDemandForecastCardFailure,
  updateRightPanelRetainDataList,
  onUpdateFilterOptions,
  getFilterCountRequest,
  getFilterCountSuccess,
  getFilterCountFailure,
  addHotListIndicators,
  removeHotListIndicators,
  setStoreWarehouseOption,
  toggleSelectAll,
  updateDashboardFilter,
  resetFilter
} = InsightSlice.actions;

export default InsightSlice.reducer;
