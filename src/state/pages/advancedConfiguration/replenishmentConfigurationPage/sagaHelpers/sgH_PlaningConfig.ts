import { showErrorToast } from 'state/toast/toastState';
import { ForecastAndInvPlanKeys } from 'types/replenishmentConfig';
import { JobGroupTypes } from 'utils/enum';

export const getReplenishmentJobGroupType = (groupType: string | undefined): JobGroupTypes => {
  switch (groupType) {
    case 'Store':
      return JobGroupTypes.INV_PLAN_GENERATION;
    default:
      return JobGroupTypes.WAREHOUSE_FORECAST;
  }
};

export const validateForecastAndInvPlanKeys = (keys: ForecastAndInvPlanKeys): boolean => {
  const { forecastKey, invPlanKey } = keys;
  if (forecastKey === null || forecastKey === undefined || forecastKey === 0) {
    showErrorToast('Invalid Forecast Configuration');
    return false;
  }
  if (invPlanKey === null || invPlanKey === undefined || invPlanKey === 0) {
    showErrorToast('Invalid Inventory Plan Configuration');
    return false;
  }
  return true;
};
