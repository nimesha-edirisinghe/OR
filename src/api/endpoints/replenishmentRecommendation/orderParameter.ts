import { apiClient, reportDownloaderClient } from 'api/axiosInstances';
import { GroupFilterI } from 'types/requests/groupConfigRequests';
import {
  DownloadReplParameterSummaryQueryParamI,
  GetReplParameterSummaryQueryParamI
} from 'types/requests/replenishmentRecommendation/orderParameter';
import { RplParameterSummaryResponseI } from 'types/responses/replenishmentRecommendation/orderParameter';

export const getRplParameterSummaryRequest = async (
  requestBody: GroupFilterI[],
  queryParams: GetReplParameterSummaryQueryParamI
): Promise<RplParameterSummaryResponseI> => {
  try {
    const response = await apiClient.post('replenishment/parameter/summary/list', requestBody, {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const downloadRplParameterSummaryRequest = async (
  requestBody: GroupFilterI[],
  queryParams: DownloadReplParameterSummaryQueryParamI
): Promise<any> => {
  try {
    const response = await reportDownloaderClient.post(
      'replenishment/parameter/summary/download',
      requestBody,
      {
        params: queryParams,
        responseType: 'blob'
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
