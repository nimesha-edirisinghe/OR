export enum HotListIndicators {
  ALL = 'All',
  KVI = 'KVI items',
  COLD = 'Cold items',
  WARM = 'Warm Items',
  OTHERS = 'Undefined items'
}

export enum JobGroupTypes {
  TRAINING = 1,
  FORECASTING = 2,
  INV_PLAN_GENERATION = 3,
  TRAINING_AND_FORECASTING = 4,
  WAREHOUSE_FORECAST = 7
}

export enum ActivityLogFilterDateTypesEnum {
  ALL_TIME = 1,
  LAST_24_WEEKS = 2,
  LAST_WEEK = 3,
  LAST_MONTH = 4,
  CUSTOM = 5
}

export enum JobExecutionTypesEnum {
  ON_REQUEST = 'On-Request',
  SCHEDULED = 'Scheduled'
}

export enum InfluencingFactorTypesEnum {
  SKU = 'sku',
  ANCHOR = 'anchor'
}

export enum GroupTypesEnum {
  STORE = 'store',
  WAREHOUSE = 'warehouse'
}

export enum CreateGroupStepsEnum {
  FIRST_STEP = 'Anchor Locations',
  SECOND_STEP = 'Influencing Factors',
  THIRD_STEP = 'Save'
}

export enum AlertCreationStepsEnum {
  FIRST_STEP = 'Filter',
  SECOND_STEP = 'Select',
  THIRD_STEP = 'Configure'
}

export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN'
}

export enum FCAnalyzerTypeEnum {
  AGGREGATED = 'aggregated',
  INDIVIDUAL = 'individual'
}

export enum AlertTableViewTypeEnum {
  INDIVIDUAL = 'INDIVIDUAL',
  VIEW_ALL = 'VIEW_ALL'
}

export enum AlertReplenishmentActionTypeEnum {
  CREATE = 'create',
  EDIT = 'edit',
  DELETE = 'delete',
  UNCHANGED = 'unChanged'
}
export enum ForecastType {
  INDIVIDUAL = 0,
  AGGREGATE = 1
}
