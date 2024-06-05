import { REACT_APP_OR_FILTER_RIGHT_PANEL_MAX_LENGTH } from 'config/constants';
import { produce } from 'immer';
import { Dispatch } from 'redux';
import { IInsight, updateDashboardFilter } from 'state/pages/insights/insightState';
import { FilterDataT } from 'types/insight';
import { RightFilterItemContentI } from 'types/requests/insightRequest';
import { KeyValueI } from 'types/responses/insightResponses';

const isRightPanelLengthValid = (item: RightFilterItemContentI) => {
  return item.selectedItems.length < REACT_APP_OR_FILTER_RIGHT_PANEL_MAX_LENGTH;
};

export const addOrRemoveItemHelper = (
  status: boolean,
  item: KeyValueI,
  filterType: FilterDataT,
  dashboardFilter: IInsight['dashboardFilter'],
  dispatch: Dispatch
) => {
  let _dashboardFilter;

  switch (filterType) {
    case 'store_group':
      if (
        status &&
        isRightPanelLengthValid(
          dashboardFilter.filterLocalScope.rightPanelRetainDataList.group.storeGroup
        )
      ) {
        _dashboardFilter = produce(dashboardFilter, (draft) => {
          (
            draft.filterLocalScope.rightPanelRetainDataList.group.storeGroup
              .selectedItems as KeyValueI[]
          ).push(item);
        });
      } else {
        _dashboardFilter = produce(dashboardFilter, (draft) => {
          draft.filterLocalScope.rightPanelRetainDataList.group.storeGroup.selectedItems =
            draft.filterLocalScope.rightPanelRetainDataList.group.storeGroup.selectedItems.filter(
              (listItem) => item.key !== listItem.key
            );
        });
      }
      break;
    case 'wh_group':
      if (
        status &&
        isRightPanelLengthValid(
          dashboardFilter.filterLocalScope.rightPanelRetainDataList.group.warehouseGroup
        )
      ) {
        _dashboardFilter = produce(dashboardFilter, (draft) => {
          (
            draft.filterLocalScope.rightPanelRetainDataList.group.warehouseGroup
              .selectedItems as KeyValueI[]
          ).push(item);
        });
      } else {
        _dashboardFilter = produce(dashboardFilter, (draft) => {
          draft.filterLocalScope.rightPanelRetainDataList.group.warehouseGroup.selectedItems =
            draft.filterLocalScope.rightPanelRetainDataList.group.warehouseGroup.selectedItems.filter(
              (listItem) => item.key !== listItem.key
            );
        });
      }
      break;
    case 'department':
      if (
        status &&
        isRightPanelLengthValid(
          dashboardFilter.filterLocalScope.rightPanelRetainDataList.productHierarchy.departments
        )
      ) {
        _dashboardFilter = produce(dashboardFilter, (draft) => {
          (
            draft.filterLocalScope.rightPanelRetainDataList.productHierarchy.departments
              .selectedItems as KeyValueI[]
          ).push(item);
        });
      } else {
        _dashboardFilter = produce(dashboardFilter, (draft) => {
          draft.filterLocalScope.rightPanelRetainDataList.productHierarchy.departments.selectedItems =
            draft.filterLocalScope.rightPanelRetainDataList.productHierarchy.departments.selectedItems.filter(
              (listItem) => item.key !== listItem.key
            );
        });
      }
      break;
    case 'subDepartment':
      if (
        status &&
        isRightPanelLengthValid(
          dashboardFilter.filterLocalScope.rightPanelRetainDataList.productHierarchy.subDepartments
        )
      ) {
        _dashboardFilter = produce(dashboardFilter, (draft) => {
          (
            draft.filterLocalScope.rightPanelRetainDataList.productHierarchy.subDepartments
              .selectedItems as KeyValueI[]
          ).push(item);
        });
      } else {
        _dashboardFilter = produce(dashboardFilter, (draft) => {
          draft.filterLocalScope.rightPanelRetainDataList.productHierarchy.subDepartments.selectedItems =
            draft.filterLocalScope.rightPanelRetainDataList.productHierarchy.subDepartments.selectedItems.filter(
              (listItem) => item.key !== listItem.key
            );
        });
      }
      break;
    case 'class':
      if (
        status &&
        isRightPanelLengthValid(
          dashboardFilter.filterLocalScope.rightPanelRetainDataList.productHierarchy.classes
        )
      ) {
        _dashboardFilter = produce(dashboardFilter, (draft) => {
          (
            draft.filterLocalScope.rightPanelRetainDataList.productHierarchy.classes
              .selectedItems as KeyValueI[]
          ).push(item);
        });
      } else {
        _dashboardFilter = produce(dashboardFilter, (draft) => {
          draft.filterLocalScope.rightPanelRetainDataList.productHierarchy.classes.selectedItems =
            draft.filterLocalScope.rightPanelRetainDataList.productHierarchy.classes.selectedItems.filter(
              (listItem) => item.key !== listItem.key
            );
        });
      }
      break;
    case 'subClass':
      if (
        status &&
        isRightPanelLengthValid(
          dashboardFilter.filterLocalScope.rightPanelRetainDataList.productHierarchy.subClasses
        )
      ) {
        _dashboardFilter = produce(dashboardFilter, (draft) => {
          (
            draft.filterLocalScope.rightPanelRetainDataList.productHierarchy.subClasses
              .selectedItems as KeyValueI[]
          ).push(item);
        });
      } else {
        _dashboardFilter = produce(dashboardFilter, (draft) => {
          draft.filterLocalScope.rightPanelRetainDataList.productHierarchy.subClasses.selectedItems =
            draft.filterLocalScope.rightPanelRetainDataList.productHierarchy.subClasses.selectedItems.filter(
              (listItem) => item.key !== listItem.key
            );
        });
      }
      break;
    case 'product':
      if (
        status &&
        isRightPanelLengthValid(
          dashboardFilter.filterLocalScope.rightPanelRetainDataList.productHierarchy.products
        )
      ) {
        _dashboardFilter = produce(dashboardFilter, (draft) => {
          (
            draft.filterLocalScope.rightPanelRetainDataList.productHierarchy.products
              .selectedItems as KeyValueI[]
          ).push(item);
        });
      } else {
        _dashboardFilter = produce(dashboardFilter, (draft) => {
          draft.filterLocalScope.rightPanelRetainDataList.productHierarchy.products.selectedItems =
            draft.filterLocalScope.rightPanelRetainDataList.productHierarchy.products.selectedItems.filter(
              (listItem) => item.key !== listItem.key
            );
        });
      }
      break;
    case 'location_store':
      if (
        status &&
        isRightPanelLengthValid(
          dashboardFilter.filterLocalScope.rightPanelRetainDataList.location.storeCode
        )
      ) {
        _dashboardFilter = produce(dashboardFilter, (draft) => {
          (
            draft.filterLocalScope.rightPanelRetainDataList.location.storeCode
              .selectedItems as KeyValueI[]
          ).push(item);
        });
      } else {
        _dashboardFilter = produce(dashboardFilter, (draft) => {
          draft.filterLocalScope.rightPanelRetainDataList.location.storeCode.selectedItems =
            draft.filterLocalScope.rightPanelRetainDataList.location.storeCode.selectedItems.filter(
              (listItem) => item.key !== listItem.key
            );
        });
      }
      break;
    case 'location_wh':
      if (
        status &&
        isRightPanelLengthValid(
          dashboardFilter.filterLocalScope.rightPanelRetainDataList.location.warehouseCode
        )
      ) {
        _dashboardFilter = produce(dashboardFilter, (draft) => {
          (
            draft.filterLocalScope.rightPanelRetainDataList.location.warehouseCode
              .selectedItems as KeyValueI[]
          ).push(item);
        });
      } else {
        _dashboardFilter = produce(dashboardFilter, (draft) => {
          draft.filterLocalScope.rightPanelRetainDataList.location.warehouseCode.selectedItems =
            draft.filterLocalScope.rightPanelRetainDataList.location.warehouseCode.selectedItems.filter(
              (listItem) => item.key !== listItem.key
            );
        });
      }
      break;
  }
  dispatch(updateDashboardFilter(_dashboardFilter));
};
