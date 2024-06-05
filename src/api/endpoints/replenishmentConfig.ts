import { apiClient } from 'api/axiosInstances';
import {
  GetRplConfigQueryParamI,
  SaveRplPlanningBodyI
} from 'types/requests/replenishmentConfigRequests';

import { FCApiResponse, FCDataI } from 'types/responses/forecastConfigResponses';

export const getReplenishmentConfigDataRequest = async (
  queryParams: GetRplConfigQueryParamI
): Promise<FCApiResponse<FCDataI>> => {
  try {
    const response = await apiClient.get('/replenishment/getReplenishmentDetails', {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
};

export const saveRplPlanningPeriodRequest = async (
  requestBody: SaveRplPlanningBodyI
): Promise<FCApiResponse<any>> => {
  try {
    const response = await apiClient.post('/replenishment/updatePlanningPeriod', requestBody);
    return response.data;
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
};
