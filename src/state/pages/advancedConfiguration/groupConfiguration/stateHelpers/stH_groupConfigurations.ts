import { RightFilterItemContentI } from 'types/groupConfig';
import { ScheduleType } from 'types/responses/jobScheduleResponses';
import { IGroupConfigurationSlice } from '../groupConfigurationState';

export const getSelectedItemsCount = (
  filterType: string,
  filterCode: number,
  rightPanelRetainDataList: RightFilterItemContentI[]
) => {
  const filteredItem =
    rightPanelRetainDataList &&
    rightPanelRetainDataList.find((item) => item.code === filterCode && item.type === filterType);

  return filteredItem
    ? filteredItem.isSelectAll
      ? filteredItem.outOfCount
      : filteredItem.selectedItems.length
    : 'All';
};

export const updateFilterOutOfCount = (
  filterType: string,
  filterCode: number,
  rightPanelRetainDataList: RightFilterItemContentI[],
  mutableTotalCount: number
) => {
  const filteredItem = rightPanelRetainDataList?.find(
    (item) => item.code === filterCode && item.type === filterType
  );

  if (filteredItem) {
    filteredItem.outOfCount = mutableTotalCount;
  } else {
    const ft = {
      code: filterCode,
      isSelectAll: false,
      search: null,
      selectedItems: [],
      outOfCount: mutableTotalCount,
      type: filterType
    };
    rightPanelRetainDataList.push(ft);
  }
};

export const updateDefaultHorizonByFrequency = (frequency: ScheduleType): number => {
  switch (frequency) {
    case 'DAILY':
      return 60;
    case 'WEEKLY':
      return 12;
    case 'MONTHLY':
      return 12;
    default:
      return 0;
  }
};

export const getSelectedAnchorCount = (
  groupFilter: IGroupConfigurationSlice['groupFilter'],
  type: string,
  code: number
) => {
  try {
    const selectedItem = groupFilter.filterLocalScope?.rightPanelRetainDataList?.find(
      (i) => i.type === type && i.code === code
    );
    return selectedItem?.isSelectAll
      ? selectedItem.outOfCount
      : selectedItem?.selectedItems.length || 0;
  } catch (e) {
    console.log('getSelectedAnchorCount ', e);
    return 0;
  }
};

export const getResponseAnchorAndSkuCount = (
  groupFilter: IGroupConfigurationSlice['groupFilter']
) => {
  try {
    const items = groupFilter?.filterTotalItemsCount?.filter(
      (i) => (i.type === 'anchor' && i.code === 2) || (i.type === 'sku' && i.code === 1)
    );
    const anchor = items.find((i) => i.type === 'anchor')?.count || 0;
    const sku = items.find((i) => i.type === 'sku')?.count || 0;

    return { anchor, sku };
  } catch (e) {
    console.log('error getResponseAnchorAndSkuCount', e);
    return { anchor: 0, sku: 0 };
  }
};

export const getFilterItemCount = (
  groupFilter: IGroupConfigurationSlice['groupFilter'],
  code: number,
  filterType: string
) => {
  return (
    groupFilter?.filterTotalItemsCount?.find((i) => i.type === filterType && i.code === code)
      ?.count || 0
  );
};
