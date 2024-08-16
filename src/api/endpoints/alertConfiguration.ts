import { apiClient } from 'api/axiosInstances';
import { AlertTypeI, AlertTypePayloadI } from 'types/alertConfig';
import { ApiResponse } from 'types/api';
import {
  CreateAlertPayloadI,
  DeleteAlertQueryParamI,
  DownloadAlertQueryParamI,
  EditAlertPayloadI,
  EditAlertQueryParamI,
  GetAlertBodyI,
  GetAlertConfigsQueryParamI,
  GetAlertedGroupDetailsQueryI,
  GetAlertsQueryParamI
} from 'types/requests/alertConfigRequest';
import {
  AlertedGroupDetailsResponseI,
  GetAlertList,
  GetAlertSummaryI
} from 'types/responses/alertConfigResponse';

export const getAlertConfigsRequest = async (
  queryParams: GetAlertConfigsQueryParamI
): Promise<ApiResponse<GetAlertSummaryI>> => {
  try {
    const response = await apiClient.get('/alert/getAlertSummary', {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAlertsRequest = async (
  queryParams: GetAlertsQueryParamI,
  requestBody: GetAlertBodyI
): Promise<ApiResponse<GetAlertList[]>> => {
  try {
    const response = await apiClient.post('/alert/getAlerts', requestBody, {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createAlertRequest = async (
  requestBody: CreateAlertPayloadI
): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.post('/alert/create', requestBody);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const downloadAlertRequest = async (
  queryParams: DownloadAlertQueryParamI,
  requestBody: GetAlertBodyI
): Promise<any> => {
  try {
    const response = await apiClient.post('/alert/download', requestBody, {
      params: queryParams,
      responseType: 'blob'
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteAlertRequest = async (
  queryParams: DeleteAlertQueryParamI
): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.get('/alert/delete', {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAlertDefinitionRequest = async (
  queryParams: EditAlertQueryParamI
): Promise<ApiResponse<Partial<CreateAlertPayloadI>>> => {
  try {
    const response = await apiClient.get('/alert/definition', {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateAlertRequest = async (
  requestBody: EditAlertPayloadI
): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.post('/alert/edit', requestBody);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAlertTypeRequest = async (
  requestBody: AlertTypePayloadI
): Promise<ApiResponse<AlertTypeI>> => {
  try {
    const response = await apiClient.post('/alert/resolution/available/alerts', requestBody);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getAlertedGroupDetailsRequest = async (
  queryParams: GetAlertedGroupDetailsQueryI,
  requestBody: GetAlertBodyI
): Promise<ApiResponse<AlertedGroupDetailsResponseI>> => {
  try {
    const response = await apiClient.post('/alert/group', requestBody, {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
