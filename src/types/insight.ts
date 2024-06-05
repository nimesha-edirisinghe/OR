import { RightPanelRetainDataList } from './requests/insightRequest';
import { KeyValueI } from './responses/insightResponses';

export interface RequestQueryParamsI {
  orgKey: number;
  startDate?: string;
  endDate?: string;
}

export interface SummaryI {
  departments: number;
  subDepartments: number;
  activeProducts: number;
  warehouses: number;
  stores: number;
  lastRefresh: number;
  nextRefresh: number;
}

export interface InventoryReportDataI {
  date: string;
  actual_val: number | null;
  actual_qty: number | null;
  proj_qty: number | null;
  proj_val: number | null;
  benchmark_at_dep: number | null;
  benchmark_sply: number | null;
}

export interface OoSReportDataI {
  date: string;
  actual_val: number | null;
  actual_qty: number | null;
  proj_qty: number | null;
  proj_val: number | null;
  benchmark_at_dep: number | null;
  benchmark_sply: number | null;
}

export interface InsightReportDataI {
  date: string;
  actual_val: number | null;
  proj_val: number | null;
  actual_qty: number | null;
  proj_qty: number | null;
  benchmark_dep: number | null;
  benchmark_sply: number | null;
  benchmark_qty_dep: number | null;
  benchmark_qty_sply: number | null;
}

export interface DemandForecastCardDataI {
  forecastedTotalDemand: {
    sar: number;
    cw_pw_per: number | 'undefined';
    cw_pw_dir: '0' | '1';
    cy_sply_per: number | 'undefined';
    cy_sply_dir: '0' | '1';
  };
  avgForecastingError: {
    sar: null | number;
    cw_pw_per: number | 'undefined';
    cw_pw_dir: null;
    cy_sply_per: null;
    cy_sply_dir: null;
  };
}

export interface LocalProductHierarchy {
  departments: [] | KeyValueI[];
  subDepartments: [] | KeyValueI[];
  classes: [] | KeyValueI[];
  subClasses: [] | KeyValueI[];
  products: [] | KeyValueI[];
}

export interface FilterLocalScopeI {
  isOpenFilterDrawer: boolean;
  isOpenItemSelectionDrawer: boolean;
  isSelectedWarehouse: boolean;
  isSelectedSore: boolean;
  rightPanelRetainDataList: RightPanelRetainDataList;
  beforeEditFilterOptionsLevel1: RightPanelRetainDataList;
  beforeEditFilterOptionsLevel2: RightPanelRetainDataList;
  isFilterSearchActive: boolean;
  minDate: string;
  maxDate: string;
}

export type FilterDataT =
  | 'store_group'
  | 'wh_group'
  | 'department'
  | 'subDepartment'
  | 'class'
  | 'subClass'
  | 'product'
  | 'location_store'
  | 'location_wh'
  | '';

export type FilterMode = 'DEFAULT' | 'REPLENISHMENT_VIEW';

export type StoreWarehouseBtnT = 'store' | 'warehouse';
export type DrawerTitleT =
  | 'Store'
  | 'Warehouse'
  | 'Department'
  | 'Sub Department'
  | 'Class'
  | 'Sub Class'
  | 'Products';
