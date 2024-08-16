export const WARNING_MESSAGES = {
  PLEASE_SELECT_OPERATION: 'Please select an operation to run'
};

export const SUCCESS_MESSAGES = {
  SUCCESSFULLY_SAVED: 'Successfully Saved',
  SUCCESSFULLY_SAVED_PREDICTORS: 'Predictors has been saved Successfully',
  FILTER_RESET_COMPLETED: 'Filter Reset completed',
  RESET_SUCCESSFULLY_COMPLETED: 'Reset successful',
  CHANGE_SUCCESSFULLY_SAVED: 'Changes have been successfully saved'
};

export const ERROR_MESSAGES = {
  ERROR_MESSAGE_ALL_FIELDS_MANDATORY: 'All the fields are mandatory and cannot be empty.',
  DATE_VALIDATION_ERROR_MESSAGE: 'End date should be greater than to the start date.',
  START_DATE_VALIDATION_ERROR_MESSAGE: 'Start date should be greater than current date.',
  ERROR_SPECIFY_GRANULARITY: 'Please specify the granularity for all influencing factors.',
  ERROR_SELECT_ANCHOR: 'Please assign at least 1 Anchor-location',
  ALERT_CONFIGURATION_REQUIRED: 'Please configure at least one alert type.',
  ALERT_NAME_MANDATORY: 'Alert title is mandatory.',
  SKU_LOCATION_SELECTION_REQUIRED: 'Please select at least one SKU-location',
  SELECT_AT_LEAST_ONE_SKU_LOCATION: 'Please select at least one SKU-location',
  ERROR_MESSAGE_HORIZON:'Forecast Horizon must be greater than 0'
};

export const INSTRUCTION_MESSAGES = {
  GRANULARITY_LEVEL_FOR_APPLICABLE_INFLUENCING_FACTORS:
    'Specify the level of granularity at which the influencing factors will be applicable to the group.',
  EMPTY_GROUP_PANEL_MESSAGE: `Groups will give you the ability to organize Anchor/ SKU locations together based on your specific business and technical requirements. Let's create your first group!`,
  STORE_GROUP_MESSAGE:'Provide the Group Name, Forecasting frequency, and horizon to create the Group',
  STORE_FILTER_MESSAGE:'You can find the required Anchor locations easily by applying filters based on product and location hierarchies.',
  STORE_ANCHOR_LOCATION_MESSAGE:'Select the Anchor-locations that will be assigned to the Group.'
};

export const DOWNLOAD_SUCCESS_MESSAGE = 'Successfully downloaded';
