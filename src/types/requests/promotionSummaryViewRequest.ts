import { GroupFilterI } from "./groupConfigRequests";

export interface PromotionSummaryViewDataRequestI {
  filters?: GroupFilterI[] | [];
  limit: number;
  groupKey: number | string;
  page: number;
  predictorCode: 0 | 10;
  search?: string;
}

export interface PromotionSummaryDataDownloadRequestQueryI {
  fileName: string;
}

export interface PromotionSummaryDataDownloadRequestI {
  filters?: GroupFilterI[] | [];
  search?: string;
  groupKey: number | string;
}
