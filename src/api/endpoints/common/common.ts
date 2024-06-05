import { apiClient } from 'api/axiosInstances';
import { GetLastUpdatedDataI } from 'types/responses/common/common';

export const getCommonLastUpdateDateRequest = async (): Promise<GetLastUpdatedDataI> => {
  try {
    const response = await apiClient.post('common/last/update');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
