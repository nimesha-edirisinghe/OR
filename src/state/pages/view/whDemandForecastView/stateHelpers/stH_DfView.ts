import { demandForecastChartType } from 'types/view';

export const getSelectedChartName = (selectedChartType: demandForecastChartType) => {
  let _selectedCName = null;
  switch (selectedChartType) {
    case 'aggregate':
      _selectedCName = 'Aggregated';
      break;
    case 'sku':
      _selectedCName = null;
      break;
  }
  return _selectedCName;
};

export const getTableColumnWidth = (columnIndex: number): number => {
  const _defaultWidth = 115;
  switch (columnIndex) {
    case 0:
      return 300;
    case 1:
      return 300;
    case 2:
    case 3:
      return 180;
    default:
      return _defaultWidth;
  }
};
