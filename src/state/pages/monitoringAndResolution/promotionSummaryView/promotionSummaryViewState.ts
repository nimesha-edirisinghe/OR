import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRootState } from "state/rootState";
import {
    PromotionSummaryViewSkuListItemI,
    PromotionSummaryViewSkuResponseDataI
} from "types/responses/promotionSummaryViewResponse";
import {
    PromotionSummaryLoadingI,
    PromotionSummaryViewLocalScopeI
} from "types/promotionSummaryView";
import { getTableColumnWidth } from "./stateHelpers/stH_PromotionSummaryViewState";
import { TableHeader } from 'types/responses/viewResponses';
import { format } from "date-fns";

export interface IPromotionSummaryView {
    loading: PromotionSummaryLoadingI;
    lastUpdatedDateTime: string;
    skuListData: PromotionSummaryViewSkuResponseDataI | null;
    selectedSkuList: PromotionSummaryViewSkuListItemI[];
    promotionSummaryViewLocalScope: PromotionSummaryViewLocalScopeI;
}
  
export const PromotionSummaryViewSlice = createSlice({
    name: 'promotionSummaryView',
    initialState: {
        loading: {
            skuDataLoading: false,
            download: false,
        },
        lastUpdatedDateTime: new Date().toISOString(),
        skuListData: null,
        selectedSkuList: [],
        promotionSummaryViewLocalScope: {
            skuSearchKey: '',
            pageNumber: 1
        }
    } as IPromotionSummaryView,
    reducers: {
        resetPromotionSummaryData: (state) => {
            state.skuListData = null;
        },
        setPromotionSummarySearchKey: (state, action: PayloadAction<string>) => {
            state.promotionSummaryViewLocalScope.skuSearchKey = action.payload;
        },
        getPromotionSummaryDataRequest: (state) => {
            state.loading.skuDataLoading = true;
            state.lastUpdatedDateTime = format(new Date(), 'yyyy-MM-dd hh:mm a');
        },
        getPromotionSummaryDataRequestSuccess: (state, action: PayloadAction<PromotionSummaryViewSkuResponseDataI>) => {
            state.skuListData = {
                ...action.payload,
                headers: Object.entries(action.payload.headers).map((header, index) => {
                  let a: TableHeader  = {
                        displayValue: header[1],
                        key: header[0],
                        w: getTableColumnWidth(index)
                    };
                    return a;
                }),
                list: action.payload.list.map((item) => ({
                  ...item
                }))
              };
            state.loading.skuDataLoading = false;
        },
        getPromotionSummaryDataRequestFailure: (state) => {
            state.loading.skuDataLoading = false;
        },
        setPromotionSummaryPaginationPageNo: (state, action: PayloadAction<number>) => {
            state.promotionSummaryViewLocalScope.pageNumber = action.payload;
        },
        downloadPromotionSummaryDataRequest: (
            state,
            action: PayloadAction<{
              fileName: string;
            }>
          ) => {
            state.loading.download = true;
        },
        downloadPromotionSummaryDataSuccess: (state) => {
            state.loading.download = false;
        },
        downloadPromotionSummaryDataFailure: (state) => {
            state.loading.download = false;
        },
    }
});

export const promotionSummaryViewSliceSelector = (state: IRootState) => state.promotionSummaryView;

export const {
    resetPromotionSummaryData,
    setPromotionSummarySearchKey,
    getPromotionSummaryDataRequest,
    getPromotionSummaryDataRequestSuccess,
    getPromotionSummaryDataRequestFailure,
    setPromotionSummaryPaginationPageNo,
    downloadPromotionSummaryDataRequest,
    downloadPromotionSummaryDataSuccess,
    downloadPromotionSummaryDataFailure
} = PromotionSummaryViewSlice.actions;

export default PromotionSummaryViewSlice.reducer;
