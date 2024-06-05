import { GroupFilterI } from '../groupConfigRequests';

export interface GetReplParameterSummaryBodyI {
  filters: GroupFilterI[];
}

export interface GetReplParameterSummaryQueryParamI {
  limit: number;
  page: number;
  search?: string;
  whFlag?: 0 | 1 | 2;
}
export interface DownloadReplParameterSummaryQueryParamI {
  fileName: string;
  search?: string;
  whFlag?: 0 | 1 | 2;
}
