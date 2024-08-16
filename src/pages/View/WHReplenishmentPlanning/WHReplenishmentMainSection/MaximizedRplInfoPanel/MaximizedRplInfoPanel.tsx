import { FC, useCallback } from 'react';
import {
  Box,
  Center,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  VStack
} from '@chakra-ui/react';
import {
  blue_500,
  neutral_100,
  neutral_500,
  ocean_blue_500,
  ocean_blue_700,
  red_500
} from 'theme/colors';
import { ReplenishmentSkuListItem } from 'types/responses/viewResponses';
import ActionBar from '../ActionBar/ActionBar';
import ParameterPanel from '../ParameterPanel/ParameterPanel';
import PlanTablePanel from '../PlanTablePanel/PlanTablePanel';
import ReplenishmentInfoTable from '../ReplenishmentInfoTable/ReplenishmentInfoTable';
import { Navigator } from 'hooks/useNavigator';
import AppText from 'components/newTheme/AppText/AppText';
import { useDispatch, useSelector } from 'react-redux';
import {
  IRPLWhView,
  rplWHEditRequest,
  rplWHViewSliceSelector,
  setReplEditable,
  setRplValidation
} from 'state/pages/view/whReplenishmentView/whRplViewState';
import { scrollbarYStyles } from 'theme/styles';
import { AlertReplenishmentActionTypeEnum } from 'utils/enum';
import AppUserInputPrompt from 'components/AppUserInputPrompt/AppUserInputPrompt';
import { PlanDataI, ReplenishmentI } from 'types/requests/alertConfigRequest';
import {
  groupConfigSliceSelector,
  IGroupConfig
} from 'state/pages/shared/groupConfig/groupConfigState';
import AppButton from 'components/newTheme/AppButton/AppButton';

interface Props {
  navigator: Navigator<ReplenishmentSkuListItem>;
  onMaxMinHandler: () => void;
  isOpenPanel: boolean;
}

