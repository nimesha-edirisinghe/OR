import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  HStack,
  useDisclosure,
  VStack
} from '@chakra-ui/react';
import AppButton from 'components/AppButton/AppButton';
import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeftPanel from './LeftPanel/LeftPanel';
import RightPanel from './RightPanel/RightPanel';
import PanelHeader from './LeftPanel/PanelHeader';
import { getFromLocal } from 'utils/localStorage';
import { KeyValueI } from 'types/responses/insightResponses';
import { addOrRemoveItemHelper, removeAllSelectedItems } from './Helpers/addOrRemoveItemHelper';
import { getSelectedRightSideItem } from './Helpers/rightPanelUpdateHelper';
import { leftPanelListUpdateHelper } from './Helpers/leftPanelListUpdateHelper';
import { produce } from 'immer';
import {
  IGroupConfigurationSlice,
  getFilterCountRequest,
  groupConfigurationSliceSelector,
  toggleGroupFilterItemSelectionDrawer,
  updateGroupFilter,
  toggleDrawerFilter
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { RightFilterItemContentI } from 'types/groupConfig';
import AppText from 'components/newTheme/AppText/AppText';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppPopup from 'components/newTheme/AppPopup/AppPopup';
import { ocean_blue_600, yellow_500 } from 'theme/colors';
import _ from 'lodash';

interface Props {
  isOpen: boolean;
  okButtonName?: string;
  whFlag?: 0 | 1 | 2;
  isOnAlertPage?: boolean;
  totalCount?: number;
  isEnableSelectAll?: boolean;
}

const FilterItemsSelectionDrawer: FC<Props> = ({
  isOpen,
  okButtonName = 'Apply',
  whFlag = 0,
  isOnAlertPage = false,
  totalCount = 0,
  isEnableSelectAll = true
}) => {
  const dispatch = useDispatch();
  const {
    isOpen: isOpenCancelPrompt,
    onToggle: onToggleCancelPrompt,
    onClose: onCloseCancelPrompt
  } = useDisclosure();
  const groupConfigState: IGroupConfigurationSlice = useSelector(groupConfigurationSliceSelector);
  const [selectedRightSideItem, setSelectedRightSideItem] = useState<RightFilterItemContentI>();
  const [searchKey, setSearchKey] = useState<string>(selectedRightSideItem?.search || '');
  const groupFilter = groupConfigState.groupFilter;
  const filterType = groupFilter?.filterType!;
  const filterCode = groupFilter?.filterCode!;
  const filterItemListData = groupFilter?.filterItemListData;
  const itemSelectionDrawerOpenFrom = groupFilter?.filterLocalScope.itemSelectionDrawerOpenFrom;
  const rightPanelRetainDataList = groupFilter?.filterLocalScope.rightPanelRetainDataList;
  const beforeEditFilterOptionsLevel2 = groupFilter?.filterLocalScope.beforeEditFilterOptionsLevel2;

  useEffect(() => {
    const _selectedRightSideItem = getSelectedRightSideItem(
      filterCode,
      filterType,
      groupFilter
    ) as RightFilterItemContentI;

    setSelectedRightSideItem(_selectedRightSideItem);
    if (!_selectedRightSideItem?.isSelectAll) {
      leftPanelListUpdateHelper(_selectedRightSideItem, groupFilter, dispatch);
    }
  }, [rightPanelRetainDataList, filterItemListData && filterItemListData.length, filterType]);

  const addOrRemoveItem = (status: boolean, item: KeyValueI) => {
    addOrRemoveItemHelper(filterCode, filterType, status, item, groupFilter, dispatch);
  };

  const onClearRightSidePanel = () => {
    removeAllSelectedItems(filterCode, filterType, groupFilter, dispatch);
  };

  const onDrawerClose = () => {
    const _groupFilter = produce(
      groupConfigState.groupFilter,
      (draft: IGroupConfigurationSlice['groupFilter']) => {
        if (draft) {
          draft.filterLocalScope.rightPanelRetainDataList = beforeEditFilterOptionsLevel2!;
          draft.filterLocalScope.isOpenItemSelectionDrawer = false;
        }
      }
    );
    dispatch(updateGroupFilter(_groupFilter));
    if (itemSelectionDrawerOpenFrom === 'drawer') {
      dispatch(toggleDrawerFilter({ isOpen: true }));
    }
    setSearchKey('');
    onCloseCancelPrompt();
  };
  const onSaveSelectedItems = () => {
    dispatch(getFilterCountRequest({ whFlag, isAlertPage: isOnAlertPage }));
    dispatch(toggleGroupFilterItemSelectionDrawer(false));
    if (itemSelectionDrawerOpenFrom === 'drawer') {
      dispatch(toggleDrawerFilter({ isOpen: true }));
    }
    setSearchKey('');
  };

  const cancelConfirmationPrompt = useCallback(() => {
    return (
      <AppPopup
        isOpen={isOpenCancelPrompt}
        onClose={onCloseCancelPrompt}
        leftBtnName="YES"
        rightBtnName="NO"
        infoMessage="The changes you have made in filters will be discarded. Are you sure you want to continue?"
        onConfirmHandler={onDrawerClose}
        onCloseHandler={onCloseCancelPrompt}
        icon={<AppIcon name="warningPrompt" fill={yellow_500} width="54px" height="54px" />}
      />
    );
  }, [isOpenCancelPrompt]);

  const checkEmptyAndNotSavedData = () => {
    const foundLv2 = beforeEditFilterOptionsLevel2?.find(
      (element) => element.code === filterCode && element.type === filterType
    );
    if (!foundLv2) {
      const found = rightPanelRetainDataList?.find(
        (element) => element.code === filterCode && element.type === filterType
      );

      if (found) {
        if (found.selectedItems.length === 0) {
          onDrawerClose();
          return true;
        }
      }
    }
    return false;
  };

  const onDrawerCloseEvent = () => {
    if (checkEmptyAndNotSavedData()) return;

    if (!_.isEqual(beforeEditFilterOptionsLevel2, rightPanelRetainDataList)) {
      onToggleCancelPrompt();
    } else {
      onDrawerClose();
    }
  };

  return (
    <>
      {cancelConfirmationPrompt()}
      <Drawer isOpen={isOpen} placement="right" onClose={() => onDrawerCloseEvent()}>
        <DrawerOverlay backdropFilter="blur(2px)" />
        <DrawerContent
          maxH="100vh"
          bg={ocean_blue_600}
          w="1000px"
          maxW="1000px"
          p="20px"
          userSelect="none"
        >
          <DrawerBody p={0} overflow="hidden">
            <VStack w="full" spacing="20px">
              <HStack justify="space-between" w="full">
                <HStack spacing="12px">
                  <AppIconButton
                    aria-label="back"
                    variant="iconPrimary"
                    size="iconLarge"
                    justifyContent="center"
                    alignItems="center"
                    icon={<AppIcon name="singleLeftArrow" w="24px" h="24px" fill="#0AA5FF" />}
                    onClick={() => onDrawerCloseEvent()}
                  />
                  <AppText size="h4Semibold">{getFromLocal('insightDrawerTitle')}</AppText>
                </HStack>
                <AppIconButton
                  aria-label="close"
                  variant="iconPrimary"
                  size="iconLarge"
                  justifyContent="center"
                  alignItems="center"
                  icon={<AppIcon name="cross" stroke="#0AA5FF" w="24px" h="24px" />}
                  onClick={() => onDrawerCloseEvent()}
                />
              </HStack>

              <HStack w="full">
                <PanelHeader
                  selectedRightSideItem={selectedRightSideItem}
                  setSearchKey={setSearchKey}
                  searchKey={searchKey}
                  title={getFromLocal('insightDrawerTitle')}
                  whFlag={whFlag}
                />
              </HStack>

              <Box w="full" overflowX="auto">
                <HStack h="full" spacing="20px" align="start">
                  <Box flex={1} h="calc(100vh - 200px)">
                    <LeftPanel
                      addOrRemoveItem={addOrRemoveItem}
                      selectedRightSideItem={selectedRightSideItem}
                      isEnableSelectAll={isEnableSelectAll}
                    />
                  </Box>
                  <Box flex={1} h="calc(100vh - 200px)">
                    <RightPanel
                      selectedRightSideItem={selectedRightSideItem}
                      addOrRemoveItem={addOrRemoveItem}
                      defaultMessage=""
                      totalCount={totalCount}
                    />
                  </Box>
                </HStack>
              </Box>
            </VStack>
          </DrawerBody>
          <DrawerFooter p={0}>
            <HStack w="full" justify="end" spacing="12px" pt="20px">
              <AppButton
                variant="secondary"
                size="medium"
                onClick={onClearRightSidePanel}
                px="25px"
              >
                Clear
              </AppButton>
              <AppButton variant="primary" size="medium" onClick={onSaveSelectedItems} px="25px">
                {okButtonName}
              </AppButton>
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FilterItemsSelectionDrawer;
