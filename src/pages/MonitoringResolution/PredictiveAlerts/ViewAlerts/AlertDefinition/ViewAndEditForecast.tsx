import { FC } from 'react';
import { useSelector } from 'react-redux';
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
import { neutral_500, ocean_blue_500, ocean_blue_600, red_500 } from 'theme/colors';
import AppText from 'components/newTheme/AppText/AppText';
import ControlPanel from './ControlPanel/ControlPanel';
import ChartPanel from './ChartPanel/ChartPanel';
import GridPanel from './GridPanel/GridPanel';
import { alertSliceSelector, IAlert } from 'state/pages/monitoringAndResolution/Alert/alertState';

interface Props {}

const ViewAndEditForecast: FC<Props> = ({}) => {
  const alertState: IAlert = useSelector(alertSliceSelector);
  const isGraphModalOpen = alertState.isGraphModalOpen;
  const alertType = alertState.AlertType;

  return (
    <Modal onClose={() => {}} size="full" isOpen={isGraphModalOpen}>
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
            >
              {alertState.selectedSku && <ControlPanel />}
              {alertState.selectedSku && alertState.selectedSku?.forecastKey && (
                <Skeleton isLoaded={alertState.loading.graphDataLoading} w="full">
                  <Box h="calc(100vh - 175px)" minW="full">
                    <VStack
                      w="full"
                      spacing="10px"
                      bg={ocean_blue_600}
                      p="16px"
                      pt={'0px'}
                      h={'full'}
                      pb={'20px'}
                    >
                      {alertState?.graphData.length !== 0 ? (
                        <>
                          <HStack w="full" h="26px" justify="start">
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
                          <ChartPanel chartHeight="calc(100vh)" />
                          <Box mt="-30px !important" w="full">
                            <GridPanel />
                          </Box>
                        </>
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
              {alertState.selectedSku === null && (
                <Center h="full">
                  <AppText size="body2" color={neutral_500} fontStyle="italic">
                    Please select a SKU-location to view the forecast here
                  </AppText>
                </Center>
              )}
              {alertState.selectedSku && !alertState.selectedSku?.forecastKey && (
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

export default ViewAndEditForecast;
