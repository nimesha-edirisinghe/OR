import { apiClient } from 'api/axiosInstances';
import { AxiosProgressEvent } from 'axios';
import { ApiResponse } from 'types/api';
import { AlertReplenishmentI } from 'types/requests/alertConfigRequest';
import { GroupFilterI } from 'types/requests/groupConfigRequests';
import {
  AlertGraphRequestBodyI,
  BulkEditFileUploadBodyI,
  DFPredictorsQueryParamI,
  DemandForecastChartRequestBodyI,
  DemandForecastChartRequestParamI,
  DemandForecastDataRequestQueryI,
  DownloadBulkEditQueryParamI,
  DownloadEditResultRequestBodyI,
  GetUploadHistoryReqBodyI
} from 'types/requests/viewRequests';
import { FCApiResponse } from 'types/responses/forecastConfigResponses';
import {
  AlertReplenishmentResponseI,
  DFPredictorI,
  DemandForecastChartResponseDataI,
  DemandForecastSkuResponseDataI,
  GetGraphResponseI,
  GetUploadHistoryResponseI
} from 'types/responses/viewResponses';

export const getDemandForecastDataRequest = async (
  requestBody: GroupFilterI[],
  queryParams: DemandForecastDataRequestQueryI
): Promise<FCApiResponse<any>> => {
  try {
    const response = await apiClient.post('/forecast/view/data', requestBody, {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const demandForecastChartRequest = async (
  requestBody: DemandForecastChartRequestBodyI,
  queryParams: DemandForecastChartRequestParamI
): Promise<DemandForecastChartResponseDataI[]> => {
  try {
    const response = await apiClient.post('forecast/view/graph', requestBody, {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const downloadDemandForecastReportRequest = async (
  requestBody: any,
  queryParams: any
): Promise<any> => {
  try {
    const response = await apiClient.post('forecast/view/download', requestBody, {
      params: queryParams,
      responseType: 'blob'
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPredictorsRequest = async (
  queryParams: DFPredictorsQueryParamI
): Promise<DFPredictorI> => {
  try {
    const response = await apiClient.get('forecast/view/predictors', {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDemandForecastSkuListRequest = async (
  requestBody: GroupFilterI[],
  queryParams: DemandForecastDataRequestQueryI
): Promise<FCApiResponse<DemandForecastSkuResponseDataI>> => {
  try {
    const response = await apiClient.post('/forecast/view/sku/list', requestBody, {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const bulkEditFileUploadRequest = async (
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
    const response: any = await apiClient.post('/forecast/edit/upload', formData, {
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

export const downloadBulkEditForecastRequest = async (
  requestBody: GroupFilterI[],
  queryParams: DownloadBulkEditQueryParamI
): Promise<any> => {
  try {
    const response = await apiClient.post('/forecast/edit/download/template', requestBody, {
      params: queryParams,
      responseType: 'blob'
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getUploadHistoryDataRequest = async (
  requestBody: GetUploadHistoryReqBodyI
): Promise<ApiResponse<GetUploadHistoryResponseI>> => {
  try {
    const response = await apiClient.post('/forecast/edit/get/history', requestBody);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const downloadBulkForecastEditResultRequest = async (
  requestBody: DownloadEditResultRequestBodyI
): Promise<any> => {
  try {
    const response = await apiClient.post('/forecast/edit/download/result', requestBody, {
      responseType: 'blob'
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



export const alertGraphRequest = async (
  requestBody: AlertGraphRequestBodyI): Promise<ApiResponse<GetGraphResponseI>> => {
  try {
    const response = await apiClient.post('alert/resolution/forecast/edit', requestBody);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const alertReplenishmentRequest = async (
  requestBody:AlertReplenishmentI ): Promise<ApiResponse<AlertReplenishmentResponseI>> => {
  try {
    const response = await apiClient.post('alert/resolution/replenishment/edit', requestBody);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};