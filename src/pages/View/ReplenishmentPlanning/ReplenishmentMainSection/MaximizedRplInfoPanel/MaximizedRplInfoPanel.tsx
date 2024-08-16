import { FC, useCallback, useEffect } from 'react';
import {
  Box,
  Center,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  VStack,
  useDisclosure
} from '@chakra-ui/react';
import {
  blue_500,
  neutral_100,
  neutral_500,
  ocean_blue_500,
  ocean_blue_700,
  red_500
} from 'theme/colors';
import { Navigator } from 'hooks/useNavigator';
import { ReplenishmentSkuListItem } from 'types/responses/viewResponses';
import ActionBar from '../ActionBar/ActionBar';
import ParameterPanel from '../ParameterPanel/ParameterPanel';
import PlanTablePanel from '../PlanTablePanel/PlanTablePanel';
import ReplenishmentInfoTable from '../ReplenishmentInfoTable/ReplenishmentInfoTable';
import {
  getRplPlanDetailsRequest,
  IRPLView,
  rplAlertTypeRequest,
  rplEditRequest,
  rplViewSliceSelector,
  setReplEditable
} from 'state/pages/view/replenishmentView/rplViewPageState';
import { useDispatch, useSelector } from 'react-redux';
import AppText from 'components/AppText/AppText';
import { scrollbarYStyles } from 'theme/styles';
import AppUserInputPrompt from 'components/AppUserInputPrompt/AppUserInputPrompt';
import AppButton from 'components/AppButton/AppButton';
import { PlanDataI, ReplenishmentI } from 'types/requests/alertConfigRequest';
import { AlertReplenishmentActionTypeEnum } from 'utils/enum';
import {
  IGroupConfig,
  groupConfigSliceSelector
} from 'state/pages/shared/groupConfig/groupConfigState';

interface Props {
  planNavigator: Navigator<ReplenishmentSkuListItem>;
  onMaxMinHandler: () => void;
  isOpenPanel: boolean;
}

const MaximizedRplInfoPanel: FC<Props> = ({ onMaxMinHandler, isOpenPanel, planNavigator }) => {
  const dispatch = useDispatch();
  const rplViewState: IRPLView = useSelector(rplViewSliceSelector);
  const sharedGrpConf: IGroupConfig = useSelector(groupConfigSliceSelector);
  const orderQtyDetailsList = rplViewState.rplPlanDetails?.orderQtyDetails;
  const stockMovementList = rplViewState.rplPlanDetails?.stockMovement?.list!;
  const isEditable: boolean = rplViewState.isReplEditable;

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

  const closeModal = () => {
    dispatch(setReplEditable(false));
    isOpenCancelPrompt && onToggleCancelPrompt();
    onMaxMinHandler();
  };

  const saveData = () => {
    const planData: PlanDataI[] = [];
    orderQtyDetailsList?.list?.forEach((element) => {
      switch (element.action) {
        case AlertReplenishmentActionTypeEnum.CREATE:
          planData.push({
            amendedOrderDate: element.row[0],
            amendedDeliveryDate: element.row[4],
            amendedQuantity: element.row[1],
            action: AlertReplenishmentActionTypeEnum.CREATE
          });
          break;
        case AlertReplenishmentActionTypeEnum.EDIT:
          const matchedDetails = orderQtyDetailsList.defaultList?.find(
            (defaultElement) => defaultElement.id === element.id
          );
          if (!matchedDetails) break;
          planData.push({
            amendedOrderDate: element.row[0],
            amendedDeliveryDate: element.row[4],
            amendedQuantity: element.row[1],
            orderDate: matchedDetails.row[0],
            deliveryDate: matchedDetails.row[4],
            quantity: matchedDetails.row[1],
            action: AlertReplenishmentActionTypeEnum.EDIT
          });
          break;
        case AlertReplenishmentActionTypeEnum.DELETE:
          if (!element.fresh) {
            planData.push({
              orderDate: element.row[0],
              deliveryDate: element.row[4],
              quantity: element.row[1],
              action: AlertReplenishmentActionTypeEnum.DELETE
            });
          }
          break;
        case AlertReplenishmentActionTypeEnum.UNCHANGED:
          if (!element.fresh) {
            planData.push({
              orderDate: element.row[0],
              deliveryDate: element.row[4],
              quantity: element.row[1],
              action: AlertReplenishmentActionTypeEnum.UNCHANGED
            });
          }
          break;
      }
    });
    const payload: ReplenishmentI = {
      groupKey: +sharedGrpConf?.selectedGroupKey!,
      anchorProdKey: rplViewState.rplSelectedSku?.anchorProdKey,
      anchorProdModelKey: rplViewState.rplSelectedSku?.anchorProdModelKey,
      forecastKey: rplViewState.rplSelectedSku?.forecastKey,
      invPlanKey: rplViewState.rplSelectedSku?.invPlanKey,
      riskValue: rplViewState.rplPlanDetails?.orderPlan.riskValue,
      planData
    };
    dispatch(rplEditRequest(payload));
    dispatch(rplAlertTypeRequest());
    onToggleSavePrompt();
    closeModal();
  };

  const saveConfirmationPrompt = useCallback(() => {
    return (
      <AppUserInputPrompt
        isOpen={isOpenSavePrompt}
        onClose={onCloseSavePrompt}
        leftBtnName="Cancel"
        rightBtnName="Update"
        title="Edit Replenishment Schedule"
        onConfirmHandler={saveData}
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
        onConfirmHandler={closeModal}
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
    <Modal onClose={() => {}} size={'full'} isOpen={isOpenPanel}>
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
                  navigator={planNavigator}
                  isOpenPanel={isOpenPanel}
                />
              </Box>
              <VStack
                w="full"
                h="full"
                overflow="hidden"
                gap="12px"
                p="12px"
                overflowY={'scroll'}
                __css={scrollbarYStyles}
              >
                <HStack w="full" spacing="8px">
                  {rplViewState.AlertType?.alertTypeDisplayName?.map((item) => (
                    <HStack
                      bg="#F4312A1A"
                      border="0px 0px 0px 1px"
                      borderRadius="23px"
                      h="26px"
                      padding="4px 12px 4px 12px"
                    >
                      <AppText
                        fontSize="12px"
                        fontWeight={400}
                        color={red_500}
                        textAlign={'center'}
                        textTransform={'capitalize'}
                      >
                        {item} Alert
                      </AppText>
                    </HStack>
                  ))}
                </HStack>
                <Box w="full">
                  <ParameterPanel />
                </Box>
                <Box w="full" flex="1" h="calc(100vh - 300px)">
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
                    <ReplenishmentInfoTable tableHeight="full" maximized={true} />
                  ) : (
                    <Center h="full" bg={ocean_blue_500} borderRadius="8px">
                      <AppText size="body2" color={neutral_500} fontStyle="italic">
                        No proposed orders for the current planning period.
                      </AppText>
                    </Center>
                  )}
                  {stockMovementList?.length > 0 && rplViewState.isReplEditable && (
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
                        isDisabled={!rplViewState.isReplValidated}
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
