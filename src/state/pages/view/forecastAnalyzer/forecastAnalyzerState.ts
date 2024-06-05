import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IRootState } from 'state/rootState';
import {
  AccuracyDistributionResponseI,
  AccuracyResponseI,
  AggregatedGraphResponseI,
  ExclusionCriteriaResponseI,
  FCAnalyzerSkuResponseI,
  FcAnalyzerLocalScopeI,
  IndividualGraphResponseI,
  KPIResponseI,
  ORIGIN_PAGE,
  PlannedActualObjI
} from 'types/responses/view/forecastAnalyzer';
import { FCAnalyzerType } from 'types/view/forecastAnalyzer';
import { FCAnalyzerTypeEnum } from 'utils/enum';

export interface IForecastAnalyzer {
  isLoading: boolean;
  progressPercentage: number[];
  kpiAccuracyData: AccuracyResponseI | null;
  individualGraphData: IndividualGraphResponseI[] | null;
  aggregatedGraphData: AggregatedGraphResponseI[] | null;
  exclusionCriteriaList: ExclusionCriteriaResponseI[] | null;
  plannedActualList: PlannedActualObjI | null;
  kpiData: KPIResponseI | null;
  skuDetails: FCAnalyzerSkuResponseI | null;
  accuracyDistributionData: AccuracyDistributionResponseI | null;
  fcAnalyzerLocalScope: FcAnalyzerLocalScopeI;
}

export const ForecastAnalyzerSlice = createSlice({
  name: 'forecastAnalyzer',
  initialState: {
    isLoading: false,
    progressPercentage: [],
    kpiAccuracyData: null,
    individualGraphData: null,
    aggregatedGraphData: null,
    exclusionCriteriaList: null,
    plannedActualList: null,
    kpiData: null,
    skuDetails: null,
    accuracyDistributionData: null,
    fcAnalyzerLocalScope: {
      selectedAnalyzerType: FCAnalyzerTypeEnum.INDIVIDUAL,
      originPage: 'df'
    }
  } as IForecastAnalyzer,
  reducers: {
    fetchKpiAccuracyRequest: (state, action: PayloadAction<{ type: FCAnalyzerType }>) => {
      state.isLoading = true;
    },
    fetchKpiAccuracyRequestSuccess: (state, action: PayloadAction<AccuracyResponseI>) => {
      state.kpiAccuracyData = action.payload;
      state.progressPercentage = [...state.progressPercentage, 1];
    },
    fetchKpiAccuracyRequestFailure: (state) => {
      state.isLoading = true;
    },

    fetchIndividualGraphDataRequest: (state, action: PayloadAction<{ type: FCAnalyzerType }>) => {
      state.isLoading = true;
    },
    fetchIndividualGraphDataRequestSuccess: (
      state,
      action: PayloadAction<IndividualGraphResponseI[]>
    ) => {
      state.individualGraphData = action.payload;
      state.progressPercentage = [...state.progressPercentage, 1];
    },
    fetchIndividualGraphDataRequestFailure: (state) => {
      state.isLoading = true;
    },

    fetchAggregatedGraphDataRequest: (state, action: PayloadAction<{ type: FCAnalyzerType }>) => {
      state.isLoading = true;
    },
    fetchAggregatedGraphDataRequestSuccess: (
      state,
      action: PayloadAction<AggregatedGraphResponseI[]>
    ) => {
      state.aggregatedGraphData = action.payload;
      state.progressPercentage = [...state.progressPercentage, 1];
    },
    fetchAggregatedGraphDataRequestFailure: (state) => {
      state.isLoading = true;
    },

    fetchExclusionCriteriaRequest: (state, action: PayloadAction<{ type: FCAnalyzerType }>) => {
      state.isLoading = true;
    },
    fetchExclusionCriteriaRequestSuccess: (
      state,
      action: PayloadAction<ExclusionCriteriaResponseI[]>
    ) => {
      state.exclusionCriteriaList = action.payload;
      state.progressPercentage = [...state.progressPercentage, 1];
    },
    fetchExclusionCriteriaRequestFailure: (state) => {
      state.isLoading = true;
    },

    fetchPlannedActualDataRequest: (state, action: PayloadAction<{ type: FCAnalyzerType }>) => {
      state.isLoading = true;
    },
    fetchPlannedActualDataRequestSuccess: (state, action: PayloadAction<PlannedActualObjI>) => {
      state.plannedActualList = action.payload;
      state.progressPercentage = [...state.progressPercentage, 1];
    },
    fetchPlannedActualDataRequestFailure: (state) => {
      state.isLoading = true;
    },

    fetchKpiDataRequest: (state, action: PayloadAction<{ type: FCAnalyzerType }>) => {
      state.isLoading = true;
    },
    fetchKpiDataRequestSuccess: (state, action: PayloadAction<KPIResponseI>) => {
      state.kpiData = action.payload;
      state.progressPercentage = [...state.progressPercentage, 1];
    },
    fetchKpiDataRequestFailure: (state) => {
      state.isLoading = true;
    },

    fetchSkuDetailsDataRequest: (state, action: PayloadAction<{ type: FCAnalyzerType }>) => {
      state.isLoading = true;
    },
    fetchSkuDetailsDataRequestSuccess: (state, action: PayloadAction<FCAnalyzerSkuResponseI>) => {
      state.skuDetails = action.payload;
      state.progressPercentage = [...state.progressPercentage, 1];
    },
    fetchSkuDetailsDataRequestFailure: (state) => {
      state.isLoading = true;
    },
    fetchAccuracyDistributionDataRequest: (
      state,
      action: PayloadAction<{ type: FCAnalyzerType }>
    ) => {
      state.isLoading = true;
    },
    fetchAccuracyDistributionDataRequestSuccess: (
      state,
      action: PayloadAction<AccuracyDistributionResponseI>
    ) => {
      state.accuracyDistributionData = action.payload;
      state.progressPercentage = [...state.progressPercentage, 1];
    },
    fetchAccuracyDistributionDataRequestFailure: (state) => {
      state.isLoading = true;
    },
    clearPercentage: (state) => {
      state.progressPercentage = [];
    },
    setSelectedAnalyzerType: (state, action: PayloadAction<FCAnalyzerTypeEnum>) => {
      state.fcAnalyzerLocalScope.selectedAnalyzerType = action.payload;
    },
    resetFcAnalyzerData: (state) => {
      state.progressPercentage = [];
      state.kpiAccuracyData = null;
      state.individualGraphData = null;
      state.aggregatedGraphData = null;
      state.exclusionCriteriaList = null;
      state.plannedActualList = null;
      state.kpiData = null;
      state.skuDetails = null;
      state.accuracyDistributionData = null;
    },
    setOriginPage: (state, action: PayloadAction<ORIGIN_PAGE>) => {
      state.fcAnalyzerLocalScope.originPage = action.payload;
    }
  }
});

