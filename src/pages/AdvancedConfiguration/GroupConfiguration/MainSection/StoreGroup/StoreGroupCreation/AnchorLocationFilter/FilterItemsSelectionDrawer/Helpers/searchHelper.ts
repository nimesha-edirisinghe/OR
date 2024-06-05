import { produce } from 'immer';
import { Dispatch } from 'redux';
import { updateGroupFilter } from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import store from 'state/store';

export const updateSelectedItemSearchKey = (
  searchKey: string | null,
  filterType: string,
  filterCode: number,
  dispatch: Dispatch
) => {
  const groupFilter = store.getState().groupConfiguration.groupFilter;

  const _groupFilter = produce(groupFilter, (draft) => {
    const selectedItem = draft.filterLocalScope.rightPanelRetainDataList.find(
      (item) => item.code === filterCode && item.type === filterType
    );

    selectedItem!.search = searchKey;
  });

  dispatch(updateGroupFilter(_groupFilter));
};
