import { adminApiClient } from 'api/axiosInstances';
import { ApiResponse } from 'types/api';
import { GetTokenQueryParamI } from 'types/requests/dashboard/dashboard';

export const fetchTableauTokenRequest = async (
  queryParams: GetTokenQueryParamI
): Promise<ApiResponse<string>> => {
  try {
    const response = await adminApiClient.get('/report/getToken', {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
