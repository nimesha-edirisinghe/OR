import { IActivityLogSlice } from 'state/pages/operationAndMonitoring/activityLog/activityLogState';
import { ActivityLogFilterT } from 'types/activityLog';

export const getSelectedRightSideItem = (
  filteredItemType: ActivityLogFilterT,
  dashboardFilter: IActivityLogSlice['dashboardFilter']
) => {
  let _selectedItem;
  switch (filteredItemType) {
    case 'activity':
      _selectedItem = dashboardFilter.filterLocalScope.rightPanelRetainDataList.activity;
      break;
    case 'execType':
      _selectedItem = dashboardFilter.filterLocalScope.rightPanelRetainDataList.execType;
      break;
    case 'group':
      _selectedItem = dashboardFilter.filterLocalScope.rightPanelRetainDataList.group;
      break;
    case 'status':
      _selectedItem = dashboardFilter.filterLocalScope.rightPanelRetainDataList.status;
      break;
    case 'user':
      _selectedItem = dashboardFilter.filterLocalScope.rightPanelRetainDataList.user;
      break;
    case 'date':
      _selectedItem = dashboardFilter.filterLocalScope.rightPanelRetainDataList.date;
      break;
  }
  return _selectedItem;
};
