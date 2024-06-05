import { adminApiClient } from 'api/axiosInstances';
import { ApiResponse } from 'types/api';
import { orgFetchingResponseI } from 'types/responses/userResponses';

// All user endpoints
export const getUserPermissions = async (): Promise<any> => {
  try {
    const response = await adminApiClient.get('/getPermissions');
    return response.data;
  } catch (error) {
    // Handle error
    console.error(error);
  }
};

export const getUser = async (userId: string) => {
  try {
    const response = await adminApiClient.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
};

export const updateUser = async (userId: string, data: any) => {
  try {
    const response = await adminApiClient.put(`/users/${userId}`, data);
    return response.data;
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
};

export const fetchOrgDetails = async (): Promise<
  ApiResponse<orgFetchingResponseI>
> => {
  try {
    const response = await adminApiClient.get('/orgMapping/getOrgs');
    return response.data;
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
};
