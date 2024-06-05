export interface GetRplConfigQueryParamI {
  groupSearch: string;
  page: number;
  orgKey: number;
  limit: number;
}

export interface SaveRplPlanningBodyI {
  forecastKey: number | null | undefined;
  groupKey: number | undefined;
  invPlanKey: number | null | undefined;
  orgKey: number;
  planningPeriod: number;
}
