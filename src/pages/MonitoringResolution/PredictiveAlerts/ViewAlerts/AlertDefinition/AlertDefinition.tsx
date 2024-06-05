import { Box, HStack, VStack } from '@chakra-ui/react';
import InsightsPageLayout from 'layouts/PageLayouts/InsightsPageLayout';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUser, userSliceSelector } from 'state/user/userState';
import {
  IAlert,
  alertSliceSelector,
  getAlertsRequest,
  resetSelectedSkuList,
  setAlertDefinitionPaginationPageNo,
  setAlertDefinitionSearchKey
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
  const userState: IUser = useSelector(userSliceSelector);
  const alertState: IAlert = useSelector(alertSliceSelector);
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const alertSummaryList = alertState.alertSummaryList;
  const selectedAlertType = alertState.alertLocalScope?.selectedAlertTypeObj?.alertType;

  const groupConfigurationState: IGroupConfigurationSlice = useSelector(
    groupConfigurationSliceSelector
  );
  const filterAppliedIndicator = groupConfigurationState.groupFilter.filterAppliedIndicator;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetSelectedSkuList());
  }, [selectedAlertType]);

  useEffect(() => {
    try {
      const abortController = new AbortController();
      if (selectedOrgKey) {
        if (alertSummaryList.list) {
          dispatch(resetFcAnalyzerData());
          dispatch(setAlertDefinitionSearchKey(''));
          dispatch(setAlertDefinitionPaginationPageNo(1));
          dispatch(getAlertsRequest({ alertOnly: 1 }));
        } else {
          navigate('/app/predictive-alerts');
        }
      }
      return () => {
        abortController.abort();
      };
    } catch (error) {
      console.error('', error);
    }
  }, [selectedOrgKey]);

  useEffect(() => {
    if (alertSummaryList.list) {
      dispatch(getAlertsRequest({ alertOnly: 1 }));
    }
  }, [filterAppliedIndicator]);

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
          <VStack w="full" borderRadius="10px" userSelect="none" spacing="20px" pb={'10px'}>
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
      />
      <FilterItemsSelectionDrawer
        isOpen={!!groupConfigurationState.groupFilter?.filterLocalScope.isOpenItemSelectionDrawer}
      />
      <InsightsPageLayout children={alertDefinitionContent()} />
    </>
  );
};

export default AlertDefinition;
