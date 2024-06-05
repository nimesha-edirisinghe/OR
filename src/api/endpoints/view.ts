import { apiClient, reportDownloaderClient } from 'api/axiosInstances';
import { InsightFilterRequestPayloadI } from 'types/requests/insightRequest';
import {
  RPLViewI,
  RPLViewListItem,
  ViewApiResponse,
  ViewRequestQueryParamsI
} from 'types/responses/viewResponses';
import { getGroupListQueryParmI } from 'types/requests/viewRequests';

export const downloadForecastReportRequest = async (
  requestBody: InsightFilterRequestPayloadI,
  queryParams: any
): Promise<any> => {
  try {
    const response = await reportDownloaderClient.post(
      '/dashboard/downloadForecastReport',
      requestBody,
      {
        params: queryParams,
        responseType: 'blob'
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getGroupListRequest = async (queryParams: getGroupListQueryParmI): Promise<any> => {
  try {
    const response = await apiClient.post(
      '/replenishment/group/list',
      {
        isSelectAll: true,
        search: null,
        selectedItems: []
      },
      {
        params: queryParams
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getReplenishmentViewListRequest = async (
  requestBody: InsightFilterRequestPayloadI,
  queryParams: ViewRequestQueryParamsI
): Promise<ViewApiResponse<RPLViewListItem[]>> => {
  try {
    const response = await apiClient.post('/replenishment/list', requestBody, {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const downloadReplenishmentReportRequest = async (
  requestBody: string[],
  queryParams: any
): Promise<any> => {
  try {
    const response = await reportDownloaderClient.post(
      '/replenishment/downloadInventoryReport',
      requestBody,
      {
        params: queryParams,
        responseType: 'blob'
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getReplenishmentViewRequest = async (
  queryParams: any
): Promise<ViewApiResponse<RPLViewI | null>> => {
  try {
    const response = await apiClient.get('/replenishment/inventoryDetails', {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
