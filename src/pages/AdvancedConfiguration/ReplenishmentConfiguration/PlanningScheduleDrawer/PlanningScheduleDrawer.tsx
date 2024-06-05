import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  HStack,
  useDisclosure
} from '@chakra-ui/react';
import AppButton from 'components/AppButton/AppButton';
import AppText from 'components/AppText/AppText';
import { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearJobScheduleConfig,
  createScheduleRequest,
  jobScheduleSliceSelector,
  removeScheduleJobRequest
} from 'state/pages/shared/jobScheduling/jobSchedulingState';
import {
  closeRplDrawer,
  getReplenishmentConfigDataRequest,
  rplConfigPageSliceSelector
} from 'state/pages/advancedConfiguration/replenishmentConfigurationPage/rplConfigPageState';
import ReplenishmentPlanningTab from './ReplenishmentPlanningTab';
import {
  validateSchedulingAllField,
  validateSchedulingData,
  validateStartAndEndDates
} from 'state/helpers/jobSchedulingHelper';
import { blue_500, neutral_100, ocean_blue_600, yellow_500 } from 'theme/colors';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppPopup from 'components/newTheme/AppPopup/AppPopup';

interface Props {
  isOpen: boolean;
}

const PlanningScheduleDrawer: FC<Props> = ({ isOpen }) => {
  const rplPageState = useSelector(rplConfigPageSliceSelector);
  const jobScheduleState = useSelector(jobScheduleSliceSelector);
  const jobScheduleConfigData = jobScheduleState.jobSchedulingData;
  const groupDisplayName =
    rplPageState.rplPlanningConfigLocalScope.selectedPlaningObj?.groupDisplayName;
  const {
    isOpen: isOpenCancelPrompt,
    onToggle: onToggleCancelPrompt,
    onClose: onCloseCancelPrompt
  } = useDisclosure();

  const {
    isOpen: isOpenSavePrompt,
    onToggle: onToggleSavePrompt,
    onClose: onCloseSavePrompt
  } = useDisclosure();
  const dispatch = useDispatch();

  const onDrawerClose = () => {
    dispatch(closeRplDrawer());
    onCloseSavePrompt();
  };

  const onSaveHandler = () => {
    const isAnyFieldFilled: boolean = validateSchedulingAllField(
      jobScheduleConfigData,
      jobScheduleConfigData.startDate,
      jobScheduleConfigData.endDate
    );

    if (isAnyFieldFilled) {
      const isValidScheduleConfigs = validateSchedulingData(jobScheduleConfigData);
      const isValidStartAndEndDate = validateStartAndEndDates(
        jobScheduleConfigData.startDate,
        jobScheduleConfigData.endDate
      );

      if (isValidScheduleConfigs && isValidStartAndEndDate) {
        dispatch(createScheduleRequest('repl'));
        dispatch(getReplenishmentConfigDataRequest({ pageNo: 1 }));
        onDrawerClose();
      }
    } else {
      dispatch(removeScheduleJobRequest());
      onDrawerClose();
    }

    onCloseSavePrompt();
  };

  const onClearHandler = () => {
    dispatch(clearJobScheduleConfig());
  };

  const onCancelHandler = () => {
    onDrawerClose();
    onCloseCancelPrompt();
  };

  const saveConfirmationPrompt = useCallback(() => {
    return (
      <AppPopup
        isOpen={isOpenSavePrompt}
        onClose={onCloseSavePrompt}
        leftBtnName="NO"
        rightBtnName="YES"
        title="Save Changes"
        infoMessage={
          <AppText>
            The changes made in the Schedule will be applied to all the Anchors in the group.
            <br />
            Are you sure you want to continue?
          </AppText>
        }
        onConfirmHandler={onCloseSavePrompt}
        onCloseHandler={onSaveHandler}
        icon={<AppIcon name="warningPrompt" fill={yellow_500} width="54px" height="54px" />}
      />
    );
  }, [isOpenSavePrompt]);

  const cancelConfirmationPrompt = useCallback(() => {
    return (
      <AppPopup
        isOpen={isOpenCancelPrompt}
        onClose={onCloseCancelPrompt}
        leftBtnName="NO"
        rightBtnName="YES"
        title="Clear Changes"
        infoMessage={
          <AppText>
            The changes you have made in the Schedule will be discarded <br />
            Are you sure you want to continue?
          </AppText>
        }
        onConfirmHandler={onCloseCancelPrompt}
        onCloseHandler={onCancelHandler}
        icon={<AppIcon name="warningPrompt" fill={yellow_500} width="54px" height="54px" />}
      />
    );
  }, [isOpenCancelPrompt]);
  return (
    <>
      {cancelConfirmationPrompt()}
      {saveConfirmationPrompt()}
      <Drawer isOpen={isOpen} placement="right" onClose={onDrawerClose}>
        <DrawerOverlay />
        <DrawerContent
          maxH="100vh"
          bg={ocean_blue_600}
          w="600px"
          maxW="600px"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          pl="20px"
          pr="20px"
          pt="22px"
          userSelect="none"
        >
          <DrawerCloseButton mt="10px" color={blue_500} />
          <HStack gap="12px">
            <AppIcon
              name="singleLeftArrow"
              fill={blue_500}
              cursor="pointer"
              height="24px"
              width="24px"
              onClick={() => onDrawerClose()}
            />
            <AppText
              color={neutral_100}
              lineHeight="19.5px"
              fontSize="13px"
              fontWeight="600"
              fontStyle="normal"
            >
              Schedule &gt; {groupDisplayName}
            </AppText>
          </HStack>
          <DrawerBody p={0} overflow="hidden">
            <Box>
              <ReplenishmentPlanningTab />
            </Box>
          </DrawerBody>
          <DrawerFooter p={0}>
            <Flex direction="column" w="full" pb="15px">
              <HStack w="full" justify="end" spacing="12px">
                <AppButton
                  variant="secondary"
                  onClick={onClearHandler}
                  w="105px"
                  h="36px"
                  fontSize="13px"
                  fontWeight="400"
                  borderColor={ocean_blue_600}
                  color={blue_500}
                >
                  Clear
                </AppButton>
                <AppButton
                  variant="solid"
                  onClick={onToggleSavePrompt}
                  w="105px"
                  h="36px"
                  fontSize="13px"
                  fontWeight="400"
                  borderRadius="8px"
                  borderColor={blue_500}
                  color={neutral_100}
                  bg={blue_500}
                  _hover={{ bg: blue_500 }}
                >
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

export default PlanningScheduleDrawer;
