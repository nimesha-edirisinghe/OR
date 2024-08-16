import { FC } from 'react';
import { Box, HStack, VStack } from '@chakra-ui/react';
import AccuracySection from './AccuracySection/AccuracySection';
import ExclusionCriteriaSection from './ExclusionCriteriaSection/ExclusionCriteriaSection';
import AccuracyInfoSection from './AccuracyInfoSection/AccuracyInfoSection';
import SelectionSummarySection from './SelectionSummarySection/SelectionSummarySection';
import KPISection from './KPISection/KPISection';
import SKUWithAnchorSection from './SKUWithAnchorSection/SKUWithAnchorSection';
import IndividualChartSection from './IndividualChartSection/IndividualChartSection';
import IndividualAccuracyDistributionSection from './IndividualAccuracyDistributionSection/IndividualAccuracyDistributionSection';
import PlannedVsActualSection from './PlannedVsActualSection/PlannedVsActualSection';
import {
  IForecastAnalyzer,
  forecastAnalyzerSliceSelector
} from 'state/pages/view/forecastAnalyzer/forecastAnalyzerState';
import { useSelector } from 'react-redux';
import { exclusionCriteriaFormatter } from '../../AggregatedForecastAnalyzerPage/AggregatedFCAnalyzerMainSection/helper';

interface Props {}

const MainSection: FC<Props> = () => {
  const fcAnalyzerState: IForecastAnalyzer = useSelector(forecastAnalyzerSliceSelector);
  const { kpiAccuracyData, skuDetails, kpiData, individualGraphData, plannedActualList } =
    fcAnalyzerState;
  const exclusionCriteria = kpiAccuracyData?.exclusionCriteria!;
  const accuracyDistributionData = kpiAccuracyData?.accuracyDistribution!;
  const accuracyObj = kpiAccuracyData?.accuracy!;
  const formattedExclusiveCriteria = exclusionCriteriaFormatter(exclusionCriteria);
  return (
    <VStack h="941px" w="full" spacing="16px">
      <HStack h="653px" w="full" spacing="20px">
        <VStack flex={2.1} h="full" spacing="16px">
          <Box h="80px" w="full">
            <AccuracySection accuracyData={accuracyObj} />
          </Box>
          <Box h="393px" w="full">
            <IndividualChartSection chartData={individualGraphData} />
          </Box>
          <Box h="148px" w="full">
            <PlannedVsActualSection tableData={plannedActualList} />
          </Box>
        </VStack>
        <VStack flex={1} h="full" spacing="16px">
          <VStack h="220px" w="full" spacing="8px">
            <VStack h="182px" w="full" spacing="8px">
              <ExclusionCriteriaSection exCriteriaData={formattedExclusiveCriteria!} />
            </VStack>
            <Box h="30px" w="full">
              <AccuracyInfoSection />
            </Box>
          </VStack>
          <Box h="231px" w="full">
            <IndividualAccuracyDistributionSection chartData={accuracyDistributionData} />
          </Box>
          <Box h="170px" w="full">
            <SelectionSummarySection skuDetails={skuDetails} />
          </Box>
        </VStack>
      </HStack>
      <VStack h="full" w="full" spacing="16px">
        <Box w="full" h="103px">
          <KPISection kpiData={kpiData} />
        </Box>
        <Box w="full" h="153px">
          <SKUWithAnchorSection kpiData={kpiData} />
        </Box>
      </VStack>
    </VStack>
  );
};

export default MainSection;
