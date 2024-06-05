import { VStack } from '@chakra-ui/react';
import InsightsPageLayout from 'layouts/PageLayouts/InsightsPageLayout';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { skuSearchAction } from 'state/pages/view/demandForecastView/dfViewPageState';
import { IUser, userSliceSelector } from 'state/user/userState';
import {
  getGroupListRequest,
  groupConfigSliceSelector,
  IGroupConfig,
  selectGroupKey
} from 'state/pages/shared/groupConfig/groupConfigState';
import FilterDrawer from 'pages/MonitoringResolution/PredictiveAlerts/CreateAlerts/AlertCreationSteps/AnchorLocationFilter/FilterDrawer/FilterDrawer';
import FilterItemsSelectionDrawer from 'pages/MonitoringResolution/PredictiveAlerts/CreateAlerts/AlertCreationSteps/AnchorLocationFilter/FilterItemsSelectionDrawer/FilterItemsSelectionDrawer';
import {
  getFilterCountRequest,
  getLabelsRequest,
  groupConfigurationSliceSelector,
  IGroupConfigurationSlice,
  resetGroupFilter
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { filterHierarchyGenerator } from 'state/layout/stateHelpers/stH_Layout';
import OrderParameterFilterPage from './OrderParameterFilterPage/OrderParameterFilterPage';
import { resetOrderSummaryData } from 'state/pages/replenishmentRecommendation/orderParameter/orderParameterState';

interface Props {}
const viewForecastFilterHierarchy = filterHierarchyGenerator('viewOrderParamRepl');

const OrderParameterPage: FC<Props> = () => {
  const userState: IUser = useSelector(userSliceSelector);
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const dispatch = useDispatch();
  const groupConfigurationState: IGroupConfigurationSlice = useSelector(
    groupConfigurationSliceSelector
  );
  const sharedGroupState: IGroupConfig = useSelector(groupConfigSliceSelector);

  useEffect(() => {
    dispatch(resetOrderSummaryData());
  });

  useEffect(() => {
    try {
      const abortController = new AbortController();
      if (selectedOrgKey) {
        dispatch(selectGroupKey(null));
        dispatch(resetGroupFilter());
        // dispatch(getGroupListRequest({ whFlag: 2 }));
        dispatch(getFilterCountRequest({ whFlag: 2 }));
        dispatch(
          getLabelsRequest({
            labelTypes: ['location', 'product', 'store', 'sku', 'vendor']
          })
        );
        dispatch(skuSearchAction(''));
        dispatch(resetOrderSummaryData());
      }
      return () => {
        abortController.abort();
      };
    } catch (error) {
      console.error('summary details fetching error ocurred', error);
    }
  }, [selectedOrgKey]);

  const pageContent = useCallback(() => {
    return (
      <VStack w="full" px="20px" pt="20px" spacing="16px">
        <OrderParameterFilterPage />
      </VStack>
    );
  }, [selectedOrgKey, sharedGroupState]);

  return (
    <>
      <FilterDrawer
        isOpen={!!groupConfigurationState.groupFilter?.filterLocalScope.isOpenFilterDrawer}
        filterHierarchy={viewForecastFilterHierarchy}
        whFlag={2}
      />
      <FilterItemsSelectionDrawer
        isOpen={!!groupConfigurationState.groupFilter?.filterLocalScope.isOpenItemSelectionDrawer}
        whFlag={2}
      />
      <InsightsPageLayout children={pageContent()} />
    </>
  );
};

export default OrderParameterPage;