export const forecastAnalyzerSliceSelector = (state: IRootState) => state.forecastAnalyzer;

export const {
  fetchKpiAccuracyRequest,
  fetchKpiAccuracyRequestSuccess,
  fetchKpiAccuracyRequestFailure,
  fetchIndividualGraphDataRequest,
  fetchIndividualGraphDataRequestSuccess,
  fetchIndividualGraphDataRequestFailure,
  fetchAggregatedGraphDataRequest,
  fetchAggregatedGraphDataRequestSuccess,
  fetchAggregatedGraphDataRequestFailure,
  fetchExclusionCriteriaRequest,
  fetchExclusionCriteriaRequestSuccess,
  fetchExclusionCriteriaRequestFailure,
  fetchPlannedActualDataRequest,
  fetchPlannedActualDataRequestSuccess,
  fetchPlannedActualDataRequestFailure,
  fetchKpiDataRequest,
  fetchKpiDataRequestSuccess,
  fetchKpiDataRequestFailure,
  fetchSkuDetailsDataRequest,
  fetchSkuDetailsDataRequestSuccess,
  fetchSkuDetailsDataRequestFailure,
  fetchAccuracyDistributionDataRequest,
  fetchAccuracyDistributionDataRequestFailure,
  fetchAccuracyDistributionDataRequestSuccess,
  clearPercentage,
  setSelectedAnalyzerType,
  resetFcAnalyzerData,
  setOriginPage
} = ForecastAnalyzerSlice.actions;

export default ForecastAnalyzerSlice.reducer;
