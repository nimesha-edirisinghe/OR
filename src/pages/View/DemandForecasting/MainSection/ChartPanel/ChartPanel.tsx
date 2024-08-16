import { FC } from 'react';
import DemandForecastChart from 'pages/View/DemandForecastChart/DemandForecastChart';
import { useSelector } from 'react-redux';
import { dfViewSliceSelector, IDFView } from 'state/pages/view/demandForecastView/dfViewPageState';

interface Props {
  chartHeight?: string;
}

const ChartPanel: FC<Props> = ({ chartHeight }) => {
  const dfViewState: IDFView = useSelector(dfViewSliceSelector);
  const selectedChartType = dfViewState.aggregateOption.selectedAggregateOption;
  const graphData = dfViewState.graphData;
  return (
    <DemandForecastChart
      reportData={graphData}
      chartHeight={chartHeight}
      selectedChartType={selectedChartType}
    />
  );
};

export default ChartPanel;
