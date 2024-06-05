import { FC } from 'react';
import DemandForecastChart from 'pages/View/DemandForecastChart/DemandForecastChart';
import { useSelector } from 'react-redux';
import {
  whDfViewSliceSelector,
  IWhDFView
} from 'state/pages/view/whDemandForecastView/whDfViewPageState';

interface Props {
  chartHeight?: string;
}

const ChartPanel: FC<Props> = ({ chartHeight }) => {
  const dfWhViewState: IWhDFView = useSelector(whDfViewSliceSelector);
  const selectedChartType = dfWhViewState.selectedChartType;
  const graphData = dfWhViewState.graphData;
  return (
    <DemandForecastChart
      reportData={graphData}
      chartHeight={chartHeight}
      selectedChartType={selectedChartType}
    />
  );
};

export default ChartPanel;
