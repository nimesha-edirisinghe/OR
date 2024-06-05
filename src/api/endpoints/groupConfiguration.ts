import { apiClient } from 'api/axiosInstances';
import { ApiResponse } from 'types/api';
import {
  DeleteGroupRequestI,
  EditGroupRequestBodyI,
  EditGroupRequestParamsI,
  GroupRequestQueryParamI,
  GroupLabelTypes,
  StoreGroupRequestI,
  FilterDataReqQueryParamI,
  FilterDataReqPayloadI,
  FilterCountReqPayloadI,
  FilterCountReqQueryParamI,
  GroupDefQueryParamI,
  GroupDefReqPayloadI
} from 'types/requests/groupConfigRequests';
import { GroupDefResponseI } from 'types/responses/groupConfigResponse';
import {
  FilterCountApiResponseI,
  StoreGroupListResponse
} from 'types/responses/groupConfigResponses';
import { KeyValueI } from 'types/responses/insightResponses';

export const getGroupListRequest = async (
  queryParams: StoreGroupRequestI
): Promise<ApiResponse<StoreGroupListResponse>> => {
  try {
    const response = await apiClient.get('/group/list', {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteGroupRequest = async (
  queryParams: DeleteGroupRequestI
): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.get('/group/delete', {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editGroupRequest = async (
  queryParams: EditGroupRequestParamsI,
  requestBody: EditGroupRequestBodyI
): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.post('/group/edit', requestBody, {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getLabelsRequest = async (
  queryParams: GroupRequestQueryParamI,
  requestBody: GroupLabelTypes
): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.post('/group/labels', requestBody, {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createGroupRequest = async (
  queryParams: GroupRequestQueryParamI,
  requestBody: any
): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.post('/group/create', requestBody, {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getFilterDataRequest = async (
  requestBody: FilterDataReqPayloadI,
  queryParams: FilterDataReqQueryParamI
): Promise<ApiResponse<KeyValueI[]>> => {
  try {
    const response = await apiClient.post('/group/filters/data', requestBody, {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getFilterCountRequest = async (
  requestBody: FilterCountReqPayloadI,
  queryParams: FilterCountReqQueryParamI
): Promise<ApiResponse<FilterCountApiResponseI[]>> => {
  try {
    const response = await apiClient.post('/group/filters/count', requestBody, {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const groupDefinitionRequest = async (
  queryParams: GroupDefQueryParamI
): Promise<ApiResponse<GroupDefResponseI>> => {
  try {
    const response = await apiClient.get('/group/groupDefinition', {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
