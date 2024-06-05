import { ResponseTimeGranularity } from 'pages/AdvancedConfiguration/ReplenishmentConfiguration/PlanningConfigDrawer/ConfigTypeSelection';
import { GroupTypes } from 'types/groupConfig';

export interface StoreGroupI {
  groupKey: number;
  groupDesc: string;
  anchorCount: number;
  skuCount: number;
  forecastingFrequency: ResponseTimeGranularity;
  forecastingHorizon: number;
  previousEnabledStatus: 1 | 0;
  currentEnabledStatus: 1 | 0;
}

export interface StoreGroupListResponse {
  list: StoreGroupI[];
  totalCount: number;
  type?: GroupTypes;
}

export interface GroupLabelsResponseI {
  code: number;
  label: string;
  type: string;
}

export interface FilterCountApiResponseI {
  type: string;
  code: number;
  count: number;
}
