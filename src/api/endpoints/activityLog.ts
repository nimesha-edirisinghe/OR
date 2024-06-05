import { apiClient } from 'api/axiosInstances';
import { ActivityLogDataI, ActivityLogSummaryDataI } from 'types/activityLog';
import { ApiResponse } from 'types/api';
import {
  ActivityLogListQueryParmI,
  ActivityLogFilterRequestPayloadI,
  ActivityLogRequestQueryParamsI,
  FilterDataReqQueryParamI,
  ActivityLogSummaryQueryParmI
} from 'types/requests/activityLogRequests';
import { ActivityLogFilterCountApiResponseI } from 'types/responses/activityLogResponses';
import { KeyValueI } from 'types/responses/insightResponses';

export const getFilterCountRequest = async (
  requestBody: {},
  queryParams: ActivityLogRequestQueryParamsI
): Promise<ApiResponse<ActivityLogFilterCountApiResponseI>> => {
  try {
    const response = await apiClient.post('/activityLog/filter/count', requestBody, {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getFilterDataRequest = async (
  requestBody: Partial<ActivityLogFilterRequestPayloadI>,
  queryParams: FilterDataReqQueryParamI
): Promise<ApiResponse<KeyValueI[]>> => {
  try {
    const response = await apiClient.post('/activityLog/filter/data', requestBody, {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getActivityLogListRequest = async (
  requestBody: Partial<ActivityLogFilterRequestPayloadI>,
  queryParams: ActivityLogListQueryParmI
): Promise<ApiResponse<ActivityLogDataI[]>> => {
  try {
    const response = await apiClient.post('/activityLog/list', requestBody, {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getActivityLogSummaryRequest = async (
  queryParams: ActivityLogSummaryQueryParmI
): Promise<ApiResponse<ActivityLogSummaryDataI>> => {
  try {
    const response = await apiClient.get('/activityLog/summary/details', {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
