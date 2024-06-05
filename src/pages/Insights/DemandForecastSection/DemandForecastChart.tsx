import { FC } from 'react';
import { FlexProps, Skeleton } from '@chakra-ui/react';
import { IInsight, insightSliceSelector } from 'state/pages/insights/insightState';
import { useSelector } from 'react-redux';
import InsightChart from '../InsightChart/InsightChart';
import AppText from 'components/AppText/AppText';

interface DemandForecastChartProps extends FlexProps {
  from: 'demandView' | 'insight';
}

const DemandForecastChart: FC<DemandForecastChartProps> = ({ from, ...rest }) => {
  const insightState: IInsight = useSelector(insightSliceSelector);
  return (
    <Skeleton
      w="full"
      height="500px"
      borderRadius="10px"
      isLoaded={!insightState.isLoading}
      fadeDuration={1}
      speed={1}
      {...rest}
    >
      <AppText size="16_600">Demand Forecast</AppText>
      <InsightChart
        reportData={insightState.demandForecastReportData}
        isEnableBenchmark={false}
        actualDataKey="actual_qty"
        projectionDataKey="proj_qty"
        leftMenuOpenWidth={from === 'insight' ? 'calc(((100vw - 350px)/2))' : 'full'}
      />
    </Skeleton>
  );
};

export default DemandForecastChart;
