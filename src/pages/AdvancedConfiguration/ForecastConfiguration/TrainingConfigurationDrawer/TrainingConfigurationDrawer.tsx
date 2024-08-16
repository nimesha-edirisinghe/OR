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
import AppButton from 'components/newTheme/AppButton/AppButton';
import AppText from 'components/AppText/AppText';
import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fcConfigPageSliceSelector,
  closeDrawer,
  resetTrainingConfigurations,
  setFcConfigCurrentPage
} from 'state/pages/advancedConfiguration/forecastConfigurationPage/pageState';
import InfluencingFactorTab from './InfluencingFactorTab';
import OtherTab from './OtherTab/OtherTab';
import CandidateAlgoTab from './CandidateAlgoTab/CandidateAlgoTab';
import { saveTrainingConfigSettingsRequest } from 'state/pages/advancedConfiguration/forecastConfigurationPage/pageState';
import {
  CustomConfigT,
  isUnderCustomConfigSettings,
  isUnderDefaultSettings
} from './drawerHelpers';
import { blue_500, neutral_100, ocean_blue_600, yellow_500 } from 'theme/colors';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppTab from 'components/newTheme/AppTab/AppTab';
import AppPopup from 'components/newTheme/AppPopup/AppPopup';
import useAccessType from 'hooks/useMenuAccessType';
import { hasAccessPermission } from 'utils/permissions';
import { AccessPermissionEnum, MenuItems } from 'utils/enum';

interface Props {
  isOpen: boolean;
}

export type TabType = 'influencingFactor' | 'candidateAlgorithm' | 'other';

