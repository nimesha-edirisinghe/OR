import { Box, HStack, Skeleton, Stack } from '@chakra-ui/react';
import InsightsPageLayout from 'layouts/PageLayouts/InsightsPageLayout';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUser, userSliceSelector } from 'state/user/userState';
import WelcomeAlertPanel from './WelcomeAlertPanel/WelcomeAlertPanel';
import AlertRow from './AlertRow/AlertRow';
import { scrollbarYStyles } from 'theme/styles';
import {
  IAlert,
  alertSliceSelector,
  getAlertConfigsRequest
} from 'state/pages/monitoringAndResolution/Alert/alertState';
import ViewAlertHeader from './ViewAlertHeader/ViewAlertHeader';
import { selectGroupKey } from 'state/pages/shared/groupConfig/groupConfigState';
import { resetGroupFilter } from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';

interface Props {}

const ViewAlerts: FC<Props> = () => {
  const userState: IUser = useSelector(userSliceSelector);
  const alertState: IAlert = useSelector(alertSliceSelector);
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const alertSummaryList = alertState.alertSummaryList;
  const isInitialAlertSummaryRequest = alertState.alertLocalScope.isInitialAlertSummaryRequest;

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const abortController = new AbortController();
      if (selectedOrgKey) {
        dispatch(selectGroupKey(null));
        dispatch(resetGroupFilter());
        dispatch(getAlertConfigsRequest({ initRequest: true }));
      }
      return () => {
        abortController.abort();
      };
    } catch (error) {
      console.error('', error);
    }
  }, [selectedOrgKey]);

  const activityLogPageContent = useCallback(() => {
    return (
      <Box w="full" px="24px" pt="24px" overflow="hidden">
        {isInitialAlertSummaryRequest && alertSummaryList.totalCount === 0 ? (
          <Box mt="28px">
            <WelcomeAlertPanel />
          </Box>
        ) : (
          <>
            <HStack>
              <ViewAlertHeader />
            </HStack>
            {alertState.loading.data ? (
              <Stack minH="calc(100vh - 180px)" mt="20px" spacing="20px">
                <Skeleton height="160px" borderRadius="8px" />
                <Skeleton height="160px" borderRadius="8px" />
                <Skeleton height="160px" borderRadius="8px" />
              </Stack>
            ) : (
              alertSummaryList.list && (
                <Box
                  mt="20px"
                  w="full"
                  h="calc(100vh - 180px)"
                  overflowX="hidden"
                  overflowY="auto"
                  __css={scrollbarYStyles}
                >
                  {alertSummaryList?.list?.map((alert) => (
                    <AlertRow alertData={alert} key={alert.alertKey} />
                  ))}
                </Box>
              )
            )}
          </>
        )}
      </Box>
    );
  }, [selectedOrgKey, alertSummaryList, alertState.loading.data]);

  return (
    <>
      <InsightsPageLayout children={activityLogPageContent()} />
    </>
  );
};

export default ViewAlerts;
