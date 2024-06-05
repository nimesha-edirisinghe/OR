import { FC } from 'react';
import {
  Box,
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  VStack
} from '@chakra-ui/react';
import { neutral_500, ocean_blue_500, ocean_blue_700 } from 'theme/colors';
import { ReplenishmentSkuListItem } from 'types/responses/viewResponses';
import ActionBar from '../ActionBar/ActionBar';
import ParameterPanel from '../ParameterPanel/ParameterPanel';
import PlanTablePanel from '../PlanTablePanel/PlanTablePanel';
import ReplenishmentInfoTable from '../ReplenishmentInfoTable/ReplenishmentInfoTable';
import { Navigator } from 'hooks/useNavigator';
import AppText from 'components/newTheme/AppText/AppText';
import { useSelector } from 'react-redux';
import {
  IRPLWhView,
  rplWHViewSliceSelector
} from 'state/pages/view/whReplenishmentView/whRplViewState';

interface Props {
  navigator: Navigator<ReplenishmentSkuListItem>;
  onMaxMinHandler: () => void;
  isOpenPanel: boolean;
}

const MaximizedRplInfoPanel: FC<Props> = ({ onMaxMinHandler, isOpenPanel, navigator }) => {
  const rplWhViewState: IRPLWhView = useSelector(rplWHViewSliceSelector);
  const orderQtyDetailsList = rplWhViewState.rplWhPlanDetails?.orderQtyDetails?.list!;
  const stockMovementList = rplWhViewState.rplWhPlanDetails?.stockMovement?.list!;
  return (
    <Modal onClose={() => {}} size={'full'} isOpen={isOpenPanel}>
      <ModalOverlay />
      <ModalContent bg="rgba(0, 0, 0, 0.60)" p="20px" w="full" h="full">
        <Box bg={ocean_blue_700} h="full" borderRadius="8px">
          <ModalBody p="0px" h="full">
            <VStack
              w="full"
              h="full"
              overflow="hidden"
              transition="all 0.1s ease-in"
              borderBottomRadius="8px"
            >
              <Box bg={ocean_blue_500} h="60px" w="full" borderTopRadius="8px">
                <ActionBar
                  onMaxMinHandler={onMaxMinHandler}
                  navigator={navigator}
                  isOpenPanel={isOpenPanel}
                />
              </Box>
              <VStack w="full" h="full" overflow="hidden" spacing="12px" p="12px">
                <Box h="45px" w="full" minH="45px">
                  <ParameterPanel />
                </Box>
                <Box w="full" flex="1" h="calc(100vh - 560px)" borderRadius="8px">
                  {orderQtyDetailsList?.length > 0 ? (
                    <PlanTablePanel tableHeight="full" />
                  ) : (
                    <Center h="full" bg={ocean_blue_500} borderRadius="8px">
                      <AppText size="body2" color={neutral_500} fontStyle="italic">
                        No proposed orders for the current planning period.
                      </AppText>
                    </Center>
                  )}
                </Box>
                <Box h="calc(100vh - 400px)" w="full" borderRadius="8px">
                  {stockMovementList?.length > 0 ? (
                    <ReplenishmentInfoTable tableHeight="full" />
                  ) : (
                    <Center h="full" bg={ocean_blue_500} borderRadius="8px">
                      <AppText size="body2" color={neutral_500} fontStyle="italic">
                        No proposed orders for the current planning period.
                      </AppText>
                    </Center>
                  )}
                </Box>
              </VStack>
            </VStack>
          </ModalBody>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default MaximizedRplInfoPanel;
