import {
  Box,
  Divider,
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
import { AppIconChakra } from 'assets/svg/chakraIcons';
import AppButton from 'components/AppButton/AppButton';
import AppText from 'components/AppText/AppText';
import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IInsight,
  closeFilterItemsDrawer,
  getFilterCountRequest,
  updateRightPanelRetainDataList,
  openFilterDrawer
} from 'state/pages/insights/insightState';
import LeftPanel from './LeftPanel/LeftPanel';
import RightPanel from './RightPanel/RightPanel';
import PanelHeader from './LeftPanel/PanelHeader';
import { IRootState } from 'state/rootState';
import { RightFilterItemContentI } from 'types/requests/insightRequest';
import AppConfirmationPrompt from 'components/AppConfirmationPrompt/AppConfirmationPrompt';
import { getFromLocal } from 'utils/localStorage';
import { KeyValueI } from 'types/responses/insightResponses';
import { addOrRemoveItemHelper } from './Helpers/addOrRemoveItemHelper';
import { getSelectedRightSideItem } from './Helpers/rightPanelUpdateHelper';
import { leftPanelListUpdateHelper } from './Helpers/leftPanelListUpdateHelper';
import { updateSelectedItemSearchKey } from './Helpers/searchHelper';

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
  const insightState: IInsight = useSelector((state: IRootState) => state.insight);
  const dashboardFilter = insightState.dashboardFilter;
  const filterType = dashboardFilter.filterType;
  const filterItemListData = dashboardFilter.filterItemListData;
  const rightPanelRetainDataList = dashboardFilter.filterLocalScope.rightPanelRetainDataList;
  const beforeEditFilterOptionsLevel2 =
    dashboardFilter.filterLocalScope.beforeEditFilterOptionsLevel2;
  const [selectedRightSideItem, setSelectedRightSideItem] = useState<RightFilterItemContentI>();
  const [searchKey, setSearchKey] = useState<string>(selectedRightSideItem?.search || '');

  useEffect(() => {
    setSearchKey(selectedRightSideItem?.search!);
  }, [selectedRightSideItem?.search, filterItemListData]);

  useEffect(() => {
    const _selectedRightSideItem = getSelectedRightSideItem(filterType, dashboardFilter);
    setSelectedRightSideItem(_selectedRightSideItem);
    if (!_selectedRightSideItem?.isSelectAll) {
      leftPanelListUpdateHelper(_selectedRightSideItem, dashboardFilter, dispatch);
    }
  }, [rightPanelRetainDataList, filterItemListData.length, filterType]);

  const addOrRemoveItem = (status: boolean, item: KeyValueI) => {
    addOrRemoveItemHelper(status, item, filterType, dashboardFilter, dispatch);
  };

  const onDrawerClose = () => {
    dispatch(updateRightPanelRetainDataList(beforeEditFilterOptionsLevel2));
    dispatch(closeFilterItemsDrawer());
    onCloseCancelPrompt();
    dispatch(openFilterDrawer());
    setSearchKey('');
  };
  const onSaveSelectedItems = () => {
    dispatch(getFilterCountRequest());
    dispatch(closeFilterItemsDrawer());
    dispatch(openFilterDrawer());
    setSearchKey('');
  };

  const cancelConfirmationPrompt = useCallback(() => {
    return (
      <AppConfirmationPrompt
        isOpen={isOpenCancelPrompt}
        onClose={onCloseCancelPrompt}
        leftBtnName="YES"
        rightBtnName="NO"
        infoMessage="The changes you have made in filters will be discarded."
        confirmationMessage="Are you sure you want to continue?"
        title="Cancel Changes"
        onConfirmHandler={onDrawerClose}
        onCloseHandler={onCloseCancelPrompt}
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
          bg="#212121"
          w="1000px"
          maxW="1000px"
          border="1px solid #9A9A9A"
          borderRadius="12px 0px 0px 12px"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          pl="16px"
          pr="16px"
          pt="22px"
          userSelect="none"
        >
          <DrawerCloseButton mt="10px" color="#F7CC45" />
          <HStack>
            <HStack align="left">
              <AppIconChakra
                mr="15px"
                name="backArrow"
                fill="left-menu-icon-color"
                _hover={{ fill: 'left-menu-icon-hover-color' }}
                width="24px"
                height="16px"
                cursor="pointer"
                onClick={onDrawerClose}
                mt="5px"
              />
              <AppText lineHeight="28px" fontSize="20px" fontWeight="600" fontStyle="normal">
                {getFromLocal('insightDrawerTitle')}
              </AppText>
              <AppText
                lineHeight="32px"
                fontSize="14px"
                fontWeight="400"
                fontStyle="normal"
                color="card-text-color"
              >
                ({selectedRightSideItem?.outOfCount})
              </AppText>
            </HStack>
          </HStack>
          <Divider color="#595959" h="1px" mt="8px" />
          <DrawerBody p={0} overflow="hidden">
            <Box h="full">
              <Box flex={1} h="40px" justifyContent="start" pt="18px" pl="17px">
                <PanelHeader
                  selectedRightSideItem={selectedRightSideItem}
                  setSearchKey={setSearchKey}
                  searchKey={searchKey}
                />
              </Box>
              <HStack h="full" spacing="15px" pt="11px" align="start">
                <Box flex={1} h="calc(100vh - 200px)">
                  <LeftPanel
                    addOrRemoveItem={addOrRemoveItem}
                    selectedRightSideItem={selectedRightSideItem}
                  />
                </Box>
                <Box flex={1} h="calc(100vh - 200px)">
                  <RightPanel
                    selectedRightSideItem={selectedRightSideItem}
                    addOrRemoveItem={addOrRemoveItem}
                  />
                </Box>
              </HStack>
            </Box>
          </DrawerBody>
          <DrawerFooter p={0}>
            <Flex direction="column" w="full" pb="15px">
              <Divider color="#595959" h="1px" mt="8px" mb="20px" />
              <HStack w="full" justify="end">
                <AppButton
                  variant="outline"
                  onClick={onToggleCancelPrompt}
                  w="100px"
                  h="35px"
                  mr="16px"
                >
                  Cancel
                </AppButton>
                <AppButton
                  variant="solid"
                  onClick={onSaveSelectedItems}
                  w="100px"
                  h="35px"
                  borderRadius="100px"
                  color="#000"
                >
                  Select
                </AppButton>
              </HStack>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FilterItemsSelectionDrawer;
