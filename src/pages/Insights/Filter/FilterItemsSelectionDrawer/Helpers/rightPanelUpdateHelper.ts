import { IInsight } from 'state/pages/insights/insightState';
import { FilterDataT } from 'types/insight';

export const getSelectedRightSideItem = (
  filteredItemType: FilterDataT,
  dashboardFilter: IInsight['dashboardFilter']
) => {
  let _selectedItem;
  switch (filteredItemType) {
    case 'department':
      _selectedItem =
        dashboardFilter.filterLocalScope.rightPanelRetainDataList.productHierarchy.departments;
      break;
    case 'subDepartment':
      _selectedItem =
        dashboardFilter.filterLocalScope.rightPanelRetainDataList.productHierarchy.subDepartments;
      break;
    case 'class':
      _selectedItem =
        dashboardFilter.filterLocalScope.rightPanelRetainDataList.productHierarchy.classes;

      break;
    case 'subClass':
      _selectedItem =
        dashboardFilter.filterLocalScope.rightPanelRetainDataList.productHierarchy.subClasses;
      break;
    case 'product':
      _selectedItem =
        dashboardFilter.filterLocalScope.rightPanelRetainDataList.productHierarchy.products;
      break;
    case 'location_store':
      _selectedItem = dashboardFilter.filterLocalScope.rightPanelRetainDataList.location.storeCode;
      break;
    case 'location_wh':
      _selectedItem =
        dashboardFilter.filterLocalScope.rightPanelRetainDataList.location.warehouseCode;
      break;
    case 'store_group':
      _selectedItem = dashboardFilter.filterLocalScope.rightPanelRetainDataList.group.storeGroup;
      break;
    case 'wh_group':
      _selectedItem =
        dashboardFilter.filterLocalScope.rightPanelRetainDataList.group.warehouseGroup;
      break;
  }
  return _selectedItem;
};
