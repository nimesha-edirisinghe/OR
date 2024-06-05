import { Dispatch } from '@reduxjs/toolkit';
import { produce } from 'immer';
import {
  IActivityLogSlice,
  updateDashboardFilter
} from 'state/pages/operationAndMonitoring/activityLog/activityLogState';
import { ActivityLogFilterT } from 'types/activityLog';

export const toggleSelectAllItems = (
  status: boolean,
  filteredItemType: ActivityLogFilterT,
  dashboardFilter: IActivityLogSlice['dashboardFilter'],
  dispatch: Dispatch
) => {
  let _dashboardFilter = {} as IActivityLogSlice['dashboardFilter'];

  switch (filteredItemType) {
    case 'activity':
      _dashboardFilter = produce(dashboardFilter, (draft) => {
        draft.filterLocalScope.rightPanelRetainDataList.activity.isSelectAll = status;
        draft.filterLocalScope.rightPanelRetainDataList.activity.selectedItems = [];
      });
      break;
    case 'group':
      _dashboardFilter = produce(dashboardFilter, (draft) => {
        draft.filterLocalScope.rightPanelRetainDataList.group.isSelectAll = status;
        draft.filterLocalScope.rightPanelRetainDataList.group.selectedItems = [];
      });
      break;
    case 'execType':
      _dashboardFilter = produce(dashboardFilter, (draft) => {
        draft.filterLocalScope.rightPanelRetainDataList.execType.isSelectAll = status;
        draft.filterLocalScope.rightPanelRetainDataList.execType.selectedItems = [];
      });
      break;
    case 'status':
      _dashboardFilter = produce(dashboardFilter, (draft) => {
        draft.filterLocalScope.rightPanelRetainDataList.status.isSelectAll = status;
        draft.filterLocalScope.rightPanelRetainDataList.status.selectedItems = [];
      });
      break;
    case 'user':
      _dashboardFilter = produce(dashboardFilter, (draft) => {
        draft.filterLocalScope.rightPanelRetainDataList.user.isSelectAll = status;
        draft.filterLocalScope.rightPanelRetainDataList.user.selectedItems = [];
      });
      break;
  }

  _dashboardFilter = produce(_dashboardFilter, (draft) => {
    draft.filterItemListData.map((item) => {
      item.isSelected = status;
      return item;
    });
  });

  dispatch(updateDashboardFilter(_dashboardFilter));
};
