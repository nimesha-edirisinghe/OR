import { HStack, VStack } from '@chakra-ui/react';
import InsightsPageLayout from 'layouts/PageLayouts/InsightsPageLayout';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUser, userSliceSelector } from 'state/user/userState';
import {
  groupConfigSliceSelector,
  IGroupConfig
} from 'state/pages/shared/groupConfig/groupConfigState';
import {
  IGroupConfigurationSlice,
  getLabelsRequest,
  groupConfigurationSliceSelector
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { useNavigate } from 'react-router-dom';
import OrderParameterHeader from './OrderParameterHeader/OrderParameterHeader';
import { ocean_blue_600 } from 'theme/colors';
import OrderParameterTableSection from './OrderParameterTableSection/OrderParameterTableSection';
import {
  IOrderParameter,
  getRplParameterSummaryRequest,
  orderParameterSliceSelector,
  setOrderParameterSearchKey
} from 'state/pages/replenishmentRecommendation/orderParameter/orderParameterState';
import FilterDrawer from 'pages/MonitoringResolution/PredictiveAlerts/CreateAlerts/AlertCreationSteps/AnchorLocationFilter/FilterDrawer/FilterDrawer';
import FilterItemsSelectionDrawer from 'pages/MonitoringResolution/PredictiveAlerts/CreateAlerts/AlertCreationSteps/AnchorLocationFilter/FilterItemsSelectionDrawer/FilterItemsSelectionDrawer';
import { filterHierarchyGenerator } from 'state/layout/stateHelpers/stH_Layout';

interface Props {}

const OrderParameterViewPage: FC<Props> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState: IUser = useSelector(userSliceSelector);
  const groupConfigurationState: IGroupConfigurationSlice = useSelector(
    groupConfigurationSliceSelector
  );
  const orderParameterState: IOrderParameter = useSelector(orderParameterSliceSelector);
  const orderSummaryData = orderParameterState.summaryData;
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;

  const sharedGroupState: IGroupConfig = useSelector(groupConfigSliceSelector);
  const viewForecastFilterHierarchy = filterHierarchyGenerator('viewOrderParamRepl');
  
  useEffect(() => {
    try {
      const abortController = new AbortController();
      dispatch(setOrderParameterSearchKey(''));
      dispatch(getRplParameterSummaryRequest());
      
      dispatch(
        getLabelsRequest({
          labelTypes: ['location', 'product', 'store', 'sku', 'vendor']
        })
      );
      return () => {
        abortController.abort();
      };
    } catch (error) {
      console.error('summary details fetching error ocurred', error);
    }
  }, []);

  useEffect(() => {
    if (orderSummaryData !== null) {
      navigate('/app/order-parameter');
    }
  }, [selectedOrgKey]);

  const pageContent = useCallback(() => {
    return (
      <VStack w="full" px="20px" pt="20px" spacing="16px">
        <HStack h="36px" w="full">
          <OrderParameterHeader />
        </HStack>
        <HStack borderRadius="8px" h="calc(100vh - 165px)" w="full" p="12px" bg={ocean_blue_600}>
          <OrderParameterTableSection />
        </HStack>
      </VStack>
    );
  }, [selectedOrgKey, sharedGroupState]);

  return (
    <>
      <FilterDrawer
        isOpen={!!groupConfigurationState.groupFilter?.filterLocalScope.isOpenFilterDrawer}
        isGroupDisabled
        whFlag={2}
        filterHierarchy={viewForecastFilterHierarchy}
      />
      <FilterItemsSelectionDrawer
        isOpen={!!groupConfigurationState.groupFilter?.filterLocalScope.isOpenItemSelectionDrawer}
        whFlag={2}
      />
      <InsightsPageLayout children={pageContent()} />
    </>
  );
};

export default OrderParameterViewPage;
