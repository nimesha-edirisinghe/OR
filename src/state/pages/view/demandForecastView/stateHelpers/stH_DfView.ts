import { InfluencingFactorTypes } from 'types/groupConfig';
import { DFPredictorI } from 'types/responses/viewResponses';
import { demandForecastChartType } from 'types/view';

export const getSelectedChartName = (
  selectedChartType: demandForecastChartType,
  aggregateOption: {
    selectedAggregateOption: demandForecastChartType;
    compareSelection: string | null;
    predictorType: InfluencingFactorTypes | null;
  },
  predictorList: DFPredictorI | null
) => {
  let _selectedCName = null;
  switch (selectedChartType) {
    case 'aggregate':
      _selectedCName = 'Aggregated';
      break;
    case 'anchor':
      _selectedCName = 'Anchor Forecast';
      break;
    case 'history':
      _selectedCName = aggregateOption.compareSelection == '2' ? '1 Year back' : '2 Years back';
      break;
    case 'influencingFactor':
      _selectedCName =
        predictorList?.list.find(
          (predictor) => predictor.predictorCode.toString() === aggregateOption.compareSelection
        )?.predictorName || 'Influencing Factor';
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
    case 2:
    case 3:
      return 180;
    default:
      return _defaultWidth;
  }
};
