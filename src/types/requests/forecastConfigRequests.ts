export interface RequestBodyI {
  orgKeys: number[];
  groupName: string;
}

export interface FCRequestQueryParamI {
  limit: number;
  page?: number;
}

export interface FCSettingQueryParamsI {
  orgKey: number;
  groupKey: number | undefined;
}

export interface FCSaveRequestQueryParamI {
  orgKey: number;
  groupKey: number | undefined;
  configStatus: string;
}

export interface FCgetAnchorPredictorQueryParamI {
  orgKey: number;
  groupKey: number | undefined;
}

export interface FCSaveAnchorPredI {
  configType: string;
  predictorCode: number;
  predictorName: string;
  predictorValue: number;
}

export interface FCRunNowReqPayloadI {
  anchorCount?: number;
  groupKey?: number;
  jobGroupName?: string;
  jobGroupType: number;
  orgKey: number;
  forecastKey?: number | null;
  invPlanKey?: number | null;
  skuCount?: number;
  execType?: 'On-Request' | 'Scheduled';
}

export interface FCGetEstimatedTimeQueryParamI {
  groupKey?: number;
  jobGroupType: number;
  orgKey: number;
  skuCount?: number;
  anchorCount?: number;
}
