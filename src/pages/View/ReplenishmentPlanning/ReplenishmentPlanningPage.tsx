import { VStack } from '@chakra-ui/react';
import InsightsPageLayout from 'layouts/PageLayouts/InsightsPageLayout';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUser, userSliceSelector } from 'state/user/userState';
import {
  getGroupListRequest,
  groupConfigSliceSelector,
  IGroupConfig,
  selectGroupKey
} from 'state/pages/shared/groupConfig/groupConfigState';
import {
  IGroupConfigurationSlice,
  getLabelsRequest,
  groupConfigurationSliceSelector,
  resetGroupFilter
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';

import {
  rplResetSkuExpandedListData,
  rplResetSkuListData,
  rplSkuSearchAction
} from 'state/pages/view/replenishmentView/rplViewPageState';
import FilterPage from './ReplenishmentMainSection/FilterPage/FilterPage';
import { filterHierarchyGenerator } from 'state/layout/stateHelpers/stH_Layout';
import FilterDrawer from 'pages/MonitoringResolution/PredictiveAlerts/CreateAlerts/AlertCreationSteps/AnchorLocationFilter/FilterDrawer/FilterDrawer';
import FilterItemsSelectionDrawer from 'pages/MonitoringResolution/PredictiveAlerts/CreateAlerts/AlertCreationSteps/AnchorLocationFilter/FilterItemsSelectionDrawer/FilterItemsSelectionDrawer';

interface Props {}

const ReplenishmentPlanningPage: FC<Props> = () => {
  const userState: IUser = useSelector(userSliceSelector);

  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const dispatch = useDispatch();

  const sharedGroupState: IGroupConfig = useSelector(groupConfigSliceSelector);
  const groupConfigurationState: IGroupConfigurationSlice = useSelector(
    groupConfigurationSliceSelector
  );
  const viewReplenishmentFilterHierarchy = filterHierarchyGenerator('viewReplenishment');

  useEffect(() => {
    dispatch(rplResetSkuListData());
    dispatch(rplResetSkuExpandedListData());
  });

  useEffect(() => {
    try {
      const abortController = new AbortController();
      if (selectedOrgKey) {
        dispatch(selectGroupKey(null));
        dispatch(resetGroupFilter());
        dispatch(getGroupListRequest({ whFlag: 0 }));
        dispatch(
          getLabelsRequest({
            labelTypes: ['location', 'product', 'anchor', 'predictor', 'store', 'vendor', 'sku']
          })
        );
        dispatch(rplSkuSearchAction(''));
      }
      return () => {
        abortController.abort();
      };
    } catch (error) {
      console.error('summary details fetching error ', error);
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
        filterHierarchy={viewReplenishmentFilterHierarchy}
        showWarning
      />
      <FilterItemsSelectionDrawer
        isOpen={!!groupConfigurationState.groupFilter?.filterLocalScope.isOpenItemSelectionDrawer}
      />
      <InsightsPageLayout children={pageContent()} />
    </>
  );
};

export default ReplenishmentPlanningPage;
