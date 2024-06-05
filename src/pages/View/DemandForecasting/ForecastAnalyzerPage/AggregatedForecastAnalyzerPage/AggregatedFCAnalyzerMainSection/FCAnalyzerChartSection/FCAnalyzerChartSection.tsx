import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import FCAnalyzerChart from '../../../FCAnalyzerCommonComponents/FCAnalyzerChart/FCAnalyzerChart';
import { ocean_blue_600 } from 'theme/colors';
import { AggregatedGraphResponseI } from 'types/responses/view/forecastAnalyzer';

interface Props {
  chartData: AggregatedGraphResponseI[] | null;
}

const FCAnalyzerChartSection: FC<Props> = ({ chartData }) => {
  return (
    <Box h="557px" w="full" bg={ocean_blue_600} borderRadius="8px" pt="40px" pl="10px" pr="10px">
      <FCAnalyzerChart reportData={chartData || []} visibleAvgSalesLegend={false} />
    </Box>
  );
};

export default FCAnalyzerChartSection;
