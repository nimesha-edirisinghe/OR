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
  VStack,
  useDisclosure
} from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { FC, useEffect, useRef, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeRplDrawer,
  executePlanningRunNowRequest,
  getPlanningEstimatedTimeRequest,
  rplConfigPageSliceSelector
} from 'state/pages/advancedConfiguration/replenishmentConfigurationPage/rplConfigPageState';
import { showWarningToast } from 'state/toast/toastState';
import { WARNING_MESSAGES } from 'constants/messages';
import { blue_500, ocean_blue_350, ocean_blue_600, yellow_500 } from 'theme/colors';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppButton from 'components/newTheme/AppButton/AppButton';
import AppCheckbox from 'components/newTheme/AppCheckbox/AppCheckbox';
import AppPopup from 'components/newTheme/AppPopup/AppPopup';

interface PlanningRunNowDrawerProps {
  isOpen: boolean;
}

const PlanningRunNowDrawer: FC<PlanningRunNowDrawerProps> = ({ isOpen }) => {
  const rplPageState = useSelector(rplConfigPageSliceSelector);
  const selectedPlaningObj = rplPageState.rplPlanningConfigLocalScope.selectedPlaningObj;
  const [isSelectedRplPlanning, setIsSelectedRplPlanning] = useState(false);
  const { onOpen } = useDisclosure();
  const {
    isOpen: isPromptOpen,
    onToggle: onPromptToggle,
    onClose: onPromptClose
  } = useDisclosure();
  const btnRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    onOpen();
  }, []);

  const onDrawerClose = () => {
    setIsSelectedRplPlanning(false);
    dispatch(closeRplDrawer());
  };

  const onRunNowHandler = () => {
    dispatch(executePlanningRunNowRequest(''));
    onPromptClose();
    onDrawerClose();
  };

  const planningConfirmationPrompt = useCallback(() => {
    const estimatedTime = rplPageState.estimatedTime;
    return (
      <AppPopup
        isOpen={isPromptOpen}
        onClose={onPromptClose}
        leftBtnName="YES"
        rightBtnName="NO"
        infoMessage={`Replenishing planning for ${selectedPlaningObj?.skuCount} SKUs is estimated to take approximately ${estimatedTime?.estimated_time_hour} hours ${estimatedTime?.estimated_time_min} minutes and ${estimatedTime?.estimated_time_sec} seconds. This process cannot be interrupted`}
        onConfirmHandler={onRunNowHandler}
        onCloseHandler={onPromptClose}
        icon={<AppIcon name="warningPrompt" fill={yellow_500} width="54px" height="54px" />}
      />
    );
  }, [isPromptOpen, rplPageState.estimatedTime]);

  const onClickRunHandler = () => {
    if (isSelectedRplPlanning) {
      onPromptToggle();
      dispatch(getPlanningEstimatedTimeRequest(''));
    } else {
      showWarningToast(WARNING_MESSAGES.PLEASE_SELECT_OPERATION);
    }
  };

  return (
    <>
      {planningConfirmationPrompt()}
      <Drawer isOpen={isOpen} placement="right" onClose={onDrawerClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent
          maxH="100vh"
          bg={ocean_blue_600}
          w="600px"
          maxW="600px"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          pl="16px"
          pr="16px"
          pt="22px"
        >
          <DrawerCloseButton mt="10px" color={blue_500} />

          <HStack justify="space-between" w="full">
            <HStack spacing="12px">
              <AppIconButton
                aria-label="back"
                variant="iconPrimary"
                size="iconLarge"
                justifyContent="center"
                alignItems="center"
                icon={<AppIcon name="singleLeftArrow" w="24px" h="24px" fill={blue_500} />}
                onClick={onDrawerClose}
              />
              <AppText size="h4Semibold">
                Run Now{` > ${selectedPlaningObj?.groupDisplayName}`}
              </AppText>
            </HStack>
            <AppIconButton
              aria-label="close"
              variant="iconPrimary"
              size="iconLarge"
              justifyContent="center"
              alignItems="center"
              icon={<AppIcon name="cross" stroke={blue_500} w="24px" h="24px" />}
              onClick={onDrawerClose}
            />
          </HStack>

          <DrawerBody p={0} overflow="hidden">
            <Box
              maxH="71vh"
              overflowX="hidden"
              overflowY="auto"
              __css={{
                '&::-webkit-scrollbar': {
                  w: '1'
                },
                '&::-webkit-scrollbar-track': {
                  w: '1'
                },
                '&::-webkit-scrollbar-thumb': {
                  borderRadius: '10',
                  bg: ocean_blue_350
                }
              }}
            >
              <VStack w="full" h="400px" mt={'15px'} ml={'2px'} align="stretch" spacing="24px">
                <AppCheckbox
                  id={1}
                  isChecked={isSelectedRplPlanning}
                  onChange={(e: any) => {
                    setIsSelectedRplPlanning(!isSelectedRplPlanning);
                  }}
                  label="Replenishment Planning"
                />
              </VStack>
            </Box>
          </DrawerBody>

          <DrawerFooter p={0}>
            <Flex direction="column" w="full" pb="15px">
              <HStack w="full" justify="end">
                <AppButton variant="secondary" onClick={onDrawerClose} size="medium" px="25px">
                  Cancel
                </AppButton>
                <AppButton variant="primary" size="medium" onClick={onClickRunHandler}>
                  Run
                </AppButton>
              </HStack>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default PlanningRunNowDrawer;
