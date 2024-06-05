
import { apiClient } from 'api/axiosInstances';
import { ApiResponse } from "types/api";
import { DataIngestionSummaryViewDataReqPayloadI } from "types/requests/dataIngestionSummaryViewRequest";
import { GetDataIngestionSummaryI } from "types/responses/dataIngestionSummaryResponses";

export const getDataIngestionSummaryViewDataListRequest = async (
    requestBody: Partial<DataIngestionSummaryViewDataReqPayloadI>,
  ): Promise<ApiResponse<GetDataIngestionSummaryI[]>> => {
    try {
      const response = await apiClient.post('/activityLog/etl/status', requestBody);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };