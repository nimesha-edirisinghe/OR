import { VStack, Box } from '@chakra-ui/layout';
import { motion } from 'framer-motion';
import { FC, Fragment, useCallback, useEffect, useState } from 'react';
import FilterItem from './FilterTypeItem';
import { useDispatch, useSelector } from 'react-redux';
import { produce } from 'immer';
import { storeInLocal } from 'utils/localStorage';
import { scrollbarYStyles } from 'theme/styles';
import {
  IGroupConfigurationSlice,
  closeGroupConfigDrawer,
  getFilterCountRequest,
  getFilterDataRequest,
  groupConfigurationSliceSelector,
  updateGroupFilter,
  updateRightPanelRetainDataList
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import {
  getFilterItemCount,
  getSelectedItemsCount
} from 'state/pages/advancedConfiguration/groupConfiguration/stateHelpers/stH_groupConfigurations';
import { FilterLoadType, GroupLabelI } from 'types/groupConfig';
import AppText from 'components/newTheme/AppText/AppText';
import { neutral_200, red_400, state_warning, yellow_500_t20 } from 'theme/colors';
import AppGroupSelectDropDown from 'components/newTheme/AppGroupSelectDropDown/AppGroupSelectDropDown';
import {
  groupConfigSliceSelector,
  IGroupConfig,
  selectGroupKey
} from 'state/pages/shared/groupConfig/groupConfigState';
import { filterHierarchyGenerator } from 'state/layout/stateHelpers/stH_Layout';
import { HStack } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { useLocation } from 'react-router-dom';

interface Props {
  loadTo: FilterLoadType;
  maxH?: string;
  filterHierarchy?: {
    name: string;
    filter: (x: GroupLabelI) => void;
    customLabel?: (x: GroupLabelI, whFlag: 0 | 1 | 2) => string | undefined;
  }[];
  isGroupDisabled?: boolean;
  showWarning?: boolean;
  whFlag?: 0 | 1 | 2;
  isOnAlertPage?: boolean;
}

const defaultFilterHierarchy = filterHierarchyGenerator('default');

const FilterTypeItemList: FC<Props> = ({
  maxH = 'calc(100vh - 280px)',
  loadTo,
  filterHierarchy = defaultFilterHierarchy,
  isGroupDisabled = false,
  showWarning = false,
  whFlag = 0,
  isOnAlertPage = false
}) => {
  const dispatch = useDispatch();
  const groupConfigState: IGroupConfigurationSlice = useSelector(groupConfigurationSliceSelector);
  const groupFilter = groupConfigState.groupFilter;
  const filterTotalItemsCount = groupConfigState.groupFilter?.filterTotalItemsCount;
  const rightPanelRetainDataList =
    groupConfigState.groupFilter?.filterLocalScope.rightPanelRetainDataList;
  const filterLabels = groupConfigState.groupLabels;
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const sharedGroupState: IGroupConfig = useSelector(groupConfigSliceSelector);
  const [skuLocationCount, setSkuLocationCount] = useState(0);

  useEffect(() => {
    const skuLocationCount = getFilterItemCount(groupFilter, 1, 'sku');
    setSkuLocationCount(skuLocationCount);
  }, [filterTotalItemsCount]);

  const onClickHandler = (filterType: string, filterCode: number, drawerTitle: string) => {
    const _groupFilter = produce(
      groupConfigState.groupFilter,
      (draft: IGroupConfigurationSlice['groupFilter']) => {
        if (draft) {
          draft.filterLocalScope.beforeEditFilterOptionsLevel2 = rightPanelRetainDataList;
          draft.filterType = filterType;
          draft.filterCode = filterCode;
          draft.filterLocalScope.isOpenFilterDrawer = false;
          draft.filterLocalScope.isOpenItemSelectionDrawer = true;
          draft.filterLocalScope.itemSelectionDrawerOpenFrom = loadTo;
        }
      }
    );

    dispatch(updateGroupFilter(_groupFilter));
    dispatch(
      getFilterDataRequest({
        filterType,
        filterCode,
        pageNumber: 1,
        viewFilter: false,
        whFlag,
        initialRequest: true,
        isAlertPage: isOnAlertPage
      })
    );
    dispatch(closeGroupConfigDrawer());
    storeInLocal('insightDrawerTitle', drawerTitle);
  };

  const filterItemTotalCount = useCallback(
    (filterItem: GroupLabelI, filterType: string) => {
      let _filterType = '';
      let _filterCode = 0;
      if (filterType === 'product' && filterItem.code === 6) {
        _filterType = 'anchor';
        _filterCode = 1;
      } else if (filterType === 'location' && filterItem.code === 6) {
        _filterType = 'store';
        _filterCode = 1;
      } else {
        _filterType = filterType;
        _filterCode = filterItem.code;
      }

      return filterTotalItemsCount?.find(
        (item) => item.code === _filterCode && item.type === _filterType
      )?.count!;
    },
    [filterTotalItemsCount]
  );

  const onGroupSelect = (item: string) => {
    const _groupKey = sharedGroupState.groupList?.list?.find((obj) => obj.value === item)?.key!;
    dispatch(selectGroupKey(_groupKey));
    const groupFilterItem = {
      code: 1,
      isSelectAll: false,
      selectedItems: [{ key: _groupKey, value: '' }],
      type: 'group'
    };
    dispatch(updateRightPanelRetainDataList([groupFilterItem]));
    dispatch(getFilterCountRequest({ whFlag }));
  };

  const handleToggle = (open: boolean) => {
    setIsOpen(open);
  };

  useEffect(() => {
    setIsHover(!isOpen);
  }, [isOpen]);

  return (
    <>
      <Box
        maxH={maxH}
        overflowX="hidden"
        overflowY={isHover ? 'scroll' : 'hidden'}
        __css={scrollbarYStyles}
        w="full"
      >
        <VStack as={motion.div} align="start" w="full" h="full">
          {!isGroupDisabled && (
            <>
              <HStack spacing="1px">
                <AppText size="body2" color={neutral_200}>
                  Group
                </AppText>
                <AppText size="body2" color={red_400}>
                  *
                </AppText>
              </HStack>
              <VStack spacing="4px" w="full" pt="8px" pb="20px">
                <AppGroupSelectDropDown
                  onGroupSelect={onGroupSelect}
                  w="full"
                  height="44px"
                  lineMaxLength={80}
                  handleToggle={handleToggle}
                />
              </VStack>
            </>
          )}

          {filterHierarchy &&
            filterHierarchy.map((hierarchyItem, key) => {
              return (
                filterLabels?.filter(hierarchyItem.filter)?.length && (
                  <Fragment key={key}>
                    <AppText size="body2" color={neutral_200}>
                      {hierarchyItem.name}
                    </AppText>

                    <VStack spacing="4px" w="full" pt="8px" pb="20px">
                      {filterLabels &&
                        filterLabels?.filter(hierarchyItem.filter).map((item, key) => {
                          return (
                            <FilterItem
                              key={key}
                              name={
                                (hierarchyItem.customLabel
                                  ? hierarchyItem.customLabel(item, whFlag)
                                  : item.label) || ''
                              }
                              totCount={filterItemTotalCount(item, item.name)}
                              selectedCount={
                                getSelectedItemsCount(
                                  item.name,
                                  item.code,
                                  rightPanelRetainDataList
                                )!
                              }
                              onClickHandler={() =>
                                onClickHandler(
                                  item.name,
                                  item.code,
                                  (hierarchyItem.customLabel
                                    ? hierarchyItem.customLabel(item, whFlag)
                                    : item.label) || ''
                                )
                              }
                              isDisabled={!isGroupDisabled && !sharedGroupState.selectedGroupKey}
                            />
                          );
                        })}
                    </VStack>
                  </Fragment>
                )
              );
            })}
        </VStack>
      </Box>
      {showWarning && skuLocationCount > 100 && (
        <HStack w="full" p="8px" bg={yellow_500_t20} borderRadius="8px">
          <AppIcon fill={state_warning} name="info" w="24px" h="24px" />
          <AppText size="body3" color={state_warning}>
            Only 100 records will be displayed in the graph format. You may consider narrowing down
            your search further if all the results need to be viewed in the graph format.
          </AppText>
        </HStack>
      )}
    </>
  );
};

export default FilterTypeItemList;
