import { FCAnalyzerTypeEnum } from 'utils/enum';
import { TableHeader } from '../viewResponses';

export interface AccuracyDataI {
  heading: string;
  values: string;
}

export interface AccuracyI {
  overallAccuracy: AccuracyDataI;
  averageAccuracy: AccuracyDataI;
  averageDeviation: AccuracyDataI;
}

export interface AccuracyResponseI {
  accuracy: AccuracyI;
  accuracyDistribution: AccuracyDistributionResponseI;
  exclusionCriteria: ExclusionCriteriaResponseI;
}

export interface IndividualGraphResponseI {
  date: string;
  actual: number;
  forecasted: number;
  avgSales: number;
  historicalMin: number;
  historicalMax: number;
}

export interface AggregatedGraphResponseI {
  date: string;
  actual: number;
  forecasted: number;
}

export interface ExclusionCriteriaResponseI {
  peaksAndDrops: number;
  zeroSales: number;
  outOfStock: number;
  discountDiff: number;
  newProduct: number;
}

export interface PlannedActualResponseI {
  date: string;
  plannedDiscount: number;
  actualDiscount: number;
  outOfStockDays: string;
}

export interface PlannedActualObjI {
  headers: TableHeader[];
  list: { id?: any; isSelected?: boolean; row: any[] }[] | null;
}

export interface KPIResponseI {
  averageSales: number;
  medianSales: number;
  minHistoricalDiscount: number;
  maxHistoricalDiscount: number;
  dataLength: number;
  totalSku: number;
  totalOutOfStockSku: number;
  totalSkuWithDiscount: number;
  newSku: number;
  frequency: string;
}

export interface FCAnalyzerSkuResponseI {
  sku: string;
  store: string;
  department: string;
  anchor: string;
  validationPeriod: string;
}

export interface AccuracyDistributionResponseI {
  high: number;
  average: number;
  low: number;
}

export type ORIGIN_PAGE = 'df' | 'alert' | 'demandForecastGrid';
export interface FcAnalyzerLocalScopeI {
  selectedAnalyzerType: FCAnalyzerTypeEnum;
  originPage: ORIGIN_PAGE;
}
