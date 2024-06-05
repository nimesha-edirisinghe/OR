import { TableHeader } from 'types/responses/viewResponses';

export interface RPLWHViewLoadingI {
  data: boolean;
  download: boolean;
  planDetails: boolean;
  planDetailTotalCount: boolean;
  rplWhBulkEditDownload: boolean;
  rplWhHistoryTableLoading: boolean;
}

export interface ReplenishmentWHSkuListItem {
  sku: string;
  location: string;
  department: string;
  vendor: string | null;
  anchorProdKey: number;
  anchorProdModelKey: number;
  forecastKey: number;
  invPlanKey: number;
  isSelected: boolean;
  [date: string]: number | string | boolean | null;
}

export interface ReplenishmentWHSkuListResI {
  headers: TableHeader[] | string[];
  list: ReplenishmentWHSkuListItem[];
  totalCount: number;
}

export interface rplWHViewLocalScopeI {
  rplWhSkuSearchKey: string;
  globalRplWhSkuSelected: boolean;
  rplWhUploadPercentage: number | null;
  rplWhUploadHistorySearchKey: string;
  startDate: string | null;
  endDate: string | null;
}
