import { Box, VStack } from '@chakra-ui/react';
import CandidateAlgoList from 'pages/AdvancedConfiguration/ForecastConfiguration/TrainingConfigurationDrawer/CandidateAlgoTab/CandidateAlgoList';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fcConfigPageSliceSelector,
  updateTreeSelection
} from 'state/pages/advancedConfiguration/forecastConfigurationPage/pageState';
import { ConfigurationI } from 'types/forecastConfig';
import { initCandidateAlgoState } from 'utils/utility';
import { scrollbarYStyles } from 'theme/styles';
import useScrollState from 'hooks/useScrollState';

interface CandidateAlgoTabProps {}

const CandidateAlgoTab: React.FC<CandidateAlgoTabProps> = () => {
  const trainingConfigData = useSelector(fcConfigPageSliceSelector).trainingConfigData;
  const [scroll, handleMouseEnter, handleMouseLeave] = useScrollState();
  const algoSelection = trainingConfigData.algorithmSettings.algorithm_selection.configuration;
  const isUnivariate =
    !!!trainingConfigData.predictors.length ||
    trainingConfigData.predictors.every((predictor) => !predictor.isActive);

  const initState = initCandidateAlgoState(algoSelection, isUnivariate);
  const dispatch = useDispatch();

  // Function definition for handle node select
  const handleNodeSelect = (nodeId: string, isSelected: boolean, selectedKey: ConfigurationI) => {
    dispatch(updateTreeSelection({ nodeId, isSelected, selectedKey }));
  };

  return (
    <Box
      maxH="71vh"
      overflowX="hidden"
      __css={scrollbarYStyles}
      overflowY={scroll}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {initState.map((data, index) => (
        <VStack
          key={index}
          w="full"
          h="auto"
          align="start"
          direction="column"
          mb={'16px'}
          transition="all 2s ease"
        >
          <CandidateAlgoList
            node={initState[index]}
            onNodeSelect={handleNodeSelect}
            disabled={data.isDisabled}
          />
        </VStack>
      ))}
    </Box>
  );
};

export default CandidateAlgoTab;
