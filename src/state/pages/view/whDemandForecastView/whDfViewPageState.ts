import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRootState } from 'state/rootState';
import {
  DemandForecastChartResponseDataI,
  DemandForecastSkuResponseDataI,
  DemandForecastSkuListItem,
  DFPredictorI
} from 'types/responses/viewResponses';
import {
  DateRange,
  DemandForecastChartTable,
  demandForecastChartType,
  DemandForecastLoadingI,
  dfViewLocalScopeI
} from 'types/view';
import { getSelectedChartName, getTableColumnWidth } from './stateHelpers/stH_DfView';
import { InfluencingFactorTypes } from 'types/groupConfig';

export interface IWhDFView {
  isLoading: boolean;
  loading: DemandForecastLoadingI;
  graphData: DemandForecastChartResponseDataI[] | [];
  graphDateRange: DateRange | null | undefined;
  skuListData: DemandForecastSkuResponseDataI | null;
  gridSkuListData: DemandForecastSkuResponseDataI | null;
  selectedSkuList: DemandForecastSkuListItem[];
  selectedSku: DemandForecastSkuListItem | null;
  aggregateOption: {
    selectedAggregateOption: demandForecastChartType;
    compareSelection: string | null;
    predictorType: InfluencingFactorTypes | null;
  };
  selectedChartType: demandForecastChartType;
  dfViewLocalScope: dfViewLocalScopeI;
  dfTable: DemandForecastChartTable | null;
  predictorList: DFPredictorI | null;
}

