import { PlanTableHeader } from 'state/pages/view/demandForecastView/sagaHelpers/sgH_DfView';
import { PageI } from './forecastConfigResponses';
import { iconName } from 'components/AppIcon/svgIcons';
import { AlertReplenishmentActionTypeEnum } from 'utils/enum';

export interface ViewRequestQueryParamsI {
  orgKey: number;
  sort: 'ASC' | 'DESC';
}

export interface RPLViewListItem {
  productCode: string;
  product: string;
  store: string;
  splitCode: string;
  group: string;
  groupKey: number;
  department: string;
  subDepartment: string;
  anchorProdKey: number;
}

export interface ViewApiResponse<T> {
  status: number;
  message: string;
  page: PageI;
  data: T;
}

export interface StockMovementI {
  date: string;
  opening_stock: number;
  demand: number;
  pending: number;
  planned: number;
  expired: number;
  lost_sales: number;
  closing_stock: number;
  closing_inv_days_for_future_demand: number;
  closing_inventory_days: number;
  inventory_value: number;
}

export interface OrderPlanI {
  plannedOn: string;
  leadTime: number;
  daysOfCover: number;
  orderingFrequency: number;
  unitPrice: number;
  moq: number;
}

export interface OrderQtyDetailsI {
  order_date: string;
  delivery_date: string;
  quantity: number;
  value: number;
}

export interface RPLViewI {
  orderPlan: OrderPlanI;
  orderQtyDetails: OrderQtyDetailsI[];
  stockMovement: StockMovementI[];
  anchor_prod_key: number;
}

export interface DemandForecastChartResponseDataI {
  date: string;
  skuActual: number | null;
  skuProjected: number | null;
  compareActual: number | null;
  compareProjected: number | null;
  isSKUMergePoint: false;
  isCompareMergePoint: false;
  isEdited: 0 | 1;
}

export interface OutlierDetectionChartDataI {
  date: string;
  actual: number | null;
  adjusted: number | null;
}

export type TableCellT = 'generalCell' | 'indicatorCell' | 'actionIconCell' | 'editableCell'|'operationCell';

export interface TableHeader {
  w: number;
  displayValue: string;
  key: string;
  cellType?: TableCellT;
  actionIcons?: iconName[];
}

export interface DemandForecastSkuHeaders {
  sku: TableHeader;
  location: TableHeader;
  department: TableHeader;
  anchor: TableHeader;
  store: string;
  // [date: string]: string;
}

export interface DemandForecastSkuListItem {
  sku: string;
  location: string;
  store: string;
  department: string;
  anchor: string;
  anchorProdModelKey: number;
  anchorKey: number;
  splitCode: string;
  anchorProdKey: number;
  forecastKey: number | null;
  isSelected: boolean;
  [date: string]: number | string | boolean | null;
}

export interface DemandForecastSkuResponseDataI {
  headers: TableHeader[] | string[];
  list: DemandForecastSkuListItem[];
  totalCount: number;
}

export interface DFPredictorListI {
  orgKey: number;
  groupKey: number;
  forecastKey: number;
  predictorCode: number;
  processLevel: 'anchor-prod' | 'anchor';
  predictorName: string;
}

export interface DFPredictorI {
  totalCount: number;
  list: DFPredictorListI[];
}

export interface ReplenishmentSkuListItem {
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

export interface ReplenishmentSkuListResI {
  headers: TableHeader[] | string[];
  list: ReplenishmentSkuListItem[];
  totalCount: number;
}

export interface RplOrderPlanI {
  plannedOn: string;
  leadTime: number;
  daysOfCover: number;
  orderingFrequency: number;
  unitPrice: number;
  moq: number;
  unitOrderQty: number;
  wayOfSupply: string;
  riskValue: number;
  shelfLife:number;
}

export interface RplStockMovementI {
  date: string;
  opening_stock: number;
  demand: number;
  pending: number;
  expired: number;
  lost_sales: number;
  closing_stock: number;
  closing_inv_days_for_future_demand: number;
  closing_inventory_days: number;
  inventory_value: number;
  planned: number;
}

export interface RplOrderQtyDetailsI {
  order_date: string;
  delivery_date: string;
  quantity: number;
  value: number;
  sellingUom:number;
  buyingUOM:number;
}

export interface OrderQtyDetailsStateI {
  headers: PlanTableHeader[];
  list:
    | {
        id?: any;
        isSelected?: boolean;
        row: any[];
        action: AlertReplenishmentActionTypeEnum;
        fresh: boolean;
      }[]
    | null;
  defaultList:
    | {
        id?: any;
        isSelected?: boolean;
        row: any[];
        action: AlertReplenishmentActionTypeEnum;
        fresh: boolean;
      }[]
    | null;
}
export interface StockMovementsI {
  headers: TableHeader[];
  list: { id?: any; isSelected?: boolean; row: any[] }[] | null;
}

export interface ReplenishmentPlanDetailsResI {
  orderPlan: RplOrderPlanI;
  orderQtyDetails: RplOrderQtyDetailsI[];
  stockMovement: RplStockMovementI[];
  anchor_prod_key: number;
  isEdited?: 0 | 1;
}

export interface ReplenishmentPlanDetailsStateI {
  orderPlan: RplOrderPlanI;
  orderQtyDetails: OrderQtyDetailsStateI;
  stockMovement: StockMovementsI;
  anchor_prod_key: number;
  isEdited: 0 | 1;
}
export interface UploadHistoryListI {
  fileName: string;
  uploadedBy: string;
  uploadOn: number;
  totalSkuLocations: number;
  status: string;
  uploadId: string;
  outputRemarks: string;
  fileExists: boolean;
  groupDesc: string;
}

export type GetUploadHistoryDataItemT = [
  string,
  string,
  string,
  number | string,
  string,
  number,
  TableCellT,
  boolean,
  string
];
export interface GetUploadHistoryResponseI {
  totalCount: number;
  list: {
    data: GetUploadHistoryDataItemT[];
    header: string[];
  };
}

export interface GetGraphResponseI {
  body: any;
  statusCode: string;
  statusCodeValue: number;
}

export interface AlertReplenishmentResponseI {
  status: number;
  message: string;
  data: any;
}
