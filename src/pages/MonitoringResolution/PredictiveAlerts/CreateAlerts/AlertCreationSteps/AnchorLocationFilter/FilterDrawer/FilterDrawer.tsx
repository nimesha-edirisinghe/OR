import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  HStack,
  VStack,
  useDisclosure
} from '@chakra-ui/react';
import AppButton from 'components/AppButton/AppButton';
import AppText from 'components/AppText/AppText';
import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterTypeItemList from './FilterTypeItemList';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { ocean_blue_600, state_warning, yellow_500, yellow_500_t20 } from 'theme/colors';
import AppPopup from 'components/newTheme/AppPopup/AppPopup';
import {
  groupConfigurationSliceSelector,
  IGroupConfigurationSlice,
  resetGroupFilter,
  toggleDrawerFilter,
  toggleFilterAppliedIndicatorIndicator,
  updateFilterApply,
  updateRightPanelRetainDataList
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import _ from 'lodash';
import { getFilterItemCount } from 'state/pages/advancedConfiguration/groupConfiguration/stateHelpers/stH_groupConfigurations';
import {
  groupConfigSliceSelector,
  IGroupConfig,
  selectGroupKey
} from 'state/pages/shared/groupConfig/groupConfigState';
import { showErrorToast } from 'state/toast/toastState';
import { GroupLabelI } from 'types/groupConfig';
import { numberWithCommaSeparator } from 'utils/utility';

interface Props {
  isOpen: boolean;
  filterHierarchy?: { name: string; filter: (x: GroupLabelI) => void }[];
  isGroupDisabled?: boolean;
  showWarning?: boolean;
  whFlag?: 0 | 1 | 2;
}

const FilterDrawer: FC<Props> = ({
  isOpen,
  filterHierarchy,
  isGroupDisabled = false,
  showWarning = true,
  whFlag = 0
}) => {
  const groupConfigState: IGroupConfigurationSlice = useSelector(groupConfigurationSliceSelector);
  const groupFilter = groupConfigState.groupFilter;
  const {
    isOpen: isOpenCancelPrompt,
    onToggle: onToggleCancelPrompt,
    onClose: onCloseCancelPrompt
  } = useDisclosure();
  const beforeEditFilterOptionsLevel1 = groupFilter.filterLocalScope.beforeEditFilterOptionsLevel1;
  const rightPanelRetainDataList = groupFilter.filterLocalScope.rightPanelRetainDataList;
  const filterTotalItemsCount = groupConfigState.groupFilter?.filterTotalItemsCount;
  const [skuLocationCount, setSkuLocationCount] = useState(0);
  const sharedGroupState: IGroupConfig = useSelector(groupConfigSliceSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const skuLocationCount = getFilterItemCount(groupFilter, 1, 'sku');
    setSkuLocationCount(skuLocationCount);
  }, [filterTotalItemsCount]);

  const onDrawerClose = () => {
    dispatch(updateRightPanelRetainDataList(beforeEditFilterOptionsLevel1 || []));
    dispatch(toggleDrawerFilter({ isOpen: false }));
  };

  const onSaveHandler = () => {
    if (!sharedGroupState.selectedGroupKey && !isGroupDisabled) {
      showErrorToast('Please select a Group first');
      return;
    }
    if (isGroupDisabled) {
      dispatch(updateFilterApply());
    }
    dispatch(toggleFilterAppliedIndicatorIndicator());
    dispatch(toggleDrawerFilter({ isOpen: false }));
  };

  const onCancelHandler = () => {
    onDrawerClose();
    onCloseCancelPrompt();
  };

  const onResetFilter = () => {
    dispatch(resetGroupFilter());
    dispatch(selectGroupKey(null));
  };

  const onDrawerCloseEvent = () => {
    if (!_.isEqual(beforeEditFilterOptionsLevel1, rightPanelRetainDataList)) {
      onToggleCancelPrompt();
    } else {
      onDrawerClose();
    }
  };

  const cancelConfirmationPrompt = useCallback(() => {
    return (
      <AppPopup
        isOpen={isOpenCancelPrompt}
        onClose={onCloseCancelPrompt}
        leftBtnName="YES"
        rightBtnName="NO"
        infoMessage="The changes you have made in filters will be discarded.Are you sure you want to continue?"
        onConfirmHandler={onCancelHandler}
        onCloseHandler={onCloseCancelPrompt}
        icon={<AppIcon name="warningPrompt" fill={yellow_500} width="54px" height="54px" />}
      />
    );
  }, [isOpenCancelPrompt]);
  return (
    <>
      {cancelConfirmationPrompt()}
      <Drawer isOpen={isOpen} placement="right" onClose={onDrawerCloseEvent}>
        <DrawerOverlay backdropFilter="blur(2px)" />
        <DrawerContent
          maxH="100vh"
          bg={ocean_blue_600}
          w="600px"
          maxW="600px"
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
                    onClick={onDrawerCloseEvent}
                  />
                  <AppText size="h4Semibold">Filters</AppText>
                </HStack>
                <AppIconButton
                  aria-label="close"
                  variant="iconPrimary"
                  size="iconLarge"
                  justifyContent="center"
                  alignItems="center"
                  icon={<AppIcon name="cross" stroke="#0AA5FF" w="24px" h="24px" />}
                  onClick={onDrawerCloseEvent}
                />
              </HStack>
              <FilterTypeItemList
                maxH={skuLocationCount > 100 ? 'calc(100vh - 232px)' : 'calc(100vh - 180px)'}
                loadTo="drawer"
                filterHierarchy={filterHierarchy}
                isGroupDisabled={isGroupDisabled}
                showWarning = {showWarning}
                whFlag={whFlag}
              />  
            </VStack>
          </DrawerBody>
          <DrawerFooter flexDirection="column" p="20px 0 0 0">
            {showWarning && skuLocationCount > 100 && (
              <HStack w="full" p="8px" bg={yellow_500_t20} borderRadius="8px">
                <AppIcon fill={state_warning} name="info" w="24px" h="24px" />
                <AppText size="body3" color={state_warning}>
                  Only 100 records will be displayed in the graph format. You may consider narrowing
                  down your search further if all the results need to be viewed in the graph format.
                </AppText>
              </HStack>
            )}
            <HStack w="full" justify="space-between" spacing="12px" pt="20px">
              <HStack spacing="4px">
                <AppText size="body3">Total SKU-locations:</AppText>
                <AppText size="h5Semibold">{numberWithCommaSeparator(skuLocationCount)}</AppText>
              </HStack>
              <HStack justify="right">
                <AppButton variant="secondary" size="medium" onClick={onResetFilter} px="25px">
                  Clear
                </AppButton>
                <AppButton variant="primary" size="medium" onClick={onSaveHandler} px="25px">
                  Apply
                </AppButton>
              </HStack>
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FilterDrawer;
