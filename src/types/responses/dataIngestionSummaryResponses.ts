import { TableCellT } from "./viewResponses";

export interface TableHeader {
    w: number;
    displayValue: string;
    key: string;
    cellType?: TableCellT;
}

export type DataIngestionSummaryDataListT = [
    string,
    string,
    string,
    string | number | null,
    string | number | null,
    string | number | null
];

export interface GetDataIngestionSummaryI {
    header: string[];
    list: DataIngestionSummaryDataListT[];
    totalCount: number | 0;
    lastUpdate?: number;
}
