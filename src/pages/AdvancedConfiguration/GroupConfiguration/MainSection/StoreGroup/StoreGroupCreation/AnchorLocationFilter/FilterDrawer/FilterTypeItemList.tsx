import { VStack, Box } from '@chakra-ui/layout';
import { motion } from 'framer-motion';
import { FC, useCallback } from 'react';
import FilterItem from './FilterTypeItem';
import { useDispatch, useSelector } from 'react-redux';
import { produce } from 'immer';
import { storeInLocal } from 'utils/localStorage';
import AppText from 'components/AppText/AppText';
import {
  IGroupConfigurationSlice,
  closeGroupConfigDrawer,
  getFilterDataRequest,
  groupConfigurationSliceSelector,
  toggleViewGroupConfigDrawer,
  updateGroupFilter
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { getSelectedItemsCount } from 'state/pages/advancedConfiguration/groupConfiguration/stateHelpers/stH_groupConfigurations';
import { GroupLabelI } from 'types/groupConfig';
import { neutral_200, white } from 'theme/colors';
import { INSTRUCTION_MESSAGES } from 'constants/messages';

interface Props {
  viewFilter: boolean;
  maxH?: string;
}

const viewLayoutGroup = [
  {
    name: 'Product',
    filter: (x: GroupLabelI) =>
      ([1, 2].includes(x.code) && x.name == 'product') ||
      ([1].includes(x.code) && x.name == 'anchor')
  },
  {
    name: 'Location',
    filter: (x: GroupLabelI) =>
      ([1, 2, 3, 4, 5].includes(x.code) && x.name == 'location') ||
      ([1].includes(x.code) && x.name == 'store')
  },
  {
    name: 'Anchor-location',
    filter: (x: GroupLabelI) => [2].includes(x.code) && x.name == 'anchor'
  }
];

const createLayoutGroup = [
  {
    name: 'Product',
    filter: (x: GroupLabelI) =>
      ([1, 2].includes(x.code) && x.name == 'product') ||
      ([1].includes(x.code) && x.name == 'anchor')
  },
  {
    name: 'Location',
    filter: (x: GroupLabelI) =>
      ([1, 2, 3, 4, 5].includes(x.code) && x.name == 'location') ||
      ([1].includes(x.code) && x.name == 'store')
  }
];

const FilterTypeItemList: FC<Props> = ({ viewFilter, maxH = 'calc(100vh - 280px)' }) => {
  const dispatch = useDispatch();
  const groupConfigState: IGroupConfigurationSlice = useSelector(groupConfigurationSliceSelector);
  const filterTotalItemsCount = groupConfigState.groupFilter?.filterTotalItemsCount;
  const rightPanelRetainDataList =
    groupConfigState.groupFilter?.filterLocalScope.rightPanelRetainDataList;
  const filterLabels = groupConfigState.groupLabels;
  const layout = viewFilter ? viewLayoutGroup : createLayoutGroup;

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
      <Box>
        <VStack spacing={'20px'}>
          {!viewFilter && (
            <AppText textAlign={'center'} fontWeight={400} size="body3" color={white} px={'20px'}>
              {INSTRUCTION_MESSAGES.STORE_FILTER_MESSAGE}
            </AppText>
          )}
          <VStack as={motion.div} align="start" w="full" h="full">
            {layout &&
              layout.map((x) => {
                return (
                  <>
                    <AppText size="body2" fontWeight={400} color={neutral_200}>
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
        </VStack>
      </Box>
    </Box>
  );
};

export default FilterTypeItemList;
