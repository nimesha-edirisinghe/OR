import { produce } from 'immer';
import { InsightFilterRequestPayloadI } from 'types/requests/insightRequest';
import { IInsight } from 'state/pages/insights/insightState';
import { mapRightPanelToFilterRequestPayload } from './mapRightPanelToFilterRequestPayload';

export const insightRequestPayloadFormatter = (dashboardFilter: IInsight['dashboardFilter']) => {
  const filterOptions = mapRightPanelToFilterRequestPayload(dashboardFilter);
  const filterLocalScope = dashboardFilter.filterLocalScope;

  return produce(filterOptions, (draft: InsightFilterRequestPayloadI) => {
    draft.location.storeCode.selectedItems = filterLocalScope.isSelectedSore
      ? (filterLocalScope.rightPanelRetainDataList.location.storeCode.selectedItems.map(
          (item) => item.key
        ) as [string])
      : [];
    draft.location.storeCode.search = filterLocalScope.rightPanelRetainDataList.location.storeCode
      .isSelectAll
      ? filterLocalScope.rightPanelRetainDataList.location.storeCode.search
      : null;

    draft.location.warehouseCode.selectedItems = filterLocalScope.isSelectedWarehouse
      ? (filterLocalScope.rightPanelRetainDataList.location.warehouseCode.selectedItems.map(
          (item) => item.key
        ) as [string])
      : [];
    draft.location.warehouseCode.search = filterLocalScope.rightPanelRetainDataList.location
      .warehouseCode.isSelectAll
      ? filterLocalScope.rightPanelRetainDataList.location.warehouseCode.search
      : null;

    draft.group.storeGroup.search = filterLocalScope.rightPanelRetainDataList.group.storeGroup
      .isSelectAll
      ? filterLocalScope.rightPanelRetainDataList.group.storeGroup.search
      : null;
    draft.group.warehouseGroup.search = filterLocalScope.rightPanelRetainDataList.group
      .warehouseGroup.isSelectAll
      ? filterLocalScope.rightPanelRetainDataList.group.warehouseGroup.search
      : null;

    draft.productHierarchy.departments.search = filterLocalScope.rightPanelRetainDataList
      .productHierarchy.departments.isSelectAll
      ? filterLocalScope.rightPanelRetainDataList.productHierarchy.departments.search
      : null;
    draft.productHierarchy.subDepartments.search = filterLocalScope.rightPanelRetainDataList
      .productHierarchy.subDepartments.isSelectAll
      ? filterLocalScope.rightPanelRetainDataList.productHierarchy.subDepartments.search
      : null;
    draft.productHierarchy.classes.search = filterLocalScope.rightPanelRetainDataList
      .productHierarchy.classes.isSelectAll
      ? filterLocalScope.rightPanelRetainDataList.productHierarchy.classes.search
      : null;
    draft.productHierarchy.subClasses.search = filterLocalScope.rightPanelRetainDataList
      .productHierarchy.subClasses.isSelectAll
      ? filterLocalScope.rightPanelRetainDataList.productHierarchy.subClasses.search
      : null;
    draft.productHierarchy.products.search = filterLocalScope.rightPanelRetainDataList
      .productHierarchy.products.isSelectAll
      ? filterLocalScope.rightPanelRetainDataList.productHierarchy.products.search
      : null;
  });
};

export const filterRequestFormatterForData = (
  dashboardFilter: IInsight['dashboardFilter'],
  searchKey?: string
) => {
  const rightPanelRetainDataList = dashboardFilter.filterLocalScope.rightPanelRetainDataList;
  const filterOptions = mapRightPanelToFilterRequestPayload(dashboardFilter);
  const filterType = dashboardFilter.filterType;

  return produce(filterOptions, (draft: InsightFilterRequestPayloadI) => {
    switch (filterType) {
      case 'store_group':
        draft.group.storeGroup.search = rightPanelRetainDataList.group.storeGroup.search || '';
        draft.group.storeGroup.selectedItems = [];
        draft.group.warehouseGroup.selectedItems = [];
        break;
      case 'wh_group':
        draft.group.warehouseGroup.search =
          rightPanelRetainDataList.group.warehouseGroup.search || '';
        draft.group.storeGroup.selectedItems = [];
        draft.group.warehouseGroup.selectedItems = [];
        break;
      case 'department':
        draft.productHierarchy.departments.search =
          rightPanelRetainDataList.productHierarchy.departments.search || '';
        draft.productHierarchy.departments.selectedItems = [];
        break;
      case 'subDepartment':
        draft.productHierarchy.subDepartments.search =
          rightPanelRetainDataList.productHierarchy.subDepartments.search || '';
        draft.productHierarchy.subDepartments.selectedItems = [];
        break;
      case 'class':
        draft.productHierarchy.classes.search =
          rightPanelRetainDataList.productHierarchy.classes.search || '';
        draft.productHierarchy.classes.selectedItems = [];
        break;
      case 'subClass':
        draft.productHierarchy.subClasses.search =
          rightPanelRetainDataList.productHierarchy.subClasses.search || '';
        draft.productHierarchy.subClasses.selectedItems = [];
        break;
      case 'product':
        draft.productHierarchy.products.search =
          rightPanelRetainDataList.productHierarchy.products.search || '';
        draft.productHierarchy.products.selectedItems = [];
        break;
      case 'location_store':
        draft.location.storeCode.search = rightPanelRetainDataList.location.storeCode.search || '';
        draft.location.storeCode.selectedItems = [];
        draft.location.warehouseCode.selectedItems = [];
        break;
      case 'location_wh':
        draft.location.warehouseCode.search =
          rightPanelRetainDataList.location.warehouseCode.search || '';
        draft.location.warehouseCode.selectedItems = [];
        draft.location.storeCode.selectedItems = [];
        break;
      default:
        draft.group.storeGroup.selectedItems = [];
        draft.group.warehouseGroup.selectedItems = [];
        draft.productHierarchy.departments.selectedItems = [];
        draft.productHierarchy.subDepartments.selectedItems = [];
        draft.productHierarchy.classes.selectedItems = [];
        draft.productHierarchy.subClasses.selectedItems = [];
        draft.productHierarchy.products.selectedItems = [];
        draft.location.warehouseCode.selectedItems = [];
        draft.location.storeCode.selectedItems = [];
    }
  });
};

export const filterRequestFormatterForCount = (
  dashboardFilter: IInsight['dashboardFilter'],
  searchKey?: string
) => {
  const filterOptions = mapRightPanelToFilterRequestPayload(dashboardFilter);
  const filterType = dashboardFilter.filterType;

  return produce(filterOptions, (draft: InsightFilterRequestPayloadI) => {
    switch (filterType) {
      case 'store_group':
        draft.group.storeGroup.search = searchKey || '';
        break;
      case 'wh_group':
        draft.group.warehouseGroup.search = searchKey || '';
        break;
      case 'department':
        draft.productHierarchy.departments.search = searchKey || '';
        break;
      case 'subDepartment':
        draft.productHierarchy.subDepartments.search = searchKey || '';
        break;
      case 'class':
        draft.productHierarchy.classes.search = searchKey || '';
        break;
      case 'subClass':
        draft.productHierarchy.subClasses.search = searchKey || '';
        break;
      case 'product':
        draft.productHierarchy.products.search = searchKey || '';
        break;
      case 'location_store':
        draft.location.storeCode.search = searchKey || '';
        break;
      case 'location_wh':
        draft.location.warehouseCode.search = searchKey || '';
        break;
    }
  });
};
