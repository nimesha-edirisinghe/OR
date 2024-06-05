import { TableHeader } from 'types/responses/viewResponses';

export interface PromotionSummaryViewSkuListItemI {
    sku: string;
    store: string;
    department: string;
    [date: string]: number | string | boolean | null;
}
  
export interface PromotionSummaryViewSkuResponseDataI {
    headers: TableHeader[] | string[];
    list: PromotionSummaryViewSkuListItemI[];
    totalCount: number;
    lastUpdate?: number;
    lastDataIngestion?: number;
}
