import { apiClient } from 'api/axiosInstances';
import { ApiResponse } from 'types/api';
import { InventoryReportDataI, RequestQueryParamsI, SummaryI } from 'types/insight';
import {
  FilterDataReqQueryParamI,
  InsightFilterRequestPayloadI
} from 'types/requests/insightRequest';
import {
  FilterCountApiResponseI,
  KeyValueI,
  ProjectionDataI
} from 'types/responses/insightResponses';

export const getSummaryDetails = async (
  requestBody: InsightFilterRequestPayloadI,
  queryParams: RequestQueryParamsI
): Promise<ApiResponse<SummaryI>> => {
  try {
    const response = await apiClient.post('/dashboard/summary', requestBody, {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getInvReportData = async (
  requestBody: InsightFilterRequestPayloadI,
  queryParams: RequestQueryParamsI
): Promise<ApiResponse<InventoryReportDataI>> => {
  try {
    const response = await apiClient.post('/dashboard/inventory/report', requestBody, {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getOutOfStockPercentData = async (
  requestBody: InsightFilterRequestPayloadI,
  queryParams: RequestQueryParamsI
): Promise<ApiResponse<InventoryReportDataI>> => {
  try {
    const response = await apiClient.post('/dashboard/inventory/oos/report', requestBody, {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProjectionData = async (
  requestBody: InsightFilterRequestPayloadI,
  queryParams: RequestQueryParamsI
): Promise<ApiResponse<ProjectionDataI>> => {
  try {
    const response = await apiClient.post('/dashboard/inventory/cards', requestBody, {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDemandForecastDataRequest = async (
  requestBody: InsightFilterRequestPayloadI,
  queryParams: RequestQueryParamsI
): Promise<ApiResponse<ProjectionDataI>> => {
  try {
    const response = await apiClient.post('/dashboard/df/report', requestBody, {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDemandForecastCardRequest = async (
  requestBody: InsightFilterRequestPayloadI,
  queryParams: RequestQueryParamsI
): Promise<ApiResponse<ProjectionDataI>> => {
  try {
    const response = await apiClient.post('/dashboard/df/cards', requestBody, {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getFilterCountRequest = async (
  requestBody: InsightFilterRequestPayloadI,
  queryParams: RequestQueryParamsI
): Promise<ApiResponse<FilterCountApiResponseI>> => {
  try {
    const response = await apiClient.post('/dashboard/filters/count', requestBody, {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getFilterDataRequest = async (
  requestBody: InsightFilterRequestPayloadI,
  queryParams: FilterDataReqQueryParamI
): Promise<ApiResponse<KeyValueI[]>> => {
  try {
    const response = await apiClient.post('/dashboard/filters/data', requestBody, {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
