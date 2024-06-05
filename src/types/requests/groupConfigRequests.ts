import { GroupTypes, RightFilterItemContentI, PredictorLabelI } from 'types/groupConfig';
import { KeyValueI } from 'types/responses/insightResponses';
import { ScheduleType } from 'types/responses/jobScheduleResponses';

export interface StoreGroupRequestI {
  orgKey: number;
  type: GroupTypes;
  page: number;
  limit: number;
  groupSearch?: string;
}

export interface DeleteGroupRequestI {
  groupKey: number;
  orgKey: number;
}
export interface EditGroupRequestParamsI {
  groupKey: number;
  orgKey: number;
}

export interface EditGroupRequestBodyI {
  forecastHorizon: number;
  groupName: string;
  currentEnableStatus: 0 | 1;
  previousEnableStatus: 0 | 1;
  whFlag: 0 | 1 | 2;
}

export interface GroupRequestQueryParamI {
  orgKey: number;
}

export interface FilterDataReqQueryParamI {}
export interface FilterCountReqQueryParamI {}
export interface GroupDefQueryParamI {}

export interface FilterDataReqPayloadI {
  code: number;
  filters: GroupFilterI[];
  orgKey: number;
  pageNumber: number;
  pageSize: number;
  type: string;
  whFlag?: 0 | 1 | 2;
}
export interface FilterCountReqPayloadI {
  filters: GroupFilterI[];
  orgKey: number;
  whFlag: 0 | 1 | 2;
}
export interface FilterItemPayloadContentI {
  isSelectAll: boolean;
  search: null | string;
  selectedItems: string[] | [];
}

export type GroupLabelTypes = (
  | 'product'
  | 'location'
  | 'predictor'
  | 'store'
  | 'anchor'
  | 'sku'
  | 'vendor'
)[];

export interface GroupFilterI {
  code: number;
  isSelectAll: boolean;
  search: string;
  selectedItems: string[] | KeyValueI[] | [];
  type: string;
}

export interface CreateGroupRequestBodyI {
  anchorLocation: number;
  filters: GroupFilterI[];
  filteredSelectedItems: RightFilterItemContentI[];
  forecastHorizon: number;
  frequencyType: ScheduleType;
  groupName: string;
  predictorConfiguration: PredictorLabelI[] | null;
  skuLocation: number;
  whFlag: 0 | 1 | 2;
}

export interface GroupDefReqPayloadI {}
