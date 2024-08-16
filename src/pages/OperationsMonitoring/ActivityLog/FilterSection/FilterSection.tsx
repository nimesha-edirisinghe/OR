import { HStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { FC } from 'react';
import FilteredChip from './FilteredChip';
import {
  IActivityLogSlice,
  activityLogSliceSelector,
  closeFilteredItems,
  getActivityLogListRequest
} from 'state/pages/operationAndMonitoring/activityLog/activityLogState';
import { useDispatch, useSelector } from 'react-redux';
import { RightPanelRetainDataList } from 'types/activityLog';
import { initialDateTypesAndValues } from '../ActivityLogFilter/FilterDateSelectionDrawer/helper';
import { chipsOrder, customSort, labelMapping } from './helper';
import { ocean_blue_100 } from 'theme/colors';

interface FilterSectionProps {}

export interface FilteredItem {
  key: string;
  label: string;
  count: number;
  dateType?: string | null;
  isSelectedAll?: boolean;
}

const FilterSection: FC<FilterSectionProps> = () => {
  const dispatch = useDispatch();
  const activityLogState: IActivityLogSlice = useSelector(activityLogSliceSelector);
  const activityLogFilter =
    activityLogState.dashboardFilter.filterLocalScope.rightPanelRetainDataList;

  const getFilteredItemList = (): FilteredItem[] => {
    const filteredItemList: FilteredItem[] = [];

    for (const [key, item] of Object.entries(activityLogFilter)) {
      const selectedItemsLength = item?.selectedItems?.length ?? null;
      const isSelectedAll = item?.isSelectAll;
      const dateTypeDisplayName =
        initialDateTypesAndValues.find((value) => value.value === item?.dateType)?.displayName ??
        null;

      if (
        dateTypeDisplayName !== 'All Time' &&
        (selectedItemsLength > 0 || dateTypeDisplayName || isSelectedAll)
      ) {
        const filteredItem: FilteredItem = {
          key: key,
          label: labelMapping[key as keyof RightPanelRetainDataList],
          count: selectedItemsLength,
          dateType: dateTypeDisplayName,
          isSelectedAll: isSelectedAll
        };

        filteredItemList.push(filteredItem);
      }
    }

    return filteredItemList;
  };
  const filteredItemList = getFilteredItemList();
  const sortedFilteredItemList = filteredItemList.sort((a, b) => customSort(a, b, chipsOrder));

  const onCloseHandler = (key: string) => {
    dispatch(closeFilteredItems(key as keyof RightPanelRetainDataList));
    dispatch(
      getActivityLogListRequest({
        pageNumber: 1
      })
    );
  };

  return (
    <>
      {sortedFilteredItemList.length > 0 && (
        <HStack userSelect="none">
          <AppText size="body2" color={ocean_blue_100} transition="all 0.2s ease">
            Filters :
          </AppText>
          <HStack spacing="12px">
            {sortedFilteredItemList.map((item) => (
              <FilteredChip key={item.label} dataObj={item} onCloseHandler={onCloseHandler} />
            ))}
          </HStack>
        </HStack>
      )}
    </>
  );
};

export default FilterSection;
