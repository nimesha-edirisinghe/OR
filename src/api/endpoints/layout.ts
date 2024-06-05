import { adminApiClient } from 'api/axiosInstances';
import { LeftMenu } from 'state/layout/layoutState';
import { ApiResponse } from 'types/api';

export const getLeftMenuRequest = async (): Promise<ApiResponse<LeftMenu>> => {
  try {
    const response = await adminApiClient.get('/getMenus');
    return response.data;
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
};
