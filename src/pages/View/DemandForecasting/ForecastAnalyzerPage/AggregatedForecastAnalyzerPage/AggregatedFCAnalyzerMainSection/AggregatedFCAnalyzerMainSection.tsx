import { FC } from 'react';
import { Box, HStack, VStack } from '@chakra-ui/react';
import ExclusionCriteriaSection from './ExclusionCriteriaSection/ExclusionCriteriaSection';
import AccuracySection from './AccuracySection/AccuracySection';
import AccuracyInfoSection from './AccuracyInfoSection/AccuracyInfoSection';
import SelectionSummarySection from './SelectionSummarySection/SelectionSummarySection';
import FCAnalyzerChartSection from './FCAnalyzerChartSection/FCAnalyzerChartSection';
import AggregatedAccuracyDistributionSection from './AggregatedAccuracyDistributionSection/AggregatedAccuracyDistributionSection';
import {
  IForecastAnalyzer,
  forecastAnalyzerSliceSelector
} from 'state/pages/view/forecastAnalyzer/forecastAnalyzerState';
import { useSelector } from 'react-redux';

interface Props {}

const AggregatedFCAnalyzerMainSection: FC<Props> = () => {
  const fcAnalyzerState: IForecastAnalyzer = useSelector(forecastAnalyzerSliceSelector);
  const {
    kpiAccuracyData,
    exclusionCriteriaList,
    skuDetails,
    aggregatedGraphData,
    accuracyDistributionData
  } = fcAnalyzerState;
  return (
    <HStack h="653px" w="full" spacing="20px">
      <VStack flex={2.1} h="full" spacing="16px">
        <Box h="80px" w="full">
          <AccuracySection accuracyData={kpiAccuracyData} />
        </Box>
        <Box h="557px" w="full">
          <FCAnalyzerChartSection chartData={aggregatedGraphData} />
        </Box>
      </VStack>
      <VStack flex={1} h="full" spacing="16px">
        <VStack h="220px" w="full" spacing="8px">
          <VStack h="182px" w="full" spacing="8px">
            <ExclusionCriteriaSection exCriteriaData={exclusionCriteriaList} />
          </VStack>
          <Box h="30px" w="full">
            <AccuracyInfoSection />
          </Box>
        </VStack>
        <Box h="231px" w="full">
          <AggregatedAccuracyDistributionSection chartData={accuracyDistributionData} />
        </Box>
        <Box h="170px" w="full">
          <SelectionSummarySection skuDetails={skuDetails} />
        </Box>
      </VStack>
    </HStack>
  );
};

export default AggregatedFCAnalyzerMainSection;
