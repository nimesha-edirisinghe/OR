import { adminApiClient } from 'api/axiosInstances';
import { ApiResponse } from 'types/api';

export const fetchTableauTokenRequest = async (): Promise<ApiResponse<string>> => {
  try {
    const response = await adminApiClient.get('/report/getToken');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
