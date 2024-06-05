import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  IPromotionSummaryView,
  promotionSummaryViewSliceSelector
} from 'state/pages/monitoringAndResolution/promotionSummaryView/promotionSummaryViewState';
import { IUser, userSliceSelector } from 'state/user/userState';
import {
  getGroupListRequest,
  groupConfigSliceSelector,
  IGroupConfig
} from 'state/pages/shared/groupConfig/groupConfigState';
import {
  getLabelsRequest,
  groupConfigurationSliceSelector,
  IGroupConfigurationSlice
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { setPromotionSummarySearchKey } from 'state/pages/monitoringAndResolution/promotionSummaryView/promotionSummaryViewState';
import FilterDrawer from 'pages/MonitoringResolution/PredictiveAlerts/CreateAlerts/AlertCreationSteps/AnchorLocationFilter/FilterDrawer/FilterDrawer';
import FilterItemsSelectionDrawer from 'pages/MonitoringResolution/PredictiveAlerts/CreateAlerts/AlertCreationSteps/AnchorLocationFilter/FilterItemsSelectionDrawer/FilterItemsSelectionDrawer';
import InsightsPageLayout from 'layouts/PageLayouts/InsightsPageLayout';
import { HStack, VStack } from '@chakra-ui/react';
import PromotionSummaryViewHeader from './PromotionSummaryViewHeader/PromotionSummaryViewHeader';
import { ocean_blue_600 } from 'theme/colors';
import PromotionSummaryViewTableSection from './PromotionSummaryViewTableSection/PromotionSummaryViewTableSection';

interface Props {}

const PromotionSummaryViewPage: FC<Props> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState: IUser = useSelector(userSliceSelector);
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const promotionSummaryViewState: IPromotionSummaryView = useSelector(
    promotionSummaryViewSliceSelector
  );
  const skuListData = promotionSummaryViewState.skuListData;
  const groupConfigurationState: IGroupConfigurationSlice = useSelector(
    groupConfigurationSliceSelector
  );
  const sharedGroupState: IGroupConfig = useSelector(groupConfigSliceSelector);
  const selectedGroupKey = sharedGroupState.selectedGroupKey;

  useEffect(() => {
    if (!selectedGroupKey) {
      navigate('/app/promotion-summary');
    }
  }, [selectedGroupKey]);

  useEffect(() => {
    if (skuListData !== null) {
      navigate('/app/promotion-summary');
    }
  }, [selectedOrgKey]);

  useEffect(() => {
    try {
      const abortController = new AbortController();
      if (selectedOrgKey) {
        dispatch(getGroupListRequest({}));
        dispatch(
          getLabelsRequest({
            labelTypes: ['location', 'product', 'anchor', 'store', 'sku']
          })
        );
        dispatch(setPromotionSummarySearchKey(''));
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
        <HStack h="36px" w="full">
          <PromotionSummaryViewHeader />
        </HStack>
        <HStack borderRadius="8px" h="calc(100vh - 165px)" w="full" p="12px" bg={ocean_blue_600}>
          <PromotionSummaryViewTableSection />
        </HStack>
      </VStack>
    );
  }, [selectedOrgKey, sharedGroupState]);

  return (
    <>
      <FilterDrawer
        isOpen={!!groupConfigurationState.groupFilter?.filterLocalScope.isOpenFilterDrawer}
        showWarning={false}
      />
      <FilterItemsSelectionDrawer
        isOpen={!!groupConfigurationState.groupFilter?.filterLocalScope.isOpenItemSelectionDrawer}
      />
      <InsightsPageLayout children={pageContent()} />
    </>
  );
};
export default PromotionSummaryViewPage;
