import { apiClient } from 'api/axiosInstances';
import { AxiosProgressEvent } from 'axios';
import { ApiResponse } from 'types/api';
import { GroupFilterI } from 'types/requests/groupConfigRequests';
import {
  BulkEditFileUploadBodyI,
  DownloadBulkEditQueryParamI,
  DownloadEditResultRequestBodyI,
  GetRplDetailsReqQueryI,
  GetUploadHistoryReqBodyI,
  ReplenishmentPlnTotalCountReqQueryI,
  ReplenishmentSkuListReqQueryI
} from 'types/requests/viewRequests';
import { FCApiResponse } from 'types/responses/forecastConfigResponses';
import {
  GetUploadHistoryResponseI,
  ReplenishmentPlanDetailsResI,
  ReplenishmentSkuListResI
} from 'types/responses/viewResponses';

export const getReplenishmentSkuDataRequest = async (
  requestBody: GroupFilterI[],
  queryParams: ReplenishmentSkuListReqQueryI
): Promise<ApiResponse<ReplenishmentSkuListResI>> => {
  try {
    const response = await apiClient.post('/replenishment/view/list', requestBody, {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getReplenishmentExpandedSkuDataRequest = async (
  requestBody: GroupFilterI[],
  queryParams: ReplenishmentSkuListReqQueryI
): Promise<ApiResponse<ReplenishmentSkuListResI>> => {
  try {
    const response = await apiClient.post('/replenishment/view/list/expanded', requestBody, {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const downloadRplReportRequest = async (
  requestBody: GroupFilterI[],
  queryParams: ReplenishmentSkuListReqQueryI
): Promise<any> => {
  try {
    const response = await apiClient.post('/replenishment/downloadReport', requestBody, {
      params: queryParams,
      responseType: 'blob'
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getRplPlanDetailsRequest = async (
  queryParams: GetRplDetailsReqQueryI
): Promise<ApiResponse<ReplenishmentPlanDetailsResI>> => {
  try {
    const response = await apiClient.get('/replenishment/plan/details', {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getRplPlanTotalCountRequest = async (
  requestBody: GroupFilterI[],
  queryParams: ReplenishmentPlnTotalCountReqQueryI
): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.post('/replenishment/view/list/count', requestBody, {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const rplBulkEditFileUploadRequest = async (
  requestBody: BulkEditFileUploadBodyI,
  file: File,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
): Promise<FCApiResponse<any>> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append(
      'groupDescDTO',
      new Blob([JSON.stringify(requestBody)], { type: 'application/json' })
    );
    const response: any = await apiClient.post('/replenishment/edit/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: onUploadProgress
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const rplDownloadBulkEditForecastRequest = async (
  requestBody: GroupFilterI[],
  queryParams: DownloadBulkEditQueryParamI
): Promise<any> => {
  try {
    const response = await apiClient.post('/replenishment/edit/download/template', requestBody, {
      params: queryParams,
      responseType: 'blob'
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const rplGetUploadHistoryDataRequest = async (
  requestBody: GetUploadHistoryReqBodyI
): Promise<ApiResponse<GetUploadHistoryResponseI>> => {
  try {
    const response = await apiClient.post('/replenishment/edit/get/history', requestBody);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const rplDownloadBulkForecastEditResultRequest = async (
  requestBody: DownloadEditResultRequestBodyI
): Promise<any> => {
  try {
    const response = await apiClient.post('/replenishment/edit/download/result', requestBody, {
      responseType: 'blob'
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
