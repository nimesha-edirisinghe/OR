import { VStack } from '@chakra-ui/layout';
import { motion } from 'framer-motion';
import { FC } from 'react';
import FilterItem from '../FilterItem';
import { useDispatch, useSelector } from 'react-redux';
import {
  IInsight,
  closeFilterDrawer,
  getFilterDataRequest,
  insightSliceSelector,
  openFilterItemsDrawer,
  updateDashboardFilter
} from 'state/pages/insights/insightState';
import { DrawerTitleT, FilterDataT } from 'types/insight';
import { produce } from 'immer';
import { getSelectedItemsCount } from 'state/pages/insights/stateHelpers/stH_Insight';
import { storeInLocal } from 'utils/localStorage';

interface Props {}

const GroupsTab: FC<Props> = () => {
  const insightState: IInsight = useSelector(insightSliceSelector);
  const immutableFilterTotalItemsCount =
    insightState.dashboardFilter.immutableFilterTotalItemsCount;
  const rightPanelRetainDataList =
    insightState.dashboardFilter.filterLocalScope.rightPanelRetainDataList;
  const dispatch = useDispatch();
  const onClickHandler = (filterType: FilterDataT, drawerTitle: DrawerTitleT) => {
    const _dashboardFilterOptions = produce(
      insightState.dashboardFilter,
      (draft: IInsight['dashboardFilter']) => {
        draft.filterLocalScope.beforeEditFilterOptionsLevel2 = rightPanelRetainDataList;
        draft.filterType = filterType;
      }
    );
    dispatch(updateDashboardFilter(_dashboardFilterOptions));
    dispatch(closeFilterDrawer());
    dispatch(openFilterItemsDrawer());
    dispatch(getFilterDataRequest({ filterType, pageNumber: 1 }));
    storeInLocal('insightDrawerTitle', drawerTitle);
  };
  return (
    <VStack pt="20px" as={motion.div} layoutId="groupTabBody" spacing="12px">
      <FilterItem
        name="Store"
        totCount={immutableFilterTotalItemsCount?.group_store}
        selectedCount={getSelectedItemsCount(rightPanelRetainDataList.group.storeGroup)}
        onClickHandler={() => onClickHandler('store_group', 'Store')}
      />
      <FilterItem
        name="Warehouse"
        totCount={immutableFilterTotalItemsCount?.group_warehouse}
        selectedCount={getSelectedItemsCount(rightPanelRetainDataList.group.warehouseGroup)}
        onClickHandler={() => onClickHandler('wh_group', 'Warehouse')}
      />
    </VStack>
  );
};

export default GroupsTab;
