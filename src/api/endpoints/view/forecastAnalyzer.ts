import { apiClient } from 'api/axiosInstances';
import { ApiResponse } from 'types/api';
import {
  ForecastAnalyzerCommonReqBodyI,
  ForecastAnalyzerReqBodyI,
  ForecastAnalyzerSKUDetailsQueryParamI
} from 'types/requests/view/forecastAnalyzer';
import {
  AccuracyResponseI,
  AggregatedGraphResponseI,
  FCAnalyzerSkuResponseI,
  IndividualGraphResponseI,
  KPIResponseI,
  PlannedActualResponseI
} from 'types/responses/view/forecastAnalyzer';

export const fetchKpiAccuracyRequest = async (
  requestBody: ForecastAnalyzerCommonReqBodyI
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
  requestBody: ForecastAnalyzerCommonReqBodyI
): Promise<ApiResponse<AggregatedGraphResponseI[]>> => {
  try {
    const response = await apiClient.post('/forecast/analyzer/aggregated/graph', requestBody);
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
  requestBody: ForecastAnalyzerCommonReqBodyI,
  queryParams: ForecastAnalyzerSKUDetailsQueryParamI
): Promise<ApiResponse<FCAnalyzerSkuResponseI>> => {
  try {
    const response = await apiClient.post('/forecast/analyzer/sku/details', requestBody, {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
