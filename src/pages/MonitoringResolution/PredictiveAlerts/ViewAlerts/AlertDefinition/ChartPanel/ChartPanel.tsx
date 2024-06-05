import { FC } from 'react';
import { useSelector } from 'react-redux';
import { alertSliceSelector, IAlert } from 'state/pages/monitoringAndResolution/Alert/alertState';
import AlertForecastChart from '../AlertForecastChart/AlertForecastChart';

interface Props {
  chartHeight?: string;
}

const ChartPanel: FC<Props> = ({ chartHeight }) => {
  const alertState: IAlert = useSelector(alertSliceSelector);
  const selectedChartType = alertState.selectedChartType;
  const graphData = alertState.graphData;
  return (
    <AlertForecastChart
      reportData={graphData}
      chartHeight={chartHeight}
      selectedChartType={selectedChartType}
    />
  );
};

export default ChartPanel;
