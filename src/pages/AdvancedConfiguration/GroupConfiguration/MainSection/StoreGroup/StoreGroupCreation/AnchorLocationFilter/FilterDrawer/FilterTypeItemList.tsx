import { VStack, HStack, Box } from '@chakra-ui/layout';
import { motion } from 'framer-motion';
import { FC, useCallback } from 'react';
import FilterItem from './FilterTypeItem';
import { useDispatch, useSelector } from 'react-redux';
import { produce } from 'immer';
import { storeInLocal } from 'utils/localStorage';
import AppText from 'components/AppText/AppText';
import { scrollbarYStyles } from 'theme/styles';
import {
  IGroupConfigurationSlice,
  closeGroupConfigDrawer,
  getFilterCountRequest,
  getFilterDataRequest,
  groupConfigurationSliceSelector,
  resetGroupFilter,
  toggleViewGroupConfigDrawer,
  updateGroupFilter
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { getSelectedItemsCount } from 'state/pages/advancedConfiguration/groupConfiguration/stateHelpers/stH_groupConfigurations';
import { GroupLabelI } from 'types/groupConfig';
import { showSuccessToast } from 'state/toast/toastState';
import { blue_500 } from 'theme/colors';

interface Props {
  viewFilter: boolean;
  maxH?: string;
  layout?: { name: string; filter: (x: GroupLabelI) => void }[];
}

const defaultLayoutGroup = [
  {
    name: 'Product Hierarchy',
    filter: (x: GroupLabelI) =>
      ([1, 2].includes(x.code) && x.name == 'product') ||
      ([1].includes(x.code) && x.name == 'anchor')
  },
  {
    name: 'Location Hierarchy',
    filter: (x: GroupLabelI) =>
      ([1, 2, 3, 4, 5].includes(x.code) && x.name == 'location') ||
      ([1].includes(x.code) && x.name == 'store')
  },
  {
    name: 'Anchor-location',
    filter: (x: GroupLabelI) => [2].includes(x.code) && x.name == 'anchor'
  }
];

const FilterTypeItemList: FC<Props> = ({
  viewFilter,
  maxH = 'calc(100vh - 280px)',
  layout = defaultLayoutGroup
}) => {
  const groupConfigState: IGroupConfigurationSlice = useSelector(groupConfigurationSliceSelector);
  const filterTotalItemsCount = groupConfigState.groupFilter?.filterTotalItemsCount;
  const rightPanelRetainDataList =
    groupConfigState.groupFilter?.filterLocalScope.rightPanelRetainDataList;
  const filterLabels = groupConfigState.groupLabels;
  const filterCode = groupConfigState.groupFilter.filterType;

  const dispatch = useDispatch();

  const onResetFilter = () => {
    dispatch(resetGroupFilter());
    dispatch(getFilterCountRequest({ whFlag: 0 }));
    showSuccessToast('Reset success');
  };

  const onClickHandler = (filterType: string, filterCode: number, drawerTitle: string) => {
    const _groupFilter = produce(
      groupConfigState.groupFilter,
      (draft: IGroupConfigurationSlice['groupFilter']) => {
        if (draft) {
          draft.filterLocalScope.beforeEditFilterOptionsLevel2 = rightPanelRetainDataList;
          draft.filterType = filterType;
          draft.filterCode = filterCode;
          draft.filterLocalScope.isOpenItemSelectionDrawer = true;
        }
      }
    );

    dispatch(updateGroupFilter(_groupFilter));
    dispatch(getFilterDataRequest({ filterType, filterCode, pageNumber: 1, viewFilter }));
    dispatch(closeGroupConfigDrawer());
    storeInLocal('insightDrawerTitle', drawerTitle);

    if (viewFilter) {
      dispatch(toggleViewGroupConfigDrawer({ state: false }));
    }
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

      return filterTotalItemsCount.find(
        (item) => item.code === _filterCode && item.type === _filterType
      )?.count!;
    },
    [filterTotalItemsCount]
  );

  return (
    <Box w="full">
      <Box maxH={maxH} overflowX="hidden" overflowY="auto" __css={scrollbarYStyles} w="full">
        <VStack as={motion.div} align="start" w="full" h='full'>
          {/* <AppText fontSize="14px" fontWeight={500}>
            Product Hierarchy
          </AppText>

          {filterLabels?.filter().map((product, key) => {
            const _filterType = product.code === 6 ? 'anchor' : 'product';
            const _filterCode = product.code === 6 ? 1 : product.code;

            if (product.code && ![3, 4, 5].includes(product.code)) {
              return (
                <FilterItem
                  key={key}
                  name={product.name}
                  totCount={filterItemTotalCount(product, 'product')}
                  selectedCount={
                    getSelectedItemsCount(_filterType, _filterCode, rightPanelRetainDataList)!
                  }
                  onClickHandler={() => onClickHandler(_filterType, _filterCode, product.name)}
                />
              );
            }
          })}

          <AppText fontSize="14px" fontWeight={500} pt="20px">
            Location Hierarchy
          </AppText>

          {filterLabels?.location.map((location, key) => {
            const _filterType = location.code === 6 ? 'store' : 'location';
            const _filterCode = location.code === 6 ? 1 : location.code;

            return (
              <FilterItem
                key={key}
                name={location.name}
                totCount={filterItemTotalCount(location, 'location')}
                selectedCount={
                  getSelectedItemsCount(_filterType, _filterCode, rightPanelRetainDataList)!
                }
                onClickHandler={() => onClickHandler(_filterType, _filterCode, location.name)}
              />
            );
          })}

          <AppText fontSize="14px" fontWeight={500} pt="20px">
            Anchor-location
          </AppText>

          {filterLabels?.anchor.map((anchor, key) => (
            <FilterItem
              key={key}
              name={anchor.name}
              totCount={filterItemTotalCount(anchor, 'anchor')}
              selectedCount={
                getSelectedItemsCount('anchor', anchor.code, rightPanelRetainDataList)!
              }
              onClickHandler={() => onClickHandler('anchor', anchor.code, anchor.name)}
            />
          ))} */}

          {layout &&
            layout.map((x) => {
              return (
                <>
                  <AppText fontSize="14px" fontWeight={500}>
                    {x.name}
                  </AppText>

                  {filterLabels &&
                    filterLabels?.filter(x.filter).map((item, key) => {
                      return (
                        <FilterItem
                          key={item.name + '_' + key}
                          name={item.label || ''}
                          totCount={filterItemTotalCount(item, item.name)}
                          selectedCount={
                            getSelectedItemsCount(item.name, item.code, rightPanelRetainDataList)!
                          }
                          onClickHandler={() =>
                            onClickHandler(item.name, item.code, item.label || '')
                          }
                        />
                      );
                    })}
                </>
              );
            })}
        </VStack>
      </Box>
      {!viewFilter && (
        <HStack>
          <AppText
            color={blue_500}
            fontSize="14px"
            fontWeight={500}
            pt="12px"
            cursor="pointer"
            onClick={onResetFilter}
          >
            Clear selection
          </AppText>
        </HStack>
      )}
    </Box>
  );
};

export default FilterTypeItemList;
