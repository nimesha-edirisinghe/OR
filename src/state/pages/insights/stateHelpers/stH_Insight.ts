import { FilterDataT, InsightReportDataI } from 'types/insight';
import { RightFilterItemContentI, RightPanelRetainDataList } from 'types/requests/insightRequest';

export const getSelectedItemsCount = (filterItem: RightFilterItemContentI) => {
  return filterItem.isSelectAll
    ? 'All'
    : filterItem.selectedItems.length
    ? filterItem.selectedItems.length
    : 'All';
};

export const getMaxDate = (data: InsightReportDataI[]) => {
  const _maxDate: Date = data.reduce((max: Date, item: InsightReportDataI) => {
    const currentDate: Date = new Date(item.date);
    return currentDate > max ? currentDate : max;
  }, new Date(0));
  return _maxDate.toISOString().slice(0, 10);
};

export const getMinDate = (data: InsightReportDataI[]) => {
  const _minDate: Date = data.reduce((min: Date, item: InsightReportDataI) => {
    const currentDate: Date = new Date(item.date);
    return currentDate < min ? currentDate : min;
  }, new Date());
  return _minDate.toISOString().slice(0, 10);
};

export const updateFilterOutOfCount = (
  rightPanelRetainDataList: RightPanelRetainDataList,
  filterType: FilterDataT,
  mutableTotalCount: number
) => {
  switch (filterType) {
    case 'store_group':
      rightPanelRetainDataList.group.storeGroup.outOfCount = mutableTotalCount;
      break;
    case 'wh_group':
      rightPanelRetainDataList.group.warehouseGroup.outOfCount = mutableTotalCount;
      break;
    case 'department':
      rightPanelRetainDataList.productHierarchy.departments.outOfCount = mutableTotalCount;
      break;
    case 'subDepartment':
      rightPanelRetainDataList.productHierarchy.subDepartments.outOfCount = mutableTotalCount;

      break;
    case 'class':
      rightPanelRetainDataList.productHierarchy.classes.outOfCount = mutableTotalCount;
      break;
    case 'subClass':
      rightPanelRetainDataList.productHierarchy.subClasses.outOfCount = mutableTotalCount;
      break;
    case 'product':
      rightPanelRetainDataList.productHierarchy.products.outOfCount = mutableTotalCount;
      break;
    case 'location_store':
      rightPanelRetainDataList.location.storeCode.outOfCount = mutableTotalCount;
      break;
    case 'location_wh':
      rightPanelRetainDataList.location.warehouseCode.outOfCount = mutableTotalCount;
      break;
  }
};

export const filterOptionsInitialState = {
  group: {
    storeGroup: {
      isSelectAll: false,
      search: null,
      selectedItems: []
    },
    warehouseGroup: {
      isSelectAll: false,
      search: null,
      selectedItems: []
    }
  },
  location: {
    storeCode: {
      isSelectAll: false,
      search: null,
      selectedItems: []
    },
    warehouseCode: {
      isSelectAll: false,
      search: null,
      selectedItems: []
    }
  },
  hotListIndicator: ['All'],
  productHierarchy: {
    classes: {
      isSelectAll: false,
      search: null,
      selectedItems: []
    },
    departments: {
      isSelectAll: false,
      search: null,
      selectedItems: []
    },
    products: {
      isSelectAll: false,
      search: null,
      selectedItems: []
    },
    subClasses: {
      isSelectAll: false,
      search: null,
      selectedItems: []
    },
    subDepartments: {
      isSelectAll: false,
      search: null,
      selectedItems: []
    }
  },
  duration: {
    startDate: '',
    endDate: ''
  }
};

export const rightPanelRetainDataListInitial = {
  group: {
    storeGroup: {
      isSelectAll: false,
      search: null,
      selectedItems: []
    },
    warehouseGroup: {
      isSelectAll: false,
      search: null,
      selectedItems: []
    }
  },
  location: {
    storeCode: {
      isSelectAll: false,
      search: null,
      selectedItems: []
    },
    warehouseCode: {
      isSelectAll: false,
      search: null,
      selectedItems: []
    }
  },
  productHierarchy: {
    classes: {
      isSelectAll: false,
      search: null,
      selectedItems: []
    },
    departments: {
      isSelectAll: false,
      search: null,
      selectedItems: []
    },
    products: {
      isSelectAll: false,
      search: null,
      selectedItems: []
    },
    subClasses: {
      isSelectAll: false,
      search: null,
      selectedItems: []
    },
    subDepartments: {
      isSelectAll: false,
      search: null,
      selectedItems: []
    }
  }
};
