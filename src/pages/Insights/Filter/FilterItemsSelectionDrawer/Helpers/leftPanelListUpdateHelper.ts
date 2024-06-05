import { IInsight, updateDashboardFilter } from 'state/pages/insights/insightState';
import { Dispatch } from 'redux';
import { RightFilterItemContentI } from 'types/requests/insightRequest';
import { produce } from 'immer';

export const leftPanelListUpdateHelper = (
  selectedRightSideItem: RightFilterItemContentI | undefined,
  dashboardFilter: IInsight['dashboardFilter'],
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
