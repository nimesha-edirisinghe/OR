import { ActivityLogFilterT, FilterDateContentI } from 'types/activityLog';

export interface ActivityLogRequestQueryParamsI {
  orgKey: number;
  startDate?: string;
  endDate?: string;
}

export interface ActivityLogFilterItemPayloadContentI {
  isSelectAll: boolean;
  search: null | string;
  selectedItems: string[] | [];
}

export interface ActivityLogFilterRequestPayloadI {
  activity: ActivityLogFilterItemPayloadContentI;
  date: FilterDateContentI;
  execType: ActivityLogFilterItemPayloadContentI;
  groupName: ActivityLogFilterItemPayloadContentI;
  status: ActivityLogFilterItemPayloadContentI;
  user: ActivityLogFilterItemPayloadContentI;
}

export interface ActivityLogSummaryQueryParmI {
  job_group_id: number;
  groupKey: number;
  orgKey: number;
}

export interface FilterDataReqQueryParamI {
  pageNumber?: number;
  pageSize: number;
  orgKey: number;
  sort: 'ASC' | 'DESC';
  type: ActivityLogFilterT;
}

export interface ActivityLogListQueryParmI {
  pageNumber?: number;
  pageSize: number;
  orgKey: number;
  sort: 'ASC' | 'DESC';
}
