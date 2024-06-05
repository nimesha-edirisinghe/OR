import { Dispatch } from '@reduxjs/toolkit';
import { produce } from 'immer';
import { IInsight, updateDashboardFilter } from 'state/pages/insights/insightState';
import { FilterDataT } from 'types/insight';

export const toggleSelectAllItems = (
  status: boolean,
  filteredItemType: FilterDataT,
  dashboardFilter: IInsight['dashboardFilter'],
  dispatch: Dispatch
) => {
  let _dashboardFilter = {} as IInsight['dashboardFilter'];

  switch (filteredItemType) {
    case 'department':
      _dashboardFilter = produce(dashboardFilter, (draft) => {
        draft.filterLocalScope.rightPanelRetainDataList.productHierarchy.departments.isSelectAll =
          status;
        draft.filterLocalScope.rightPanelRetainDataList.productHierarchy.departments.selectedItems =
          [];
      });
      break;
    case 'subDepartment':
      _dashboardFilter = produce(dashboardFilter, (draft) => {
        draft.filterLocalScope.rightPanelRetainDataList.productHierarchy.subDepartments.isSelectAll =
          status;
        draft.filterLocalScope.rightPanelRetainDataList.productHierarchy.subDepartments.selectedItems =
          [];
      });
      break;
    case 'class':
      _dashboardFilter = produce(dashboardFilter, (draft) => {
        draft.filterLocalScope.rightPanelRetainDataList.productHierarchy.classes.isSelectAll =
          status;
        draft.filterLocalScope.rightPanelRetainDataList.productHierarchy.classes.selectedItems = [];
      });
      break;
    case 'subClass':
      _dashboardFilter = produce(dashboardFilter, (draft) => {
        draft.filterLocalScope.rightPanelRetainDataList.productHierarchy.subClasses.isSelectAll =
          status;
        draft.filterLocalScope.rightPanelRetainDataList.productHierarchy.subClasses.selectedItems =
          [];
      });
      break;
    case 'product':
      _dashboardFilter = produce(dashboardFilter, (draft) => {
        draft.filterLocalScope.rightPanelRetainDataList.productHierarchy.products.isSelectAll =
          status;
        draft.filterLocalScope.rightPanelRetainDataList.productHierarchy.products.selectedItems =
          [];
      });
      break;
    case 'location_store':
      _dashboardFilter = produce(dashboardFilter, (draft) => {
        draft.filterLocalScope.rightPanelRetainDataList.location.storeCode.isSelectAll = status;
        draft.filterLocalScope.rightPanelRetainDataList.location.storeCode.selectedItems = [];
      });
      break;
    case 'location_wh':
      _dashboardFilter = produce(dashboardFilter, (draft) => {
        draft.filterLocalScope.rightPanelRetainDataList.location.warehouseCode.isSelectAll = status;
        draft.filterLocalScope.rightPanelRetainDataList.location.warehouseCode.selectedItems = [];
      });
      break;
    case 'store_group':
      _dashboardFilter = produce(dashboardFilter, (draft) => {
        draft.filterLocalScope.rightPanelRetainDataList.group.storeGroup.isSelectAll = status;
        draft.filterLocalScope.rightPanelRetainDataList.group.storeGroup.selectedItems = [];
      });
      break;
    case 'wh_group':
      _dashboardFilter = produce(dashboardFilter, (draft) => {
        draft.filterLocalScope.rightPanelRetainDataList.group.warehouseGroup.isSelectAll = status;
        draft.filterLocalScope.rightPanelRetainDataList.group.warehouseGroup.selectedItems = [];
      });
      break;
  }

  _dashboardFilter = produce(_dashboardFilter, (draft) => {
    draft.filterItemListData.map((item) => {
      item.isSelected = status;
      return item;
    });
  });

  dispatch(updateDashboardFilter(_dashboardFilter));
};
