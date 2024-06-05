import { HStack, VStack } from '@chakra-ui/react';
import InsightsPageLayout from 'layouts/PageLayouts/InsightsPageLayout';
import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IWhDFView,
  getDemandForecastDataRequest,
  getDemandForecastSkuListRequest,
  skuSearchAction,
  updateShouldReloadData,
  whDfViewSliceSelector
} from 'state/pages/view/whDemandForecastView/whDfViewPageState';
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
import MainSection from '../MainSection/MainSection';
import { useNavigate } from 'react-router-dom';

interface Props {}
const viewForecastFilterHierarchy = filterHierarchyGenerator('viewWhForecast');

const WHDemandForecastViewPage: FC<Props> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [skuMaximized, setSkuMaximized] = useState<boolean>(false);
  const userState: IUser = useSelector(userSliceSelector);
  const dfWhViewState: IWhDFView = useSelector(whDfViewSliceSelector);
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const groupConfigurationState: IGroupConfigurationSlice = useSelector(
    groupConfigurationSliceSelector
  );
  const sharedGroupState: IGroupConfig = useSelector(groupConfigSliceSelector);
  const searchKey = dfWhViewState.dfViewLocalScope.skuSearchKey;
  const selectedGroupKey = sharedGroupState.selectedGroupKey;
  const skuListData = dfWhViewState.skuListData;
  const shouldReloadData = dfWhViewState.dfViewLocalScope.shouldReloadData;
  const [initialOrgKey, setInitialOrgKey] = useState<number>(selectedOrgKey);
  const [newOrgKey, setNewOrgKey] = useState<number>();

  useEffect(() => {
    setNewOrgKey(selectedOrgKey);
  }, [selectedOrgKey]);

  useEffect(() => {
    if (!selectedGroupKey && skuListData === null) {
      navigate('/app/wh-forecast');
    }
  }, [selectedGroupKey]);

  useEffect(() => {
    if (skuListData !== null && newOrgKey && initialOrgKey !== newOrgKey) {
      navigate('/app/wh-forecast');
    }
  }, [selectedOrgKey, newOrgKey]);

  const maximizedHandler = () => {
    dispatch(updateShouldReloadData(true));
    setSkuMaximized((prev) => !prev);
  };

  useEffect(() => {
    if (shouldReloadData) {
      if (!skuMaximized) {
        dispatch(getDemandForecastSkuListRequest({ searchKey }));
      } else {
        dispatch(getDemandForecastDataRequest({ searchKey }));
      }
    }
  }, [skuMaximized, shouldReloadData]);

  useEffect(() => {
    try {
      const abortController = new AbortController();
      if (selectedOrgKey) {
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
        <HStack h="calc(100vh - 115px)" w="full">
          <MainSection skuMaximized={skuMaximized} maximizedHandler={maximizedHandler} />
        </HStack>
      </VStack>
    );
  }, [selectedOrgKey, sharedGroupState, skuMaximized]);

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

export default WHDemandForecastViewPage;
