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
  FIRST_STEP = 'Filter',
  SECOND_STEP = 'Anchor Locations',
  THIRD_STEP = 'Influencing Factors',
  FOURTH_STEP = 'Save'
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
  AGGREGATED = 'aggregate',
  INDIVIDUAL = 'single'
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

export enum AlertSelectionEnum {
  INDIVIDUAL = 'individual',
  MULTIPLE = 'multiple'
}
export enum ExternalUrlKeyEnum {
  TABLEAU_BASE_URL = 'tableauBaseUrl',
  INVENTORY_AVAILABILITY = 'inventoryAvailability',
  SALES_INSIGHT = 'salesInsight',
  VL_BASE_URL = 'vlBaseUrl',
  VL_API_BASE_URL = 'vlApiBaseUrl',
  VL_TASK_API_URL = 'vlTaskApiUrl',
  REPLENISHMENT_SUMMARY = 'replenishmentSummary',
  FORECAST_SUMMARY = 'forecastSummary',
  VIEW_PLANS = 'viewPlans',
  TRACK_ORDERS = 'trackOrders'
}

export enum TableauReportModuleEnum {
  SALES_INSIGHT = 'salesInsight',
  INVENTORY_AVAILABILITY = 'inventoryAvailability'
}
export enum WHReplTypeEnum {
  INDIVIDUAL = 'INDIVIDUAL',
  BULK = 'BULK'
}

export enum AccessPermissionEnum {
  VIEW = 'view',
  EDIT = 'edit',
  EXECUTE = 'execute',
  SCHEDULE = 'schedule'
}

export enum MenuItems {
  HOME = 'Home',
  INSIGHTS = 'Insights',
  INVENTORY_AND_AVAILABILITY_DASHBOARD = 'Inventory and Availability Dashboard',
  SALES_AND_FORECAST_DASHBOARD = 'Sales and Forecast Dashboard',
  REPLENISHMENT_SUMMARY = 'Replenishment Summary',
  FORECAST_SUMMARY = 'Forecast Summary',
  PREDICTIVE_ALERTS = 'Predictive Alerts',
  DEMAND_FORECASTS = 'Demand Forecasts',
  DISCOUNTS_AND_PROMOTIONS = 'Discounts & Promotions',
  STORE_FORECASTS = 'Store Forecasts',
  WAREHOUSE_FORECASTS = 'Warehouse Forecasts',
  REPLENISHMENT_RECOMMENDATIONS = 'Replenishment Recommendations',
  ORDER_PARAMETERS = 'Order Parameters',
  STORE_REPLENISHMENT_AND_DSD = 'Store Replenishment and DSD',
  WH_ORDERING = 'WH Ordering',
  DISTRIBUTION_NETWORK = 'Distribution Network',
  PRODUCTS = 'Products',
  NEW_PRODUCT_ACTIVATION = 'New Product Activation',
  PRODUCT_DISCONTINUATION = 'Product Discontinuation',
  STORES = 'Stores',
  NEW_STORE_ACTIVATION = 'New Store Activation',
  STORE_DISCONTINUATION = 'Store Discontinuation',
  ORDER_REVIEW_AND_APPROVAL = 'Order Review and Approval',
  VIEW_PLANS_AND_REQUEST_ORDERS = 'View Plans and Request Orders',
  TRACK_ORDER_REQUESTS = 'Track Order Requests',
  MONITORING = 'Monitoring',
  DATA_INGESTION = 'Data Ingestion',
  ALGORITHM_EXECUTION = 'Algorithm Execution',
  SETTINGS = 'Settings',
  ANCHOR_CONFIGURATION = 'Anchor Configuration',
  GROUP_CONFIGURATION = 'Group Configuration',
  FORECASTING_SETUP_AND_SCHEDULING = 'Forecasting Setup and Scheduling',
  REPLENISHMENT_SETUP_AND_SCHEDULING = 'Replenishment Setup and Scheduling',
  ALERT_CREATION = 'Alert Creation'
}
