import { InsightFilterRequestPayloadI } from 'types/requests/insightRequest';
import { IInsight } from '../insightState';
import { produce } from 'immer';

export const mapRightPanelToFilterRequestPayload = (
  dashboardFilter: IInsight['dashboardFilter']
) => {
  const filterOptions = dashboardFilter.filterOptions as InsightFilterRequestPayloadI;
  const filterLocalScope = dashboardFilter.filterLocalScope;

  return produce(filterOptions, (draft: InsightFilterRequestPayloadI) => {
    draft.group.storeGroup.isSelectAll =
      filterLocalScope.rightPanelRetainDataList.group.storeGroup.isSelectAll;
    draft.group.storeGroup.search =
      filterLocalScope.rightPanelRetainDataList.group.storeGroup.search;
    draft.group.storeGroup.selectedItems =
      filterLocalScope.rightPanelRetainDataList.group.storeGroup.selectedItems.map(
        (item) => item.key
      ) as [string];

    draft.group.warehouseGroup.isSelectAll =
      filterLocalScope.rightPanelRetainDataList.group.warehouseGroup.isSelectAll;
    draft.group.warehouseGroup.search =
      filterLocalScope.rightPanelRetainDataList.group.warehouseGroup.search;
    draft.group.warehouseGroup.selectedItems =
      filterLocalScope.rightPanelRetainDataList.group.warehouseGroup.selectedItems.map(
        (item) => item.key
      ) as [string];

    draft.location.storeCode.isSelectAll =
      filterLocalScope.rightPanelRetainDataList.location.storeCode.isSelectAll;
    draft.location.storeCode.search =
      filterLocalScope.rightPanelRetainDataList.location.storeCode.search;
    draft.location.storeCode.selectedItems =
      filterLocalScope.rightPanelRetainDataList.location.storeCode.selectedItems.map(
        (item) => item.key
      ) as [string];

    draft.location.warehouseCode.isSelectAll =
      filterLocalScope.rightPanelRetainDataList.location.warehouseCode.isSelectAll;
    draft.location.warehouseCode.search =
      filterLocalScope.rightPanelRetainDataList.location.warehouseCode.search;
    draft.location.warehouseCode.selectedItems =
      filterLocalScope.rightPanelRetainDataList.location.warehouseCode.selectedItems.map(
        (item) => item.key
      ) as [string];

    draft.productHierarchy.departments.isSelectAll =
      filterLocalScope.rightPanelRetainDataList.productHierarchy.departments.isSelectAll;
    draft.productHierarchy.departments.search =
      filterLocalScope.rightPanelRetainDataList.productHierarchy.departments.search;
    draft.productHierarchy.departments.selectedItems =
      filterLocalScope.rightPanelRetainDataList.productHierarchy.departments.selectedItems.map(
        (item) => item.key
      ) as [string];

    draft.productHierarchy.subDepartments.isSelectAll =
      filterLocalScope.rightPanelRetainDataList.productHierarchy.subDepartments.isSelectAll;
    draft.productHierarchy.subDepartments.search =
      filterLocalScope.rightPanelRetainDataList.productHierarchy.subDepartments.search;
    draft.productHierarchy.subDepartments.selectedItems =
      filterLocalScope.rightPanelRetainDataList.productHierarchy.subDepartments.selectedItems.map(
        (item) => item.key
      ) as [string];

    draft.productHierarchy.classes.isSelectAll =
      filterLocalScope.rightPanelRetainDataList.productHierarchy.classes.isSelectAll;
    draft.productHierarchy.classes.search =
      filterLocalScope.rightPanelRetainDataList.productHierarchy.classes.search;
    draft.productHierarchy.classes.selectedItems =
      filterLocalScope.rightPanelRetainDataList.productHierarchy.classes.selectedItems.map(
        (item) => item.key
      ) as [string];

    draft.productHierarchy.subClasses.isSelectAll =
      filterLocalScope.rightPanelRetainDataList.productHierarchy.subClasses.isSelectAll;
    draft.productHierarchy.subClasses.search =
      filterLocalScope.rightPanelRetainDataList.productHierarchy.subClasses.search;
    draft.productHierarchy.subClasses.selectedItems =
      filterLocalScope.rightPanelRetainDataList.productHierarchy.subClasses.selectedItems.map(
        (item) => item.key
      ) as [string];

    draft.productHierarchy.products.isSelectAll =
      filterLocalScope.rightPanelRetainDataList.productHierarchy.products.isSelectAll;
    draft.productHierarchy.products.search =
      filterLocalScope.rightPanelRetainDataList.productHierarchy.products.search;
    draft.productHierarchy.products.selectedItems =
      filterLocalScope.rightPanelRetainDataList.productHierarchy.products.selectedItems.map(
        (item) => item.key
      ) as [string];
  });
};
