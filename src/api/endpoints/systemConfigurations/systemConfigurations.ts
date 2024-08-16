import { adminApiClient } from 'api/axiosInstances';
import { ApiResponse } from 'types/api';
import { GetDynamicConfigQueryParamI } from 'types/requests/systemConfigurations/systemConfigurations';
import { ExternalUrlsI } from 'types/responses/systemConfigurations/systemConfigurations';

export const getDynamicConfigDataRequest = async (
  queryParams: GetDynamicConfigQueryParamI
): Promise<ApiResponse<ExternalUrlsI>> => {
  try {
    const response = await adminApiClient.get('system/configuration/fetch', {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
