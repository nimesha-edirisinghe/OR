import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import FCAnalyzerChart from '../../../FCAnalyzerCommonComponents/FCAnalyzerChart/FCAnalyzerChart';
import { ocean_blue_600 } from 'theme/colors';
import { IndividualGraphResponseI } from 'types/responses/view/forecastAnalyzer';

interface Props {
  chartData: IndividualGraphResponseI[] | null;
}

const IndividualChartSection: FC<Props> = ({ chartData }) => {
  const historicalMin = chartData ? chartData[0]?.historicalMin : null;
  const historicalMax = chartData ? chartData[0]?.historicalMax : null;
  return (
    <Box h="393px" w="full" bg={ocean_blue_600} borderRadius="8px" pt="40px" pl="10px" pr="10px">
      <FCAnalyzerChart
        reportData={chartData || []}
        visibleAvgSalesLegend
        minValue={historicalMin}
        maxValue={historicalMax}
      />
    </Box>
  );
};

export default IndividualChartSection;
