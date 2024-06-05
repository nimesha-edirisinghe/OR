import { VStack } from '@chakra-ui/layout';
import { motion } from 'framer-motion';
import { FC } from 'react';
import FilterItem from '../FilterItem';
import {
  IInsight,
  closeFilterDrawer,
  getFilterDataRequest,
  insightSliceSelector,
  openFilterItemsDrawer,
  updateDashboardFilter
} from 'state/pages/insights/insightState';
import { useDispatch, useSelector } from 'react-redux';
import { DrawerTitleT, FilterDataT } from 'types/insight';
import { produce } from 'immer';
import { getSelectedItemsCount } from 'state/pages/insights/stateHelpers/stH_Insight';
import { storeInLocal } from 'utils/localStorage';

interface Props {}

const ProductHierarchyTab: FC<Props> = () => {
  const insightState: IInsight = useSelector(insightSliceSelector);
  const filterTotalItemsCount = insightState.dashboardFilter.filterTotalItemsCount;
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
    dispatch(openFilterItemsDrawer());
    dispatch(closeFilterDrawer());
    dispatch(getFilterDataRequest({ filterType, pageNumber: 1 }));
    storeInLocal('insightDrawerTitle', drawerTitle);
  };

  return (
    <VStack pt="20px" as={motion.div} layoutId="productHierarchyTabBody" spacing="12px">
      <FilterItem
        name="Department"
        totCount={filterTotalItemsCount?.departments}
        selectedCount={getSelectedItemsCount(rightPanelRetainDataList.productHierarchy.departments)}
        onClickHandler={() => onClickHandler('department', 'Department')}
      />
      <FilterItem
        name="Sub Department"
        totCount={filterTotalItemsCount?.subDepartments}
        selectedCount={getSelectedItemsCount(
          rightPanelRetainDataList.productHierarchy.subDepartments
        )}
        onClickHandler={() => onClickHandler('subDepartment', 'Sub Department')}
      />
      <FilterItem
        name="Class"
        totCount={filterTotalItemsCount?.classes}
        selectedCount={getSelectedItemsCount(rightPanelRetainDataList.productHierarchy.classes)}
        onClickHandler={() => onClickHandler('class', 'Class')}
      />
      <FilterItem
        name="Sub Class"
        totCount={filterTotalItemsCount?.subClasses}
        selectedCount={getSelectedItemsCount(rightPanelRetainDataList.productHierarchy.subClasses)}
        onClickHandler={() => onClickHandler('subClass', 'Sub Class')}
      />
      <FilterItem
        name="Products"
        totCount={filterTotalItemsCount?.products}
        selectedCount={getSelectedItemsCount(rightPanelRetainDataList.productHierarchy.products)}
        onClickHandler={() => onClickHandler('product', 'Products')}
      />
    </VStack>
  );
};

export default ProductHierarchyTab;
