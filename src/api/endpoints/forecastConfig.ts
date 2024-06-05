import { apiClient } from 'api/axiosInstances';
import { ApiResponse } from 'types/api';
import { AnchorPredictorConfigI, TrainingConfigI, FCSKUPredictorI } from 'types/forecastConfig';
import {
  FCGetEstimatedTimeQueryParamI,
  FCRequestQueryParamI,
  FCRunNowReqPayloadI,
  FCSaveAnchorPredI,
  FCSaveRequestQueryParamI,
  FCSettingQueryParamsI,
  FCgetAnchorPredictorQueryParamI,
  RequestBodyI
} from 'types/requests/forecastConfigRequests';
import { FCApiResponse, FCDataI, FCEstimatedTimeI } from 'types/responses/forecastConfigResponses';

// All Forecast configuration endpoints
export const getForecastConfigData = async (
  requestBody: RequestBodyI,
  queryParams: FCRequestQueryParamI
): Promise<FCApiResponse<FCDataI>> => {
  try {
    const response = await apiClient.post('/getForecastConfigData', requestBody, {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
};

// API endpoint for fetch forecast configuration settings
export const fetchForecastSettings = async (
  queryParams: FCSettingQueryParamsI
): Promise<ApiResponse<TrainingConfigI>> => {
  try {
    const response = await apiClient.get('/getTrainingConfiguration', {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
};

// API endpoint for save forecast configuration settings
export const saveTrainingConfigs = async (
  requestBody: TrainingConfigI,
  queryParams: FCSaveRequestQueryParamI
): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.post('/saveTrainingConfiguration', requestBody, {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
};

export const getAnchorPredictorsConfig = async (
  queryParams: FCgetAnchorPredictorQueryParamI
): Promise<ApiResponse<AnchorPredictorConfigI[]>> => {
  try {
    const response = await apiClient.get('/getAnchorPredictors', {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error('getAnchorPredictors ', error);
    throw error;
  }
};

export const getSKUPredictors = async (
  queryParams: FCSettingQueryParamsI
): Promise<ApiResponse<FCSKUPredictorI[]>> => {
  try {
    const response = await apiClient.get('/getSKUPredictors', {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const saveAnchorPredictors = async (
  requestBody: FCSaveAnchorPredI[],
  queryParams: FCSettingQueryParamsI
): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.post('/saveAnchorPredictors', requestBody, {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
};

export const saveSKUPredictors = async (
  requestBody: any,
  queryParams: FCSettingQueryParamsI
): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.post('/sku/predictor/update', requestBody, {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
};

export const executeRunNowRequest = async (
  requestBody: FCRunNowReqPayloadI
): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.post('/create/usf/jobGroup', requestBody);
    return response.data;
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
};

export const getEstimatedTimeRequest = async (
  queryParams: FCGetEstimatedTimeQueryParamI
): Promise<ApiResponse<FCEstimatedTimeI>> => {
  try {
    const response = await apiClient.get('/getEstimatedTime', {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
