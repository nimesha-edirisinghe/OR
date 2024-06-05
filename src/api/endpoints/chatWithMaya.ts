import { getAiApiClient } from 'api/axiosInstances';
import { ApiResponse } from 'types/api';
import { ChatRequestBodyI } from 'types/requests/maya';

export const getContextRequest = async (): Promise<ApiResponse<any>> => {
  try {
    const response = await getAiApiClient.get('/context/get');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const conversationChatRequest = async (
  requestBody: ChatRequestBodyI
): Promise<ApiResponse<any>> => {
  try {
    const response = await getAiApiClient.post('/conversation/chat', requestBody);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
