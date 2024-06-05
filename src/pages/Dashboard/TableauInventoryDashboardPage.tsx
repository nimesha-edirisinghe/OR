import { FC, useCallback, useEffect, useRef, useState } from 'react';
import TableauPage from './TableauPage/TableauPage';
import { useDispatch, useSelector } from 'react-redux';
import {
  IDashboard,
  dashboardSliceSelector,
  fetchTableauTokenRequest
} from 'state/pages/dashboard/dashboardState';
import { REACT_APP_TABLEAU_DASHBOARD_INVENTORY_URL } from 'config/constants';
import { Box, Skeleton } from '@chakra-ui/react';
import { scrollbarYStyles } from 'theme/styles';
import { ocean_blue_700 } from 'theme/colors';
import { TableauViz } from '@tableau/embedding-api';
import AppNoDataAvailablePanel from 'components/newTheme/AppNoDataAvailablePanel/AppNoDataAvailablePanel';

interface Props {}

const TableauInventoryDashboardPage: FC<Props> = () => {
  const dispatch = useDispatch();
  const dashboardState: IDashboard = useSelector(dashboardSliceSelector);
  let tableauToken = dashboardState.tableauToken;
  const loadingRef = useRef<HTMLDivElement>(null);
  const noDataRef = useRef<HTMLDivElement>(null);
  const [tokenUpdated, setTokenUpdated] = useState<boolean>(false);
  const [newToken, setNewToken] = useState<string>(tableauToken || '');

  useEffect(() => {
    if (noDataRef.current) noDataRef.current.style.display = 'none';
    const fetchData = async () => {
      await dispatch(fetchTableauTokenRequest());
    };

    fetchData().then(() => {
      setNewToken(dashboardState.tableauToken!);
      setTokenUpdated(true);
    });
  }, []);

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
    if (tokenHasChanged) {
      return (
        <TableauPage
          path={REACT_APP_TABLEAU_DASHBOARD_INVENTORY_URL}
          token={newToken}
          onLoadComplete={onLoadComplete}
        />
      );
    }
  }, [tokenUpdated, tableauToken, newToken]);

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
        {renderTableauPage()}
      </Box>
    </Box>
  );
};

export default TableauInventoryDashboardPage;
