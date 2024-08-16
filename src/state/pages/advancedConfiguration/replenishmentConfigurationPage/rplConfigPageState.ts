import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReplenishmentConfigTableAction } from 'components/AppTable/TableDataMapping/ReplenishmentConfigTable';
import { ConfigType } from 'pages/AdvancedConfiguration/ReplenishmentConfiguration/PlanningConfigDrawer/ConfigTypeSelection';

import { IRootState } from 'state/rootState';
import { FCEstimatedTimeI } from 'types/forecastConfig';
import { ReplenishmentConfigLocalI, RplConfigTableDataI } from 'types/replenishmentConfig';

export interface IReplenishmentConfigPage {
  selectedRowId: string;
  isLoading: boolean;
  rplConfigTableData?: RplConfigTableDataI[] | [] | null;
  totalRecordsCount?: number;
  estimatedTime: FCEstimatedTimeI | null;
  rplPlanningConfigLocalScope: ReplenishmentConfigLocalI;
}

export const ReplenishmentConfigPageSlice = createSlice({
  name: 'rplConfigPage',
  initialState: {
    selectedRowId: '',
    isLoading: false,
    rplConfigTableData: [],
    totalRecordsCount: 0,
    estimatedTime: {},
    rplPlanningConfigLocalScope: {
      planningConfigDrawer: false,
      planningRunNowDrawer: false,
      planningScheduleDrawer: false,
      selectedPlaningObj: {},
      selectedPlanningPeriod: 'Select',
      currentPageNo: 1
    }
  } as IReplenishmentConfigPage,
  reducers: {
    rplTableCellAction: (
      state,
      action: PayloadAction<{
        actionType: ReplenishmentConfigTableAction;
        rawId: string;
      }>
    ) => {
      const _action = action.payload.actionType;
      switch (_action) {
        case 'openPlanningConfigDrawer':
          state.rplPlanningConfigLocalScope.planningConfigDrawer = true;
          break;
        case 'openRplRunNowDrawer':
          state.rplPlanningConfigLocalScope.planningRunNowDrawer = true;
          break;
        case 'openRplJobScheduleDrawer':
          state.rplPlanningConfigLocalScope.planningScheduleDrawer = true;
          break;
      }
      state.selectedRowId = action.payload.rawId;
      const _selectedRowObj = state.rplConfigTableData?.find(
        (row) => row.uuid === action.payload.rawId
      );
      state.rplPlanningConfigLocalScope.selectedPlaningObj = _selectedRowObj!;
    },
    closeRplDrawer: (state) => {
      state.rplPlanningConfigLocalScope.planningConfigDrawer = false;
      state.rplPlanningConfigLocalScope.planningRunNowDrawer = false;
      state.rplPlanningConfigLocalScope.planningScheduleDrawer = false;
    },
    getReplenishmentConfigDataRequest: (
      state,
      action: PayloadAction<{ pageNo?: number; searchKey?: string }>
    ) => {
      state.isLoading = true;
    },
    getReplenishmentConfigDataSuccess: (state, action) => {
      state.isLoading = false;
      state.rplConfigTableData = action.payload.data;
      state.rplConfigTableData?.map((item) => {
        item.groupDisplayName = `${item.groupKey} - ${item.groupName}`;
        return item;
      });
      state.totalRecordsCount = action.payload.page ? action.payload.page.total : null;
    },
    getReplenishmentConfigDataFailure: (state) => {},
    saveRplPlanningPeriodRequest: (state) => {},
    saveRplPlanningPeriodSuccess: (state, action) => {
      state.isLoading = false;
    },
    saveRplPlanningPeriodFailure: () => {},
    setSelectedPlanningPeriod: (state, action: PayloadAction<{ planningPeriod: ConfigType }>) => {
      state.rplPlanningConfigLocalScope.selectedPlanningPeriod = action.payload.planningPeriod;
      state.rplPlanningConfigLocalScope.selectedPlaningObj.planningPeriod = Number(
        action.payload.planningPeriod.split(' ')[0]
      );
    },
    setSelectedPlanningObj: (state) => {
      const _selectedConfigObj = state.rplConfigTableData?.find(
        (row) => row.uuid === state.selectedRowId
      );
      state.rplPlanningConfigLocalScope.selectedPlaningObj = _selectedConfigObj!;
    },
    executePlanningRunNowRequest: (state, action) => {
      state.isLoading = true;
    },
    executePlanningRunNowSuccess: (state, action) => {
      state.isLoading = false;
    },
    executePlanningRunNowFailure: (state) => {
      state.isLoading = false;
    },
    getPlanningEstimatedTimeRequest: (state, action) => {},
    getPlanningEstimatedTimeSuccess: (state, action) => {
      state.estimatedTime = action.payload.data;
    },
    getPlanningEstimatedTimeFailure: (state) => {},
    setRplConfigCurrentPage: (state, action: PayloadAction<number>) => {
      state.rplPlanningConfigLocalScope.currentPageNo = action.payload;
    }
  }
});

export const rplConfigPageSliceSelector = (state: IRootState) => state.rplConfigPage;

export const {
  rplTableCellAction,
  closeRplDrawer,
  getReplenishmentConfigDataRequest,
  getReplenishmentConfigDataSuccess,
  getReplenishmentConfigDataFailure,
  saveRplPlanningPeriodRequest,
  saveRplPlanningPeriodSuccess,
  saveRplPlanningPeriodFailure,
  setSelectedPlanningPeriod,
  setSelectedPlanningObj,
  executePlanningRunNowRequest,
  executePlanningRunNowSuccess,
  executePlanningRunNowFailure,
  getPlanningEstimatedTimeRequest,
  getPlanningEstimatedTimeSuccess,
  getPlanningEstimatedTimeFailure,
  setRplConfigCurrentPage
} = ReplenishmentConfigPageSlice.actions;

export default ReplenishmentConfigPageSlice.reducer;
