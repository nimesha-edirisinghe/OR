import { produce } from 'immer';
import { Dispatch } from 'redux';
import { IInsight, updateDashboardFilter } from 'state/pages/insights/insightState';
import store from 'state/store';
import { FilterDataT } from 'types/insight';

export const updateSelectedItemSearchKey = (
  searchKey: string | null,
  filteredItemType: FilterDataT,
  dispatch: Dispatch
) => {
  let _dashboardFilter = {} as IInsight['dashboardFilter'];
  const dashboardFilter = store.getState().insight.dashboardFilter;

  switch (filteredItemType) {
    case 'department':
      _dashboardFilter = produce(dashboardFilter, (draft) => {
        draft.filterLocalScope.rightPanelRetainDataList.productHierarchy.departments.search =
          searchKey;
      });
      break;
    case 'subDepartment':
      _dashboardFilter = produce(dashboardFilter, (draft) => {
        draft.filterLocalScope.rightPanelRetainDataList.productHierarchy.subDepartments.search =
          searchKey;
      });
      break;
    case 'class':
      _dashboardFilter = produce(dashboardFilter, (draft) => {
        draft.filterLocalScope.rightPanelRetainDataList.productHierarchy.classes.search = searchKey;
      });
      break;
    case 'subClass':
      _dashboardFilter = produce(dashboardFilter, (draft) => {
        draft.filterLocalScope.rightPanelRetainDataList.productHierarchy.subClasses.search =
          searchKey;
      });
      break;
    case 'product':
      _dashboardFilter = produce(dashboardFilter, (draft) => {
        draft.filterLocalScope.rightPanelRetainDataList.productHierarchy.products.search =
          searchKey;
      });
      break;
    case 'location_store':
      _dashboardFilter = produce(dashboardFilter, (draft) => {
        draft.filterLocalScope.rightPanelRetainDataList.location.storeCode.search = searchKey;
      });
      break;
    case 'location_wh':
      _dashboardFilter = produce(dashboardFilter, (draft) => {
        draft.filterLocalScope.rightPanelRetainDataList.location.warehouseCode.search = searchKey;
      });
      break;
    case 'store_group':
      _dashboardFilter = produce(dashboardFilter, (draft) => {
        draft.filterLocalScope.rightPanelRetainDataList.group.storeGroup.search = searchKey;
      });
      break;
    case 'wh_group':
      _dashboardFilter = produce(dashboardFilter, (draft) => {
        draft.filterLocalScope.rightPanelRetainDataList.group.warehouseGroup.search = searchKey;
      });
      break;
  }

  dispatch(updateDashboardFilter(_dashboardFilter));
};
