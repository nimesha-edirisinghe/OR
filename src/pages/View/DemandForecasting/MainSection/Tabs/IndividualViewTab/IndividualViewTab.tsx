import { FC, useEffect, useState } from 'react';
import { Box, Center, HStack, Skeleton, usePrevious, VStack } from '@chakra-ui/react';
import {
  demandForecastChartRequest,
  dfViewSliceSelector,
  getPredictorsRequest,
  setSelectedSkuAction,
  getTrainingSummaryDataRequest,
  toggleTrainingSummaryPanel,
  toggleGraphPanel
} from 'state/pages/view/demandForecastView/dfViewPageState';
import { useDispatch, useSelector } from 'react-redux';
import AppText from 'components/newTheme/AppText/AppText';
import { neutral_500, ocean_blue_500, ocean_blue_600 } from 'theme/colors';
import { scrollbarYStyles } from 'theme/styles';
import useNavigator from 'hooks/useNavigator';
import MaximizedGraphPanel from '../../MaximizedGraphPanel/MaximizedGraphPanel';
import TrainingSummaryPanel from '../../TrainingSummaryPanel/TrainingSummaryPanel';
import ControlPanel from '../../ControlPanel/ControlPanel';
import ChartPanel from '../../ChartPanel/ChartPanel';
import GridPanel from '../../GridPanel/GridPanel';
import ForecastChartHeader from 'pages/View/DemandForecastChart/ForecastChartHeader';

interface IndividualViewTabProps {
  skuMaximized: boolean;
}

const IndividualViewTab: FC<IndividualViewTabProps> = ({ skuMaximized }) => {
  const [graphMaximized, setGraphMaximized] = useState<boolean>(false);
  const [scroll, setScroll] = useState<string>('hidden');
  const dfViewState = useSelector(dfViewSliceSelector);
  const selectedSkuList = dfViewState.selectedSkuList;
  const dispatch = useDispatch();
  const graphNavigator = useNavigator(selectedSkuList);
  const previousSelectedSkuList = usePrevious(selectedSkuList);

  const onMaxMinHandler = () => {
    setGraphMaximized((prev) => !prev);
  };

  const requestViewForecastChart = (currentStepIndex?: number) => {
    dispatch(
      setSelectedSkuAction(
        currentStepIndex !== undefined ? currentStepIndex : graphNavigator.currentStepIndex
      )
    );
    dispatch(demandForecastChartRequest({ chartType: dfViewState.selectedChartType }));
    dispatch(getPredictorsRequest());
  };

  useEffect(() => {
    if (
      selectedSkuList &&
      previousSelectedSkuList &&
      previousSelectedSkuList.length &&
      selectedSkuList.length === previousSelectedSkuList.length
    ) {
      requestViewForecastChart();
    }
  }, [graphNavigator.currentStepIndex]);

  const trainingSummaryHandler = () => {
    dispatch(getTrainingSummaryDataRequest());
    dispatch(toggleTrainingSummaryPanel());
  };

  const onCloseTrainingSummaryPanel = () => {
    if (graphMaximized) dispatch(toggleGraphPanel());
    dispatch(toggleTrainingSummaryPanel());
  };

  return (
    <>
      <MaximizedGraphPanel onMaxMinHandler={onMaxMinHandler} graphNavigator={graphNavigator} />
      <TrainingSummaryPanel onCloseTrainingSummary={onCloseTrainingSummaryPanel} />
      <VStack
        spacing="20px"
        h="full"
        w="full"
        overflowX={'hidden'}
        overflowY={'scroll'}
        __css={scrollbarYStyles}
      >
        <VStack
          w="full"
          h="full"
          transition="all 0.1s ease-in"
          spacing={0}
          borderBottomRadius="8px"
        >
          <ControlPanel onMaxMinHandler={onMaxMinHandler} />
          {dfViewState.selectedSkuList.length > 0 && (
            <HStack w="full" bg={ocean_blue_500} minH={'52px'} borderTopRadius="8px">
              <ForecastChartHeader
                graphNavigator={graphNavigator}
                onTrainingSummaryHandler={trainingSummaryHandler}
              />
            </HStack>
          )}
          {dfViewState.selectedSkuList?.length > 0 && dfViewState.selectedSku?.forecastKey && (
            <Skeleton
              isLoaded={dfViewState.loading.graphDataLoading}
              w="full"
              borderBottomRadius="10px"
            >
              <Box
                overflowX={'hidden'}
                overflowY={'scroll'}
                __css={scrollbarYStyles}
                onMouseOver={() => setScroll('auto')}
                onMouseLeave={() => setScroll('hidden')}
                bg={ocean_blue_600}
                h={'calc(100vh - 323px)'}
                borderBottomRadius="10px"
              >
                <VStack spacing="10px" p="16px" pl={'18px'}>
                  {dfViewState?.graphData.length !== 0 ? (
                    <VStack w={'full'} h={'full'}>
                      <ChartPanel />
                      <Box w="full" mt="-35px !important">
                        <GridPanel />
                      </Box>
                    </VStack>
                  ) : (
                    <VStack
                      h="calc(100vh - 355px)"
                      w="full"
                      bg={ocean_blue_500}
                      borderRadius="8px"
                      justify="center"
                    >
                      <AppText size="italic" color={neutral_500} fontStyle="italic">
                        No forecast is available for the selected SKU location
                      </AppText>
                    </VStack>
                  )}
                </VStack>
              </Box>
            </Skeleton>
          )}
          {dfViewState.selectedSkuList?.length === 0 && (
            <Skeleton isLoaded={dfViewState.loading.graphDataLoading} w="full" borderRadius="10px">
              <Box
                overflow={scroll}
                borderRadius="10px"
                h="calc(100vh - 263px)"
                __css={scrollbarYStyles}
                minW="full"
                onMouseOver={() => setScroll('auto')}
                onMouseLeave={() => setScroll('hidden')}
                bg="#0A1922"
              >
                <Center h="full">
                  <AppText size="italic" color={neutral_500} fontStyle="italic">
                    Please select a SKU-location to view the forecast here
                  </AppText>
                </Center>
              </Box>
            </Skeleton>
          )}
          {dfViewState.selectedSkuList?.length && !dfViewState.selectedSku?.forecastKey && (
            <Center h="full">
              <AppText size="italic" color={neutral_500} fontStyle="italic">
                No forecast available
              </AppText>
            </Center>
          )}
        </VStack>
      </VStack>
    </>
  );
};

export default IndividualViewTab;
