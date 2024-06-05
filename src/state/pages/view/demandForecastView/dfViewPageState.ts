import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRootState } from 'state/rootState';
import {
  DemandForecastChartResponseDataI,
  DemandForecastSkuResponseDataI,
  DemandForecastSkuListItem,
  DFPredictorI,
  GetUploadHistoryResponseI
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
import { format } from 'date-fns';
import { TrainingSummaryDataResponseI } from 'types/responses/trainingSummaryResponse';

export interface IDFView {
  isLoading: boolean;
  loading: DemandForecastLoadingI;
  fileUploadError: string;
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
  uploadedHistory: GetUploadHistoryResponseI | null;
  lastUpdatedDateTime: string;
  trainingSummaryData: TrainingSummaryDataResponseI | null;
  isGraphPanelOpen: boolean;
  isTrainingSummaryPanelOpen: boolean;
}

export const DFViewSlice = createSlice({
  name: 'dfView',
  initialState: {
    isLoading: false,
    loading: {
      skuDataLoading: false,
      graphDataLoading: true,
      download: false,
      bulkEditDownload: false,
      historyTableLoading: false
    },
    fileUploadError: '',
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
      uploadPercentage: null,
      uploadHistorySearchKey: '',
      shouldReloadData: false
    },
    dfTable: null,
    predictorList: null,
    uploadedHistory: null,
    lastUpdatedDateTime: new Date().toISOString(),
    trainingSummaryData: null,
    isGraphPanelOpen: false,
    isTrainingSummaryPanelOpen: false,
    gridSkuListData:null
  } as IDFView,
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
      const _selectedCName = getSelectedChartName(
        state.selectedChartType,
        state.aggregateOption,
        state.predictorList
      )!;

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
    bulkEditFileUploadRequest: (
      state,
      action: PayloadAction<{
        file: File;
        uploadPercentageCallback: (percentage: number) => void;
      }>
    ) => {
      state.fileUploadError = '';
    },
    bulkEditFileUploadSuccess: (state) => {},
    bulkEditFileUploadFailure: (state) => {},
    updateUploadProgress: (state, action: PayloadAction<number>) => {
      state.dfViewLocalScope.uploadPercentage = action.payload;
    },
    downloadBulkEditForecastRequest: (
      state,
      action: PayloadAction<{
        fileName: string;
        searchKey?: string;
      }>
    ) => {
      state.loading.bulkEditDownload = true;
    },
    downloadBulkEditForecastSuccess: (state) => {
      state.loading.bulkEditDownload = false;
    },
    downloadBulkEditForecastFailure: (state) => {
      state.loading.bulkEditDownload = false;
    },
    updateBulkUploadError: (state, action: PayloadAction<string>) => {
      state.fileUploadError = action.payload;
    },
    getUploadHistoryDataRequest: (
      state,
      action: PayloadAction<{
        searchKey?: string;
        pageNumber?: number;
      }>
    ) => {
      state.loading.historyTableLoading = true;
      state.lastUpdatedDateTime = format(new Date(), 'yyyy-MM-dd hh:mm a');
    },
    getUploadHistoryDataSuccess: (state, action: PayloadAction<GetUploadHistoryResponseI>) => {
      state.loading.historyTableLoading = false;
      state.uploadedHistory = action.payload;
    },
    getUploadHistoryDataFailure: (state) => {
      state.loading.historyTableLoading = false;
    },
    downloadBulkForecastEditResultRequest: (
      state,
      action: PayloadAction<{
        fileName: string;
        uploadId: string;
      }>
    ) => {
      state.loading.download = true;
    },
    downloadBulkForecastEditResultSuccess: (state) => {
      state.loading.download = false;
    },
    downloadBulkForecastEditResultFailure: (state) => {
      state.loading.download = false;
    },
    setUploadHistorySearchKey: (state, action: PayloadAction<string>) => {
      state.dfViewLocalScope.uploadHistorySearchKey = action.payload;
    },
    resetSelectedSkuList: (state) => {
      state.selectedSkuList = [];
    },
    getTrainingSummaryDataRequest: (state) => {},
    getTrainingSummaryDataFailure: (state) => {},
    getTrainingSummaryDataSuccess: (state, action: PayloadAction<TrainingSummaryDataResponseI>) => {
      state.trainingSummaryData = action.payload;
    },
    resetSkuListData: (state) => {
      state.skuListData = null;
    },
    resetUploadHistoryData: (state) => {
      state.uploadedHistory = null;
    },
    updateShouldReloadData: (state, action: PayloadAction<boolean>) => {
      state.dfViewLocalScope.shouldReloadData = action.payload;
    },
    toggleGraphPanel: (state) => {
      state.isGraphPanelOpen = !state.isGraphPanelOpen;
    },
    toggleTrainingSummaryPanel: (state) => {
      state.isTrainingSummaryPanelOpen = !state.isTrainingSummaryPanelOpen;
    }
  }
});

export const dfViewSliceSelector = (state: IRootState) => state.dfView;

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
  bulkEditFileUploadRequest,
  bulkEditFileUploadFailure,
  bulkEditFileUploadSuccess,
  updateUploadProgress,
  downloadBulkEditForecastRequest,
  downloadBulkEditForecastSuccess,
  downloadBulkEditForecastFailure,
  updateBulkUploadError,
  getUploadHistoryDataRequest,
  getUploadHistoryDataFailure,
  getUploadHistoryDataSuccess,
  downloadBulkForecastEditResultRequest,
  downloadBulkForecastEditResultFailure,
  downloadBulkForecastEditResultSuccess,
  setUploadHistorySearchKey,
  resetSelectedSkuList,
  getTrainingSummaryDataRequest,
  getTrainingSummaryDataFailure,
  getTrainingSummaryDataSuccess,
  resetSkuListData,
  resetUploadHistoryData,
  updateShouldReloadData,
  toggleGraphPanel,
  toggleTrainingSummaryPanel
} = DFViewSlice.actions;

export default DFViewSlice.reducer;
