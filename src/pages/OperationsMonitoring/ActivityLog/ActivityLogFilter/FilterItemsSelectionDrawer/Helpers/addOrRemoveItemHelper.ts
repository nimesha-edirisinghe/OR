import { REACT_APP_OR_FILTER_RIGHT_PANEL_MAX_LENGTH } from 'config/constants';
import { produce } from 'immer';
import { Dispatch } from 'redux';
import {
  IActivityLogSlice,
  updateDashboardFilter
} from 'state/pages/operationAndMonitoring/activityLog/activityLogState';
import { ActivityLogFilterDateT, ActivityLogFilterT, FilterItemContentI } from 'types/activityLog';
import { KeyValueI } from 'types/responses/insightResponses';

const isRightPanelLengthValid = (item: FilterItemContentI) => {
  return item.selectedItems.length < REACT_APP_OR_FILTER_RIGHT_PANEL_MAX_LENGTH;
};

export const addOrRemoveItemHelper = (
  status: boolean,
  item: KeyValueI,
  filterType: ActivityLogFilterT,
  dashboardFilter: IActivityLogSlice['dashboardFilter'],
  dispatch: Dispatch
) => {
  let _dashboardFilter;

  switch (filterType) {
    case 'activity':
      if (
        status &&
        isRightPanelLengthValid(dashboardFilter.filterLocalScope.rightPanelRetainDataList.activity)
      ) {
        _dashboardFilter = produce(dashboardFilter, (draft) => {
          (
            draft.filterLocalScope.rightPanelRetainDataList.activity.selectedItems as KeyValueI[]
          ).push(item);
        });
      } else {
        _dashboardFilter = produce(dashboardFilter, (draft) => {
          draft.filterLocalScope.rightPanelRetainDataList.activity.selectedItems =
            draft.filterLocalScope.rightPanelRetainDataList.activity.selectedItems.filter(
              (listItem) => item.key !== listItem.key
            );
        });
      }
      break;
    case 'execType':
      if (
        status &&
        isRightPanelLengthValid(dashboardFilter.filterLocalScope.rightPanelRetainDataList.execType)
      ) {
        _dashboardFilter = produce(dashboardFilter, (draft) => {
          (
            draft.filterLocalScope.rightPanelRetainDataList.execType.selectedItems as KeyValueI[]
          ).push(item);
        });
      } else {
        _dashboardFilter = produce(dashboardFilter, (draft) => {
          draft.filterLocalScope.rightPanelRetainDataList.execType.selectedItems =
            draft.filterLocalScope.rightPanelRetainDataList.execType.selectedItems.filter(
              (listItem) => item.key !== listItem.key
            );
        });
      }
      break;
    case 'group':
      if (
        status &&
        isRightPanelLengthValid(dashboardFilter.filterLocalScope.rightPanelRetainDataList.group)
      ) {
        _dashboardFilter = produce(dashboardFilter, (draft) => {
          (
            draft.filterLocalScope.rightPanelRetainDataList.group.selectedItems as KeyValueI[]
          ).push(item);
        });
      } else {
        _dashboardFilter = produce(dashboardFilter, (draft) => {
          draft.filterLocalScope.rightPanelRetainDataList.group.selectedItems =
            draft.filterLocalScope.rightPanelRetainDataList.group.selectedItems.filter(
              (listItem) => item.key !== listItem.key
            );
        });
      }
      break;
    case 'user':
      if (
        status &&
        isRightPanelLengthValid(dashboardFilter.filterLocalScope.rightPanelRetainDataList.user)
      ) {
        _dashboardFilter = produce(dashboardFilter, (draft) => {
          (draft.filterLocalScope.rightPanelRetainDataList.user.selectedItems as KeyValueI[]).push(
            item
          );
        });
      } else {
        _dashboardFilter = produce(dashboardFilter, (draft) => {
          draft.filterLocalScope.rightPanelRetainDataList.user.selectedItems =
            draft.filterLocalScope.rightPanelRetainDataList.user.selectedItems.filter(
              (listItem) => item.key !== listItem.key
            );
        });
      }
      break;
    case 'status':
      if (
        status &&
        isRightPanelLengthValid(dashboardFilter.filterLocalScope.rightPanelRetainDataList.status)
      ) {
        _dashboardFilter = produce(dashboardFilter, (draft) => {
          (
            draft.filterLocalScope.rightPanelRetainDataList.status.selectedItems as KeyValueI[]
          ).push(item);
        });
      } else {
        _dashboardFilter = produce(dashboardFilter, (draft) => {
          draft.filterLocalScope.rightPanelRetainDataList.status.selectedItems =
            draft.filterLocalScope.rightPanelRetainDataList.status.selectedItems.filter(
              (listItem) => item.key !== listItem.key
            );
        });
      }
      break;
  }

  dispatch(updateDashboardFilter(_dashboardFilter));
};
