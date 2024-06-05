import { Dispatch } from 'redux';
import { produce } from 'immer';
import {
  IActivityLogSlice,
  updateDashboardFilter
} from 'state/pages/operationAndMonitoring/activityLog/activityLogState';
import { FilterItemContentI } from 'types/activityLog';

export const leftPanelListUpdateHelper = (
  selectedRightSideItem: FilterItemContentI | undefined,
  dashboardFilter: IActivityLogSlice['dashboardFilter'],
  dispatch: Dispatch
) => {
  let _dashboardFilter;
  const selectedRightSideItemKeys = selectedRightSideItem?.selectedItems.map((item) => item.key);

  _dashboardFilter = produce(dashboardFilter, (draft) => {
    draft.filterItemListData = draft.filterItemListData.map((listItem) => {
      if (selectedRightSideItemKeys?.includes(listItem.key)) {
        listItem.isSelected = true;
      } else {
        listItem.isSelected = false;
      }
      return listItem;
    });
  });

  dispatch(updateDashboardFilter(_dashboardFilter));
};
