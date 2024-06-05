import { VStack } from '@chakra-ui/react';
import InsightsPageLayout from 'layouts/PageLayouts/InsightsPageLayout';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  skuSearchAction,
  whDemandResetSkuListData
} from 'state/pages/view/whDemandForecastView/whDfViewPageState';
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
  getLabelsRequest,
  groupConfigurationSliceSelector,
  IGroupConfigurationSlice,
  resetGroupFilter
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import FilterPage from './MainSection/FilterPage/FilterPage';
import { filterHierarchyGenerator } from 'state/layout/stateHelpers/stH_Layout';

interface Props {}
const viewForecastFilterHierarchy = filterHierarchyGenerator('viewWhForecast');

const WHDemandForecastingPage: FC<Props> = () => {
  const userState: IUser = useSelector(userSliceSelector);
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const dispatch = useDispatch();
  const groupConfigurationState: IGroupConfigurationSlice = useSelector(
    groupConfigurationSliceSelector
  );
  const sharedGroupState: IGroupConfig = useSelector(groupConfigSliceSelector);

  useEffect(() => {
    dispatch(whDemandResetSkuListData());
  });

  useEffect(() => {
    try {
      const abortController = new AbortController();
      if (selectedOrgKey) {
        dispatch(selectGroupKey(null));
        dispatch(resetGroupFilter());
        dispatch(getGroupListRequest({ whFlag: 1 }));
        dispatch(
          getLabelsRequest({
            labelTypes: ['location', 'product', 'anchor', 'predictor', 'store', 'sku']
          })
        );
        dispatch(skuSearchAction(''));
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
        <FilterPage />
      </VStack>
    );
  }, [selectedOrgKey, sharedGroupState]);

  return (
    <>
      <FilterDrawer
        isOpen={!!groupConfigurationState.groupFilter?.filterLocalScope.isOpenFilterDrawer}
        filterHierarchy={viewForecastFilterHierarchy}
        whFlag={1}
      />
      <FilterItemsSelectionDrawer
        isOpen={!!groupConfigurationState.groupFilter?.filterLocalScope.isOpenItemSelectionDrawer}
        whFlag={1}
      />
      <InsightsPageLayout children={pageContent()} />
    </>
  );
};

export default WHDemandForecastingPage;
