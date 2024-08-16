import { InfluencingFactorTypes } from './groupConfig';
import { TableHeader } from './responses/viewResponses';

export interface AlertLoadingI {
  data: boolean;
  download: boolean;
  delete: boolean;
  skuDataLoading: boolean;
  graphDataLoading: boolean;
  planDetails: boolean;
}

export type AlertNamesT = 'Out of Stock' | 'Excess Stock' | 'Expiration' | 'Growth' | 'Degrowth';

export type AlertTypesT = 'outofstock' | 'expirationrisk' | 'growth' | 'degrowth' | 'excessstock';

export interface AlertTypesI {
  type: AlertTypesT;
  name: AlertNamesT;
  enable: boolean;
  isPrimaryAlert: boolean;
  compareValue?: string;
  threshold?: string;
  firstDescription?: string;
  secondDescription?: string;
  isSelected?: boolean;
  error?: string | null;
}

export type alertForecastChartType = 'sku' | 'anchor' | 'history' | 'influencingFactor';

export interface AlertPredictorListI {
  orgKey: number;
  groupKey: number;
  forecastKey: number;
  predictorCode: number;
  processLevel: 'anchor-prod' | 'anchor';
  predictorName: string;
}
export interface AlertPredictorI {
  totalCount: number;
  list: AlertPredictorListI[];
}

export interface AlertForecastChartResponseDataI {
  date: string;
  skuActual: number | null;
  skuProjected: number | null;
  compareActual: number | null;
  compareProjected: number | null;
  isSKUMergePoint: false;
  isCompareMergePoint: false;
  isEdited: 0 | 1;
}

export interface AlertForecastChartTable {
  headers: TableHeader[];
  skuForecast: (number | string)[];
  compareForecast: (number | string)[];
}

export interface AlertPredictorsQueryParamI {
  anchorProdKey: number;
  forecastKey: number;
  groupKey: number | string;
  limit: number;
  orgKey: number;
  page: number;
  search?: string;
  predictorType?: InfluencingFactorTypes | null;
}

export interface AlertForecastChartRequestParamI {
  groupKey: number | string;
  orgKey: number;
  startDate?: string | null | undefined;
  endDate?: string | null | undefined;
  type: alertForecastChartType;
}

export interface AlertGraphForecastDataI {
  actual: number | null;
  date: string;
  edited: number;
}

export interface AlertTypePayloadI {
  alertKey: number;
  alertType: AlertTypesT;
  anchorKey: number;
  anchorProdKey: number;
  anchorProdModelKey: number;
  groupKey: number;
  forecastKey: number;
}

export interface AlertTypeI {
  alertType: AlertTypesT[] | null;
  alertTypeDisplayName: AlertNamesT[] | null;
  anchorProdKey: number | null;
  groupKey: number | null;
}

export interface MoreOptionI {
  title: string;
  key: string;
  isEnabled: boolean;
  path?: string;
}

export interface AlertCalendarPrevMonthI {
  date: Date;
  day: number;
  isDisabled: boolean;
}

export interface AlertCalendarI {
  id: number;
  index: number;
  visibility: boolean;
  coordinates: {
    x: number;
    y: number;
  };
  prevMonth: AlertCalendarPrevMonthI;
}

export interface AlertCalendarPrevMonthI {
  date: Date;
  day: number;
  isDisabled: boolean;
}

export interface AlertCalendarI {
  id: number;
  index: number;
  visibility: boolean;
  coordinates: {
    x: number;
    y: number;
  };
  prevMonth: AlertCalendarPrevMonthI;
}

export interface ForecastAlertType{
  alertType:AlertTypesT
  anchorProdKey: number;
  anchorProdModelKey: number;
  groupKey: number;
  forecastKey: number;
}