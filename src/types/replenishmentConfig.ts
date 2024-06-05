import { ConfigType } from 'pages/AdvancedConfiguration/ReplenishmentConfiguration/PlanningConfigDrawer/ConfigTypeSelection';

export interface ReplenishmentConfigLocalI {
  planningConfigDrawer: boolean;
  planningRunNowDrawer: boolean;
  planningScheduleDrawer: boolean;
  selectedPlaningObj: RplConfigTableDataI;
  selectedPlanningPeriod: ConfigType;
  currentPageNo: number;
}

export interface RplConfigTableDataI {
  groupKey: number;
  orgKey: number;
  groupName: string;
  config: string;
  responseTimeGranularity: string;
  planningPeriod: number;
  forecastHorizon: number;
  skuCount: number;
  groupType: string;
  invPlanKey: number | null;
  forecastKey: number | null;
  scheduled: { total: number; active: number; inActive: number } | null;
  date: Date | null;
  uuid: string;
  groupDisplayName: string;
}

export interface ForecastAndInvPlanKeys {
  forecastKey: number | null | undefined;
  invPlanKey: number | null | undefined;
}

export interface RplParameterObjI {
  key: string;
  value: string;
  displayName: string;
}
