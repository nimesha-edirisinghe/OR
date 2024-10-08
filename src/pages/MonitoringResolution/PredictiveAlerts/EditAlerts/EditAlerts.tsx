import { VStack } from '@chakra-ui/react';
import InsightsPageLayout from 'layouts/PageLayouts/InsightsPageLayout';
import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUser, userSliceSelector } from 'state/user/userState';
import {
  IAlert,
  alertSliceSelector,
  getAlertDefinitionRequest,
  clearAlertErrorsMessages
} from 'state/pages/monitoringAndResolution/Alert/alertState';
import EditAlertMainSection from './EditAlertMainSection/EditAlertMainSection';
import EditAlertFooterSection from './EditAlertFooterSection/EditAlertFooterSection';
import EditAlertHeader from './EditAlertHeader/EditAlertHeader';
import { useNavigate } from 'react-router-dom';

interface Props {}

const EditAlerts: FC<Props> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState: IUser = useSelector(userSliceSelector);
  const alertState: IAlert = useSelector(alertSliceSelector);
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const selectedViewAlertObj = alertState.alertLocalScope.selectedViewAlertObj;
  const [orgKey, setOrgKey] = useState<number>(selectedOrgKey);

  useEffect(() => {
    try {
      const abortController = new AbortController();
      if (!selectedViewAlertObj) {
        navigate('/app/predictive-alerts');
      }
      if (selectedOrgKey) {
        if (selectedOrgKey !== orgKey) navigate('/app/predictive-alerts');
        else {
          dispatch(getAlertDefinitionRequest());
          dispatch(clearAlertErrorsMessages(null));
          setOrgKey(selectedOrgKey);
        }
      }
      return () => {
        abortController.abort();
      };
    } catch (error) {
      console.error('', error);
    }
  }, [selectedOrgKey]);

  const editAlertsPageContent = useCallback(() => {
    return (
      <VStack w="full" p="20px" overflow="hidden" userSelect="none">
        <EditAlertHeader />
        <EditAlertMainSection />
        <EditAlertFooterSection />
      </VStack>
    );
  }, [selectedOrgKey]);

  return (
    <>
      <InsightsPageLayout children={editAlertsPageContent()} />
    </>
  );
};

export default EditAlerts;
