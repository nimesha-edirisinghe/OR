import { IGroupConfigurationSlice } from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';

export const getSelectedRightSideItem = (
  itemCode: number,
  itemType: string,
  groupFilter: IGroupConfigurationSlice['groupFilter']
) => {
  return groupFilter.filterLocalScope.rightPanelRetainDataList?.find(
    (rightItem) => rightItem.code === itemCode && rightItem.type === itemType
  );
};
