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
import { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppConfirmationPrompt from 'components/AppConfirmationPrompt/AppConfirmationPrompt';
import {
  IActivityLogSlice,
  activityLogSliceSelector,
  closeFilterDrawer,
  getActivityLogListRequest,
  updateRightPanelRetainDataList
} from 'state/pages/operationAndMonitoring/activityLog/activityLogState';
import { showSuccessToast } from 'state/toast/toastState';
import { SUCCESS_MESSAGES } from 'constants/messages';
import { resetActivityLogFilter } from './helper';
import { ocean_blue_350, ocean_blue_600 } from 'theme/colors';

interface Props {
  isOpen: boolean;
}

const FilterDrawer: FC<Props> = ({ isOpen }) => {
  const activityLogState: IActivityLogSlice = useSelector(activityLogSliceSelector);
  const dashboardFilter = activityLogState.dashboardFilter;
  const {
    isOpen: isOpenCancelPrompt,
    onToggle: onToggleCancelPrompt,
    onClose: onCloseCancelPrompt
  } = useDisclosure();
  const dispatch = useDispatch();
  const beforeEditFilterOptionsLevel1 =
    activityLogState.dashboardFilter.filterLocalScope.beforeEditFilterOptionsLevel1;

  const onDrawerClose = () => {
    dispatch(updateRightPanelRetainDataList(beforeEditFilterOptionsLevel1));
    dispatch(closeFilterDrawer());
  };

  const onSaveHandler = () => {
    dispatch(closeFilterDrawer());
    dispatch(getActivityLogListRequest({ pageNumber: 1, ascendingSort: true }));
  };

  const onCancelHandler = () => {
    onDrawerClose();
    onCloseCancelPrompt();
  };

  const onResetFilter = () => {
    resetActivityLogFilter(dashboardFilter, dispatch);
    dispatch(getActivityLogListRequest({ pageNumber: 1, ascendingSort: true }));
    showSuccessToast(SUCCESS_MESSAGES.RESET_SUCCESSFULLY_COMPLETED);
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
          bg={ocean_blue_600}
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
              {/* <FilterTypeItemList /> */}
            </Box>
          </DrawerBody>

          <DrawerFooter p={0}>
            <Flex direction="column" w="full" pb="15px">
              <Divider color="#595959" h="1px" mt="8px" mb="20px" />
              <HStack w="full" justify="end">
                <AppButton variant="outline" onClick={onResetFilter} w="100px" h="35px">
                  Clear
                </AppButton>
                <AppButton variant="outline" onClick={onToggleCancelPrompt} w="100px" h="35px">
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
