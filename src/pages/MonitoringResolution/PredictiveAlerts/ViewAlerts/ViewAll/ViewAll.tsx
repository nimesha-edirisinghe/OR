import { Box, HStack, VStack } from '@chakra-ui/react';
import InsightsPageLayout from 'layouts/PageLayouts/InsightsPageLayout';
import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUser, userSliceSelector } from 'state/user/userState';
import {
  IAlert,
  alertSliceSelector,
  getAlertsRequest,
  setAlertDefinitionPaginationPageNo,
  setAlertDefinitionSearchKey
} from 'state/pages/monitoringAndResolution/Alert/alertState';
import { useNavigate } from 'react-router-dom';
import ViewAllHeader from './ViewAllHeader/ViewAllHeader';
import ViewAllActionBar from './ViewAllActionBar/ViewAllActionBar';
import ViewAllFooter from './ViewAllFooter/ViewAllFooter';
import AlertDefinitionTable from '../AlertDefinition/AlertDefinitionTable/AlertDefinitionTable';
import { defaultAlertTypeList } from 'state/pages/monitoringAndResolution/Alert/stateHelpers/stH_alert';
import FilterDrawer from '../../CreateAlerts/AlertCreationSteps/AnchorLocationFilter/FilterDrawer/FilterDrawer';
import FilterItemsSelectionDrawer from '../../CreateAlerts/AlertCreationSteps/AnchorLocationFilter/FilterItemsSelectionDrawer/FilterItemsSelectionDrawer';
import {
  groupConfigurationSliceSelector,
  IGroupConfigurationSlice
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { AlertTableViewTypeEnum } from 'utils/enum';

interface Props {}

const ViewAll: FC<Props> = () => {
  const userState: IUser = useSelector(userSliceSelector);
  const alertState: IAlert = useSelector(alertSliceSelector);
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const alertSummaryList = alertState.alertSummaryList;
  const groupConfigurationState: IGroupConfigurationSlice = useSelector(
    groupConfigurationSliceSelector
  );
  const filterAppliedIndicator = groupConfigurationState.groupFilter.filterAppliedIndicator;
  const [orgKey, setOrgKey] = useState<number>(selectedOrgKey);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const abortController = new AbortController();
      if (selectedOrgKey) {
        if (selectedOrgKey !== orgKey || alertSummaryList.list?.length === 0)
          navigate('/app/predictive-alerts');
        else {
          if (alertSummaryList.list) {
            dispatch(setAlertDefinitionSearchKey(''));
            dispatch(setAlertDefinitionPaginationPageNo(1));
            dispatch(getAlertsRequest({ alertOnly: 0 }));
          } else {
            navigate('/app/predictive-alerts');
          }
        }
        setOrgKey(selectedOrgKey);
      }
      return () => {
        abortController.abort();
      };
    } catch (error) {
      console.error('', error);
    }
  }, [selectedOrgKey, filterAppliedIndicator]);

  const getAlertNameByType = () => {
    const selectedAlertType = alertState.alertLocalScope.selectedAlertTypeObj.alertType;
    const alertName = defaultAlertTypeList.find((obj) => obj.type === selectedAlertType)?.name;
    return alertName;
  };

  const selectedAlertName = getAlertNameByType();

  const viewAllContent = useCallback(() => {
    return (
      <Box w="full" px="24px" pt="24px">
        <HStack>
          <ViewAllHeader />
        </HStack>
        <Box mt="20px" w="full">
          <VStack w="full" borderRadius="10px" userSelect="none" spacing="20px" pb={'10px'}>
            <ViewAllActionBar initialAlertName={selectedAlertName} />
            <AlertDefinitionTable
              enableAlertDetection
              tableType={AlertTableViewTypeEnum.VIEW_ALL}
            />
            <ViewAllFooter />
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
      <InsightsPageLayout children={viewAllContent()} />
    </>
  );
};

export default ViewAll;
