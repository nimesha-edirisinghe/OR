import { AlertTypesI } from 'types/alertConfig';

export enum AlertFirstDescriptionsEnum {
  OUT_OF_STOCK_ALERT_FIRST_DESC = 'Alert if current stock is less than the forecasted demand for the specified number of days (irrespective of pending orders)',
  EXCESS_STOCK_RISK_ALERT_FIRST_DESC = 'Alert if current stock is more than the forecasted demand for the specified number of days (irrespective of pending orders)',
  EXPIRATION_RISK_ALERT_FIRST_DESC = 'Alert if at least a portion of the current stock has high risk of becoming unsellable. Unsellable date is defined as specified number of days prior to the expiration date.',
  OVERGROWTH_ALERT_FIRST_DESC = 'Compare the specified period of forecast against the same period of the previous year'
}

export enum AlertSecondDescriptionsEnum {
  OVERGROWTH_ALERT_SECOND_DESC = 'Alert if forecasted average is greater than the historical average by the specified percentage',
  UNDERGROWTH_ALERT_SECOND_DESC = 'Alert if forecasted average is less the historical average by the specified percentage'
}

export const defaultAlertTypeList: AlertTypesI[] = [
  {
    type: 'outofstock',
    name: 'Out of Stock',
    enable: false,
    compareValue: '',
    threshold: '',
    isPrimaryAlert: true,
    firstDescription: AlertFirstDescriptionsEnum.OUT_OF_STOCK_ALERT_FIRST_DESC,
    isSelected: false,
    error: null
  },
  {
    type: 'excessstock',
    name: 'Excess Stock',
    enable: false,
    compareValue: '',
    threshold: '',
    isPrimaryAlert: true,
    firstDescription: AlertFirstDescriptionsEnum.EXCESS_STOCK_RISK_ALERT_FIRST_DESC,
    isSelected: false,
    error: null
  },
  {
    type: 'expirationrisk',
    name: 'Expiration Risk',
    enable: false,
    compareValue: '',
    threshold: '',
    isPrimaryAlert: true,
    firstDescription: AlertFirstDescriptionsEnum.EXPIRATION_RISK_ALERT_FIRST_DESC,
    isSelected: false,
    error: null
  },
  {
    type: 'growth',
    name: 'Growth',
    enable: false,
    compareValue: '',
    threshold: '',
    isPrimaryAlert: false,
    firstDescription: AlertFirstDescriptionsEnum.OVERGROWTH_ALERT_FIRST_DESC,
    secondDescription: AlertSecondDescriptionsEnum.OVERGROWTH_ALERT_SECOND_DESC,
    isSelected: false,
    error: null
  },
  {
    type: 'degrowth',
    name: 'Degrowth',
    enable: false,
    compareValue: '',
    threshold: '',
    isPrimaryAlert: false,
    firstDescription: AlertFirstDescriptionsEnum.OVERGROWTH_ALERT_FIRST_DESC,
    secondDescription: AlertSecondDescriptionsEnum.UNDERGROWTH_ALERT_SECOND_DESC,
    isSelected: false,
    error: null
  }
];
