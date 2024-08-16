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
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeDrawer,
  fcConfigPageSliceSelector,
  getTableDataRequest,
  saveAnchorPredictorsRequest,
  saveSKUPredictorsRequest,
  setFcConfigCurrentPage
} from 'state/pages/advancedConfiguration/forecastConfigurationPage/pageState';
import AnchorTab from './AnchorTab';
import SkuTab from './SkuTab';
import { blue_500, ocean_blue_600, neutral_100, yellow_500 } from 'theme/colors';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppTab from 'components/newTheme/AppTab/AppTab';
import { isNumber } from 'lodash';
import { showWarningToast } from 'state/toast/toastState';
import AppPopup from 'components/newTheme/AppPopup/AppPopup';
import useAccessType from 'hooks/useMenuAccessType';
import { hasAccessPermission } from 'utils/permissions';
import { AccessPermissionEnum, MenuItems } from 'utils/enum';

interface Props {
  isOpen: boolean;
}

export type TabType = 'anchor' | 'sku';

const InfluencingFactorDrawer: FC<Props> = ({ isOpen }) => {
  const pageState = useSelector(fcConfigPageSliceSelector);
  const groupDisplayName =
    pageState.trainingConfigLocalScope.selectedFcConfigObj?.groupDetails?.groupDisplayName;
  const anchorPredictors = pageState.influencingFactorsConfig.anchorForecastPredictorsConfig;
  const { onOpen } = useDisclosure();
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
  const btnRef = useRef();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<TabType>('anchor');
  const tabList: TabType[] = ['anchor', 'sku'];
  const selectedTabIndex: number = tabList.indexOf(activeTab);

  const accessType = useAccessType(MenuItems.FORECASTING_SETUP_AND_SCHEDULING);
  const accessNotAllowed = !hasAccessPermission(accessType, [AccessPermissionEnum.EDIT]);

  const onTabChange = (index: number) => {
    setActiveTab(tabList[index]);
  };

  useEffect(() => {
    onOpen();
  }, []);

  const onDrawerClose = () => {
    dispatch(closeDrawer());
  };

  const onCancelHandler = () => {
    onDrawerClose();
    onCloseCancelPrompt();
  };

  const percentageValidation = () => {
    return !!anchorPredictors.find(
      (obj) =>
        (obj.config_type === 'Percentage change' &&
          isNumber(obj.predictor_value) &&
          obj.predictor_value < -100) ||
        obj.predictor_value > 100
    );
  };

  const onSaveHandler = () => {
    if (percentageValidation()) {
      showWarningToast('The percentage value should be between -100% to +100%');
      onClosePrompt();
      return;
    }

    dispatch(saveAnchorPredictorsRequest());
    dispatch(saveSKUPredictorsRequest());
    dispatch(getTableDataRequest({ groupName: '', pageNo: 1 }));
    dispatch(setFcConfigCurrentPage(1));
    onClosePrompt();
    onDrawerClose();
  };

  const saveConfirmationPrompt = useCallback(() => {
    return (
      <AppPopup
        isOpen={isOpenPrompt}
        onClose={onClosePrompt}
        leftBtnName="NO"
        rightBtnName="YES"
        title="Save Changes"
        infoMessage={`The changes made in Influencing Factors - Set Future Values will be applied to all the Anchors in the group.`}
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
        title="Cancel Changes"
        infoMessage={`The changes you have made in Influencing Factors - Set Future Values will be discarded.`}
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
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onDrawerClose}
        //@ts-ignorex
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          maxH="100vh"
          bg={ocean_blue_600}
          w="600px"
          maxW="600px"
          boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
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
              Influencing Factors &gt; {groupDisplayName}
            </AppText>
          </HStack>

          <DrawerBody p={0} overflow="hidden">
            <Box mt="20px">
              <AppTab
                tabs={[
                  { label: 'Anchor', content: <AnchorTab /> },
                  { label: 'SKU', content: <SkuTab /> }
                ]}
                selectedTab={selectedTabIndex}
                onSelectTab={onTabChange}
                variant="primary"
              />
            </Box>
          </DrawerBody>

          <DrawerFooter p={0}>
            <Flex direction="column" w="full" pb="15px">
              <HStack w="full" justify="end" gap="8px">
                <AppButton
                  onClick={onToggleCancelPrompt}
                  variant="secondary"
                  width="105px"
                  height="36px"
                  borderRadius="8px"
                  padding="10px 14px 10px 14px"
                  fontSize="13px"
                  fontWeight="400"
                  color={blue_500}
                  isDisabled={accessNotAllowed}
                >
                  Cancel
                </AppButton>
                <AppButton
                  onClick={onTogglePrompt}
                  variant="primary"
                  width="105px"
                  height="36px"
                  borderRadius="8px"
                  padding="10px 14px 10px 14px"
                  fontSize="13px"
                  fontWeight="400"
                  color={neutral_100}
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

export default InfluencingFactorDrawer;
