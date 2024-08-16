import { Box } from '@chakra-ui/react';
import AppNoDataAvailablePanel from 'components/newTheme/AppNoDataAvailablePanel/AppNoDataAvailablePanel';
import { UrlStateI } from 'pages/Dashboard/TableauForecastDashboardPage';
import VLPage from 'pages/VL/VLPage/VLPage';
import { FC, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  ISystemConfiguration,
  systemConfigurationSliceSelector
} from 'state/pages/systemConfiguration/systemConfigurationState';
import { IUser, userSliceSelector } from 'state/user/userState';
import { ExternalUrlKeyEnum } from 'utils/enum';
import { getReportUrlValueByKey } from 'utils/utility';

interface Props {}

const ReplenishmentSummaryPage: FC<Props> = () => {
  const dynamicConfigState: ISystemConfiguration = useSelector(systemConfigurationSliceSelector);
  const userState: IUser = useSelector(userSliceSelector);
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const dynamicConfigData = dynamicConfigState.dynamicConfigData?.externalUrls!;
  const [urlState, setUrlState] = useState<UrlStateI>({
    baseUrl: '',
    path: ''
  });

  useEffect(() => {
    if (dynamicConfigData) {
      setUrlState({
        baseUrl: getReportUrlValueByKey(dynamicConfigData, ExternalUrlKeyEnum.VL_BASE_URL),
        path: getReportUrlValueByKey(dynamicConfigData, ExternalUrlKeyEnum.REPLENISHMENT_SUMMARY)
      });
    } else {
      setUrlState({
        baseUrl: '',
        path: ''
      });
    }
  }, [dynamicConfigData, selectedOrgKey]);

  const renderVLPage = useCallback(() => {
    if (urlState.baseUrl !== '' && urlState.path !== '') {
      return <VLPage path={urlState.path} baseUrl={urlState.baseUrl}></VLPage>;
    } else {
      return (
        <Box h="calc(100vh - 65px)" w="full" p="20px">
          <AppNoDataAvailablePanel />
        </Box>
      );
    }
  }, [urlState.baseUrl, urlState.path]);

  return <>{renderVLPage()}</>;
};

export default ReplenishmentSummaryPage;
