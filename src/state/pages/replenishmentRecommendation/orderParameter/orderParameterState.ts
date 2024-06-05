import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { format } from 'date-fns';
import { IRootState } from 'state/rootState';
import {
  OrderParameterLocalScopeI,
  SummaryDataLoadingI
} from 'types/replenishmentRecommendation/orderParameter';
import { RplParameterSummaryResponseI } from 'types/responses/replenishmentRecommendation/orderParameter';

export interface IOrderParameter {
  loading: SummaryDataLoadingI;
  summaryData: RplParameterSummaryResponseI | null;
  lastUpdatedDateTime: string;
  orderParameterLocalScope: OrderParameterLocalScopeI;
}

export const OrderParameterSlice = createSlice({
  name: 'orderParameter',
  initialState: {
    loading: {
      summaryData: false,
      downloadSummary: false
    },
    summaryData: null,
    lastUpdatedDateTime: new Date().toISOString(),
    orderParameterLocalScope: {
      searchKey: '',
      currentPageNo: 1
    }
  } as IOrderParameter,
  reducers: {
    getRplParameterSummaryRequest: (state) => {
      state.loading.summaryData = true;
      state.lastUpdatedDateTime = format(new Date(), 'yyyy-MM-dd hh:mm a');
    },
    getRplParameterSummarySuccess: (state, action: PayloadAction<RplParameterSummaryResponseI>) => {
      state.loading.summaryData = false;
      state.summaryData = action.payload;
    },
    getRplParameterSummaryFailure: (state) => {
      state.loading.summaryData = false;
    },
    setOrderParameterSearchKey: (state, action: PayloadAction<string>) => {
      state.orderParameterLocalScope.searchKey = action.payload;
    },
    setOrderParameterCurrentPageNo: (state, action: PayloadAction<number>) => {
      state.orderParameterLocalScope.currentPageNo = action.payload;
    },
    downloadRplParameterSummaryRequest: (state, action: PayloadAction<{ fileName?: string }>) => {
      state.loading.downloadSummary = true;
    },
    downloadRplParameterSummarySuccess: (state) => {
      state.loading.downloadSummary = false;
    },
    downloadRplParameterSummaryFailure: (state) => {
      state.loading.downloadSummary = false;
    },
    resetOrderSummaryData: (state) => {
      state.summaryData = null;
    }
  }
});

export const orderParameterSliceSelector = (state: IRootState) => state.orderParameter;

export const {
  getRplParameterSummaryRequest,
  getRplParameterSummarySuccess,
  getRplParameterSummaryFailure,
  setOrderParameterSearchKey,
  setOrderParameterCurrentPageNo,
  downloadRplParameterSummaryRequest,
  downloadRplParameterSummaryFailure,
  downloadRplParameterSummarySuccess,
  resetOrderSummaryData
} = OrderParameterSlice.actions;

export default OrderParameterSlice.reducer;
