export interface RplParameterHeaderI {
  [key: string]: string;
}

export interface RplParameterSummaryListI {
  sku: string;
  location: string;
  department: string;
  vendor: number | string | null;
  wayOfSupply: string;
  warehouse: string;
  unitBuyingPrice: number;
  leadTime: number;
  maxLeadTime: number;
  orderingFrequency: number;
  daysOfCover: number;
  MOQ: number;
  supplyPackSize: number;
}

export interface RplParameterSummaryResponseI {
  headers: RplParameterHeaderI;
  lastUpdate: number;
  totalCount: number;
  list: RplParameterSummaryListI[];
}
