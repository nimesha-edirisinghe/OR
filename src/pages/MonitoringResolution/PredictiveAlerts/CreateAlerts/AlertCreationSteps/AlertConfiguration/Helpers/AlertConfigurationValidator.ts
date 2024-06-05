import { AlertTypesI } from 'types/alertConfig';
import { ScheduleType } from 'types/responses/jobScheduleResponses';

export const isValidAlertConfigs = (alertTypes: AlertTypesI[]): any => {
  const enabledAlerts = alertTypes.filter((alert) => alert.enable);
  if (enabledAlerts.length === 0) {
    return { status: false, message: 'Please select at least one alert type' };
  }
  const isAllFilled = enabledAlerts.every((alert) => {
    if (alert.isPrimaryAlert) {
      return alert.compareValue !== '';
    } else {
      return alert.threshold !== '' && alert.compareValue !== '';
    }
  });
  if (!isAllFilled) {
    return { status: false, message: 'Please fill all selected alert config input fields' };
  } else {
    return { status: true };
  }
};

export const isPercentageValid = (inputValue: string) => {
  return inputValue === '' || /^(\d{1,2}(\.\d{0,2})?|100(\.0{0,2})?)$/.test(inputValue);
};

export const validateCompareValue = (inputValue: string, frequency: ScheduleType): boolean => {
  if (inputValue === '') {
    return true;
  }
  const numericValue = parseInt(inputValue, 10);

  if (isNaN(numericValue)) {
    return false;
  }

  const minRange = 1;
  let maxRange = 1;

  if (frequency === 'DAILY') {
    maxRange = 60;
  } else if (frequency === 'WEEKLY') {
    maxRange = 12;
  } else if (frequency === 'MONTHLY') {
    maxRange = 12;
  }

  return numericValue >= minRange && numericValue <= maxRange;
};
