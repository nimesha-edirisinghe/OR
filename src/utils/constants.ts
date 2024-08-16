import { moreOptionItems } from 'pages/View/DemandForecasting/ForecastingHeader/MoreOptionContent';
import { AlertTypeEnum } from 'state/pages/monitoringAndResolution/Alert/sagaHelpers/sgH_alert';
import { AlertTypesT } from 'types/alertConfig';
import { ConfigurationI } from 'types/forecastConfig';
import { WeekDay } from 'types/jobSchedule';
import { TableHeader } from 'types/responses/viewResponses';

export const SESSION_STORAGE_KEY = 'sessionId';
export const FORECAST_CONFIG_PAGE_DATA_SIZE = 10;

export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

// Define Forecast Configuration Settings Array Object with all keys and values
export const fCSettings: ConfigurationI = {
  ml_dl_algorithms: ['ML', 'prophet', 'DL'],
  smoothing_algorithms: [
    'moving_average',
    'simple_average',
    'holt_winters',
    'loess',
    'naive',
    'stochastic_smoothing'
  ],
  parametric_algorithms: ['sarima'],
  ensemble_algorithms: ['weighted_ensemble', 'blending_ensemble', 'stacking_ensemble']
};

export const FILTER_PAGE_SIZE = 100;
export const ACTIVITY_LOG_PAGE_SIZE = 10;
export const STORE_GROUP_PAGE_SIZE = 50;
export const ALERT_VIEW_PAGE_SIZE = 10;
export const VIEW_FORECAST_SKU_PAGE_SIZE = 100;
export const DEMAND_FORECAST_PREDICTOR_LIMIT = 50;
export const REPLENISHMENT_CONFIG_PAGE_SIZE = 10;
export const BULK_EDIT_HISTORY_TABLE_PAGE_SIZE = 10;
export const ORDER_PARAMETER_TABLE_PAGE_SIZE = 15;
export const DATA_INGESTION_SUMMARY_TABLE_PAGE_SIZE = 200;
export const PROMOTION_SUMMARY_TABLE_PAGE_SIZE = 15;
export const STORE_ACTIVATION_PAGE_SIZE = 10;

export const weekDays: WeekDay[] = [
  { id: 1, label: 'M', value: 'Monday' },
  { id: 2, label: 'T', value: 'Tuesday' },
  { id: 3, label: 'W', value: 'Wednesday' },
  { id: 4, label: 'T', value: 'Thursday' },
  { id: 5, label: 'F', value: 'Friday' },
  { id: 6, label: 'S', value: 'Saturday' },
  { id: 7, label: 'S', value: 'Sunday' }
];

export const END_OF_DAY_TIMESTAMP_SECONDS = 86399;

export const INVENTORY_ALERT_TYPES: AlertTypesT[] = [AlertTypeEnum.GROWTH, AlertTypeEnum.DE_GROWTH];

export const bulkEditInstructions = [
  {
    id: 1,
    label: 'Ensure every field in the template has a valid input to avoid upload errors.'
  },
  {
    id: 2,
    label:
      'Enter the amended values in the Amended Forecast column, leaving all other columns unchanged. '
  },
  {
    id: 3,
    label:
      'Ensure the Amended Forecast column contains numeric values that are equal to or greater than 0'
  },
  {
    id: 4,
    label:
      'Remove all rows where the Amended Forecast column is empty before uploading the file back to the system'
  }
];

export const rplBulkEditInstructions = [
  {
    id: 1,
    label: 'Ensure every field in the template has a valid input to avoid upload errors.'
  },
  {
    id: 2,
    label:
      'Enter the amended values in the Amended Order Date,	Amended Delivery Date, and Amended Quantity columns, leaving all other columns unchanged. '
  },
  {
    id: 3,
    label:
      'Ensure the Amended Quantity column contains numeric values that are equal to or greater than 0'
  },
  {
    id: 4,
    label: 'To remove a specific order from the schedule, set the Amended Quantity to 0.'
  },
  {
    id: 5,
    label:
      'To add a new order, insert a new row into the template. Make sure to fill in the Group Code, SKU Code, Location Code, Amended Order Date, Amended Delivery Date, and Amended Quantity.'
  },
  {
    id: 6,
    label:
      'Remove all rows where the Amended Quantity column is empty before uploading the file back to the system'
  }
];
export const bulkEditHowToWorkInfo = [
  {
    id: 1,
    label: 'Download the Template'
  },
  {
    id: 2,
    label: 'Edit the forecast values for respective SKU-locations'
  },
  {
    id: 3,
    label: 'Upload the template'
  },
  {
    id: 4,
    label: 'Validate'
  }
];
export const replStoreBulkEditHowToWorkInfo = [
  {
    id: 1,
    label: 'Download the Template'
  },
  {
    id: 2,
    label: 'Edit the values for respective SKU-locations'
  },
  {
    id: 3,
    label: 'Upload the template'
  },
  {
    id: 4,
    label: 'Validate'
  }
];

