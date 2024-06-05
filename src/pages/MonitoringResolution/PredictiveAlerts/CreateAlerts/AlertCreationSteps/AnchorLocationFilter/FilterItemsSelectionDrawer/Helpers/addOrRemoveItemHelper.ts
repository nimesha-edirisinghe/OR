import { REACT_APP_OR_FILTER_RIGHT_PANEL_MAX_LENGTH } from 'config/constants';
import { produce } from 'immer';
import { Dispatch } from 'redux';
import {
  IGroupConfigurationSlice,
  updateGroupFilter
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { FilterItemContentI } from 'types/activityLog';
import { KeyValueI } from 'types/responses/insightResponses';

const isRightPanelLengthValid = (item: FilterItemContentI) => {
  return item.selectedItems.length < REACT_APP_OR_FILTER_RIGHT_PANEL_MAX_LENGTH;
};

export const addOrRemoveItemHelper = (
  filterCode: number,
  filterType: string,
  status: boolean,
  item: KeyValueI,
  groupFilter: IGroupConfigurationSlice['groupFilter'],
  dispatch: Dispatch
) => {
  let _groupFilter = {} as IGroupConfigurationSlice['groupFilter'];

  if (
    status
    // &&
    // isRightPanelLengthValid(dashboardFilter.filterLocalScope.rightPanelRetainDataList.execType)
  ) {
    _groupFilter = produce(groupFilter, (draft) => {
      const filteredItem = draft.filterLocalScope.rightPanelRetainDataList.find(
        (item) => item.code === filterCode && item.type === filterType
      );

      if (filteredItem) {
        (filteredItem.selectedItems as KeyValueI[]).push(item);
      } else {
        const ft = {
          code: filterCode,
          isSelectAll: false,
          search: null,
          selectedItems: [item],
          outOfCount: 0,
          type: filterType
        };
        draft.filterLocalScope.rightPanelRetainDataList.push(ft);
      }
    });
  } else {
    _groupFilter = produce(groupFilter, (draft) => {
      const filteredItem = draft.filterLocalScope.rightPanelRetainDataList.find(
        (item) => item.code === filterCode && item.type === filterType
      );

      filteredItem!.selectedItems = (filteredItem?.selectedItems as KeyValueI[]).filter(
        (listItem) => item.key !== listItem.key
      )!;
    });
  }

  dispatch(updateGroupFilter(_groupFilter));
};

export const removeAllSelectedItems = (
  filterCode: number,
  filterType: string,
  groupFilter: IGroupConfigurationSlice['groupFilter'],
  dispatch: Dispatch
) => {
  let _groupFilter = {} as IGroupConfigurationSlice['groupFilter'];
  _groupFilter = produce(groupFilter, (draft) => {
    const filteredItem = draft.filterLocalScope.rightPanelRetainDataList.find(
      (item) => item.code === filterCode && item.type === filterType
    );
    if (filteredItem) {
      filteredItem!.selectedItems = [];
      filteredItem!.isSelectAll = false;
    }
  });

  dispatch(updateGroupFilter(_groupFilter));
};
