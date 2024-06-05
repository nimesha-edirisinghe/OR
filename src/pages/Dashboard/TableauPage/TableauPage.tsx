import { FC, useCallback, useMemo } from 'react';
import { Center } from '@chakra-ui/react';
import InsightsPageLayout from 'layouts/PageLayouts/InsightsPageLayout';
import { DeviceType, TableauViz, Toolbar } from '@tableau/embedding-api';
import { REACT_APP_TABLEAU_DASHBOARD_BASE_URL } from 'config/constants';
import { scrollbarYStyles } from 'theme/styles';
import TableauComponent from 'components/tableau/TableauComponent';
import { IDashboard, dashboardSliceSelector } from 'state/pages/dashboard/dashboardState';
import { useSelector } from 'react-redux';

interface Props {
  path?: string;
  token?: string | null;
  onLoadComplete?: (viz: TableauViz, isLoaded: boolean) => void;
}

const TableauPage: FC<Props> = ({ path, token, onLoadComplete }) => {
  const dashboardState: IDashboard = useSelector(dashboardSliceSelector);
  let tableauToken = dashboardState.tableauToken;

  const url = useMemo(() => {
    if (tableauToken && path) {
      return `${REACT_APP_TABLEAU_DASHBOARD_BASE_URL}/${tableauToken}/t/MADEV/views/${path}`;
    }
    return '';
  }, [tableauToken, path]);

  const pageContent = useCallback(() => {
    if (url) {
      return (
        <Center
          w="full"
          px="0px"
          maxH={'calc(100vh-200px)'}
          alignItems="center"
          overflow="auto"
          borderRadius="10px"
          py="20px"
          __css={scrollbarYStyles}
        >
          <TableauComponent
            device={DeviceType.Desktop}
            src={url}
            width="100%"
            toolbar={Toolbar.Hidden}
            onFirstInteractive={() => {}}
            onLoadComplete={onLoadComplete}
          />
        </Center>
      );
    }
    return null;
  }, [url, token]);

  return <InsightsPageLayout children={pageContent()} />;
};

export default TableauPage;
