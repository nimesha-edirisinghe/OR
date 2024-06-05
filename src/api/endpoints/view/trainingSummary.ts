import { apiClient } from 'api/axiosInstances';
import { ApiResponse } from 'types/api';
import { GetTrainingSummaryDataReqBodyI } from 'types/requests/trainingSummaryRequests';
import { TrainingSummaryDataResponseI } from 'types/responses/trainingSummaryResponse';

export const getTrainingSummaryData = async (
  requestBody: GetTrainingSummaryDataReqBodyI
): Promise<ApiResponse<TrainingSummaryDataResponseI>> => {
  try {
    const response = await apiClient.post('/training/summary/data', requestBody);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
