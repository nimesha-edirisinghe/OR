import { InfluencingFactorTypes, RightFilterItemContentI } from 'types/groupConfig';
import { demandForecastChartType } from 'types/view';
import { GroupFilterI } from './groupConfigRequests';
import { AlertGraphForecastDataI } from 'types/alertConfig';

export interface getReplenishmentViewQueryParmI {
  anchorProdKey: number;
  groupKey: number;
  orgKey: number;
}

export interface getGroupListQueryParmI {
  orgKey: number;
  whFlag: 0 | 1 | 2;
}

export interface DemandForecastChartRequestParamI {
  groupKey: number | string;
  orgKey: number;
  startDate?: string | null | undefined;
  endDate?: string | null | undefined;
  type: demandForecastChartType;
}

export interface DemandForecastChartRequestBodyI {
  anchorKey: number[] | null;
  anchorProdKey: number[] | null;
  anchorProdModelKey: number[] | null;
  forecastKey: number[] | null;
  compareSelection: number;
  filters: RightFilterItemContentI[];
  search: string;
  whFlag: number;
}

export interface DemandForecastDataRequestQueryI {
  groupKey: number | string;
  limit: number;
  orgKey: number;
  page: number;
  whFlag: 0 | 1;
  search?: string;
}

export interface DemandForecastDownloadRequestQueryI {
  fileName: string;
  groupKey: string | number;
  orgKey: number;
  whFlag: 0 | 1;
  search?: string;
}

export interface DFPredictorsQueryParamI {
  anchorProdKey: number;
  forecastKey: number;
  groupKey: number | string;
  limit: number;
  orgKey: number;
  page: number;
  search?: string;
  predictorType?: InfluencingFactorTypes | null;
}

export interface ReplenishmentSkuListReqQueryI {
  groupKey: number | string;
  orgKey: number;
  page: number;
  whFlag: 0 | 1;
  limit?: number;
  search?: string;
}
export interface ReplenishmentPlnTotalCountReqQueryI {
  groupKey: number | string;
  orgKey: number;
  whFlag: 0 | 1;
  search?: string;
}
export interface DownloadRplReqQueryI {
  groupKey: number | string;
  orgKey: number;
  page: number;
  whFlag: 0 | 1;
  fileName: string;
  startDate: string | null;
  endDate: string | null;
  limit?: number;
  search?: string;
}
export interface GetRplDetailsReqQueryI {
  anchorProdKey: number;
  forecastKey: number;
  groupKey: number | string;
  invPlanKey: number;
  orgKey: number;
}
export interface BulkEditFileUploadBodyI {
  groupKey: number | string;
  groupDesc?: string;
}
export interface DownloadBulkEditQueryParamI {
  fileName: string;
  groupKey: number;
  orgKey: number;
  search?: string;
  whFlag?: 0 | 1;
}

export interface GetUploadHistoryReqBodyI {
  filters: GroupFilterI[];
  limit: number;
  page: number;
  search: string;
  whFlag?: 0 | 1;
}

export interface DownloadEditResultRequestBodyI {
  fileName: string;
  uploadId: string;
}

export interface AlertGraphRequestBodyI {
  alertKey?: number | undefined;
  alertType?: string;
  anchorKey: number | undefined;
  anchorProdKey: number | undefined;
  anchorProdModelKey: number | undefined;
  forecastData: AlertGraphForecastDataI[];
  forecastKey: number | undefined;
  groupKey: string | undefined;
}

export interface DownloadBulkEditZipFileBodyI {
  fileName: string;
  filters: GroupFilterI[];
  types: string[];
  groupKeys: number[];
  orgKey: number;
  search?: string;
  whFlag?: 0 | 1;
}
