import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  HStack,
  VStack,
  useDisclosure
} from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IActivityLogSlice,
  activityLogSliceSelector,
  updateRightPanelRetainDataList
} from 'state/pages/operationAndMonitoring/activityLog/activityLogState';
import SaveGroup from '../../StoreGroup/StoreGroupCreation/SaveGroup/SaveGroup';
import {
  IGroupConfigurationSlice,
  closeGroupConfigDrawer,
  createGroupRequest,
  getFilterCountRequest,
  groupConfigurationSliceSelector,
  setGroupDetails
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { GroupDetailsKeyT } from 'types/groupConfig';
import { ScheduleType } from 'types/responses/jobScheduleResponses';
import { groupDetailsValidator } from '../../StoreGroup/StoreGroupCreation/SaveGroup/Helpers/groupDetailsValidatorHelper';
import { blue_500, ocean_blue_600, ocean_blue_100 } from 'theme/colors';
import AppUserInputPrompt from 'components/AppUserInputPrompt/AppUserInputPrompt';
import AppButton from 'components/newTheme/AppButton/AppButton';

interface Props {
  isOpen: boolean;
}

const WarehouseGroupCreationDrawer: FC<Props> = ({ isOpen }) => {
  const activityLogState: IActivityLogSlice = useSelector(activityLogSliceSelector);
  const {
    isOpen: isOpenSavePrompt,
    onClose: onCloseSavePrompt,
    onOpen: onOpenSavePrompt
  } = useDisclosure();
  const {
    isOpen: isOpenCancelPrompt,
    onClose: onCloseCancelPrompt,
    onOpen: onOpenCancelPrompt
  } = useDisclosure();
  const dispatch = useDispatch();
  const beforeEditFilterOptionsLevel1 =
    activityLogState.dashboardFilter.filterLocalScope.beforeEditFilterOptionsLevel1;
  const groupConfigurationState: IGroupConfigurationSlice = useSelector(
    groupConfigurationSliceSelector
  );
  const groupDetailsState = groupConfigurationState.groupDetails;

  useEffect(() => {
    dispatch(getFilterCountRequest({ whFlag: 1 }));
  }, []);

  const onDrawerClose = () => {
    dispatch(updateRightPanelRetainDataList(beforeEditFilterOptionsLevel1));
    dispatch(closeGroupConfigDrawer());
  };

  const onCancelHandler = () => {
    onDrawerClose();
    onCloseCancelPrompt();
  };

  const onSaveBtnHandler = () => {
    const isValidGroupDetails = groupDetailsValidator(groupDetailsState);
    if (isValidGroupDetails) {
      dispatch(
        createGroupRequest({
          isWarehouseGroup: true
        })
      );
    }
    onDrawerClose();
    onCloseSavePrompt();
  };

  const onCancelBtnHandler = () => {};

  const onChangeGroupDetails = (key: GroupDetailsKeyT, value: string | number | ScheduleType) => {
    dispatch(
      setGroupDetails({
        key,
        value
      })
    );
  };

  const onChangeFrequencyHandler = (selectedOption: { key: string; value: string }) => {
    dispatch(
      setGroupDetails({
        key: 'frequency',
        value: selectedOption.key as ScheduleType
      })
    );
  };

  const cancelConfirmationPrompt = useCallback(() => {
    const renderBody = () => {
      return (
        <>
          <AppText size="usm">The changes you have made will be discarded.</AppText>
          <AppText size="usm" mt={2}>
            Are you sure you want to continue?
          </AppText>
        </>
      );
    };

    return (
      <AppUserInputPrompt
        isOpen={isOpenCancelPrompt}
        onClose={onCloseCancelPrompt}
        leftBtnName="No"
        rightBtnName="YES"
        title="Cancel Changes"
        onConfirmHandler={onCancelHandler}
        onCloseHandler={onCloseCancelPrompt}
        children={renderBody()}
      />
    );
  }, [isOpenCancelPrompt]);

  const saveConfirmationPrompt = useCallback(() => {
    const renderBody = () => {
      return (
        <>
          <AppText size="usm">New warehouse group will be created with this details</AppText>
          <AppText size="usm" mt={2}>
            Are you sure you want to continue?
          </AppText>
        </>
      );
    };

    return (
      <AppUserInputPrompt
        isOpen={isOpenSavePrompt}
        onClose={onCloseSavePrompt}
        leftBtnName="NO"
        rightBtnName="YES"
        title="Warehouse group creation"
        onConfirmHandler={onSaveBtnHandler}
        onCloseHandler={onCloseSavePrompt}
        children={renderBody()}
      />
    );
  }, [isOpenSavePrompt]);

  return (
    <>
      {cancelConfirmationPrompt()}
      {saveConfirmationPrompt()}
      <Drawer isOpen={isOpen} placement="right" onClose={onOpenCancelPrompt}>
        <DrawerOverlay />
        <DrawerContent
          maxH="100vh"
          bg={ocean_blue_600}
          w="600px"
          maxW="600px"
          borderRadius="12px 0px 0px 12px"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          pl="16px"
          pr="16px"
          pt="22px"
          userSelect="none"
        >
          <DrawerCloseButton mt="10px" color={blue_500} />
          <HStack>
            <VStack align="left">
              <AppText lineHeight="28px" size="body1" fontWeight="600" fontStyle="normal">
                Create Group - Warehouse
              </AppText>
            </VStack>
          </HStack>
          <Divider color="#595959" h="1px" mt="8px" />
          <DrawerBody p={0} overflow="hidden">
            <VStack pt="40px">
              <SaveGroup
                onChangeHandler={onChangeGroupDetails}
                detailsObj={groupDetailsState}
                onChangeOption={onChangeFrequencyHandler}
              />
            </VStack>
          </DrawerBody>
          <DrawerFooter p={0}>
            <Flex direction="column" w="full" pb="15px">
              <Divider color="#595959" h="1px" mt="8px" mb="20px" />
              <HStack w="full" justify="end">
                <AppButton
                  variant="secondary"
                  size="medium"
                  onClick={onOpenCancelPrompt}
                  px="25px"
                  borderColor={blue_500}
                >
                  Cancel
                </AppButton>
                <AppButton variant="primary" size="medium" onClick={onOpenSavePrompt} px="25px">
                  Save
                </AppButton>
              </HStack>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default WarehouseGroupCreationDrawer;
