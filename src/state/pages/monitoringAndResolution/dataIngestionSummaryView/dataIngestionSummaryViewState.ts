import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRootState } from 'state/rootState';
import { GetDataIngestionSummaryI } from 'types/responses/dataIngestionSummaryResponses';
import {
  DataIngestionSummaryViewLoadingI,
  DataIngestionSummaryViewLocalScopeI
} from 'types/dataIngestionSummaryView';
import { format } from 'date-fns';

export interface IDataIngestionSummaryView {
  loading: DataIngestionSummaryViewLoadingI;
  lastUpdateDataTime: string;
  dataIngestionSummaryViewDataInfo: GetDataIngestionSummaryI | null;
  dataIngestionSummaryViewLocalScope: DataIngestionSummaryViewLocalScopeI;
}

export const DataIngestionSummaryViewSlice = createSlice({
  name: 'dataIngestionSummaryView',
  initialState: {
    loading: {
      dataIngestionSummaryDataLoading: false
    },
    lastUpdateDataTime: new Date().toISOString(),
    dataIngestionSummaryViewDataInfo: null,
    dataIngestionSummaryViewLocalScope: {
      searchKey: '',
      pageNumber: 1
    }
  } as IDataIngestionSummaryView,
  reducers: {
    getDataIngestionSummaryViewDataRequest: (state) => {
      state.loading.dataIngestionSummaryDataLoading = true;
      state.lastUpdateDataTime = format(new Date(), 'yyyy-MM-dd hh:mm a');
    },
    getDataIngestionSummaryViewDataSuccess: (
      state,
      action: PayloadAction<GetDataIngestionSummaryI>
    ) => {
      state.dataIngestionSummaryViewDataInfo = {
        ...action.payload
      };
      state.loading.dataIngestionSummaryDataLoading = false;
    },
    getDataIngestionSummaryViewDataFailure: (state) => {
      state.loading.dataIngestionSummaryDataLoading = false;
    },
    setDataIngestionSummaryPaginationAction: (state, action: PayloadAction<number>) => {
      state.dataIngestionSummaryViewLocalScope.pageNumber = action.payload;
    },
    setDataIngestionSummarySearchKey: (state, action: PayloadAction<string>) => {
      state.dataIngestionSummaryViewLocalScope.searchKey = action.payload;
    }
  }
});

export const summaryViewSliceSelector = (state: IRootState) => state.dataIngestionSummaryView;

export const {
  getDataIngestionSummaryViewDataRequest,
  getDataIngestionSummaryViewDataSuccess,
  getDataIngestionSummaryViewDataFailure,
  setDataIngestionSummaryPaginationAction,
  setDataIngestionSummarySearchKey
} = DataIngestionSummaryViewSlice.actions;

export default DataIngestionSummaryViewSlice.reducer;
