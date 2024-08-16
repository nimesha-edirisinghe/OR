import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Center,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Skeleton,
  VStack,
  useDisclosure
} from '@chakra-ui/react';
import {
  blue_500,
  neutral_100,
  neutral_500,
  ocean_blue_500,
  ocean_blue_600,
  red_500
} from 'theme/colors';
import AppText from 'components/newTheme/AppText/AppText';
import {
  alertReplenishmentRequest,
  alertSliceSelector,
  getAlertConfigsRequest,
  getAlertsRequest,
  IAlert,
  toggleReplenishmentPanel,
  updateSuccessStatus
} from 'state/pages/monitoringAndResolution/Alert/alertState';
import ControlPanel from './ReplenishmentControlPanel/ControlPanel';
import ReplenishmentInfoTable from './ReplenishmentPanel/ReplenishmentInfoTable';
import ReplenishmentOrderTable from './ReplenishmentPanel/ReplenishmentOrderTable';
import ParameterPanel from './ReplenishmentPanel/ParameterPanel';
import AppButton from 'components/AppButton/AppButton';
import AppUserInputPrompt from 'components/AppUserInputPrompt/AppUserInputPrompt';
import { AlertReplenishmentI, PlanDataI } from 'types/requests/alertConfigRequest';
import { AlertReplenishmentActionTypeEnum } from 'utils/enum';
import { scrollbarYStyles } from 'theme/styles';

interface Props {}

const ViewAndEditReplenishment: FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const alertState: IAlert = useSelector(alertSliceSelector);
  const isReplenishmentModalOpen = alertState.isReplenishmentModalOpen;
  const alertType = alertState.AlertType;
  const orderQtyDetailsList = alertState.rplPlanDetails?.orderQtyDetails;
  const stockMovementList = alertState.rplPlanDetails?.stockMovement?.list!;
  const isSuccessfullyEdited = alertState.isSuccessfullyEdited;
  const isEditable: boolean = alertState.isReplenishmentEditable;

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
    const payload: AlertReplenishmentI = {
      alertKey: alertState.alertLocalScope.selectedViewAlertObj?.alertKey,
      alertType: alertState.alertLocalScope?.selectedAlertTypeObj.alertType,
      groupKey: alertState.selectedSku?.groupCode,
      anchorProdKey: alertState.selectedSku?.anchorProdKey,
      anchorProdModelKey: alertState.selectedSku?.anchorProdModelKey,
      forecastKey: alertState.selectedSku?.forecastKey,
      invPlanKey: alertState.selectedSku?.invPlanKey,
      riskValue: alertState.rplPlanDetails?.orderPlan.riskValue,
      planData
    };
    dispatch(alertReplenishmentRequest(payload));
  };

  useEffect(() => {
    if (isSuccessfullyEdited) {
      setTimeout(() => {
        onCloseSavePrompt();
        dispatch(getAlertConfigsRequest({}));
        dispatch(getAlertsRequest({ alertOnly: 1 }));
      }, 1);
    }
    dispatch(updateSuccessStatus(false));
  }, [isSuccessfullyEdited]);

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

  const closeModal = () => {
    dispatch(toggleReplenishmentPanel());
    onToggleCancelPrompt();
  };

  return (
    <Modal onClose={() => {}} size={'full'} isOpen={isReplenishmentModalOpen}>
      {cancelConfirmationPrompt()}
      {saveConfirmationPrompt()}
      <ModalOverlay />
      <ModalContent bg="rgba(0, 0, 0, 0.60)" p="20px" w="full" h="full">
        <Box bg={ocean_blue_600} h="full" borderRadius="8px">
          <ModalBody p="0px" h="full">
            <VStack
              w="full"
              h="full"
              overflow="hidden"
              transition="all 0.1s ease-in"
              spacing={'12px'}
              borderBottomRadius="8px"
              borderTopRadius="8px"
              pb={'90px'}
            >
              {alertState.selectedSku && <ControlPanel />}
              {alertState.selectedSku && (
                <Skeleton isLoaded={alertState.loading.planDetails} w="full" h={'full'}>
                  <Box h="full" w="full">
                    <VStack
                      w="full"
                      gap="10px"
                      bg={ocean_blue_600}
                      p="16px"
                      pt={'0px'}
                      h={'full'}
                      overflowX={'hidden'}
                      overflowY={'scroll'}
                      __css={scrollbarYStyles}
                    >
                      <HStack w="full" h={'26px'} justify={'start'}>
                        {alertType.alertTypeDisplayName?.map((item) => (
                          <HStack
                            key={item}
                            bg={'#F4312A1A'}
                            borderRadius={'28px'}
                            px={'12px'}
                            py={'4px'}
                          >
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
                      <Box h="55px" w="full">
                        <ParameterPanel />
                      </Box>
                      <Box w="full" h="calc(100vh - 300px)">
                        {(orderQtyDetailsList?.list?.length || 0) > 0 ||
                        (stockMovementList?.length > 0 && isEditable) ? (
                          <ReplenishmentOrderTable />
                        ) : (
                          <Center
                            w={'full'}
                            h="calc(100vh - 500px)"
                            bg={ocean_blue_500}
                            borderRadius="8px"
                          >
                            <AppText size="body2" color={neutral_500} fontStyle="italic">
                              No proposed orders for the current planning period.
                            </AppText>
                          </Center>
                        )}
                      </Box>
                      <Box h="full" w="full" borderRadius="8px">
                        {stockMovementList?.length > 0 ? (
                          <ReplenishmentInfoTable />
                        ) : (
                          <Center w={'full'} h={'300px'} bg={ocean_blue_500} borderRadius="8px">
                            <AppText size="body2" color={neutral_500} fontStyle="italic">
                              No proposed orders for the current planning period.
                            </AppText>
                          </Center>
                        )}
                        {stockMovementList?.length > 0 && alertState.isReplenishmentEditable && (
                          <HStack w="full" justify="end" spacing="8px">
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
                              isDisabled={!alertState.isReplenishmentValidated}
                              onClick={onToggleSavePrompt}
                            >
                              Save Changes
                            </AppButton>
                          </HStack>
                        )}
                      </Box>
                    </VStack>
                  </Box>
                </Skeleton>
              )}
            </VStack>
          </ModalBody>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default ViewAndEditReplenishment;
