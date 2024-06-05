import { FC } from 'react';
import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  VStack
} from '@chakra-ui/react';
import { blue_500, ocean_blue_600 } from 'theme/colors';
import AppTab from 'components/newTheme/AppTab/AppTab';
import AnchorTrainingSummary from './AnchorTrainingSummary/AnchorTrainingSummary';
import {
  IAlert,
  alertSliceSelector,
  toggleGraphPanel,
  toggleTrainingPanel
} from 'state/pages/monitoringAndResolution/Alert/alertState';
import { useDispatch, useSelector } from 'react-redux';

interface Props {}

const TrainingSummaryPanel: FC<Props> = () => {
  const alertState: IAlert = useSelector(alertSliceSelector);
  const isTrainingModalOpen = alertState.isTrainingModalOpen;
  const dispatch = useDispatch();

  const onTrainingSummaryHandler = () => {
    dispatch(toggleTrainingPanel());
    dispatch(toggleGraphPanel());
  };

  return (
    <Modal onClose={() => {}} size={'full'} isOpen={isTrainingModalOpen}>
      <ModalOverlay />
      <ModalContent bg="rgba(0, 0, 0, 0.60)" p="20px" w="full" h="full">
        <ModalCloseButton
          color={blue_500}
          mt="25px"
          mr="25px"
          size="sm"
          zIndex={10}
          onClick={onTrainingSummaryHandler}
        />
        <Box bg={ocean_blue_600} h="full" borderRadius="8px">
          <ModalBody p="0px" h="full">
            <VStack
              w="full"
              h="full"
              overflow="hidden"
              transition="all 0.1s ease-in"
              spacing={0}
              borderRadius="8px"
              p="20px"
              justify="start"
              align="start"
            >
              <Box w="full" h="calc(100vh - 20px)" alignItems="start" mt="-8px">
                <AppTab
                  tabs={[{ label: 'Anchor Training Summary', content: <AnchorTrainingSummary /> }]}
                  selectedTab={1}
                  onSelectTab={() => {}}
                  variant="primary"
                  tabWidth="178px"
                />
              </Box>
            </VStack>
          </ModalBody>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default TrainingSummaryPanel;