const MaximizedRplInfoPanel: FC<Props> = ({ onMaxMinHandler, isOpenPanel, navigator }) => {
  const rplWhViewState: IRPLWhView = useSelector(rplWHViewSliceSelector);
  const orderQtyDetailsList = rplWhViewState.rplWhPlanDetails?.orderQtyDetails;
  const stockMovementList = rplWhViewState.rplWhPlanDetails?.stockMovement?.list!;
  const sharedGroupState: IGroupConfig = useSelector(groupConfigSliceSelector);
  const alertType = rplWhViewState.AlertType;
  const isEditable: boolean = rplWhViewState.isReplEditable;
  const dispatch = useDispatch();
  const {
    isOpen: isOpenSavePrompt,
    onToggle: onToggleSavePrompt,
    onClose: onCloseSavePrompt
  } = useDisclosure();
  const {
    isOpen: isOpenCancelPrompt,
    onToggle: onToggleCancelPrompt,
    onClose: onCloseCancelPrompt
  } = useDisclosure();

  const onCloseRplPanel = () => {
    dispatch(setReplEditable(false));
    dispatch(setRplValidation(false));
  };

  const onCancelHandler = () => {
    dispatch(setReplEditable(false));
    onCloseCancelPrompt();
    onMaxMinHandler();
  };

  const getModifiedOrder = (order: { id: number }) => {
    return orderQtyDetailsList?.defaultList?.find((olderOrder) => olderOrder.id === order?.id);
  };

  const getFormattedRequest = (order: {
    id?: any;
    isSelected?: boolean | undefined;
    row: any;
    action: any;
    fresh?: boolean;
  }) => {
    const orderDate = order.row[0];
    const quantity = order.row[1];
    const deliveryDate = order.row[4];
    const action = order.action;

    if (action === AlertReplenishmentActionTypeEnum.CREATE) {
      return {
        amendedOrderDate: orderDate,
        amendedDeliveryDate: deliveryDate,
        amendedQuantity: quantity,
        action: AlertReplenishmentActionTypeEnum.CREATE
      };
    } else if (action === AlertReplenishmentActionTypeEnum.EDIT) {
      const olderOrder = getModifiedOrder({ id: order.id });
      if (!olderOrder) return null;
      const olderOrderDate = olderOrder.row[0];
      const olderQuantity = olderOrder.row[1];
      const olderDeliveryDate = olderOrder.row[4];
      return {
        amendedOrderDate: orderDate,
        amendedDeliveryDate: deliveryDate,
        amendedQuantity: quantity,
        orderDate: olderOrderDate,
        deliveryDate: olderDeliveryDate,
        quantity: olderQuantity,
        action: AlertReplenishmentActionTypeEnum.EDIT
      };
    } else {
      return {
        orderDate: orderDate,
        deliveryDate: deliveryDate,
        quantity: quantity,
        action
      };
    }
  };

  const onSaveHandler = () => {
    const planData: PlanDataI[] = [];
    orderQtyDetailsList?.list?.map((order) => {
      switch (order.action) {
        case AlertReplenishmentActionTypeEnum.CREATE:
          const createOrder = getFormattedRequest(order)!;
          planData.push(createOrder);
          break;
        case AlertReplenishmentActionTypeEnum.EDIT:
          const editOrder = getFormattedRequest(order)!;
          if (editOrder) planData.push(editOrder);
          break;
        case AlertReplenishmentActionTypeEnum.DELETE:
          const deleteOrder = getFormattedRequest(order)!;
          if (!order.fresh) planData.push(deleteOrder);
          break;
        case AlertReplenishmentActionTypeEnum.UNCHANGED:
          const unchangedOrder = getFormattedRequest(order)!;
          if (!order.fresh) planData.push(unchangedOrder);
          break;
      }
    });

    const payload: ReplenishmentI = {
      groupKey: parseInt(sharedGroupState?.selectedGroupKey!),
      anchorProdKey: rplWhViewState.rplWhSelectedSku?.anchorProdKey,
      anchorProdModelKey: rplWhViewState.rplWhSelectedSku?.anchorProdModelKey,
      forecastKey: rplWhViewState.rplWhSelectedSku?.forecastKey,
      invPlanKey: rplWhViewState.rplWhSelectedSku?.invPlanKey,
      riskValue: rplWhViewState.rplWhPlanDetails?.orderPlan.riskValue,
      planData
    };
    dispatch(rplWHEditRequest(payload));
    dispatch(setReplEditable(false));
    onMaxMinHandler();
    onCloseSavePrompt();
  };

  const saveConfirmationPrompt = useCallback(() => {
    return (
      <AppUserInputPrompt
        isOpen={isOpenSavePrompt}
        onClose={onCloseSavePrompt}
        leftBtnName="Cancel"
        rightBtnName="Update"
        title="Edit Replenishment Schedule"
        onConfirmHandler={onSaveHandler}
        onCloseHandler={onCloseSavePrompt}
      >
        <AppText fontSize="12px" fontWeight={400} mt={2} width="68%">
          This action will permanently update the Replenishment Schedule. Are you sure you want to
          continue?
        </AppText>
      </AppUserInputPrompt>
    );
  }, [isOpenSavePrompt]);

  const cancelConfirmationPrompt = useCallback(() => {
    return (
      <AppUserInputPrompt
        isOpen={isOpenCancelPrompt}
        onClose={onCloseCancelPrompt}
        leftBtnName="NO"
        rightBtnName="YES"
        title="Cancel Changes"
        onConfirmHandler={onCancelHandler}
        onCloseHandler={onCloseCancelPrompt}
      >
        <AppText fontSize="12px" fontWeight={400} mt={2} width="68%">
          Newly edited values will be discarded.
        </AppText>
        <AppText fontSize="12px" fontWeight={400}>
          Are you sure you want to continue?
        </AppText>
      </AppUserInputPrompt>
    );
  }, [isOpenCancelPrompt]);

  return (
    <Modal onClose={() => {}} onCloseComplete={onCloseRplPanel} size={'full'} isOpen={isOpenPanel}>
      {cancelConfirmationPrompt()}
      {saveConfirmationPrompt()}
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
              <VStack
                w="full"
                h="full"
                overflow="hidden"
                gap="12px"
                p="12px"
                m="0px !important"
                overflowY={'scroll'}
                __css={scrollbarYStyles}
              >
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
                <Box h="45px" w="full" minH="45px">
                  <ParameterPanel />
                </Box>
                <Box w="full" flex="1" h="calc(100vh - 500px)" borderRadius="8px">
                  {(orderQtyDetailsList?.list || []).length > 0 ||
                  (stockMovementList?.length > 0 && isEditable) ? (
                    <PlanTablePanel tableHeight="full" maximized={true} />
                  ) : (
                    <Center h="calc(100vh - 500px)" bg={ocean_blue_500} borderRadius="8px">
                      <AppText size="body2" color={neutral_500} fontStyle="italic">
                        No proposed orders for the current planning period.
                      </AppText>
                    </Center>
                  )}
                </Box>
                <Box h="full" w="full" borderRadius="8px">
                  {stockMovementList?.length > 0 ? (
                    <ReplenishmentInfoTable tableHeight="full" maximized={false} />
                  ) : (
                    <Center h="full" bg={ocean_blue_500} borderRadius="8px">
                      <AppText size="body2" color={neutral_500} fontStyle="italic">
                        No proposed orders for the current planning period.
                      </AppText>
                    </Center>
                  )}
                  {stockMovementList?.length > 0 && rplWhViewState.isReplEditable && (
                    <HStack w="full" justify="end" spacing="8px" mt="-30px" pb="12px" py="12px">
                      <AppButton
                        variant="secondary"
                        size="medium"
                        w="105px"
                        h="36px"
                        p="10px 14px 10px 14px"
                        color={blue_500}
                        fontSize="13px"
                        fontWeight="400"
                        onClick={onToggleCancelPrompt}
                      >
                        Cancel
                      </AppButton>
                      <AppButton
                        variant="primary"
                        size="medium"
                        w="123px"
                        h="36px"
                        p="10px 14px 10px 14px"
                        color={neutral_100}
                        fontSize="13px"
                        fontWeight="400"
                        isDisabled={!rplWhViewState.isReplValidated}
                        onClick={onToggleSavePrompt}
                      >
                        Save Changes
                      </AppButton>
                    </HStack>
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
