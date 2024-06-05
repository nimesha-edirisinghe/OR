import { Dispatch } from '@reduxjs/toolkit';
import { produce } from 'immer';
import {
  IActivityLogSlice,
  updateDashboardFilter
} from 'state/pages/operationAndMonitoring/activityLog/activityLogState';

export const resetActivityLogFilter = (
  dashboardFilter: IActivityLogSlice['dashboardFilter'],
  dispatch: Dispatch
) => {
  const _dashboardFilter = produce(dashboardFilter, (draft) => {
    const defaultItem = {
      isSelectAll: false,
      search: '',
      selectedItems: [],
      outOfCount: 0
    };
    const defaultDate = {
      dateType: '1',
      startDate: null,
      endDate: null,
      zoneId: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    draft.filterLocalScope.rightPanelRetainDataList.activity = defaultItem;
    draft.filterLocalScope.rightPanelRetainDataList.execType = defaultItem;
    draft.filterLocalScope.rightPanelRetainDataList.group = defaultItem;
    draft.filterLocalScope.rightPanelRetainDataList.status = defaultItem;
    draft.filterLocalScope.rightPanelRetainDataList.user = defaultItem;
    draft.filterLocalScope.rightPanelRetainDataList.date = defaultDate;

    draft.filterLocalScope.beforeEditFilterOptionsLevel1 =
      draft.filterLocalScope.rightPanelRetainDataList;
    draft.filterLocalScope.beforeEditFilterOptionsLevel2 =
      draft.filterLocalScope.rightPanelRetainDataList;
  });

  dispatch(updateDashboardFilter(_dashboardFilter));
};
