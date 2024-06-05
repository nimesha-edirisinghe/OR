import { apiClient } from 'api/axiosInstances';
import { ApiResponse } from 'types/api';
import { ForecastAnalyzerReqBodyI } from 'types/requests/view/forecastAnalyzer';
import {
  AccuracyDistributionResponseI,
  AccuracyResponseI,
  AggregatedGraphResponseI,
  ExclusionCriteriaResponseI,
  FCAnalyzerSkuResponseI,
  IndividualGraphResponseI,
  KPIResponseI,
  PlannedActualResponseI
} from 'types/responses/view/forecastAnalyzer';

export const fetchKpiAccuracyRequest = async (
  requestBody: ForecastAnalyzerReqBodyI
): Promise<ApiResponse<AccuracyResponseI>> => {
  try {
    const response = await apiClient.post('/forecast/analyzer/kpi/accuracy', requestBody);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchIndividualGraphDataRequest = async (
  requestBody: ForecastAnalyzerReqBodyI
): Promise<ApiResponse<IndividualGraphResponseI[]>> => {
  try {
    const response = await apiClient.post('/forecast/analyzer/individual/graph', requestBody);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchAggregatedGraphDataRequest = async (
  requestBody: ForecastAnalyzerReqBodyI
): Promise<ApiResponse<AggregatedGraphResponseI[]>> => {
  try {
    const response = await apiClient.post('/forecast/analyzer/aggregated/graph', requestBody);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchExclusionCriteriaRequest = async (
  requestBody: ForecastAnalyzerReqBodyI
): Promise<ApiResponse<ExclusionCriteriaResponseI[]>> => {
  try {
    const response = await apiClient.post('/forecast/analyzer/exclusion/criteria', requestBody);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchPlannedActualDataRequest = async (
  requestBody: ForecastAnalyzerReqBodyI
): Promise<ApiResponse<PlannedActualResponseI[]>> => {
  try {
    const response = await apiClient.post('/forecast/analyzer/planned/actual', requestBody);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchKpiDataRequest = async (
  requestBody: ForecastAnalyzerReqBodyI
): Promise<ApiResponse<KPIResponseI>> => {
  try {
    const response = await apiClient.post('/forecast/analyzer/kpis', requestBody);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchSkuDetailsDataRequest = async (
  requestBody: ForecastAnalyzerReqBodyI
): Promise<ApiResponse<FCAnalyzerSkuResponseI>> => {
  try {
    const response = await apiClient.post('/forecast/analyzer/sku/details', requestBody);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const fetchAccuracyDistributionDataRequest = async (
  requestBody: ForecastAnalyzerReqBodyI
): Promise<ApiResponse<AccuracyDistributionResponseI>> => {
  try {
    const response = await apiClient.post('forecast/analyzer/accuracy/distribution', requestBody);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
