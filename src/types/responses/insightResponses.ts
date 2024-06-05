export interface ProjInvValuesI {
  sar: number;
  cw_pw_per: number | null | 'undefined';
  cw_pw_dir: '0' | '1';
  cy_sply_per: number | null | 'undefined';
  cy_sply_dir: '0' | '1';
}

export interface ProjInvTotValueOrderI {
  sar: number;
  cw_pw_per: number | null;
  cw_pw_dir: number | null;
  cy_sply_per: number | null;
  cy_sply_dir: number | null;
}

export interface ProjOutOfStockSKUI {
  sar: number;
  cw_pw_per: number | 'undefined';
  cw_pw_dir: '0' | '1';
  cy_sply_per: number | 'undefined';
  cy_sply_dir: '0' | '1';
}

export interface ProjLossSalesI {
  sar: number;
  cw_pw_per: number | null;
  cw_pw_dir: number | null;
  cy_sply_per: number | null;
  cy_sply_dir: number | null;
}

export interface ProjectionDataI {
  inventory_value: ProjInvValuesI;
  inv_total_value_order: ProjInvTotValueOrderI;
  oos_skus: ProjOutOfStockSKUI;
  loss_sales: ProjLossSalesI;
  startDate: string;
  endDate: string;
}

export interface FilterCountApiResponseI {
  group_warehouse: number;
  group_store: number;
  departments: number;
  subDepartments: number;
  classes: number;
  subClasses: number;
  products: number;
  warehouses: number;
  stores: number;
}
export interface KeyValueI {
  key: string;
  value: string;
  isSelected?: boolean;
  anchorProdKey?: boolean;
}

export interface FilterDataApiResponseI {
  list: KeyValueI[];
  totalCount: number;
}
