import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  dfViewSliceSelector,
  getTrainingSummaryDataRequest,
  IDFView,
  toggleGraphPanel,
  toggleTrainingSummaryPanel
} from 'state/pages/view/demandForecastView/dfViewPageState';
import {
  Box,
  Center,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Skeleton,
  VStack
} from '@chakra-ui/react';
import { neutral_500, ocean_blue_500, ocean_blue_600 } from 'theme/colors';
import ControlPanel from '../ControlPanel/ControlPanel';
import ChartPanel from '../ChartPanel/ChartPanel';
import GridPanel from '../GridPanel/GridPanel';
import AppText from 'components/newTheme/AppText/AppText';
import { Navigator } from 'hooks/useNavigator';
import { DemandForecastSkuListItem } from 'types/responses/viewResponses';
import ForecastChartHeader from 'pages/View/DemandForecastChart/ForecastChartHeader';

interface Props {
  onMaxMinHandler: () => void;
  graphNavigator: Navigator<DemandForecastSkuListItem>;
}

const MaximizedGraphPanel: FC<Props> = ({ onMaxMinHandler, graphNavigator }) => {
  const dispatch = useDispatch();
  const dfViewState: IDFView = useSelector(dfViewSliceSelector);
  const selectedChartType = dfViewState.selectedChartType;
  const isGraphPanelOpen = dfViewState.isGraphPanelOpen;

  const onCloseGraphPanel = () => {
    dispatch(toggleGraphPanel());
  };

  const onTrainingSummaryHandler = () => {
    dispatch(toggleGraphPanel());
    dispatch(getTrainingSummaryDataRequest());
    dispatch(toggleTrainingSummaryPanel());
  };

  return (
    <Modal onClose={onCloseGraphPanel} size={'full'} isOpen={isGraphPanelOpen}>
      <ModalOverlay />
      <ModalContent bg="rgba(0, 0, 0, 0.60)" p="20px" w="full" h="full">
        <Box bg={ocean_blue_600} h="full" borderRadius="8px">
          <ModalBody p="0px" h="full">
            <VStack
              w="full"
              h="full"
              overflow="hidden"
              transition="all 0.1s ease-in"
              spacing={0}
              borderBottomRadius="8px"
              p="16px"
              pt="10px"
            >
              {dfViewState.selectedSkuList?.length > 0 && (
                <ControlPanel onMaxMinHandler={onMaxMinHandler} />
              )}
              <HStack pos="relative" w="full">
                {dfViewState.selectedSkuList.length > 0 && selectedChartType !== 'aggregate' && (
                  <HStack w="full" bg={ocean_blue_500} maxH={'52px'}>
                    <ForecastChartHeader
                      graphNavigator={graphNavigator}
                      onTrainingSummaryHandler={onTrainingSummaryHandler}
                    />
                  </HStack>
                )}
              </HStack>
              {dfViewState.selectedSkuList?.length > 0 && dfViewState.selectedSku?.forecastKey && (
                <Skeleton isLoaded={dfViewState.loading.graphDataLoading} w="full">
                  <Box h={'calc(100vh - 175px)'} minW="full">
                    <VStack w="full" spacing="10px" bg="#0A1922" h={'full'} pt={'16px'}>
                      {dfViewState?.graphData.length !== 0 ? (
                        <VStack w={'full'} h={'full'}>
                          <ChartPanel chartHeight="calc(100vh)" />
                          <Box mt="-30px !important" w="full">
                            <GridPanel />
                          </Box>
                        </VStack>
                      ) : (
                        <VStack
                          h="calc(100vh - 335px)"
                          w="full"
                          bg={ocean_blue_500}
                          mt="28px"
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
                <Center h="full">
                  <AppText size="body2" color={neutral_500} fontStyle="italic">
                    Please select a SKU-location to view the forecast here
                  </AppText>
                </Center>
              )}
              {dfViewState.selectedSkuList?.length && !dfViewState.selectedSku?.forecastKey && (
                <Center h="full">
                  <AppText size="body2" color={neutral_500} fontStyle="italic">
                    No forecast available
                  </AppText>
                </Center>
              )}
            </VStack>
          </ModalBody>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default MaximizedGraphPanel;