export const DFViewSlice = createSlice({
  name: 'whDfView',
  initialState: {
    isLoading: false,
    loading: {
      skuDataLoading: false,
      graphDataLoading: true,
      download: false
    },
    skuListData: null,
    selectedSkuList: [],
    selectedSku: null,
    aggregateOption: {
      selectedAggregateOption: 'sku',
      compareSelection: null,
      predictorType: null
    },
    selectedChartType: 'sku',
    graphData: [],
    graphDateRange: null,
    dfViewLocalScope: {
      skuSearchKey: '',
      globalSkuSelected: false,
      shouldReloadData:false,
    },
    dfTable: null,
    predictorList: null,
    gridSkuListData:null
  } as IWhDFView,
  reducers: {
    downloadForecastReportRequest: (state) => {
      state.isLoading = true;
    },
    downloadForecastReportSuccess: (state, action) => {
      state.isLoading = false;
    },
    downloadForecastReportFailure: (state) => {
      state.isLoading = false;
    },
    demandForecastChartRequest: (
      state,
      action: PayloadAction<{ chartType: demandForecastChartType }>
    ) => {
      state.loading.graphDataLoading = false;
      state.selectedChartType = action.payload.chartType;
    },
    demandForecastChartRequestSuccess: (
      state,
      action: PayloadAction<DemandForecastChartResponseDataI[]>
    ) => {
      state.graphData = action.payload;
      const _selectedCName = getSelectedChartName(state.selectedChartType)!;
      let dfTable: DemandForecastChartTable = {
        headers: [{ displayValue: '', key: 'Label', w: 150 }],
        skuForecast: state.selectedChartType !== 'aggregate' ? ['SKU Forecast'] : [],
        compareForecast: [_selectedCName]
      };
      action.payload.forEach((graphData) => {
        dfTable.headers.push({ displayValue: graphData.date, key: graphData.date, w: 150 });

        const skuForecast = graphData.skuActual ? graphData.skuActual : graphData.skuProjected || 0;
        const compareForecast = graphData.compareActual
          ? graphData.compareActual
          : graphData.compareProjected || 0;

        if (state.selectedChartType !== 'aggregate') dfTable.skuForecast.push(skuForecast!);
        dfTable.compareForecast.push(compareForecast!);
      });
      state.dfTable = dfTable;
      state.loading.graphDataLoading = true;
    },
    demandForecastChartRequestFailure: (state) => {
      state.loading.graphDataLoading = true;
    },
    getDemandForecastDataRequest: (state, action: PayloadAction<{ searchKey?: string }>) => {
      state.loading.skuDataLoading = true;
    },
    getDemandForecastDataSuccess: (
      state,
      action: PayloadAction<DemandForecastSkuResponseDataI>
    ) => {
      state.loading.skuDataLoading = false;
      state.gridSkuListData = {
        ...action.payload,
        headers: Object.entries(action.payload.headers).map((header, index) => {
          return {
            displayValue: header[1],
            key: header[0],
            w: getTableColumnWidth(index)
          };
        }),
        list: action.payload.list.map((item) => ({
          ...item,
          isSelected: false
        }))
      };
    },
    getDemandForecastDataFailure: (state) => {
      state.loading.skuDataLoading = false;
    },
    updateSkuListSelectedStatus: (state, action: PayloadAction<{ id: number; type?: string }>) => {
      const { id, type } = action.payload;
      if (type === 'all') {
        if (state.skuListData) {
          state.dfViewLocalScope.globalSkuSelected = !state.dfViewLocalScope.globalSkuSelected;
          state.skuListData.list.forEach((item) => {
            item.isSelected = state.dfViewLocalScope.globalSkuSelected ? true : false;
          });
        }
      } else {
        if (state.skuListData) {
          state.skuListData.list = state.skuListData.list.map((item) =>
            item.anchorProdKey === id ? { ...item, isSelected: !item.isSelected } : item
          );
        }
      }
    },
    downloadDemandForecastReportRequest: (
      state,
      action: PayloadAction<{
        fileName: string;
      }>
    ) => {
      state.loading.download = true;
    },
    downloadDemandForecastReportSuccess: (state) => {
      state.loading.download = false;
    },
    downloadDemandForecastReportFailure: (state) => {
      state.loading.download = false;
    },
    addOrRemoveFromSelectedSkuList: (
      state,
      action: PayloadAction<{
        data?: DemandForecastSkuListItem;
        selectedType: 'all' | '';
        isSelectedAll?: boolean;
      }>
    ) => {
      const { data, selectedType } = action.payload;
      if (selectedType !== 'all' && data) {
        const existingIndex = state.selectedSkuList?.findIndex(
          (item) => item.anchorProdKey === data.anchorProdKey
        );

        if (existingIndex !== -1) {
          state.selectedSkuList?.splice(existingIndex!, 1);
        } else {
          state.selectedSkuList?.push(data);
        }
        state.dfViewLocalScope.globalSkuSelected =
          state.selectedSkuList?.length == state.skuListData?.list.length;
      } else {
        if (state.dfViewLocalScope.globalSkuSelected) {
          const listData = state.skuListData?.list;
          state.selectedSkuList = listData!;
        } else {
          state.selectedSkuList = [];
        }
      }
    },
    skuSearchAction: (state, action: PayloadAction<string>) => {
      state.dfViewLocalScope.skuSearchKey = action.payload;
    },
    setSelectedSkuAction: (state, action: PayloadAction<number>) => {
      const currentIndex = action.payload;
      state.selectedSku = state.selectedSkuList ? state.selectedSkuList[currentIndex] : null;
    },
    setAggregateOption: (
      state,
      action: PayloadAction<{
        type: string;
        item: string;
        predictorType?: InfluencingFactorTypes;
      }>
    ) => {
      const { type, item, predictorType } = action.payload;
      if (type === 'history') {
        state.aggregateOption.compareSelection = item;
        state.aggregateOption.selectedAggregateOption = 'history';
        state.aggregateOption.predictorType = null;
      } else if (type === 'influencingFactor') {
        state.aggregateOption.selectedAggregateOption = 'influencingFactor';
        state.aggregateOption.compareSelection = item;
        state.aggregateOption.predictorType = predictorType || null;
      } else {
        state.aggregateOption.selectedAggregateOption = item as demandForecastChartType;
        state.aggregateOption.compareSelection = null;
        state.aggregateOption.predictorType = null;
      }
    },
    updateGraphDateRange: (state, action: PayloadAction<DateRange>) => {
      state.graphDateRange = action.payload;
    },
    resetViewForecastRightPanel: (state) => {
      state.aggregateOption.selectedAggregateOption = 'sku';
      state.selectedSku = null;
      state.selectedSkuList = [];
      state.graphData = [];
      state.graphDateRange = null;
    },
    getPredictorsRequest: (state) => {},
    getPredictorsSuccess: (state, action: PayloadAction<DFPredictorI>) => {
      state.predictorList = action.payload;
    },
    getPredictorsFailure: (state) => {},
    getDemandForecastSkuListRequest: (state, action: PayloadAction<{ searchKey?: string }>) => {
      state.loading.skuDataLoading = true;
      state.selectedSkuList = [];
    },
    getDemandForecastSkuListSuccess: (
      state,
      action: PayloadAction<DemandForecastSkuResponseDataI>
    ) => {
      state.loading.skuDataLoading = false;
      state.skuListData = {
        ...action.payload,
        headers: Object.entries(action.payload.headers).map((header, index) => {
          return {
            displayValue: header[1],
            key: header[0],
            w: getTableColumnWidth(index)
          };
        }),
        list: action.payload.list.map((item) => ({
          ...item,
          isSelected: false
        }))
      };
    },
    getDemandForecastSkuListFailure: (state) => {
      state.loading.skuDataLoading = false;
    },
    whDemandResetSkuListData: (state) => {
      state.skuListData = null;
    },
    updateShouldReloadData: (state, action: PayloadAction<boolean>) => {
      state.dfViewLocalScope.shouldReloadData = action.payload;
    }
  }
});

export const whDfViewSliceSelector = (state: IRootState) => state.dfWhView;

export const {
  downloadForecastReportRequest,
  downloadForecastReportSuccess,
  downloadForecastReportFailure,
  demandForecastChartRequest,
  demandForecastChartRequestSuccess,
  demandForecastChartRequestFailure,
  getDemandForecastDataRequest,
  getDemandForecastDataSuccess,
  getDemandForecastDataFailure,
  updateSkuListSelectedStatus,
  downloadDemandForecastReportRequest,
  downloadDemandForecastReportSuccess,
  downloadDemandForecastReportFailure,
  addOrRemoveFromSelectedSkuList,
  skuSearchAction,
  setSelectedSkuAction,
  setAggregateOption,
  resetViewForecastRightPanel,
  updateGraphDateRange,
  getPredictorsRequest,
  getPredictorsSuccess,
  getPredictorsFailure,
  getDemandForecastSkuListRequest,
  getDemandForecastSkuListSuccess,
  getDemandForecastSkuListFailure,
  whDemandResetSkuListData,
  updateShouldReloadData
} = DFViewSlice.actions;

export default DFViewSlice.reducer;
