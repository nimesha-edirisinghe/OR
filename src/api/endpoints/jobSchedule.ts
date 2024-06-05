import { apiClient } from 'api/axiosInstances';
import { ApiResponse } from 'types/api';
import {
  GetJobSchedulesQueryParamI,
  JobScheduleActionsQueryParamI,
  JobScheduleRequestI
} from 'types/requests/jobScheduleRequest';
import {
  JobScheduleConfigurationI,
  JobScheduleResponseI
} from 'types/responses/jobScheduleResponses';

export const getJobSchedulesRequest = async (
  queryParams: GetJobSchedulesQueryParamI
): Promise<ApiResponse<JobScheduleConfigurationI>> => {
  try {
    const response = await apiClient.get('/schedule/getSchedules', {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createScheduleRequest = async (
  requestBody: JobScheduleRequestI
): Promise<ApiResponse<JobScheduleResponseI>> => {
  try {
    const response = await apiClient.post('/schedule/create', requestBody);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateScheduleRequest = async (
  requestBody: JobScheduleRequestI
): Promise<ApiResponse<JobScheduleResponseI>> => {
  try {
    const response = await apiClient.post('/schedule/update', requestBody);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const removeScheduleJobRequest = async (
  queryParams: JobScheduleActionsQueryParamI
): Promise<ApiResponse<JobScheduleResponseI>> => {
  try {
    const response = await apiClient.get('/schedule/remove', {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
