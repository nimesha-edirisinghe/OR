import { FC, useCallback, useEffect } from 'react';
import InsightsPageLayout from 'layouts/PageLayouts/InsightsPageLayout';
import { VStack } from '@chakra-ui/react';
import FilterDrawer from 'pages/MonitoringResolution/PredictiveAlerts/CreateAlerts/AlertCreationSteps/AnchorLocationFilter/FilterDrawer/FilterDrawer';
import {
  getLabelsRequest,
  groupConfigurationSliceSelector,
  IGroupConfigurationSlice,
  resetGroupFilter
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { useDispatch, useSelector } from 'react-redux';
import FilterItemsSelectionDrawer from 'pages/MonitoringResolution/PredictiveAlerts/CreateAlerts/AlertCreationSteps/AnchorLocationFilter/FilterItemsSelectionDrawer/FilterItemsSelectionDrawer';
import { IUser, userSliceSelector } from 'state/user/userState';
import {
  resetPromotionSummaryData,
  setPromotionSummarySearchKey
} from 'state/pages/monitoringAndResolution/promotionSummaryView/promotionSummaryViewState';
import {
  IGroupConfig,
  getGroupListRequest,
  groupConfigSliceSelector,
  selectGroupKey
} from 'state/pages/shared/groupConfig/groupConfigState';
import PromotionSummaryViewFilterPage from './PromotionSummaryViewFilterPage/PromotionSummaryViewFilterPage';

interface Props {}

const PromotionSummaryView: FC<Props> = () => {
  const userState: IUser = useSelector(userSliceSelector);
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const groupConfigurationState: IGroupConfigurationSlice = useSelector(
    groupConfigurationSliceSelector
  );
  const sharedGroupState: IGroupConfig = useSelector(groupConfigSliceSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetPromotionSummaryData());
  });

  useEffect(() => {
    try {
      const abortController = new AbortController();
      if (selectedOrgKey) {
        dispatch(selectGroupKey(null));
        dispatch(resetGroupFilter());
        dispatch(getGroupListRequest({}));
        dispatch(
          getLabelsRequest({
            labelTypes: ['location', 'product', 'anchor', 'predictor', 'store', 'sku']
          })
        );
        dispatch(setPromotionSummarySearchKey(''));
        dispatch(resetPromotionSummaryData());
      }
      return () => {
        abortController.abort();
      };
    } catch (error) {
      console.error('summary details fetching error ocurred', error);
    }
  }, [selectedOrgKey]);

  const viewSummaryPageContent = useCallback(() => {
    return (
      <VStack w="full" px="20px" pt="20px" spacing="16px">
        <PromotionSummaryViewFilterPage />
      </VStack>
    );
  }, [selectedOrgKey, sharedGroupState]);

  return (
    <>
      <FilterDrawer
        isOpen={!!groupConfigurationState.groupFilter?.filterLocalScope.isOpenFilterDrawer}
      />
      <FilterItemsSelectionDrawer
        isOpen={!!groupConfigurationState.groupFilter?.filterLocalScope.isOpenItemSelectionDrawer}
      />
      <InsightsPageLayout children={viewSummaryPageContent()} />
    </>
  );
};

export default PromotionSummaryView;
