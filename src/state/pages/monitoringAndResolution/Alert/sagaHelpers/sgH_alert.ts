import { IAlert } from '../alertState';

export enum AlertTypeEnum {
  OUT_OF_STOCK = 'outofstock',
  EXCESS_STOCK = 'excessstock',
  EXPIRATION_RISK = 'expirationrisk',
  GROWTH = 'growth',
  DE_GROWTH = 'degrowth'
}

export const getAlertCardData = (alertState: IAlert) => {
  const alertTypeList = alertState.alertSummaryList.list
    ?.find((alert) => alert.alertName === alertState.alertName)
    ?.alertDetails.map((alert) => alert.alertType);
  return alertState.defaultAlertTypes
    .filter((alert) => alertTypeList?.includes(alert.type) || alert.enable)
    .map(({ type, threshold, compareValue, enable }) => ({
      type,
      threshold,
      compareValue,
      enable
    }));
};
