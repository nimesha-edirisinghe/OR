import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  HStack,
  VStack
} from '@chakra-ui/react';
import AppButton from 'components/AppButton/AppButton';
import AppText from 'components/AppText/AppText';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeftPanel from './LeftPanel/LeftPanel';
import RightPanel from './RightPanel/RightPanel';
import PanelHeader from './LeftPanel/PanelHeader';
import { getFromLocal } from 'utils/localStorage';
import { KeyValueI } from 'types/responses/insightResponses';
import { addOrRemoveItemHelper } from './Helpers/addOrRemoveItemHelper';
import { getSelectedRightSideItem } from './Helpers/rightPanelUpdateHelper';
import { leftPanelListUpdateHelper } from './Helpers/leftPanelListUpdateHelper';
import {
  IActivityLogSlice,
  activityLogSliceSelector,
  closeFilterItemsDrawer,
  getFilterCountRequest,
  openFilterDrawer,
  updateRightPanelRetainDataList
} from 'state/pages/operationAndMonitoring/activityLog/activityLogState';
import { FilterItemContentI } from 'types/activityLog';
import { blue_500, neutral_100, ocean_blue_600 } from 'theme/colors';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { toggleSelectAllItems } from './Helpers/selectAllToggleHelper';

interface Props {
  isOpen: boolean;
}

const FilterItemsSelectionDrawer: FC<Props> = ({ isOpen }) => {
  const dispatch = useDispatch();
  const activityLogState: IActivityLogSlice = useSelector(activityLogSliceSelector);
  const dashboardFilter = activityLogState.dashboardFilter;
  const filterType = dashboardFilter.filterType;
  const filterItemListData = dashboardFilter.filterItemListData;
  const rightPanelRetainDataList = dashboardFilter.filterLocalScope.rightPanelRetainDataList;
  const beforeEditFilterOptionsLevel2 =
    dashboardFilter.filterLocalScope.beforeEditFilterOptionsLevel2;
  const [selectedRightSideItem, setSelectedRightSideItem] = useState<FilterItemContentI>();
  const [searchKey, setSearchKey] = useState<string>(selectedRightSideItem?.search || '');

  useEffect(() => {
    setSearchKey(selectedRightSideItem?.search!);
  }, [selectedRightSideItem?.search, filterItemListData]);

  useEffect(() => {
    if (filterType !== 'date') {
      const _selectedRightSideItem = getSelectedRightSideItem(
        filterType,
        dashboardFilter
      ) as FilterItemContentI;
      setSelectedRightSideItem(_selectedRightSideItem);
      if (!_selectedRightSideItem?.isSelectAll) {
        leftPanelListUpdateHelper(_selectedRightSideItem, dashboardFilter, dispatch);
      }
    }
  }, [rightPanelRetainDataList, filterItemListData.length, filterType]);

  const addOrRemoveItem = (status: boolean, item: KeyValueI) => {
    addOrRemoveItemHelper(status, item, filterType, dashboardFilter, dispatch);
  };

  const onDrawerClose = () => {
    dispatch(updateRightPanelRetainDataList(beforeEditFilterOptionsLevel2));
    dispatch(closeFilterItemsDrawer());
    dispatch(openFilterDrawer());
    setSearchKey('');
  };

  const onSaveSelectedItems = () => {
    dispatch(getFilterCountRequest());
    dispatch(closeFilterItemsDrawer());
    dispatch(openFilterDrawer());
    setSearchKey('');
  };

  const clearHandler = () => {
    const filterType = dashboardFilter?.filterType!;
    toggleSelectAllItems(false, filterType, dashboardFilter, dispatch);
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onDrawerClose}>
      <DrawerOverlay />
      <DrawerContent
        maxH="100vh"
        bg={ocean_blue_600}
        w="600px"
        maxW="600px"
        p="20px"
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
            <AppText fontSize="13px" fontWeight={600} color={neutral_100}>
              {getFromLocal('insightDrawerTitle') || ''}
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
          <VStack h="full" spacing="20px">
            <HStack w="full">
              <Box flex={1} h="40px" justifyContent="start" pt="18px">
                <PanelHeader
                  selectedRightSideItem={selectedRightSideItem}
                  setSearchKey={setSearchKey}
                  searchKey={searchKey}
                  title={getFromLocal('insightDrawerTitle') || ''}
                />
              </Box>
            </HStack>
            <HStack h="full" w="full" spacing="15px" pt="11px" align="start">
              <Box flex={1} h="full">
                <LeftPanel
                  addOrRemoveItem={addOrRemoveItem}
                  selectedRightSideItem={selectedRightSideItem}
                />
              </Box>
              <Box flex={1} h="full">
                <RightPanel
                  selectedRightSideItem={selectedRightSideItem}
                  addOrRemoveItem={addOrRemoveItem}
                />
              </Box>
            </HStack>
          </VStack>
        </DrawerBody>
        <DrawerFooter p={0}>
          <Flex direction="column" w="full" pt="20px">
            <HStack w="full" justify="end" spacing="8px">
              <AppButton
                variant="secondary"
                onClick={clearHandler}
                w="105px"
                h="36px"
                p="10px 14px 10px 14px"
                fontWeight={400}
                fontSize="13px"
                color={blue_500}
              >
                Clear
              </AppButton>
              <AppButton
                variant="primary"
                w="105px"
                h="36px"
                p="10px 14px 10px 14px"
                onClick={onSaveSelectedItems}
                px="25px"
                fontWeight={400}
                fontSize="13px"
                color={neutral_100}
              >
                Modify List
              </AppButton>
            </HStack>
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default FilterItemsSelectionDrawer;
