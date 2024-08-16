import { VStack } from '@chakra-ui/react';
import InsightsPageLayout from 'layouts/PageLayouts/InsightsPageLayout';
import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUser, userSliceSelector } from 'state/user/userState';
import {
  getGroupListRequest,
  groupConfigSliceSelector,
  IGroupConfig
} from 'state/pages/shared/groupConfig/groupConfigState';
import FilterDrawer from 'pages/MonitoringResolution/PredictiveAlerts/CreateAlerts/AlertCreationSteps/AnchorLocationFilter/FilterDrawer/FilterDrawer';
import FilterItemsSelectionDrawer from 'pages/MonitoringResolution/PredictiveAlerts/CreateAlerts/AlertCreationSteps/AnchorLocationFilter/FilterItemsSelectionDrawer/FilterItemsSelectionDrawer';
import {
  getLabelsRequest,
  groupConfigurationSliceSelector,
  IGroupConfigurationSlice
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { filterHierarchyGenerator } from 'state/layout/stateHelpers/stH_Layout';
import {
  IRPLView,
  rplResetUploadHistoryData,
  rplSkuSearchAction,
  rplViewSliceSelector
} from 'state/pages/view/replenishmentView/rplViewPageState';
import ReplenishmentMainSection from '../ReplenishmentMainSection/ReplenishmentMainSection';
import { useNavigate } from 'react-router-dom';

interface Props {}

const ReplenishmentViewPage: FC<Props> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState: IUser = useSelector(userSliceSelector);
  const rplViewState: IRPLView = useSelector(rplViewSliceSelector);
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const groupConfigurationState: IGroupConfigurationSlice = useSelector(
    groupConfigurationSliceSelector
  );
  const sharedGroupState: IGroupConfig = useSelector(groupConfigSliceSelector);
  const viewReplenishmentFilterHierarchy = filterHierarchyGenerator('viewReplenishment');
  const isLoadData = rplViewState.isLoadData;

  useEffect(() => {
    try {
      const abortController = new AbortController();
      if (selectedOrgKey) {
        dispatch(rplResetUploadHistoryData());
        if (isLoadData) {
          dispatch(rplSkuSearchAction(''));
        }
        dispatch(getGroupListRequest({ whFlag: 0 }));
        dispatch(
          getLabelsRequest({
            labelTypes: ['location', 'product', 'anchor', 'predictor', 'store', 'vendor', 'sku']
          })
        );
      } else {
        navigate('/app/replenishment-planning');
      }
      return () => {
        abortController.abort();
      };
    } catch (error) {
      console.error('summary details fetching error ', error);
    }
  }, [selectedOrgKey, isLoadData]);

  const pageContent = useCallback(() => {
    return (
      <VStack w="full" px="20px" pt="20px" spacing="16px">
        <ReplenishmentMainSection
          filterLabelTypes={[
            'location',
            'product',
            'anchor',
            'predictor',
            'store',
            'vendor',
            'sku'
          ]}
        />
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

export default ReplenishmentViewPage;
