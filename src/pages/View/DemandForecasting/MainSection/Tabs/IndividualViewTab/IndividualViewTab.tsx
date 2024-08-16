import { FC, useState } from 'react';
import { Box, Center, HStack, Skeleton, usePrevious, VStack } from '@chakra-ui/react';
import {
  dfViewSliceSelector,
  getTrainingSummaryDataRequest,
  toggleTrainingSummaryPanel,
  toggleGraphPanel
} from 'state/pages/view/demandForecastView/dfViewPageState';
import { useDispatch, useSelector } from 'react-redux';
import AppText from 'components/newTheme/AppText/AppText';
import { neutral_500, ocean_blue_500, ocean_blue_600, red_500 } from 'theme/colors';
import { scrollbarYStyles } from 'theme/styles';
import { Navigator } from 'hooks/useNavigator';
import MaximizedGraphPanel from '../../MaximizedGraphPanel/MaximizedGraphPanel';
import TrainingSummaryPanel from '../../TrainingSummaryPanel/TrainingSummaryPanel';
import ControlPanel from '../../ControlPanel/ControlPanel';
import ChartPanel from '../../ChartPanel/ChartPanel';
import GridPanel from '../../GridPanel/GridPanel';
import ForecastChartHeader from 'pages/View/DemandForecastChart/ForecastChartHeader';
import { DemandForecastSkuListItem } from 'types/responses/viewResponses';

interface IndividualViewTabProps {
  skuMaximized: boolean;
  graphNavigator: Navigator<DemandForecastSkuListItem>;
}

const IndividualViewTab: FC<IndividualViewTabProps> = ({ skuMaximized, graphNavigator }) => {
  const [graphMaximized, setGraphMaximized] = useState<boolean>(false);
  const [scroll, setScroll] = useState<string>('hidden');
  const dfViewState = useSelector(dfViewSliceSelector);
  const selectedSkuList = dfViewState.selectedSkuList;
  const dispatch = useDispatch();
  const alertType = dfViewState.AlertType;

  const onMaxMinHandler = () => {
    setGraphMaximized((prev) => !prev);
  };

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
                  <HStack w="full">
                    {alertType.alertTypeDisplayName?.map((item) => (
                      <HStack bg={'#F4312A1A'} borderRadius="28px" px="12px" py="4px">
                        <AppText
                          size={'body3'}
                          fontWeight={400}
                          lineHeight={'18px'}
                          color={red_500}
                          textAlign={'center'}
                          textTransform={'capitalize'}
                        >
                          {item} Alert
                        </AppText>
                      </HStack>
                    ))}
                  </HStack>

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
