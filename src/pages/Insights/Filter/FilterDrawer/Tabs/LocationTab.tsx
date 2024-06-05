import { VStack } from '@chakra-ui/layout';
import { motion } from 'framer-motion';
import { FC } from 'react';
import FilterItem from '../FilterItem';
import { useDispatch, useSelector } from 'react-redux';
import {
  IInsight,
  insightSliceSelector,
  getFilterDataRequest,
  openFilterItemsDrawer,
  updateDashboardFilter,
  closeFilterDrawer
} from 'state/pages/insights/insightState';

import { DrawerTitleT, FilterDataT } from 'types/insight';
import { produce } from 'immer';
import { getSelectedItemsCount } from 'state/pages/insights/stateHelpers/stH_Insight';
import { storeInLocal } from 'utils/localStorage';

export type LocationType = 'location_store' | 'location_wh';

interface Props {}

const LocationTab: FC<Props> = () => {
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
    <VStack pt="20px" as={motion.div} layoutId="locationTabBody" spacing="12px">
      <FilterItem
        name="Store"
        totCount={immutableFilterTotalItemsCount?.stores}
        selectedCount={getSelectedItemsCount(rightPanelRetainDataList.location.storeCode)}
        onClickHandler={() => onClickHandler('location_store', 'Store')}
      />
      <FilterItem
        name="Warehouse"
        totCount={immutableFilterTotalItemsCount?.warehouses}
        selectedCount={getSelectedItemsCount(rightPanelRetainDataList.location.warehouseCode)}
        onClickHandler={() => onClickHandler('location_wh', 'Warehouse')}
      />
    </VStack>
  );
};

export default LocationTab;
