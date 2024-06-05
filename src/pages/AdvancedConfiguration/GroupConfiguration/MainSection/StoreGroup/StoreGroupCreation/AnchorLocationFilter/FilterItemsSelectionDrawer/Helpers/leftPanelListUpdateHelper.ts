import { Dispatch } from 'redux';
import { produce } from 'immer';
import {
  IGroupConfigurationSlice,
  updateGroupFilter
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { RightFilterItemContentI } from 'types/groupConfig';
import { KeyValueI } from 'types/responses/insightResponses';

export const leftPanelListUpdateHelper = (
  selectedRightSideItem: RightFilterItemContentI | undefined,
  groupFilter: IGroupConfigurationSlice['groupFilter'],
  dispatch: Dispatch
) => {
  const selectedRightSideItemKeys =
    selectedRightSideItem &&
    (selectedRightSideItem?.selectedItems as KeyValueI[]).map((item) => item.key);

  const _groupFilter = produce(groupFilter, (draft) => {
    draft.filterItemListData = draft.filterItemListData.map((listItem) => {
      if (selectedRightSideItemKeys?.includes(listItem.key)) {
        listItem.isSelected = true;
      } else {
        listItem.isSelected = false;
      }
      return listItem;
    });
  });

  dispatch(updateGroupFilter(_groupFilter));
};
