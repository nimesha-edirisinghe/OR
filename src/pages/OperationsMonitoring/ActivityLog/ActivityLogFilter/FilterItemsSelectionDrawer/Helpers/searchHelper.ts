import { produce } from 'immer';
import { Dispatch } from 'redux';
import {
  IActivityLogSlice,
  updateDashboardFilter
} from 'state/pages/operationAndMonitoring/activityLog/activityLogState';
import store from 'state/store';
import { ActivityLogFilterT } from 'types/activityLog';

export const updateSelectedItemSearchKey = (
  searchKey: string | null,
  filterType: ActivityLogFilterT,
  dispatch: Dispatch
) => {
  const dashboardFilter = store.getState().activityLog.dashboardFilter;
  let _dashboardFilter = {} as IActivityLogSlice['dashboardFilter'];

  switch (filterType) {
    case 'group':
      _dashboardFilter = produce(dashboardFilter, (draft) => {
        draft.filterLocalScope.rightPanelRetainDataList.group.search = searchKey;
      });
      break;
    case 'activity':
      _dashboardFilter = produce(dashboardFilter, (draft) => {
        draft.filterLocalScope.rightPanelRetainDataList.activity.search = searchKey;
      });
      break;
    case 'execType':
      _dashboardFilter = produce(dashboardFilter, (draft) => {
        draft.filterLocalScope.rightPanelRetainDataList.execType.search = searchKey;
      });
      break;
    case 'user':
      _dashboardFilter = produce(dashboardFilter, (draft) => {
        draft.filterLocalScope.rightPanelRetainDataList.user.search = searchKey;
      });
      break;
    case 'status':
      _dashboardFilter = produce(dashboardFilter, (draft) => {
        draft.filterLocalScope.rightPanelRetainDataList.status.search = searchKey;
      });
      break;
  }

  dispatch(updateDashboardFilter(_dashboardFilter));
};
