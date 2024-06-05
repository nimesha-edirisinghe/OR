import { VStack } from '@chakra-ui/layout';
import { motion } from 'framer-motion';
import { FC } from 'react';
import FilterItem from './FilterTypeItem';
import { useDispatch, useSelector } from 'react-redux';
import { produce } from 'immer';
import { getSelectedItemsCount } from 'state/pages/insights/stateHelpers/stH_Insight';
import { storeInLocal } from 'utils/localStorage';
import { ActivityLogFilterT, DrawerTitleT } from 'types/activityLog';
import {
  IActivityLogSlice,
  activityLogSliceSelector,
  closeFilterDrawer,
  getFilterDataRequest,
  openFilterItemsDrawer,
  toggleFilterDateDrawer,
  updateDashboardFilter
} from 'state/pages/operationAndMonitoring/activityLog/activityLogState';
import { initialDateTypesAndValues } from '../FilterDateSelectionDrawer/helper';

interface Props {}

const FilterTypeItemList: FC<Props> = () => {
  const activityLogState: IActivityLogSlice = useSelector(activityLogSliceSelector);
  const filterTotalItemsCount = activityLogState.dashboardFilter.filterTotalItemsCount;
  const rightPanelRetainDataList =
    activityLogState.dashboardFilter.filterLocalScope.rightPanelRetainDataList;
  const dispatch = useDispatch();

  const onClickHandler = (filterType: ActivityLogFilterT, drawerTitle: DrawerTitleT) => {
    const _dashboardFilterOptions = produce(
      activityLogState.dashboardFilter,
      (draft: IActivityLogSlice['dashboardFilter']) => {
        draft.filterLocalScope.beforeEditFilterOptionsLevel2 = rightPanelRetainDataList;
        draft.filterType = filterType;
      }
    );
    dispatch(updateDashboardFilter(_dashboardFilterOptions));

    if (filterType !== 'date') {
      dispatch(openFilterItemsDrawer());
      dispatch(getFilterDataRequest({ filterType, pageNumber: 1 }));
    } else {
      dispatch(toggleFilterDateDrawer({ status: true }));
    }

    dispatch(closeFilterDrawer());
    storeInLocal('insightDrawerTitle', drawerTitle);
  };

  return (
    <VStack pt="20px" as={motion.div} layoutId="productHierarchyTabBody" spacing="12px">
      <FilterItem
        name="Group Name"
        totCount={filterTotalItemsCount.group}
        selectedCount={getSelectedItemsCount(rightPanelRetainDataList?.group)}
        onClickHandler={() => onClickHandler('group', 'Group Name')}
      />
      <FilterItem
        name="Activity"
        totCount={filterTotalItemsCount.activity}
        selectedCount={getSelectedItemsCount(rightPanelRetainDataList?.activity)}
        onClickHandler={() => onClickHandler('activity', 'Activity')}
      />
      <FilterItem
        name="Execution Type"
        totCount={filterTotalItemsCount.execType}
        selectedCount={getSelectedItemsCount(rightPanelRetainDataList?.execType)}
        onClickHandler={() => onClickHandler('execType', 'Execution Type')}
      />
      <FilterItem
        name="Status"
        totCount={filterTotalItemsCount.status}
        selectedCount={getSelectedItemsCount(rightPanelRetainDataList?.status)}
        onClickHandler={() => onClickHandler('status', 'Status')}
      />
      <FilterItem
        name="User"
        totCount={filterTotalItemsCount.user}
        selectedCount={getSelectedItemsCount(rightPanelRetainDataList?.user)}
        onClickHandler={() => onClickHandler('user', 'User')}
      />
      <FilterItem
        name="Date"
        selectedCount={
          initialDateTypesAndValues.find(
            (selectedType) => selectedType.value === rightPanelRetainDataList?.date.dateType
          )?.displayName!
        }
        onClickHandler={() => onClickHandler('date', 'Date')}
      />
    </VStack>
  );
};

export default FilterTypeItemList;
