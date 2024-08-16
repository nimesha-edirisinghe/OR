import {
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
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppInput from 'components/AppInput/AppInput';
import AppText from 'components/AppText/AppText';
import AppToggle from 'components/AppToggle/AppToggle';
import AppButton from 'components/newTheme/AppButton/AppButton';
import AppDropdown from 'components/newTheme/AppDropdown/AppDropdown';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import AppPopup from 'components/newTheme/AppPopup/AppPopup';
import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  cancelEditMode,
  editGroupRequest,
  resetStoreGroup,
  setActiveStatus,
  toggleEditDrawer
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import {
  blue_500,
  neutral_100,
  neutral_400,
  ocean_blue_300,
  ocean_blue_500,
  ocean_blue_600,
  red_400,
  yellow_500
} from 'theme/colors';
import { GroupTypes } from 'types/groupConfig';
import { StoreGroupI } from 'types/responses/groupConfigResponses';
import { GroupTypesEnum } from 'utils/enum';
import { repeatDurationOptions } from 'utils/utility';

interface StoreGroupCardEditDrawerProps {
  isOpen: boolean;
  storeGroup: StoreGroupI;
  groupType: GroupTypes;
}

const StoreGroupCardEditDrawer: FC<StoreGroupCardEditDrawerProps> = ({
  isOpen,
  storeGroup,
  groupType
}) => {
  const dispatch = useDispatch();
  const {
    isOpen: isSaveConfirmationOpen,
    onToggle: onSaveConfirmationToggle,
    onClose: onSaveConfirmationClose
  } = useDisclosure();
  const {
    isOpen: isCancelConfirmationOpen,
    onToggle: onCancelConfirmationToggle,
    onClose: onCancelConfirmationClose
  } = useDisclosure();
  const [groupName, setGroupName] = useState<string>('');
  const [forecastHorizon, setForecastHorizon] = useState<string>(``);
  const [storeActive, setStoreActive] = useState<boolean>(false);
  const [isEdited, setEdited] = useState<boolean>(false);
  const options: string[] = repeatDurationOptions.map(
    (obj: { key: string; value: string }) => obj.key
  );

  useEffect(() => {
    if (storeGroup) {
      const initialGroupName = storeGroup?.groupDesc?.split(/\s+\(WH\)/)[0];
      const isStoreActive = storeGroup?.currentEnabledStatus === 0 ? false : true;
      setGroupName(initialGroupName);
      setForecastHorizon(`${storeGroup.forecastingHorizon}`);
      setStoreActive(isStoreActive);
    }
  }, [storeGroup]);

  const onSaveHandler = (groupKey: number, forecastHorizon: number, groupName: string) => {
    dispatch(editGroupRequest({ groupKey, forecastHorizon, groupName, groupType }));
    dispatch(toggleEditDrawer());
    onSaveConfirmationClose();
    if (groupType === GroupTypesEnum.STORE) dispatch(resetStoreGroup());
  };

  const onClickSave = () => {
    const fh = parseInt(forecastHorizon);
    const formattedGroupName = groupType === GroupTypesEnum.STORE ? groupName : `${groupName} (WH)`;
    onSaveHandler(storeGroup.groupKey, fh, formattedGroupName);
    setEdited(false);
  };

  const onDrawerClose = () => {
    if (isEdited) onCancelConfirmationToggle();
    else dispatch(toggleEditDrawer());
  };

  const handleToggleChange = () => {
    setStoreActive((prev) => !prev);
    dispatch(setActiveStatus({ groupType, groupKey: storeGroup.groupKey }));
    setEdited(true);
  };

  const onCancelEditHandler = () => {
    const groupKey = storeGroup.groupKey;
    dispatch(
      cancelEditMode({
        groupKey,
        groupType
      })
    );
    onCancelConfirmationClose();
    dispatch(toggleEditDrawer());
  };

  const onClickCancelHandler = () => {
    if (isEdited) onCancelConfirmationToggle();
    else dispatch(toggleEditDrawer());
  };

  const isGroupFieldValid = () => {
    return groupName.length > 0 && forecastHorizon.length > 0 && forecastHorizon !== '0';
  };

  const onGroupFieldChange = (field: number, value: string) => {
    if (field === 1) setGroupName(value);
    else if (field === 2) {
      const isHorizonValid = /^\d+$/.test(value) || value === '';
      if (isHorizonValid) setForecastHorizon(value);
    }
    setEdited(true);
  };

  const onSaveConfirmationPrompt = useCallback(() => {
    return (
      <AppPopup
        isOpen={isSaveConfirmationOpen}
        onClose={onSaveConfirmationClose}
        leftBtnName="Cancel"
        rightBtnName="Save"
        title="Save Changes"
        infoMessage={`Are you sure you wish to save all the changes`}
        onConfirmHandler={onSaveConfirmationClose}
        onCloseHandler={onClickSave}
        icon={<AppIcon name="warningPrompt" fill={yellow_500} width="54px" height="54px" />}
      />
    );
  }, [isSaveConfirmationOpen]);

  const onCancelConfirmationPrompt = useCallback(() => {
    return (
      <AppPopup
        isOpen={isCancelConfirmationOpen}
        onClose={onCancelConfirmationClose}
        leftBtnName="Yes"
        rightBtnName="No"
        title="Cancel Changes"
        infoMessage={`Are you sure you wish to discard all changes?`}
        onConfirmHandler={onCancelEditHandler}
        onCloseHandler={onCancelConfirmationClose}
        icon={<AppIcon name="warningPrompt" fill={yellow_500} width="54px" height="54px" />}
      />
    );
  }, [isCancelConfirmationOpen]);

  return (
    <>
      {onSaveConfirmationPrompt()}
      {onCancelConfirmationPrompt()}
      <Drawer isOpen={isOpen} placement="right" onClose={() => {}}>
        <DrawerOverlay />
        <DrawerContent
          maxH="100vh"
          bg={ocean_blue_600}
          w="600px"
          maxW="600px"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          px="16px"
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
              <AppText fontSize={'13px'} fontWeight="600" color={neutral_100}>
                Edit Group Information
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
            <VStack pt="16px">
              <VStack w={'full'}>
                <HStack w={'full'} justify={'start'}>
                  <AppText size={'body3'} color={neutral_400} fontWeight={'400'}>
                    Group Name
                  </AppText>
                  <AppText color={red_400} m={'0px !important'}>
                    *
                  </AppText>
                </HStack>
                <AppInput
                  onChange={(e) => onGroupFieldChange(1, e.target.value)}
                  value={groupName}
                  maxLength={40}
                  bg={ocean_blue_500}
                  h={'36px'}
                  border={'none'}
                  borderRadius={'8px'}
                  placeholder="Enter group name"
                  fontSize={'12px'}
                  _placeholder={{ color: ocean_blue_300, fontSize: '12px' }}
                />
              </VStack>
              <VStack w={'full'}>
                <AppText w={'full'} size={'body3'} color={neutral_400} fontWeight={'400'}>
                  Forecasting Frequency
                </AppText>
                <AppDropdown
                  options={options}
                  buttonWidth="570px"
                  height="36px"
                  handleItemClick={() => {}}
                  selectedItem={storeGroup?.forecastingFrequency}
                  isDisabled={true}
                />
              </VStack>
              <VStack w={'full'}>
                <AppText w={'full'} size={'body3'} color={neutral_400} fontWeight={'400'}>
                  Forecasting Horizon
                </AppText>
                <AppInput
                  type="text"
                  onChange={(e) => onGroupFieldChange(2, e.target.value)}
                  value={forecastHorizon}
                  bg={ocean_blue_500}
                  h={'36px'}
                  border={'none'}
                  borderRadius={'8px'}
                  placeholder="Enter forecasting horizon"
                  fontSize={'12px'}
                  _placeholder={{ color: ocean_blue_300, fontSize: '12px' }}
                />
              </VStack>
              <VStack w={'full'}>
                <AppText w={'full'} size={'body3'} color={neutral_400} fontWeight={'400'}>
                  Activate Group
                </AppText>
                <HStack w={'full'} justify={'start'}>
                  <AppToggle
                    isChecked={storeActive}
                    onChange={handleToggleChange}
                    color={'black'}
                    size="sm"
                  />
                </HStack>
              </VStack>
            </VStack>
          </DrawerBody>

          <DrawerFooter p={0}>
            <Flex direction="column" w="full" pb="15px">
              <HStack w="full" justify="end">
                <AppButton
                  variant="secondary"
                  size="medium"
                  onClick={onClickCancelHandler}
                  px="25px"
                >
                  Cancel
                </AppButton>
                <AppButton
                  variant="primary"
                  size="medium"
                  onClick={onSaveConfirmationToggle}
                  px="25px"
                  isDisabled={!isGroupFieldValid() || !isEdited}
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

export default StoreGroupCardEditDrawer;