export const moreOptionItemList = [
  {
    id: 1,
    value: 'Edit Selected Forecasts',
    path: '/app/demand-forecast/bulk-edit'
  },
  {
    id: 2,
    value: 'Adjust to Threshold'
  },
  {
    id: 3,
    value: 'Ignore alert'
  }
];
export const storeReplBulkMoreOptionItemList: moreOptionItems[] = [
  {
    id: 1,
    iconName: 'edit',
    value: 'Edit Selected Repl. Schedules',
    path: '/app/replenishment-planning/bulk-edit'
  },
  {
    id: 2,
    iconName: 'ignore',
    value: 'Ignore alert'
  }
];
export const storeReplSingleMoreOptionItemList: moreOptionItems[] = [
  {
    id: 1,
    iconName: 'edit',
    value: 'Edit this Repl. Schedule'
  },
  {
    id: 2,
    iconName: 'ignore',
    value: 'Ignore alert'
  },
  {
    id: 3,
    iconName: 'report',
    value: 'Report'
  }
];
export const whReplBulkMoreOptionItemList: moreOptionItems[] = [
  {
    id: 1,
    iconName: 'edit',
    value: 'Edit Selected Repl. Schedules',
    path: '/app/wh-replenishment/bulk-edit'
  },
  {
    id: 2,
    iconName: 'ignore',
    value: 'Ignore Alert'
  }
];
export const whReplSingleMoreOptionItemList: moreOptionItems[] = [
  {
    id: 1,
    iconName: 'edit',
    value: 'Edit this Repl. Schedule'
  },
  {
    id: 2,
    iconName: 'ignore',
    value: 'Ignore alert'
  },
  {
    id: 3,
    iconName: 'report',
    value: 'Report'
  }
];

export const uploadHistoryTableHeaders: TableHeader[] = [
  { displayValue: 'File', key: 'file', w: 198, cellType: 'generalCell' },
  { displayValue: 'Uploaded by', key: 'uploadedBy', w: 104, cellType: 'generalCell' },
  { displayValue: 'Date & Time', key: 'date', w: 136, cellType: 'generalCell' },
  { displayValue: 'Group', key: 'group', w: 154, cellType: 'generalCell' },
  { displayValue: 'SKU-locations', key: 'skuLocation', w: 116, cellType: 'generalCell' },
  { displayValue: 'Status', key: 'status', w: 126, cellType: 'indicatorCell' },
  { displayValue: 'Download', key: 'download', w: 88, cellType: 'actionIconCell' }
];

export const dataIngestionSummaryViewTableHeader: TableHeader[] = [
  { displayValue: 'ID', key: 'id', w: 75, cellType: 'generalCell' },
  { displayValue: 'Activity', key: 'activity', w: 250, cellType: 'generalCell' },
  { displayValue: 'Status', key: 'status', w: 136, cellType: 'indicatorCell' },
  { displayValue: 'Start Date', key: 'startDate', w: 154, cellType: 'generalCell' },
  { displayValue: 'End Date', key: 'endDate', w: 116, cellType: 'generalCell' },
  { displayValue: 'Elapsed Time', key: 'elapsedTime', w: 126, cellType: 'generalCell' }
];

export const replenishmentParameterSummaryTableHeader: TableHeader[] = [
  { displayValue: 'SKU', key: 'sku', w: 300, cellType: 'generalCell' },
  { displayValue: 'Location', key: 'location', w: 180, cellType: 'generalCell' },
  { displayValue: 'Department', key: 'department', w: 180, cellType: 'generalCell' },
  { displayValue: 'Vendor', key: 'vendor', w: 180, cellType: 'generalCell' },
  { displayValue: 'Ways of Supply', key: 'wayOfSupply', w: 80, cellType: 'generalCell' },
  { displayValue: 'Warehouse', key: 'warehouse', w: 80, cellType: 'generalCell' },
  {
    displayValue: 'Unit Buying Price',
    key: 'unitBuyingPrice',
    w: 100,
    cellType: 'generalCell'
  },
  { displayValue: 'Avg. Lead Time (days)', key: 'leadTime', w: 100, cellType: 'generalCell' },
  {
    displayValue: 'Max. Lead Time Variance (days)',
    key: 'maxLeadTime',
    w: 100,
    cellType: 'generalCell'
  },
  {
    displayValue: 'Ordering Freq. (days)',
    key: 'orderingFrequency',
    w: 100,
    cellType: 'generalCell'
  },
  {
    displayValue: 'Days of Cover (days)',
    key: 'daysOfCover',
    w: 100,
    cellType: 'generalCell'
  },
  {
    displayValue: 'MOQ (units)',
    key: 'MOQ',
    w: 100,
    cellType: 'generalCell'
  },
  {
    displayValue: 'Supply Pack Size (units)',
    key: 'supplyPackSize',
    w: 100,
    cellType: 'generalCell'
  },
  {
    displayValue: 'Shelf Life',
    key: 'shelfLife',
    w: 100,
    cellType: 'generalCell'
  }
];

export const PRODUCT_ACTIVATION_TABLE_PAGE_SIZE = 15;
export const MAX_ALERT_DATA_COUNT = 1000;
