import { Box, HStack, VStack } from '@chakra-ui/react';
import InsightsPageLayout from 'layouts/PageLayouts/InsightsPageLayout';
import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUser, userSliceSelector } from 'state/user/userState';
import {
  IAlert,
  alertSliceSelector,
  getAlertsRequest,
  resetSelectedSkuList,
  setAlertDefinitionPaginationPageNo,
  setAlertDefinitionSearchKey,
  updateSuccessStatus
} from 'state/pages/monitoringAndResolution/Alert/alertState';
import AlertCardTab from './AlertCardTab/AlertCardTab';
import ActionBar from './ActionBar/ActionBar';
import AlertDefinitionTable from './AlertDefinitionTable/AlertDefinitionTable';
import AlertDefinitionFooter from './AlertDefinitionFooter/AlertDefinitionFooter';
import { useNavigate } from 'react-router-dom';
import AlertDefinitionHeader from './AlertDefinitionHeader/AlertDefinitionHeader';
import FilterDrawer from '../../CreateAlerts/AlertCreationSteps/AnchorLocationFilter/FilterDrawer/FilterDrawer';
import {
  groupConfigurationSliceSelector,
  IGroupConfigurationSlice
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import FilterItemsSelectionDrawer from '../../CreateAlerts/AlertCreationSteps/AnchorLocationFilter/FilterItemsSelectionDrawer/FilterItemsSelectionDrawer';
import ViewAndEditForecast from './ViewAndEditForecast';
import TrainingSummaryPanel from './TrainingSummaryPannel/TrainingSummaryPanel';
import { resetFcAnalyzerData } from 'state/pages/view/forecastAnalyzer/forecastAnalyzerState';
import { AlertTableViewTypeEnum } from 'utils/enum';
import ViewAndEditReplenishment from './ViewAndEditReplenishment';

interface Props {}

const AlertDefinition: FC<Props> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState: IUser = useSelector(userSliceSelector);
  const alertState: IAlert = useSelector(alertSliceSelector);
  const groupConfigurationState: IGroupConfigurationSlice = useSelector(
    groupConfigurationSliceSelector
  );
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const alertSummaryList = alertState.alertSummaryList;
  const selectedAlertType = alertState.alertLocalScope?.selectedAlertTypeObj?.alertType;
  const shouldReloadAlertData = alertState.alertLocalScope?.shouldReloadAlertData;
  const filterAppliedIndicator = groupConfigurationState.groupFilter.filterAppliedIndicator;
  const [orgKey, setOrgKey] = useState<number>(selectedOrgKey);

  useEffect(() => {
    shouldReloadAlertData && dispatch(resetSelectedSkuList());
  }, [selectedAlertType, shouldReloadAlertData]);

  useEffect(() => {
    try {
      const abortController = new AbortController();
      if (selectedOrgKey) {
        if (selectedOrgKey !== orgKey || alertSummaryList.list?.length === 0)
          navigate('/app/predictive-alerts');

        if (alertSummaryList.list) {
          if (shouldReloadAlertData) {
            dispatch(resetFcAnalyzerData());
            dispatch(setAlertDefinitionSearchKey(''));
            dispatch(setAlertDefinitionPaginationPageNo(1));
            dispatch(getAlertsRequest({ alertOnly: 1 }));
          }
          dispatch(updateSuccessStatus(false));
        }

        setOrgKey(selectedOrgKey);
      }
      return () => {
        abortController.abort();
      };
    } catch (error) {
      console.error('', error);
    }
  }, [selectedOrgKey, shouldReloadAlertData]);

  useEffect(() => {
    if (alertSummaryList.list && shouldReloadAlertData) {
      dispatch(getAlertsRequest({ alertOnly: 1 }));
    }
  }, [filterAppliedIndicator, shouldReloadAlertData]);

  const alertDefinitionContent = useCallback(() => {
    return (
      <Box w="full" px="24px" pt="24px">
        <ViewAndEditForecast />
        <TrainingSummaryPanel />
        <ViewAndEditReplenishment />
        <HStack>
          <AlertDefinitionHeader />
        </HStack>
        <Box mt="20px" w="full" maxH="calc(100vh - 285px)">
          <VStack w="full" borderRadius="10px" userSelect="none" spacing="20px" pb="20px">
            <AlertCardTab />
            <ActionBar />
            <AlertDefinitionTable tableType={AlertTableViewTypeEnum.INDIVIDUAL} />
            <AlertDefinitionFooter />
          </VStack>
        </Box>
      </Box>
    );
  }, [selectedOrgKey, alertSummaryList]);

  return (
    <>
      <FilterDrawer
        isOpen={!!groupConfigurationState.groupFilter?.filterLocalScope.isOpenFilterDrawer}
        isGroupDisabled={true}
        isOnAlertPage
      />
      <FilterItemsSelectionDrawer
        isOpen={!!groupConfigurationState.groupFilter?.filterLocalScope.isOpenItemSelectionDrawer}
        isOnAlertPage
      />
      <InsightsPageLayout children={alertDefinitionContent()} />
    </>
  );
};

export default AlertDefinition;
