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
  getTableDataRequest
} from 'state/pages/advancedConfiguration/forecastConfigurationPage/pageState';
import InfluencingFactorTab from './InfluencingFactorTab';
import OtherTab from './OtherTab/OtherTab';
import CandidateAlgoTab from './CandidateAlgoTab/CandidateAlgoTab';
import { saveTrainingConfigSettingsRequest } from 'state/pages/advancedConfiguration/forecastConfigurationPage/pageState';
import { isUnderDefaultSettings } from './drawerHelpers';
import { ocean_blue_350, blue_500, neutral_100, ocean_blue_600 } from 'theme/colors';
import AppUserInputPrompt from 'components/AppUserInputPrompt/AppUserInputPrompt';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppTab from 'components/newTheme/AppTab/AppTab';

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
  const [isDefault, setIsDefault] = useState<boolean>(false);
  const tabList: TabType[] = ['candidateAlgorithm', 'influencingFactor', 'other'];
  const selectedTabIndex: number = tabList.indexOf(activeTab);

  const onTabChange = (index: number) => {
    setActiveTab(tabList[index]);
  };

  useEffect(() => {
    const isDefault = isUnderDefaultSettings(trainingConfigData, trainingConfigLocalScope);
    setIsDefault(isDefault);
  }, [trainingConfigData, trainingConfigLocalScope]);

  const onDrawerClose = () => {
    dispatch(closeDrawer());
  };

  const onSaveHandler = () => {
    dispatch(saveTrainingConfigSettingsRequest(isDefault));
    dispatch(getTableDataRequest({ groupName: '', pageNo: 1 }));
    onClosePrompt();
    onDrawerClose();
  };

  const onCancelHandler = () => {
    onDrawerClose();
    onCloseCancelPrompt();
  };

  const saveConfirmationPrompt = useCallback(() => {
    return (
      <AppUserInputPrompt
        isOpen={isOpenPrompt}
        onClose={onClosePrompt}
        leftBtnName="NO"
        rightBtnName="YES"
        title="Save Changes"
        onConfirmHandler={onSaveHandler}
        onCloseHandler={onClosePrompt}
      >
        <AppText fontSize="12px" fontWeight={400} mt={2} width="68%">
          The changes made in training configuration will be applied to all the Anchors in the group
        </AppText>
        <AppText fontSize="12px" fontWeight={400}>
          Are you sure you want to continue?
        </AppText>
      </AppUserInputPrompt>
    );
  }, [isOpenPrompt]);

  const cancelConfirmationPrompt = useCallback(() => {
    return (
      <AppUserInputPrompt
        isOpen={isOpenCancelPrompt}
        onClose={onCloseCancelPrompt}
        leftBtnName="NO"
        rightBtnName="YES"
        title="Discard Changes"
        onConfirmHandler={onCancelHandler}
        onCloseHandler={onCloseCancelPrompt}
      >
        <AppText fontSize="12px" fontWeight={400} mt={2} width="68%">
          The changes you have made in Training Configuration will be discarded.
        </AppText>
        <AppText fontSize="12px" fontWeight={400}>
          Are you sure you want to continue?
        </AppText>
      </AppUserInputPrompt>
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
                <AppText
                  cursor={isDefault ? 'default' : 'pointer'}
                  fontSize="13px"
                  fontWeight={400}
                  color={blue_500}
                  onClick={() => !isDefault && dispatch(resetTrainingConfigurations())}
                >
                  Reset to Defaults
                </AppText>
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
