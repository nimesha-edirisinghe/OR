import { HStack, VStack } from '@chakra-ui/react';
import InsightsPageLayout from 'layouts/PageLayouts/InsightsPageLayout';
import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  dfViewSliceSelector,
  getDemandForecastDataRequest,
  getDemandForecastSkuListRequest,
  resetUploadHistoryData,
  skuSearchAction,
  updateShouldReloadData
} from 'state/pages/view/demandForecastView/dfViewPageState';
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
import { resetFcAnalyzerData } from 'state/pages/view/forecastAnalyzer/forecastAnalyzerState';

interface Props {}
const viewForecastFilterHierarchy = filterHierarchyGenerator('viewForecast');

const DemandForecastViewPage: FC<Props> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState: IUser = useSelector(userSliceSelector);
  const dfViewState = useSelector(dfViewSliceSelector);
  const sharedGroupState: IGroupConfig = useSelector(groupConfigSliceSelector);
  const groupConfigurationState: IGroupConfigurationSlice = useSelector(
    groupConfigurationSliceSelector
  );
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const searchKey = dfViewState.dfViewLocalScope.skuSearchKey;
  const selectedGroupKey = sharedGroupState.selectedGroupKey;
  const skuListData = dfViewState.skuListData;

  const shouldReloadData = dfViewState.dfViewLocalScope.shouldReloadData;
  const [skuMaximized, setSkuMaximized] = useState<boolean>(false);
  const [newOrgKey, setNewOrgKey] = useState<number>();
  const [initialOrgKey, setInitialOrgKey] = useState<number>(selectedOrgKey);

  useEffect(() => {
    setNewOrgKey(selectedOrgKey);
    dispatch(resetFcAnalyzerData());
  }, []);

  useEffect(() => {
    setNewOrgKey(selectedOrgKey);
  }, [selectedOrgKey]);

  useEffect(() => {
    if (!selectedGroupKey && skuListData === null) {
      navigate('/app/demand-forecast');
    }
  }, [selectedGroupKey]);

  useEffect(() => {
    if (skuListData !== null && newOrgKey && initialOrgKey !== newOrgKey) {
      navigate('/app/demand-forecast');
    }
  }, [selectedOrgKey, newOrgKey]);

  useEffect(() => {
    if (shouldReloadData) {
      if (skuMaximized) {
        dispatch(getDemandForecastDataRequest({ searchKey }));
      } else {
      }
    }
  }, [skuMaximized, shouldReloadData]);

  useEffect(() => {
    try {
      const abortController = new AbortController();
      if (selectedOrgKey) {
        dispatch(getGroupListRequest({}));
        dispatch(resetUploadHistoryData());
        dispatch(
          getLabelsRequest({
            labelTypes: ['location', 'product', 'anchor', 'predictor', 'store', 'sku']
          })
        );
        if (shouldReloadData) dispatch(skuSearchAction(''));
      }
      return () => {
        abortController.abort();
      };
    } catch (error) {
      console.error('summary details fetching error ocurred', error);
    }
  }, [selectedOrgKey]);

  const maximizedHandler = () => {
    dispatch(updateShouldReloadData(true));
    setSkuMaximized((prev) => !prev);
  };

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
        showWarning
      />
      <FilterItemsSelectionDrawer
        isOpen={!!groupConfigurationState.groupFilter?.filterLocalScope.isOpenItemSelectionDrawer}
      />
      <InsightsPageLayout children={pageContent()} />
    </>
  );
};

export default DemandForecastViewPage;
