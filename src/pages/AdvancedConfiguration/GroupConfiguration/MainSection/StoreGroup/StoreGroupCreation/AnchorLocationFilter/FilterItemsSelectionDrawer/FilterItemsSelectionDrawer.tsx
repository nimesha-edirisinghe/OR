import {
  Box,
  Divider,
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
import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeftPanel from './LeftPanel/LeftPanel';
import RightPanel from './RightPanel/RightPanel';
import PanelHeader from './LeftPanel/PanelHeader';
import { getFromLocal } from 'utils/localStorage';
import { KeyValueI } from 'types/responses/insightResponses';
import { addOrRemoveItemHelper } from './Helpers/addOrRemoveItemHelper';
import { getSelectedRightSideItem } from './Helpers/rightPanelUpdateHelper';
import { leftPanelListUpdateHelper } from './Helpers/leftPanelListUpdateHelper';
import { produce } from 'immer';
import {
  IGroupConfigurationSlice,
  getFilterCountRequest,
  groupConfigurationSliceSelector,
  toggleViewGroupConfigDrawer,
  toggleGroupFilterItemSelectionDrawer,
  updateGroupFilter,
  resetGroupDetail
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { RightFilterItemContentI } from 'types/groupConfig';
import { blue_500, ocean_blue_600, yellow_500 } from 'theme/colors';
import AppButton from 'components/newTheme/AppButton/AppButton';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppPopup from 'components/newTheme/AppPopup/AppPopup';

interface Props {
  isOpen: boolean;
}

const FilterItemsSelectionDrawer: FC<Props> = ({ isOpen }) => {
  const dispatch = useDispatch();
  const {
    isOpen: isOpenCancelPrompt,
    onToggle: onToggleCancelPrompt,
    onClose: onCloseCancelPrompt
  } = useDisclosure();
  const groupConfigState: IGroupConfigurationSlice = useSelector(groupConfigurationSliceSelector);
  const groupFilter = groupConfigState.groupFilter;
  const filterType = groupFilter?.filterType!;
  const filterCode = groupFilter?.filterCode!;
  const filterItemListData = groupFilter?.filterItemListData;
  const viewFilter = groupFilter.filterLocalScope.viewFilter;
  const viewOutOfCount = groupFilter.filterLocalScope.viewOutOfCount;
  const rightPanelRetainDataList = groupFilter?.filterLocalScope.rightPanelRetainDataList;
  const beforeEditFilterOptionsLevel2 = groupFilter?.filterLocalScope.beforeEditFilterOptionsLevel2;
  const [selectedRightSideItem, setSelectedRightSideItem] = useState<RightFilterItemContentI>();

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

  const onDrawerClose = () => {
    if (viewFilter) {
      const _groupFilter = produce(
        groupConfigState.groupFilter,
        (draft: IGroupConfigurationSlice['groupFilter']) => {
          if (draft) {
            draft.filterLocalScope.isOpenItemSelectionDrawer = false;
          }
        }
      );
      dispatch(updateGroupFilter(_groupFilter));
      dispatch(toggleViewGroupConfigDrawer({ state: true }));
    } else {
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
      dispatch(resetGroupDetail());
      onCloseCancelPrompt();
    }
  };

  const onSaveSelectedItems = () => {
    dispatch(getFilterCountRequest({ whFlag: 0 }));
    dispatch(toggleGroupFilterItemSelectionDrawer(false));
    dispatch(resetGroupDetail());
  };

  const cancelConfirmationPrompt = useCallback(() => {
    return (
      <AppPopup
        isOpen={isOpenCancelPrompt}
        onClose={onCloseCancelPrompt}
        leftBtnName="Yes"
        rightBtnName="No"
        title="Cancel Changes"
        infoMessage={`The changes you have made in filters will be discarded.Are you sure you want to continue?`}
        onConfirmHandler={onDrawerClose}
        onCloseHandler={onCloseCancelPrompt}
        icon={<AppIcon name="warningPrompt" fill={yellow_500} width="54px" height="54px" />}
      />
    );
  }, [isOpenCancelPrompt]);

  return (
    <>
      {cancelConfirmationPrompt()}
      <Drawer isOpen={isOpen} placement="right" onClose={onDrawerClose}>
        <DrawerOverlay />
        <DrawerContent
          maxH="100vh"
          bg={ocean_blue_600}
          w="1000px"
          maxW="1000px"
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
              <AppText size="h4Semibold">
                {getFromLocal('insightDrawerTitle')} ({viewOutOfCount})
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
          <Divider color="#595959" h="1px" mt="8px" />
          <DrawerBody p={0} overflow="hidden">
            <VStack h="full" spacing="20px">
              <HStack w="full">
                <Box flex={1} h="40px" justifyContent="start" pt="18px">
                  <PanelHeader
                    selectedRightSideItem={selectedRightSideItem}
                    viewFilter={viewFilter}
                    title={getFromLocal('insightDrawerTitle')}
                    width="full"
                  />
                </Box>
              </HStack>
              <HStack h="full" w={'full'} spacing="15px" pt="11px" align="start">
                <Box flex={1} h={viewFilter ? 'calc(100vh - 130px)' : 'calc(100vh - 200px)'}>
                  <LeftPanel
                    viewFilter={viewFilter}
                    addOrRemoveItem={addOrRemoveItem}
                    selectedRightSideItem={selectedRightSideItem}
                  />
                </Box>
                {!viewFilter && (
                  <Box flex={1} h="calc(100vh - 200px)">
                    <RightPanel
                      selectedRightSideItem={selectedRightSideItem}
                      addOrRemoveItem={addOrRemoveItem}
                    />
                  </Box>
                )}
              </HStack>
            </VStack>
          </DrawerBody>
          {!viewFilter && (
            <DrawerFooter p={0}>
              <Flex direction="column" w="full" pb="15px">
                <Divider color="#595959" h="1px" mt="8px" mb="20px" />
                <HStack w="full" justify="end">
                  <AppButton
                    variant="secondary"
                    size="medium"
                    onClick={onToggleCancelPrompt}
                    px="25px"
                  >
                    Cancel
                  </AppButton>
                  <AppButton
                    variant="primary"
                    size="medium"
                    onClick={onSaveSelectedItems}
                    px="25px"
                  >
                    Select
                  </AppButton>
                </HStack>
              </Flex>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FilterItemsSelectionDrawer;
