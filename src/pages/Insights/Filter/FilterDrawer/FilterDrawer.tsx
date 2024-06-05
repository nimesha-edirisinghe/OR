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
  VStack,
  useDisclosure
} from '@chakra-ui/react';
import AppButton from 'components/AppButton/AppButton';
import AppText from 'components/AppText/AppText';
import { FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IInsight,
  closeFilterDrawer,
  insightSliceSelector,
  updateRightPanelRetainDataList
} from 'state/pages/insights/insightState';
import TabHeader from './TabHeader';
import GroupsTab from './Tabs/GroupsTab';
import ProductHierarchyTab from './Tabs/ProductHierarchyTab';
import LocationTab from './Tabs/LocationTab';
import AppConfirmationPrompt from 'components/AppConfirmationPrompt/AppConfirmationPrompt';
import { ocean_blue_350 } from 'theme/colors';

interface Props {
  isOpen: boolean;
}
export type TabType = 'groups' | 'productHierarchy' | 'location';

const FilterDrawer: FC<Props> = ({ isOpen }) => {
  const insightState: IInsight = useSelector(insightSliceSelector);
  const [activeTab, setActiveTab] = useState<TabType>('groups');
  const {
    isOpen: isOpenCancelPrompt,
    onToggle: onToggleCancelPrompt,
    onClose: onCloseCancelPrompt
  } = useDisclosure();
  const dispatch = useDispatch();
  const beforeEditFilterOptionsLevel1 =
    insightState.dashboardFilter.filterLocalScope.beforeEditFilterOptionsLevel1;

  const onDrawerClose = () => {
    dispatch(updateRightPanelRetainDataList(beforeEditFilterOptionsLevel1));
    dispatch(closeFilterDrawer());
  };

  const onTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const onSaveHandler = () => {
    dispatch(closeFilterDrawer());
  };

  const onCancelHandler = () => {
    onDrawerClose();
    onCloseCancelPrompt();
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
        onConfirmHandler={onCancelHandler}
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
          w="600px"
          maxW="600px"
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
            <VStack align="left">
              <AppText lineHeight="28px" fontSize="20px" fontWeight="600" fontStyle="normal">
                Filters
              </AppText>
            </VStack>
          </HStack>
          <Divider color="#595959" h="1px" mt="8px" />
          <DrawerBody p={0} overflow="hidden">
            <Box>
              <HStack w="full" h="53px" mt="5px" pl="20px" pr="20px" spacing="0px">
                <TabHeader
                  displayName="Groups"
                  onTabChange={onTabChange}
                  tabType="groups"
                  isActive={activeTab === 'groups'}
                  flex={1}
                />
                <TabHeader
                  displayName="Product Hierarchy"
                  onTabChange={onTabChange}
                  tabType="productHierarchy"
                  isActive={activeTab === 'productHierarchy'}
                  flex={1}
                  w="full"
                  m={0}
                  p={0}
                />
                <TabHeader
                  displayName="Location"
                  onTabChange={onTabChange}
                  tabType="location"
                  isActive={activeTab === 'location'}
                  flex={0.6}
                  w="full"
                  m={0}
                  p={0}
                />
              </HStack>
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
                {activeTab === 'groups' && <GroupsTab />}
                {activeTab === 'productHierarchy' && <ProductHierarchyTab />}
                {activeTab === 'location' && <LocationTab />}
              </Box>
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
                  onClick={onSaveHandler}
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

export default FilterDrawer;
