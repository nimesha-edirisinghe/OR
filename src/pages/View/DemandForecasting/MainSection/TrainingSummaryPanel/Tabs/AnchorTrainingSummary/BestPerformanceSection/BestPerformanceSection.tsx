import { Grid, VStack } from '@chakra-ui/react';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import { neutral_100, ocean_blue_50, ocean_blue_500 } from 'theme/colors';
import PerformanceGridItem from './PerformanceGridItem';
import { addSpacesBeforeUppercase } from '../Helpers/TrainingSummaryDataFormatter';
import { ModelKpiInfoI } from 'types/view/trainingSummary';

interface Props {
  modelKpiInfo: ModelKpiInfoI;
}

const BestPerformanceSection: FC<Props> = ({ modelKpiInfo }) => {
  const formattedBestPerformAlgo = addSpacesBeforeUppercase(modelKpiInfo.bestPerformAlgo) || '';
  const benchmarkAvgAccuracy =
    modelKpiInfo?.modelKpi?.benchmark_model_kpis?.average_pointwise_accuracy || '-';
  const benchmarkOverallAccuracy =
    modelKpiInfo?.modelKpi?.benchmark_model_kpis?.overall_accuracy || '-';
  const bestModelAvgAccuracy =
    modelKpiInfo?.modelKpi?.best_model_kpis.average_pointwise_accuracy || '-';
  const bestModelOverallAccuracy =
    modelKpiInfo?.modelKpi?.best_model_kpis?.overall_accuracy || '-';
  return (
    <VStack
      w="full"
      h="208px"
      bg={ocean_blue_500}
      borderRadius="8px"
      p="16px"
      align="start"
      spacing="8px"
    >
      <VStack align="start" spacing="0px">
        <AppText size="body3" color={ocean_blue_50}>
          Best Performance
        </AppText>
        <AppText size="h5Semibold" color={neutral_100}>
          {formattedBestPerformAlgo}
        </AppText>
      </VStack>
      <Grid w="full" h="132px" templateRows="repeat(3, 1fr)" templateColumns="repeat(3, 1fr)">
        <PerformanceGridItem borderTopLeftRadius="8px" borderBottom="none" borderRight="none">
          KPI
        </PerformanceGridItem>
        <PerformanceGridItem borderBottom="none" borderRight="none">
          Benchmark Model
        </PerformanceGridItem>
        <PerformanceGridItem borderTopRightRadius="8px" borderBottom="none">
          Order Right Model
        </PerformanceGridItem>
        <PerformanceGridItem borderBottom="none" borderRight="none">
          Avg. Weekly Accuracy
        </PerformanceGridItem>
        <PerformanceGridItem
          borderBottom="none"
          borderRight="none"
          fontSize="h5Semibold"
          color={neutral_100}
        >
          {benchmarkAvgAccuracy}
        </PerformanceGridItem>
        <PerformanceGridItem borderBottom="none" fontSize="h5Semibold" color={neutral_100}>
          {bestModelAvgAccuracy}
        </PerformanceGridItem>
        <PerformanceGridItem borderBottomLeftRadius="8px" borderRight="none">
          Overall Accuracy
        </PerformanceGridItem>
        <PerformanceGridItem borderRight="none" fontSize="h5Semibold" color={neutral_100}>
          {benchmarkOverallAccuracy}
        </PerformanceGridItem>
        <PerformanceGridItem
          borderBottomRightRadius="8px"
          fontSize="h5Semibold"
          color={neutral_100}
        >
          {bestModelOverallAccuracy}
        </PerformanceGridItem>
      </Grid>
    </VStack>
  );
};

export default BestPerformanceSection;
