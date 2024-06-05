import { apiClient } from 'api/axiosInstances';
import { PromotionSummaryDataDownloadRequestI, PromotionSummaryDataDownloadRequestQueryI, PromotionSummaryViewDataRequestI } from 'types/requests/promotionSummaryViewRequest';
import { FCApiResponse } from 'types/responses/forecastConfigResponses';
import { PromotionSummaryViewSkuResponseDataI } from 'types/responses/promotionSummaryViewResponse';

export const getPromotionSummaryViewDataListRequest = async (
    requestBody: Partial<PromotionSummaryViewDataRequestI>,
  ):  Promise<FCApiResponse<PromotionSummaryViewSkuResponseDataI>> => {
    try {
      const response = await apiClient.post('promotions/list', requestBody);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
};

export const downloadPromotionSummaryDataRequest = async (
  requestBody: PromotionSummaryDataDownloadRequestI,
  queryParams: PromotionSummaryDataDownloadRequestQueryI
): Promise<any> => {
  try {
    const response = await apiClient.post('promotions/download', requestBody, {
      params: queryParams,
      responseType: 'blob'
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
