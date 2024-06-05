import { HStack, VStack } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import {
  neutral_100,
  ocean_blue_100,
  ocean_blue_50,
  ocean_blue_500,
  yellow_500
} from 'theme/colors';
import { scrollbarYStyles } from 'theme/styles';
import { AlgorithmsT, CandidateModelInfoI } from 'types/view/trainingSummary';
import { algorithmMapping } from '../Helpers/TrainingSummaryDataFormatter';
import useScrollState from 'hooks/useScrollState';

interface Props {
  candidateModelData: CandidateModelInfoI;
  algorithms: AlgorithmsT[];
}

const CandidateModelSection: FC<Props> = ({ candidateModelData, algorithms }) => {
  const [scroll, handleMouseEnter, handleMouseLeave] = useScrollState();
  const modelCount = candidateModelData?.number_of_models!;
  const modelBuiltTime = candidateModelData?.model_built_time!;
  const mappedAlgorithms = algorithms?.map((algorithm) => algorithmMapping[algorithm]);

  return (
    <HStack
      w="full"
      h="152px"
      bg={ocean_blue_500}
      borderRadius="8px"
      p="16px"
      align="center"
      spacing="16px"
    >
      <VStack minW="130px" spacing={0} align="start">
        <AppText color={neutral_100} size="numeric">
          {modelCount}
        </AppText>
        <AppText color={ocean_blue_50} size="body3">
          Candidate Models
        </AppText>
        <AppText size="caption" color={yellow_500} noOfLines={1}>
          {`trained in ${modelBuiltTime} seconds`}
        </AppText>
      </VStack>
      <AppIcon
        transition="transform 0.25s ease"
        name="dashBracket"
        fill={ocean_blue_100}
        h="104px"
        w="16px"
        stroke={ocean_blue_100}
      />
      <VStack
        spacing="16px"
        maxH="120px"
        w="full"
        align="start"
        __css={scrollbarYStyles}
        top={0}
        gap="16px"
        overflow="hidden"
        overflowY={scroll}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {mappedAlgorithms?.map((algoItem) => (
          <AppText color={neutral_100} size="h5Semibold" key={algoItem}>
            {algoItem}
          </AppText>
        ))}
      </VStack>
    </HStack>
  );
};

export default CandidateModelSection;
