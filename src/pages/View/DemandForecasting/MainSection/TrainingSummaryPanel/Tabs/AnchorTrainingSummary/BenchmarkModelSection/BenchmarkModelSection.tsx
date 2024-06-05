import { HStack, VStack } from '@chakra-ui/react';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import { neutral_100, ocean_blue_50, ocean_blue_500 } from 'theme/colors';
import { BenchmarkModelInfoI } from 'types/view/trainingSummary';
import { getBenchmarkMethodLabel } from '../Helpers/TrainingSummaryDataFormatter';

interface Props {
  benchmarkModelInfo: BenchmarkModelInfoI;
}

const BenchmarkModelSection: FC<Props> = ({ benchmarkModelInfo }) => {
  const benchmarkModel = benchmarkModelInfo?.benchmark_model;
  const ensembleMethod =
    benchmarkModelInfo?.ensemble_method !== null
      ? benchmarkModelInfo.ensemble_method
        ? 'Yes'
        : 'No'
      : '_';

  const residualModel =
    benchmarkModelInfo?.residual_model !== null
      ? benchmarkModelInfo.residual_model
        ? 'Yes'
        : 'No'
      : '_';

  const formattedBenchmarkModel = getBenchmarkMethodLabel(benchmarkModel);
  return (
    <HStack w="full" h="86px" borderRadius="8px" align="start" spacing="8px">
      <VStack
        flex={1}
        h="full"
        bg={ocean_blue_500}
        borderRadius="8px"
        justify="center"
        align="start"
        px="16px"
        spacing={0}
      >
        <AppText size="body3" color={ocean_blue_50}>
          Benchmark Model
        </AppText>
        <AppText size="h5Semibold" color={neutral_100}>
          {formattedBenchmarkModel}
        </AppText>
      </VStack>
      <VStack
        flex={1}
        h="full"
        bg={ocean_blue_500}
        borderRadius="8px"
        justify="center"
        align="start"
        px="16px"
        spacing={0}
      >
        <AppText size="body3" color={ocean_blue_50}>
          Residual Model
        </AppText>
        <AppText size="h5Semibold" color={neutral_100}>
          {residualModel}
        </AppText>
      </VStack>
      <VStack
        flex={1}
        h="full"
        bg={ocean_blue_500}
        borderRadius="8px"
        justify="center"
        align="start"
        px="16px"
        spacing={0}
      >
        <AppText size="body3" color={ocean_blue_50}>
          Ensemble Method
        </AppText>
        <AppText size="h5Semibold" color={neutral_100}>
          {ensembleMethod}
        </AppText>
      </VStack>
    </HStack>
  );
};

export default BenchmarkModelSection;
