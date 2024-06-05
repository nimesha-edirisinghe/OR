import { AlertTypesT } from 'types/alertConfig';

export interface AlertDetailsI {
  compareValue: string;
  threshold: string;
  alertType: AlertTypesT;
  alertCount: number;
  percentageChange: number;
}

export interface AlertListI {
  alertKey: number;
  alertName: string;
  skuLocation: number | null;
  alertDetails: AlertDetailsI[];
  lastUpdatedOn: number;
}

export interface GetAlertSummaryI {
  list: AlertListI[] | null;
  totalCount: number;
  lastUpdatedOn: number | null;
}

export interface GetAlertList {
  groupCode: string;
  groupName: string;
  anchor: string;
  skuCode: string;
  skuDesc: string;
  department: string;
  store: string;
  subDepartment: string;
  alertValue: number;
  alerted: number;
  anchorKey: number;
  forecastKey: number;
  alertThreshold: number;
  anchorProdKey: number;
  anchorProdModelKey: number;
  compareValue: string;
  groupNameCode: string;
  orgKey: number;
  skuDescription: string;
  skuNameCode: string;
  splitKey: number;
  storeCode: string;
  storeNameCode: string;
  threshold: string;
  isSelected: boolean;
  invPlanKey:number
}

export interface GetAlertsData {
  headers: { [key: string]: string };
  list: GetAlertList[] | null;
  totalCount: number;
}
