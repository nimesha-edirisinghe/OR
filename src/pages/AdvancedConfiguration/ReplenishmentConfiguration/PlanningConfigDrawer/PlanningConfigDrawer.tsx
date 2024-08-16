import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  HStack,
  VStack,
  useDisclosure
} from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { FC, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeRplDrawer,
  getReplenishmentConfigDataRequest,
  rplConfigPageSliceSelector,
  saveRplPlanningPeriodRequest,
  setRplConfigCurrentPage,
  setSelectedPlanningPeriod
} from 'state/pages/advancedConfiguration/replenishmentConfigurationPage/rplConfigPageState';
import ConfigTypeSelection, { ConfigType, ResponseTimeGranularity } from './ConfigTypeSelection';
import { blue_500, ocean_blue_350, ocean_blue_600, neutral_400, yellow_500 } from 'theme/colors';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppButton from 'components/newTheme/AppButton/AppButton';
import AppPopup from 'components/newTheme/AppPopup/AppPopup';
import useAccessType from 'hooks/useMenuAccessType';
import { hasAccessPermission } from 'utils/permissions';
import { AccessPermissionEnum, MenuItems } from 'utils/enum';
interface PlanningConfigDrawerProps {
  isOpen: boolean;
}

const PlanningConfigDrawer: FC<PlanningConfigDrawerProps> = ({ isOpen }) => {
  const rplPageState = useSelector(rplConfigPageSliceSelector);
  const selectedConfigObj = rplPageState.rplPlanningConfigLocalScope.selectedPlaningObj;
  const {
    isOpen: isPromptOpen,
    onToggle: onPromptToggle,
    onClose: onPromptClose
  } = useDisclosure();
  const {
    isOpen: isCancelPromptOpen,
    onToggle: onCancelPromptToggle,
    onClose: onCancelPromptClose
  } = useDisclosure();
  const btnRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  const onDrawerClose = () => {
    dispatch(closeRplDrawer());
    dispatch(setSelectedPlanningPeriod({ planningPeriod: 'Select' }));
  };

  const onSaveHandler = () => {
    dispatch(saveRplPlanningPeriodRequest());
    dispatch(getReplenishmentConfigDataRequest({ pageNo: 1 }));
    dispatch(setRplConfigCurrentPage(1));
    onPromptClose();
    onDrawerClose();
  };

  const onConfigTypeChange = (value: ConfigType) => {
    dispatch(setSelectedPlanningPeriod({ planningPeriod: value }));
  };

  const onCancelHandler = () => {
    onDrawerClose();
    onCancelPromptClose();
  };

  const accessType = useAccessType(MenuItems.REPLENISHMENT_SETUP_AND_SCHEDULING);
  const accessNotAllowed = !hasAccessPermission(accessType, [AccessPermissionEnum.EDIT]);

  const planningConfirmationPrompt = useCallback(() => {
    return (
      <AppPopup
        isOpen={isPromptOpen}
        onClose={onPromptClose}
        leftBtnName="NO"
        rightBtnName="YES"
        title="Save changes"
        infoMessage={
          <AppText>
            The changes you have made in <strong>Planning Configuration</strong> will be applied to
            all the Anchors in the group.
          </AppText>
        }
        onConfirmHandler={onPromptClose}
        onCloseHandler={onSaveHandler}
        icon={<AppIcon name="warningPrompt" fill={yellow_500} width="54px" height="54px" />}
      />
    );
  }, [isPromptOpen]);

  const planningCancelPrompt = useCallback(() => {
    return (
      <AppPopup
        isOpen={isCancelPromptOpen}
        onClose={onCancelPromptClose}
        leftBtnName="NO"
        rightBtnName="YES"
        title="Discard changes"
        infoMessage={
          <AppText>
            The changes you have made in <strong>Planning Configuration</strong> will be discarded.
          </AppText>
        }
        onConfirmHandler={onCancelPromptClose}
        onCloseHandler={onCancelHandler}
        icon={<AppIcon name="warningPrompt" fill={yellow_500} width="54px" height="54px" />}
      />
    );
  }, [isCancelPromptOpen]);

  return (
    <>
      {planningConfirmationPrompt()}
      {planningCancelPrompt()}
      <Drawer isOpen={isOpen} placement="right" onClose={onDrawerClose} finalFocusRef={btnRef}>
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
                Planning Configuration{` > ${selectedConfigObj?.groupDisplayName}`}
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
              <VStack w="full" h="400px" mt={'15px'} align="stretch">
                <AppText size={'body3'} fontWeight={400} lineHeight="18px" color={neutral_400}>
                  Planning Period
                </AppText>
                <HStack>
                  <ConfigTypeSelection
                    configValue={selectedConfigObj?.planningPeriod}
                    responseTimeGranularity={
                      selectedConfigObj?.responseTimeGranularity as ResponseTimeGranularity
                    }
                    onConfigTypeChange={onConfigTypeChange}
                    isDisabled={accessNotAllowed}
                  />
                </HStack>
              </VStack>
            </Box>
          </DrawerBody>

          <DrawerFooter p={0}>
            <Flex direction="column" w="full" pb="15px">
              <HStack w="full" justify="end" spacing="12px">
                <AppButton
                  variant="secondary"
                  onClick={onCancelPromptToggle}
                  size="medium"
                  px="25px"
                  isDisabled={accessNotAllowed}
                >
                  Cancel
                </AppButton>
                <AppButton
                  variant="primary"
                  size="medium"
                  onClick={onPromptToggle}
                  px="25px"
                  isDisabled={accessNotAllowed}
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

export default PlanningConfigDrawer;
