import { FC, useCallback, useEffect, useRef, useState } from 'react';
import TableauPage from './TableauPage/TableauPage';
import { useDispatch, useSelector } from 'react-redux';
import {
  IDashboard,
  dashboardSliceSelector,
  fetchTableauTokenRequest
} from 'state/pages/dashboard/dashboardState';
import { Box, Skeleton } from '@chakra-ui/react';
import { scrollbarYStyles } from 'theme/styles';
import { ocean_blue_700 } from 'theme/colors';
import { TableauViz } from '@tableau/embedding-api';
import AppNoDataAvailablePanel from 'components/newTheme/AppNoDataAvailablePanel/AppNoDataAvailablePanel';
import { UrlStateI } from './TableauForecastDashboardPage';
import {
  ISystemConfiguration,
  systemConfigurationSliceSelector
} from 'state/pages/systemConfiguration/systemConfigurationState';
import { ExternalUrlKeyEnum, TableauReportModuleEnum } from 'utils/enum';
import { getReportUrlValueByKey } from 'utils/utility';
import { IUser, userSliceSelector } from 'state/user/userState';

interface Props {}

const TableauInventoryDashboardPage: FC<Props> = () => {
  const dispatch = useDispatch();
  const dashboardState: IDashboard = useSelector(dashboardSliceSelector);
  const dynamicConfigState: ISystemConfiguration = useSelector(systemConfigurationSliceSelector);
  const userState: IUser = useSelector(userSliceSelector);
  const dynamicConfigData = dynamicConfigState.dynamicConfigData?.externalUrls!;
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const loadingRef = useRef<HTMLDivElement>(null);
  const noDataRef = useRef<HTMLDivElement>(null);
  const [tokenUpdated, setTokenUpdated] = useState<boolean>(false);
  const [urlState, setUrlState] = useState<UrlStateI>({
    baseUrl: '',
    path: ''
  });
  let tableauToken = dashboardState.tableauToken;
  const [newToken, setNewToken] = useState<string>(tableauToken || '');

  useEffect(() => {
    const inventoryAvailabilityUrl = dynamicConfigData?.[ExternalUrlKeyEnum.INVENTORY_AVAILABILITY];
    const tableauBaseUrl = dynamicConfigData?.[ExternalUrlKeyEnum.TABLEAU_BASE_URL];

    if (inventoryAvailabilityUrl && tableauBaseUrl) {
      setUrlState({
        baseUrl: getReportUrlValueByKey(dynamicConfigData, ExternalUrlKeyEnum.TABLEAU_BASE_URL),
        path: getReportUrlValueByKey(dynamicConfigData, ExternalUrlKeyEnum.INVENTORY_AVAILABILITY)
      });
    } else {
      setUrlState({
        baseUrl: '',
        path: ''
      });
    }
  }, [dynamicConfigData, selectedOrgKey]);

  useEffect(() => {
    if (noDataRef.current) noDataRef.current.style.display = 'none';
    if (dynamicConfigData?.inventoryAvailability) {
      const fetchData = async () => {
        await dispatch(
          fetchTableauTokenRequest({
            moduleKey: TableauReportModuleEnum.INVENTORY_AVAILABILITY
          })
        );
      };

      fetchData().then(() => {
        setNewToken(dashboardState.tableauToken!);
        setTokenUpdated(true);
      });
    }
  }, [dispatch, dynamicConfigData]);

  useEffect(() => {
    if (urlState.baseUrl === '' && urlState.path === '') {
      if (loadingRef.current) loadingRef.current.style.display = 'none';
      if (noDataRef.current) {
        noDataRef.current.style.display = 'none';
      }
    } else {
      if (loadingRef.current) loadingRef.current.style.display = 'block';
    }
  }, [urlState.baseUrl, urlState.path]);

  const onLoadComplete = (viz: TableauViz, isLoaded: boolean) => {
    if (loadingRef.current) loadingRef.current.style.display = 'none';
    if (noDataRef.current) {
      if (isLoaded) {
        noDataRef.current.style.display = 'none';
      } else {
        noDataRef.current.style.display = 'block';
      }
    }
  };

  const renderTableauPage = useCallback(() => {
    const tokenHasChanged = tokenUpdated && tableauToken && tableauToken !== newToken;
    if (tokenHasChanged && urlState.baseUrl !== '' && urlState.path !== '') {
      return (
        <TableauPage
          baseUrl={urlState.baseUrl}
          path={urlState.path}
          token={newToken}
          onLoadComplete={onLoadComplete}
        />
      );
    }
  }, [tokenUpdated, tableauToken, newToken, urlState.baseUrl, urlState.path]);

  return (
    <Box
      w="full"
      minH="calc(100vh - 75px)"
      p="20px"
      pos="relative"
      __css={scrollbarYStyles}
      overflow={'auto'}
    >
      <Box
        w="full"
        h="full"
        pos="absolute"
        top="0"
        left="0"
        zIndex={2}
        p="20px"
        bg={ocean_blue_700}
        ref={loadingRef}
      >
        <Skeleton w="full" h="full" borderRadius="8px" isLoaded={false} opacity={1} />
      </Box>
      <Box
        w="full"
        h="full"
        pos="absolute"
        top="0"
        left="0"
        zIndex={2}
        p="20px"
        bg={ocean_blue_700}
        ref={noDataRef}
      >
        <AppNoDataAvailablePanel />
      </Box>
      <Box position="relative" zIndex={1}>
        {urlState.baseUrl === '' && urlState.path === '' ? (
          <Box h="calc(100vh - 120px)" w="full">
            <AppNoDataAvailablePanel />
          </Box>
        ) : (
          renderTableauPage()
        )}
      </Box>
    </Box>
  );
};

export default TableauInventoryDashboardPage;
