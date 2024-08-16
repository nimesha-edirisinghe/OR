import { MoreOptionI } from 'types/alertConfig';

export const forecastOptions: MoreOptionI[] = [
  {
    title: 'View Selected Forecasts',
    key: 'view',
    isEnabled: false,
    path: ''
  },
  {
    title: 'Edit Selected Forecasts',
    key: 'edit',
    isEnabled: false,
    path: '/app/predictive-alerts/bulk-edit'
  },
  {
    title: 'Adjust to Threshold',
    key: 'adjust',
    isEnabled: false,
    path: ''
  },
  {
    title: 'Ignore alert',
    key: 'ignore',
    isEnabled: false,
    path: ''
  }
];

export const replenishmentOptions: MoreOptionI[] = [
  {
    title: 'View Selected Repl. Schedules',
    isEnabled: false,
    key: 'view',
    path: ''
  },
  {
    title: 'Edit Selected Repl. Schedules',
    key: 'edit',
    isEnabled: false,
    path: '/app/predictive-alerts/bulk-edit'
  },
  {
    title: 'Ignore alert',
    key: 'ignore',
    isEnabled: false,
    path: ''
  }
];