const TrainingConfigurationDrawer: FC<Props> = ({ isOpen }) => {
  const {
    isOpen: isOpenPrompt,
    onToggle: onTogglePrompt,
    onClose: onClosePrompt
  } = useDisclosure();
  const {
    isOpen: isOpenCancelPrompt,
    onToggle: onToggleCancelPrompt,
    onClose: onCloseCancelPrompt
  } = useDisclosure();
  const dispatch = useDispatch();
  const fcConfigPage = useSelector(fcConfigPageSliceSelector);
  const trainingConfigData = fcConfigPage.trainingConfigData;
  const trainingConfigLocalScope = fcConfigPage.trainingConfigLocalScope;
  const groupDisplayName =
    fcConfigPage.trainingConfigLocalScope.selectedFcConfigObj?.groupDetails?.groupDisplayName;
  const [activeTab, setActiveTab] = useState<TabType>('influencingFactor');
  const [isDefault, setIsDefault] = useState<boolean>(true);
  const [enableRestBtn, setEnableRestBtn] = useState<boolean>(false);
  const [customConfig, setCustomConfig] = useState<CustomConfigT>('Default');
  const tabList: TabType[] = ['candidateAlgorithm', 'influencingFactor', 'other'];
  const selectedTabIndex: number = tabList.indexOf(activeTab);

  const accessType = useAccessType(MenuItems.FORECASTING_SETUP_AND_SCHEDULING);
  const accessNotAllowed = !hasAccessPermission(accessType, [AccessPermissionEnum.EDIT]);

  const onTabChange = (index: number) => {
    setActiveTab(tabList[index]);
  };

  useEffect(() => {
    const isDefault = isUnderDefaultSettings(trainingConfigData);
    const customConfig = isUnderCustomConfigSettings(trainingConfigData, trainingConfigLocalScope);
    setIsDefault(isDefault);
    setCustomConfig(customConfig);
    setEnableRestBtn(customConfig === 'Custom');
  }, [trainingConfigData, trainingConfigLocalScope]);

  const onDrawerClose = () => {
    dispatch(closeDrawer());
  };

  const onSaveHandler = () => {
    dispatch(saveTrainingConfigSettingsRequest(isDefault, customConfig));
    dispatch(setFcConfigCurrentPage(1));
    onClosePrompt();
    onDrawerClose();
  };

  const onCancelHandler = () => {
    onDrawerClose();
    onCloseCancelPrompt();
  };

  const saveConfirmationPrompt = useCallback(() => {
    return (
      <AppPopup
        isOpen={isOpenPrompt}
        onClose={onClosePrompt}
        leftBtnName="NO"
        rightBtnName="YES"
        title="Save Changes"
        infoMessage={` The changes made in training configuration will be applied to all the Anchors in the group`}
        onConfirmHandler={onClosePrompt}
        onCloseHandler={onSaveHandler}
        confirmationMessage="Are you sure you want to continue?"
        icon={<AppIcon name="warningPrompt" fill={yellow_500} width="54px" height="54px" />}
      />
    );
  }, [isOpenPrompt]);

  const cancelConfirmationPrompt = useCallback(() => {
    return (
      <AppPopup
        isOpen={isOpenCancelPrompt}
        onClose={onCloseCancelPrompt}
        leftBtnName="NO"
        rightBtnName="YES"
        title="Discard Changes"
        infoMessage={`The changes you have made in Training Configuration will be discarded.`}
        onConfirmHandler={onCloseCancelPrompt}
        onCloseHandler={onCancelHandler}
        confirmationMessage="Are you sure you want to continue?"
        icon={<AppIcon name="warningPrompt" fill={yellow_500} width="54px" height="54px" />}
      />
    );
  }, [isOpenCancelPrompt]);

  return (
    <>
      {saveConfirmationPrompt()}
      {cancelConfirmationPrompt()}

      <Drawer isOpen={isOpen} placement="right" onClose={onDrawerClose}>
        <DrawerOverlay />
        <DrawerContent
          maxH="100vh"
          bg={ocean_blue_600}
          w="600px"
          maxW="600px"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          px="20px"
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
              fontWeight="700"
              fontStyle="normal"
            >
              Training Configuration &gt; {groupDisplayName}
            </AppText>
          </HStack>
          <DrawerBody p={0} overflow="hidden">
            <Box mt="20px">
              <AppTab
                tabWidth="155px"
                tabs={[
                  {
                    label: 'Influencing Factors',
                    content: trainingConfigData.predictors &&
                      trainingConfigData.predictors.length > 0 && <InfluencingFactorTab />
                  },
                  {
                    label: 'Candidate Algorithms',
                    content: trainingConfigData.algorithmSettings &&
                      Object.keys(trainingConfigData.algorithmSettings).length > 0 && (
                        <CandidateAlgoTab />
                      )
                  },
                  {
                    label: 'Other',
                    content: trainingConfigData.algorithmSettings &&
                      Object.keys(trainingConfigData.algorithmSettings).length > 0 && <OtherTab />
                  }
                ]}
                selectedTab={selectedTabIndex}
                onSelectTab={onTabChange}
                variant="primary"
              />
            </Box>
          </DrawerBody>

          <DrawerFooter p={0}>
            <Flex direction="column" w="full" pb="15px">
              <HStack w="full" justify="space-between">
                <AppButton
                  variant="secondary"
                  size="medium"
                  onClick={() => enableRestBtn && dispatch(resetTrainingConfigurations())}
                  isDisabled={!enableRestBtn || accessNotAllowed}
                >
                  Reset to Defaults
                </AppButton>
                {/* <AppText
                  cursor={enableRestBtn ? 'pointer' : 'default'}
                  fontSize="13px"
                  fontWeight={400}
                  color={blue_500}
                  onClick={() => enableRestBtn && dispatch(resetTrainingConfigurations())}
                >
                  Reset to Defaults
                </AppText> */}
                <HStack gap="8px">
                  <AppButton
                    variant="secondary"
                    fontSize="13px"
                    fontWeight={400}
                    color={blue_500}
                    onClick={onToggleCancelPrompt}
                    w="105px"
                    h="36px"
                    borderRadius="8px"
                    p="10px 14px 10px 14px"
                    isDisabled={accessNotAllowed}
                  >
                    Cancel
                  </AppButton>
                  <AppButton
                    onClick={onTogglePrompt}
                    variant="primary"
                    fontSize="13px"
                    fontWeight={400}
                    color={neutral_100}
                    w="105px"
                    h="36px"
                    borderRadius="8px"
                    p="10px 14px 10px 14px"
                    isDisabled={accessNotAllowed}
                  >
                    Save
                  </AppButton>
                </HStack>
              </HStack>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default TrainingConfigurationDrawer;
