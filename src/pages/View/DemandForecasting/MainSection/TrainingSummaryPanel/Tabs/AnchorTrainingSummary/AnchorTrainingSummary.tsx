import { Box, HStack, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import ModelDetailsSection from './ModelDetailsSection/ModelDetailsSection';
import DataLengthSection from './DataLengthSection/DataLengthSection';
import { scrollbarYStyles } from 'theme/styles';
import CrossValidationSection from './CrossValidationSection/CrossValidationSection';
import ExemptedPeriodsSection from './ExemptedPeriodsSection/ExemptedPeriodsSection';
import OutlierDetectionSection from './OutlierDetectionSection/OutlierDetectionSection';
import BestPerformanceSection from './BestPerformanceSection/BestPerformanceSection';
import CandidateModelSection from './CandidateModelSection/CandidateModelSection';
import PointWiseAccuracySection from './PointWiseAccuracySection/PointWiseAccuracySection';
import BenchmarkModelSection from './BenchmarkModelSection/BenchmarkModelSection';
import VariableImportanceSection from './VariableImportanceSection/VariableImportanceSection';
import TotalTimeSection from './TotalTimeSection/TotalTimeSection';
import UpdatedInfoSection from './UpdatedInfoSection/UpdatedInfoSection';
import { IDFView, dfViewSliceSelector } from 'state/pages/view/demandForecastView/dfViewPageState';
import { useSelector } from 'react-redux';
import {
  benchmarkDataFormatter,
  kpiDataFormatter,
  modelDataLengthFormatter,
  modelInfoSectionDataFormatter
} from './Helpers/TrainingSummaryDataFormatter';

interface Props {}

const AnchorTrainingSummary: FC<Props> = () => {
  const dfViewState: IDFView = useSelector(dfViewSliceSelector);
  const trainingSummaryDataState = dfViewState.trainingSummaryData;
  const outputLayerInfo = trainingSummaryDataState?.outputLayerInfo!;

  const modelDetailsData = modelInfoSectionDataFormatter(trainingSummaryDataState);
  const dataLengthInfo = modelDataLengthFormatter(
    outputLayerInfo,
    trainingSummaryDataState?.frequency
  );
  const crossValidationValue = outputLayerInfo?.cross_validation!;
  const exemptedPeriodsInfo = trainingSummaryDataState?.exemptionPeriods || [];
  const pointWiseAccuracy = trainingSummaryDataState?.outputLayerInfo.pointwise_accuracy! || [];
  const timeBreakdown = trainingSummaryDataState?.timeBreakdown;

  const modelKpiData = kpiDataFormatter(
    outputLayerInfo?.best_performance,
    trainingSummaryDataState?.modelKpi!
  );

  const candidateModelData = outputLayerInfo?.candidate_models!;
  const candidateAlgorithms = trainingSummaryDataState?.algorithms!;

  const benchmarkModelInfo = benchmarkDataFormatter(outputLayerInfo!);
  const variableImportanceData = trainingSummaryDataState?.variableImportance!;

  const updatedBy = trainingSummaryDataState?.updatedBy!;
  const updatedDateTime = trainingSummaryDataState?.updatedOn!;
  return (
    <HStack
      maxH="calc(100vh - 120px)"
      w="full"
      gap="20px"
      align="start"
      overflow="hidden"
      overflowY="scroll"
      __css={scrollbarYStyles}
    >
      <VStack flex={1} h="full" spacing="8px">
        <Box flex={8} h="full" w="full">
          <ModelDetailsSection modelInfo={modelDetailsData} />
        </Box>
        <Box flex={6} h="full" w="full">
          <DataLengthSection dataLengthInfo={dataLengthInfo} />
        </Box>
        <HStack flex={5} h="full" w="full" spacing="8px">
          <Box flex={1} h="full" w="full">
            <CrossValidationSection crossValidationValue={crossValidationValue} />
          </Box>
          <Box flex={2} h="full" w="full">
            <ExemptedPeriodsSection exemptedPeriodsInfo={exemptedPeriodsInfo} />
          </Box>
        </HStack>
        <Box flex={13} h="full" w="full">
          <OutlierDetectionSection />
        </Box>
      </VStack>
      <VStack flex={1} h="full" spacing="8px">
        <Box flex={10} h="full" w="full">
          <BestPerformanceSection modelKpiInfo={modelKpiData} />
        </Box>
        <Box flex={8} h="full" w="full">
          <CandidateModelSection
            candidateModelData={candidateModelData}
            algorithms={candidateAlgorithms}
          />
        </Box>
        <Box flex={14} h="full" w="full">
          <PointWiseAccuracySection pointWiseAccuracy={pointWiseAccuracy} />
        </Box>
      </VStack>
      <VStack flex={1} h="full" spacing="8px">
        <Box flex={4} h="full" w="full">
          <BenchmarkModelSection benchmarkModelInfo={benchmarkModelInfo} />
        </Box>
        {variableImportanceData && variableImportanceData.length > 0 && (
          <Box flex={14} h="full" w="full">
            <VariableImportanceSection predictorInfo={variableImportanceData} />
          </Box>
        )}
        <Box flex={8} h="full" w="full">
          <TotalTimeSection timeBreakdown={timeBreakdown} />
        </Box>
        <Box h="68px" w="full">
          <UpdatedInfoSection updatedBy={updatedBy} updatedOn={updatedDateTime} />
        </Box>
      </VStack>
    </HStack>
  );
};

export default AnchorTrainingSummary;
