import { FC, useEffect, useState } from 'react';
import { Box, Center, HStack, Skeleton, usePrevious, VStack } from '@chakra-ui/react';
import {
  IWhDFView,
  demandForecastChartRequest,
  setSelectedSkuAction,
  whDfViewSliceSelector
} from 'state/pages/view/whDemandForecastView/whDfViewPageState';
import { useDispatch, useSelector } from 'react-redux';
import AppText from 'components/newTheme/AppText/AppText';
import { neutral_500, ocean_blue_500, ocean_blue_600 } from 'theme/colors';
import { scrollbarYStyles } from 'theme/styles';
import useNavigator from 'hooks/useNavigator';
import MaximizedGraphPanel from '../../MaximizedGraphPanel/MaximizedGraphPanel';
import ChartPanel from '../../ChartPanel/ChartPanel';
import GridPanel from '../../GridPanel/GridPanel';
import ForecastChartNavigator from 'pages/View/DemandForecastChart/ForecastChartNavigator';
import ControlPanel from '../../ControlPanel/ControlPanel';

interface IndividualViewTabProps {
  skuMaximized: boolean;
}

const IndividualViewTab: FC<IndividualViewTabProps> = () => {
  const [graphMaximized, setGraphMaximized] = useState<boolean>(false);
  const [scroll, setScroll] = useState<string>('hidden');
  const dfViewState: IWhDFView = useSelector(whDfViewSliceSelector);
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

  return (
    <>
      <MaximizedGraphPanel
        onMaxMinHandler={onMaxMinHandler}
        isOpenPanel={graphMaximized}
        graphNavigator={graphNavigator}
      />
      <ControlPanel isGraphPanelOpen={false} onMaxMinHandler={onMaxMinHandler} />
      {dfViewState.selectedSkuList.length > 0 && (
        <HStack w="full" bg={ocean_blue_500} minH={'52px'} p={'12px'} borderTopRadius="8px">
          <ForecastChartNavigator graphNavigator={graphNavigator} />
          <Box h="28px" w="1px" bg={'rgba(26, 52, 69, 1)'}></Box>
          <AppText size="h4Semibold">
            {`${dfViewState.selectedSku?.sku} | ${dfViewState.selectedSku?.store}`}
          </AppText>
        </HStack>
      )}
      {dfViewState.selectedSkuList?.length > 0 && dfViewState.selectedSku?.forecastKey && (
        <Skeleton isLoaded={dfViewState.loading.graphDataLoading} w="full">
          <Box
            overflowX={'hidden'}
            __css={scrollbarYStyles}
            minW="full"
            onMouseOver={() => setScroll('auto')}
            onMouseLeave={() => setScroll('hidden')}
            bg={ocean_blue_600}
            h={'calc(100vh - 323px)'}
            borderBottomRadius="10px"
          >
            <VStack w="full" spacing="10px" bg="#0A1922" p="16px" pl={'18px'}>
              {dfViewState?.graphData.length !== 0 ? (
                <VStack w={'full'} h={'full'}>
                  <ChartPanel />
                  <Box mt="-35px !important" w="full">
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
              <AppText size="body2" color={neutral_500} fontStyle="italic">
                Please select a SKU-location to view the forecast here
              </AppText>
            </Center>
          </Box>
        </Skeleton>
      )}
      {dfViewState.selectedSkuList?.length && !dfViewState.selectedSku?.forecastKey && (
        <Center h="full">
          <AppText size="body2" color={neutral_500} fontStyle="italic">
            No forecast available
          </AppText>
        </Center>
      )}
    </>
  );
};

export default IndividualViewTab;
