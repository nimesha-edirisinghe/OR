import { ERROR_MESSAGES } from 'constants/messages';
import { showErrorToast } from 'state/toast/toastState';
import { JobScheduleConfigurationI } from 'types/responses/jobScheduleResponses';

export const validateSchedulingData = (obj: JobScheduleConfigurationI): boolean => {
  const excludedKeys = [
    'executionDetails',
    'scheduleBatchId',
    'previousEnableStatus',
    'currentEnableStatus'
  ];

  for (const key in obj) {
    if (excludedKeys.includes(key)) {
      continue;
    }

    const value = obj[key];

    if (value === null) {
      showErrorToast(ERROR_MESSAGES.ERROR_MESSAGE_ALL_FIELDS_MANDATORY);
      return false;
    } else if (typeof value === 'object') {
      if (!validateSchedulingData(value)) {
        return false;
      }
    }
  }

  return true;
};

export const validateStartAndEndDates = (
  startDate: number | null,
  endDate: number | null
): boolean => {
  if (startDate === null || endDate === null) {
    return false;
  }
  if (endDate < startDate) {
    showErrorToast(ERROR_MESSAGES.DATE_VALIDATION_ERROR_MESSAGE);
    return false;
  }

  return true;
};

export const validateSchedulingAllField = (
  obj: JobScheduleConfigurationI,
  startDate: number | null,
  endDate: number | null
): boolean => {
  if (startDate || endDate || obj.scheduleConfiguration.frequency) {
    return true;
  }

  return false;
};
