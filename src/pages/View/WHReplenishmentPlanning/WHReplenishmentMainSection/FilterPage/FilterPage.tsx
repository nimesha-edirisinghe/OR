import { HStack, VStack } from '@chakra-ui/react';
import AppButton from 'components/newTheme/AppButton/AppButton';
import AppText from 'components/newTheme/AppText/AppText';
import FilterTypeItemList from 'pages/MonitoringResolution/PredictiveAlerts/CreateAlerts/AlertCreationSteps/AnchorLocationFilter/FilterDrawer/FilterTypeItemList';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { filterHierarchyGenerator } from 'state/layout/stateHelpers/stH_Layout';
import {
  groupConfigurationSliceSelector,
  IGroupConfigurationSlice,
  resetGroupFilter
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { getFilterItemCount } from 'state/pages/advancedConfiguration/groupConfiguration/stateHelpers/stH_groupConfigurations';
import {
  groupConfigSliceSelector,
  IGroupConfig,
  selectGroupKey
} from 'state/pages/shared/groupConfig/groupConfigState';
import { setIsLoadWhData } from 'state/pages/view/whReplenishmentView/whRplViewState';
import { resetViewRplPlanRightPanel } from 'state/pages/view/replenishmentView/rplViewPageState';
import { showErrorToast } from 'state/toast/toastState';
import { neutral_100, ocean_blue_600 } from 'theme/colors';
import { numberWithCommaSeparator } from 'utils/utility';

interface Props {}

const viewReplenishmentFilterHierarchy = filterHierarchyGenerator('viewWhReplenishment');

const FilterPage: FC<Props> = () => {
  const groupConfigState: IGroupConfigurationSlice = useSelector(groupConfigurationSliceSelector);
  const groupFilter = groupConfigState.groupFilter;
  const filterTotalItemsCount = groupConfigState.groupFilter?.filterTotalItemsCount;
  const sharedGroupState: IGroupConfig = useSelector(groupConfigSliceSelector);
  const [skuLocationCount, setSkuLocationCount] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const skuLocationCount = getFilterItemCount(groupFilter, 1, 'sku');
    setSkuLocationCount(skuLocationCount);
  }, [filterTotalItemsCount]);

  const onClickNext = () => {
    if (!sharedGroupState.selectedGroupKey) {
      showErrorToast('Please select a Group first');
      return;
    }
    dispatch(resetViewRplPlanRightPanel());
    dispatch(setIsLoadWhData(true));
    navigate('/app/wh-replenishment/view');
  };

  const onClickClear = () => {
    dispatch(resetGroupFilter());
    dispatch(selectGroupKey(null));
  };

  return (
    <VStack
      w="600px"
      p="20px"
      bg={ocean_blue_600}
      spacing="20px"
      borderRadius="8px"
      maxH="calc(100vh - 100px)"
    >
      <VStack spacing="8px" w="full" align="start">
        <AppText size="h4Semibold" color={neutral_100}>
          Select SKU-locations
        </AppText>
        <AppText size="body2" color={neutral_100}>
          Please select one or more SKU-locations to view their forecasts. You can easily identify
          the required SKU-locations by applying filters below.
        </AppText>
      </VStack>
      <FilterTypeItemList
        maxH="full"
        loadTo="page"
        filterHierarchy={viewReplenishmentFilterHierarchy}
        whFlag={1}
      />
      <HStack justify="space-between" w="full">
        <HStack spacing="4px">
          <AppText size="body3">Total SKU-locations:</AppText>
          <AppText size="h5Semibold">{numberWithCommaSeparator(skuLocationCount)}</AppText>
        </HStack>
        <HStack>
          <AppButton variant="secondary" size="medium" onClick={onClickClear}>
            Clear
          </AppButton>
          <AppButton variant="primary" size="medium" onClick={onClickNext}>
            Next
          </AppButton>
        </HStack>
      </HStack>
    </VStack>
  );
};

export default FilterPage;
