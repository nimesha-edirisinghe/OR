import { TableHeader } from './responses/viewResponses';

export interface ViewLocalScopeI {
  downloadPlanDrawer: boolean;
}

export interface ViewGroupListI {
  key: string;
  value: string;
  isSelected?: boolean;
}

export interface ViewGroupI {
  totalCount: number;
  list: ViewGroupListI[] | [];
}

export interface RPLViewLoadingI {
  data: boolean;
  download: boolean;
  planDetails: boolean;
  planDetailTotalCount: boolean;
  rplBulkEditDownload: boolean;
  rplHistoryTableLoading: boolean;
}

export interface DemandForecastLoadingI {
  skuDataLoading: boolean;
  graphDataLoading: boolean;
  download: boolean;
  bulkEditDownload?: boolean;
  historyTableLoading?: boolean;
}

export interface dfViewLocalScopeI {
  skuSearchKey: string;
  globalSkuSelected: boolean;
  uploadPercentage?: number | null;
  uploadHistorySearchKey?: string;
  shouldReloadData?: boolean;
}
export type demandForecastChartType =
  | 'sku'
  | 'aggregate'
  | 'anchor'
  | 'history'
  | 'influencingFactor';

export interface DemandForecastChartTable {
  headers: TableHeader[];
  skuForecast: (number | string)[];
  compareForecast: (number | string)[];
}

export interface DateRange {
  startDate: Date | undefined | null;
  endDate: Date | undefined | null;
}

export type historyOptionType = 1 | 2 | 3;
