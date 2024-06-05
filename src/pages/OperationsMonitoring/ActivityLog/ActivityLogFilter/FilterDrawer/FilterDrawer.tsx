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
import { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterTypeItemList from './FilterTypeItemList';
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

import AppButton from 'components/newTheme/AppButton/AppButton';
import { blue_500, ocean_blue_600, ocean_blue_350 } from 'theme/colors';
import AppUserInputPrompt from 'components/AppUserInputPrompt/AppUserInputPrompt';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { AppIcon } from 'components/AppIcon/AppIcon';

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
    const renderBody = () => {
      return (
        <>
          <AppText size="usm">The changes you have made in filters will be discarded.</AppText>
          <AppText size="usm" mt={2}>
            Are you sure you want to continue?
          </AppText>
        </>
      );
    };

    return (
      <AppUserInputPrompt
        isOpen={isOpenCancelPrompt}
        onClose={onCloseCancelPrompt}
        leftBtnName="NO"
        rightBtnName="YES"
        title="Cancel Changes"
        onConfirmHandler={onCancelHandler}
        onCloseHandler={onCloseCancelPrompt}
        children={renderBody()}
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
          p="20px"
          userSelect="none"
        >
          <VStack w="full" spacing="20px">
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
                  <AppText size="h4Semibold">Filters</AppText>
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
            </VStack>
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
              <FilterTypeItemList />
            </Box>
          </DrawerBody>

          <DrawerFooter p={0}>
            <Flex direction="column" w="full" pb="15px">
              <Divider color="#595959" h="1px" mt="8px" mb="20px" />
              <HStack w="full" justify="end">
                <AppButton
                  variant="secondary"
                  size="medium"
                  onClick={onResetFilter}
                >
                  Clear
                </AppButton>
                <AppButton
                  variant="secondary"
                  size="medium"
                  onClick={onToggleCancelPrompt}
                >
                  Cancel
                </AppButton>
                <AppButton
                  variant="primary"
                  onClick={onSaveHandler}
                  size="medium"
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
