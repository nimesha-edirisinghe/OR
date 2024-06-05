import {
  ActivityLogFilterItemPayloadContentI,
  ActivityLogFilterRequestPayloadI
} from 'types/requests/activityLogRequests';
import { IActivityLogSlice } from '../activityLogState';
import { ActivityLogFilterT, FilterDateContentI } from 'types/activityLog';
import { activityTypes, findObject, statusTypes } from 'utils/utility';

export const filterRequestFormatterForTable = (
  dashboardFilter: IActivityLogSlice['dashboardFilter']
) => {
  let obj = {
    activity: {},
    date: {},
    execType: {},
    groupName: {},
    status: {},
    user: {}
  } as ActivityLogFilterRequestPayloadI;

  obj.activity.isSelectAll =
    dashboardFilter.filterLocalScope.rightPanelRetainDataList.activity.isSelectAll;
  obj.activity.search = obj.activity.isSelectAll
    ? dashboardFilter.filterLocalScope.rightPanelRetainDataList.activity.search
    : null;
  obj.activity.selectedItems =
    dashboardFilter.filterLocalScope.rightPanelRetainDataList.activity.selectedItems.map(
      (item) => (findObject(item.value, activityTypes)?.[0] as string) || ''
    );
  obj.date.dateType = parseInt(
    dashboardFilter.filterLocalScope.rightPanelRetainDataList.date.dateType as string
  );
  obj.date.endDate = dashboardFilter.filterLocalScope.rightPanelRetainDataList.date.endDate;
  obj.date.startDate = dashboardFilter.filterLocalScope.rightPanelRetainDataList.date.startDate;
  obj.date.zoneId = Intl.DateTimeFormat().resolvedOptions().timeZone;

  obj.execType.isSelectAll =
    dashboardFilter.filterLocalScope.rightPanelRetainDataList.execType.isSelectAll;
  obj.execType.search = obj.execType.isSelectAll
    ? dashboardFilter.filterLocalScope.rightPanelRetainDataList.execType.search
    : null;
  obj.execType.selectedItems =
    dashboardFilter.filterLocalScope.rightPanelRetainDataList.execType.selectedItems.map(
      (item) => item.value
    );

  obj.groupName.isSelectAll =
    dashboardFilter.filterLocalScope.rightPanelRetainDataList.group.isSelectAll;
  obj.groupName.search = obj.groupName.isSelectAll
    ? dashboardFilter.filterLocalScope.rightPanelRetainDataList.group.search
    : null;
  obj.groupName.selectedItems =
    dashboardFilter.filterLocalScope.rightPanelRetainDataList.group.selectedItems.map(
      (item) => item.key
    );

  obj.status.isSelectAll =
    dashboardFilter.filterLocalScope.rightPanelRetainDataList.status.isSelectAll;
  obj.status.search = obj.status.isSelectAll
    ? dashboardFilter.filterLocalScope.rightPanelRetainDataList.status.search
    : null;
  obj.status.selectedItems =
    dashboardFilter.filterLocalScope.rightPanelRetainDataList.status.selectedItems.map(
      (item) => (findObject(item.value, statusTypes)?.[0] as string) || ''
    );

  obj.user.isSelectAll = dashboardFilter.filterLocalScope.rightPanelRetainDataList.user.isSelectAll;
  obj.user.search = obj.user.isSelectAll
    ? dashboardFilter.filterLocalScope.rightPanelRetainDataList.user.search
    : null;
  obj.user.selectedItems =
    dashboardFilter.filterLocalScope.rightPanelRetainDataList.user.selectedItems.map(
      (item) => item.value
    );

  return obj;
};

export const filterRequestFormatterForData = (
  dashboardFilter: IActivityLogSlice['dashboardFilter'],
  filterType: ActivityLogFilterT,
  searchKey?: string
) => {
  let obj = {} as ActivityLogFilterRequestPayloadI;
  const rightPanelRetainDataList = dashboardFilter.filterLocalScope.rightPanelRetainDataList;

  switch (filterType) {
    case 'activity':
      obj.activity = {} as ActivityLogFilterItemPayloadContentI;
      const _activity = {
        ...dashboardFilter.filterLocalScope.rightPanelRetainDataList.activity
      };
      obj.activity.search = rightPanelRetainDataList.activity.search || null;
      obj.activity.isSelectAll = _activity.isSelectAll;
      break;
    case 'execType':
      obj.execType = {} as ActivityLogFilterItemPayloadContentI;
      const _execType = {
        ...dashboardFilter.filterLocalScope.rightPanelRetainDataList.execType
      };
      obj.execType.search = rightPanelRetainDataList.execType.search || null;
      obj.execType.isSelectAll = _execType.isSelectAll;
      break;
    case 'group':
      obj.groupName = {} as ActivityLogFilterItemPayloadContentI;
      const _group = {
        ...dashboardFilter.filterLocalScope.rightPanelRetainDataList.group
      };
      obj.groupName.search = rightPanelRetainDataList.group.search || null;
      obj.groupName.isSelectAll = _group.isSelectAll;
      break;
    case 'status':
      obj.status = {} as ActivityLogFilterItemPayloadContentI;
      const _status = {
        ...dashboardFilter.filterLocalScope.rightPanelRetainDataList.status
      };
      obj.status.search = rightPanelRetainDataList.status.search || null;
      obj.status.isSelectAll = _status.isSelectAll;
      break;
    case 'user':
      obj.user = {} as ActivityLogFilterItemPayloadContentI;
      const _user = {
        ...dashboardFilter.filterLocalScope.rightPanelRetainDataList.user
      };
      obj.user.search = rightPanelRetainDataList.user.search || null;
      obj.user.isSelectAll = _user.isSelectAll;
      break;
    case 'date':
      obj.date = {} as FilterDateContentI;
      obj.date = {
        dateType: dashboardFilter.filterLocalScope.rightPanelRetainDataList.date.dateType,
        startDate: dashboardFilter.filterLocalScope.rightPanelRetainDataList.date.startDate,
        endDate: dashboardFilter.filterLocalScope.rightPanelRetainDataList.date.endDate,
        zoneId: Intl.DateTimeFormat().resolvedOptions().timeZone
      };
      break;
  }

  return obj;
};
