import { Box, HStack, VStack } from '@chakra-ui/react';
import InsightsPageLayout from 'layouts/PageLayouts/InsightsPageLayout';
import { FC, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BulkEditHeader from './BulkEditHeader/BulkEditHeader';
import AppTab from 'components/newTheme/AppTab/AppTab';
import DownloadTab from './Tabs/DownloadTab/DownloadTab';
import UploadTab from './Tabs/UploadTab/UploadTab';
import { filterHierarchyGenerator } from 'state/layout/stateHelpers/stH_Layout';
import {
  IGroupConfigurationSlice,
  groupConfigurationSliceSelector
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import {
  IGroupConfig,
  groupConfigSliceSelector
} from 'state/pages/shared/groupConfig/groupConfigState';
import { useNavigate } from 'react-router-dom';
import { IDFView, dfViewSliceSelector } from 'state/pages/view/demandForecastView/dfViewPageState';
import { IAlert, alertSliceSelector } from 'state/pages/monitoringAndResolution/Alert/alertState';
import { AlertTypeEnum } from 'state/pages/monitoringAndResolution/Alert/sagaHelpers/sgH_alert';
import {
  IRPLView,
  rplViewSliceSelector
} from 'state/pages/view/replenishmentView/rplViewPageState';

interface Props {}

const BulkEditAlertsPage: FC<Props> = () => {
  const navigate = useNavigate();
  const groupConfigurationState: IGroupConfigurationSlice = useSelector(
    groupConfigurationSliceSelector
  );
  const sharedGroupState: IGroupConfig = useSelector(groupConfigSliceSelector);
  const dfViewState: IDFView = useSelector(dfViewSliceSelector);
  const alertState: IAlert = useSelector(alertSliceSelector);
  const rplViewState: IRPLView = useSelector(rplViewSliceSelector);
  const selectedGroupKey = sharedGroupState.selectedGroupKey;
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const isOpenFilterDrawer =
    groupConfigurationState.groupFilter?.filterLocalScope.isOpenFilterDrawer;
  const isOpenItemSelectionDrawer =
    groupConfigurationState.groupFilter?.filterLocalScope.isOpenItemSelectionDrawer;

  const selectedAlertType = alertState.alertLocalScope.selectedAlertTypeObj.alertType;
  const rplUploadHistoryData = rplViewState.rplUploadedHistory?.list.data;

  const isForecastAlert =
    selectedAlertType === AlertTypeEnum.DE_GROWTH || selectedAlertType === AlertTypeEnum.GROWTH;
  const uploadHistoryDataList = isForecastAlert
    ? dfViewState.uploadedHistory
    : rplUploadHistoryData;

  // useEffect(() => {
  //   if (uploadHistoryDataList !== null) {
  //     navigate('/app/predictive-alerts');
  //   }
  // }, [selectedGroupKey, uploadHistoryDataList]);

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
      <InsightsPageLayout children={pageContent()} />
    </>
  );
};

export default BulkEditAlertsPage;
