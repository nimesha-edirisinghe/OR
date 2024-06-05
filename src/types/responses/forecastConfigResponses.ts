export interface PageI {
  no: number;
  total: number;
}

export interface GroupDetailsI {
  groupName: string;
  groupKey: number;
  anchorCount: number;
  skuCount: number;
}

export interface FCDataI {
  traininConfiguration: string;
  influencingFactor: string;
  scheduled: string;
  trainedUpto: string;
  forecastedFrom: string;
  uuid: string;
  groupDetails: GroupDetailsI;
}

export interface FCApiResponse<T> {
  status: number;
  message: string;
  page: PageI;
  data: T;
}

export interface FCEstimatedTimeI {
  estimated_time: string;
}
