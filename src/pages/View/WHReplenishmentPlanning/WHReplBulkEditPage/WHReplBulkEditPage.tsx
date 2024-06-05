import { Box, HStack, VStack } from '@chakra-ui/react';
import InsightsPageLayout from 'layouts/PageLayouts/InsightsPageLayout';
import { FC, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BulkEditHeader from './BulkEditHeader/BulkEditHeader';
import AppTab from 'components/newTheme/AppTab/AppTab';
import DownloadTab from './Tabs/DownloadTab/DownloadTab';
import UploadTab from './Tabs/UploadTab/UploadTab';
import FilterDrawer from 'pages/MonitoringResolution/PredictiveAlerts/CreateAlerts/AlertCreationSteps/AnchorLocationFilter/FilterDrawer/FilterDrawer';
import FilterItemsSelectionDrawer from 'pages/MonitoringResolution/PredictiveAlerts/CreateAlerts/AlertCreationSteps/AnchorLocationFilter/FilterItemsSelectionDrawer/FilterItemsSelectionDrawer';
import { filterHierarchyGenerator } from 'state/layout/stateHelpers/stH_Layout';
import {
  IGroupConfigurationSlice,
  groupConfigurationSliceSelector
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { useNavigate } from 'react-router-dom';
import {
  IRPLWhView,
  rplWHViewSliceSelector
} from 'state/pages/view/whReplenishmentView/whRplViewState';
import { IUser, userSliceSelector } from 'state/user/userState';

interface Props {}

const WHReplBulkEditPage: FC<Props> = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const groupConfigurationState: IGroupConfigurationSlice = useSelector(
    groupConfigurationSliceSelector
  );
  const viewForecastFilterHierarchy = filterHierarchyGenerator('viewForecast');
  const rplWhViewState: IRPLWhView = useSelector(rplWHViewSliceSelector);
  const uploadHistoryDataList = rplWhViewState.rplWhUploadedHistory;
  const isOpenFilterDrawer =
    groupConfigurationState.groupFilter?.filterLocalScope.isOpenFilterDrawer;
  const isOpenItemSelectionDrawer =
    groupConfigurationState.groupFilter?.filterLocalScope.isOpenItemSelectionDrawer;
  const userState: IUser = useSelector(userSliceSelector);
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;

  useEffect(() => {
    if (uploadHistoryDataList !== null) {
      navigate('/app/wh-replenishment');
    }
  }, [selectedOrgKey]);

  const onSelectTabHandler = (index: number) => {
    setSelectedTab(index);
  };

  const pageContent = useCallback(() => {
    const enabledAction = selectedTab === 1;
    return (
      <VStack w="full" px="20px" pt="20px" spacing="16px">
        <HStack h="36px" w="full">
          <BulkEditHeader enabledAction={enabledAction} />
        </HStack>
        <Box h="calc(100vh - 165px)" w="full" alignItems={'start'}>
          <AppTab
            tabs={[
              { label: 'Download', content: <DownloadTab /> },
              { label: 'Upload', content: <UploadTab /> }
            ]}
            selectedTab={selectedTab}
            onSelectTab={onSelectTabHandler}
            variant="primary"
          />
        </Box>
      </VStack>
    );
  }, [selectedTab]);

  return (
    <>
      <FilterDrawer isOpen={!!isOpenFilterDrawer} filterHierarchy={viewForecastFilterHierarchy} />
      <FilterItemsSelectionDrawer isOpen={!!isOpenItemSelectionDrawer} />
      <InsightsPageLayout children={pageContent()} />
    </>
  );
};

export default WHReplBulkEditPage;
