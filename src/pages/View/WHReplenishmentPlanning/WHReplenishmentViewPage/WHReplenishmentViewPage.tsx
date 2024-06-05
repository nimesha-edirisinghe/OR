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
  IRPLWhView,
  rplWHViewSliceSelector,
  whRplResetUploadHistoryData,
  whRplSkuSearchAction
} from 'state/pages/view/whReplenishmentView/whRplViewState';
import WHReplenishmentMainSection from '../WHReplenishmentMainSection/WHReplenishmentMainSection';
import { useNavigate } from 'react-router-dom';

interface Props {}

const WHReplenishmentViewPage: FC<Props> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState: IUser = useSelector(userSliceSelector);
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const groupConfigurationState: IGroupConfigurationSlice = useSelector(
    groupConfigurationSliceSelector
  );
  const sharedGroupState: IGroupConfig = useSelector(groupConfigSliceSelector);
  const viewReplenishmentFilterHierarchy = filterHierarchyGenerator('viewWhReplenishment');
  
  const rplWhViewState: IRPLWhView = useSelector(rplWHViewSliceSelector);
  const isLoadWhData = rplWhViewState.isLoadWhData;

  useEffect(() => {
    try {
      const abortController = new AbortController();
      if (selectedOrgKey) {
        dispatch(whRplResetUploadHistoryData());
        if (isLoadWhData){
          dispatch(whRplSkuSearchAction(''));
        }
        dispatch(getGroupListRequest({ whFlag: 1 }));
        dispatch(
          getLabelsRequest({
            labelTypes: ['location', 'product', 'anchor', 'predictor', 'store', 'vendor', 'sku']
          })
        );
      } else {
        navigate('/app/wh-replenishment');
      }
      return () => {
        abortController.abort();
      };
    } catch (error) {
      console.error('summary details fetching error ', error);
    }
  }, [selectedOrgKey, isLoadWhData]);

  const viewWhRplPageContent = useCallback(() => {
    return (
      <VStack w="full" px="20px" pt="20px" spacing="16px">
        <WHReplenishmentMainSection
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
        whFlag={1}
      />
      <FilterItemsSelectionDrawer
        isOpen={!!groupConfigurationState.groupFilter?.filterLocalScope.isOpenItemSelectionDrawer}
        whFlag={1}
      />
      <InsightsPageLayout children={viewWhRplPageContent()} />
    </>
  );
};

export default WHReplenishmentViewPage;
