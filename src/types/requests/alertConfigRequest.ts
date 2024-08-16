import { AlertTypesI, AlertTypesT } from 'types/alertConfig';
import { GroupFilterI } from './groupConfigRequests';
import { ScheduleType } from 'types/responses/jobScheduleResponses';
import { AlertReplenishmentActionTypeEnum } from 'utils/enum';

export interface GetAlertConfigsQueryParamI {
  limit: number;
  orgKey: number;
  page: number;
  search?: string;
}

export interface GetAlertsQueryParamI {
  alertKey: number;
  limit: number;
  orgKey: number;
  page: number;
  alertOnly: number;
  search?: string;
}

export interface GetAlertsRequestBody {
  types: AlertTypesT[];
}

export interface CreateAlertPayloadI {
  alertDetails: Partial<AlertTypesI>[];
  alertName: string;
  filters: GroupFilterI[];
  orgKey: number;
  responseTimeGranularity: ScheduleType;
  skuLocationCount: number;
}

export interface EditAlertPayloadI extends CreateAlertPayloadI {
  alertKey: number;
}

export interface DownloadAlertQueryParamI {
  alertKey: number;
  orgKey: number;
  alertOnly: number;
}

export interface DeleteAlertQueryParamI {
  alertKey: number;
  orgKey: number;
}
export interface EditAlertQueryParamI {
  alertKey: number;
  orgKey: number;
}

export interface GetAlertBodyI {
  filters: GroupFilterI[];
  types: string[];
}

export interface PlanDataI {
  orderDate?: string | null;
  deliveryDate?: string | null;
  quantity?: number | null;
  amendedOrderDate?: string | null;
  amendedDeliveryDate?: string | null;
  amendedQuantity?: number | null;
  action: AlertReplenishmentActionTypeEnum;
}

interface AlertKeyAndTypeI {
  alertKey: number | undefined;
  alertType: string;
}
export interface ReplenishmentI {
  groupKey: string | number | undefined;
  anchorProdKey: number | undefined;
  anchorProdModelKey: number | undefined;
  forecastKey: number | undefined;
  invPlanKey: number | undefined;
  riskValue: number | undefined;
  planData: PlanDataI[];
}

export interface AlertReplenishmentI extends AlertKeyAndTypeI, ReplenishmentI {}

export interface GetAlertedGroupDetailsQueryI {
  alertKey: number;
  alertOnly: number;
}
