import { Dispatch } from '@reduxjs/toolkit';
import { produce } from 'immer';
import {
  IGroupConfigurationSlice,
  updateGroupFilter
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';

export const toggleSelectAllItems = (
  status: boolean,
  filterType: string,
  filterCode: number,
  groupFilter: IGroupConfigurationSlice['groupFilter'],
  dispatch: Dispatch
) => {
  const _groupFilter = produce(groupFilter, (draft) => {
    const selectedItem = draft.filterLocalScope.rightPanelRetainDataList.find(
      (item) => item.code === filterCode && item.type === filterType
    );

    if (selectedItem) {
      selectedItem.selectedItems = [];
      selectedItem.isSelectAll = status;
    }

    draft.filterItemListData.map((item) => {
      item.isSelected = status;
      return item;
    });
  });

  dispatch(updateGroupFilter(_groupFilter));
};
