import { VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { ocean_blue_600 } from 'theme/colors';
import AccuracyDistributionBarChart from '../../../FCAnalyzerCommonComponents/AccuracyDistributionBarChart/AccuracyDistributionBarChart';
import AppText from 'components/newTheme/AppText/AppText';
import { AccuracyDistributionResponseI } from 'types/responses/view/forecastAnalyzer';
import { transformAccDistributionObj } from '../../../helper';

interface Props {
  chartData: AccuracyDistributionResponseI | null;
}

const AggregatedAccuracyDistributionSection: FC<Props> = ({ chartData }) => {
  const formattedData = transformAccDistributionObj(chartData as any);
  return (
    <VStack
      h="231px"
      w="full"
      bg={ocean_blue_600}
      borderRadius="8px"
      py="16px"
      pl="16px"
      align="start"
      spacing="16px"
    >
      <AppText size="h5Semibold">Overall Accuracy Distribution</AppText>
      <AccuracyDistributionBarChart data={formattedData} />
    </VStack>
  );
};

export default AggregatedAccuracyDistributionSection;
