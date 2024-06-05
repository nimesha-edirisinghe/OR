import {
  ActivityLogFilterT,
  FilterItemContentI,
  RightPanelRetainDataList
} from 'types/activityLog';

export const getSelectedItemsCount = (filterItem: FilterItemContentI) => {
  return filterItem.isSelectAll
    ? (filterItem.outOfCount as number)
    : filterItem.selectedItems.length;
};

export const updateFilterOutOfCount = (
  rightPanelRetainDataList: RightPanelRetainDataList,
  filterType: ActivityLogFilterT,
  mutableTotalCount: number
) => {
  switch (filterType) {
    case 'activity':
      rightPanelRetainDataList.activity.outOfCount = mutableTotalCount;
      break;
    case 'user':
      rightPanelRetainDataList.user.outOfCount = mutableTotalCount;
      break;
    case 'execType':
      rightPanelRetainDataList.execType.outOfCount = mutableTotalCount;
      break;
    case 'group':
      rightPanelRetainDataList.group.outOfCount = mutableTotalCount;
      break;
    case 'status':
      rightPanelRetainDataList.status.outOfCount = mutableTotalCount;
      break;
  }
};

export const rightPanelRetainDataListInitial = {
  activity: {
    isSelectAll: false,
    search: null,
    selectedItems: [],
    outOfCount: 0
  },
  date: {
    dateType: '1',
    endDate: null,
    startDate: null
  },
  execType: {
    isSelectAll: false,
    search: null,
    selectedItems: [],
    outOfCount: 0
  },
  group: {
    isSelectAll: false,
    search: null,
    selectedItems: [],
    outOfCount: 0
  },
  status: {
    isSelectAll: false,
    search: null,
    selectedItems: [],
    outOfCount: 0
  },
  user: {
    isSelectAll: false,
    search: null,
    selectedItems: [],
    outOfCount: 0
  }
};