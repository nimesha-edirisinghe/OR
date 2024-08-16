import { vlApiClient } from 'api/axiosInstances';
import { TaskCountI } from 'types/responses/home/home';

export const getWorkflowTaskCountRequest = async (
  path: string,
  userName: string
): Promise<TaskCountI> => {
  try {
    const response = await vlApiClient.get(`${path}${userName}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
