import { Box } from '@chakra-ui/react';
import AppSimpleGrid from 'components/newTheme/AppSimpleGrid/AppSimpleGrid';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { IAlert, alertSliceSelector } from 'state/pages/monitoringAndResolution/Alert/alertState';

interface ReplenishmentInfoTableProps {}

const ReplenishmentInfoTable: FC<ReplenishmentInfoTableProps> = () => {
  const alertState: IAlert = useSelector(alertSliceSelector);
  const stockMovement = alertState.rplPlanDetails?.stockMovement;
  const headers = stockMovement?.headers!;
  const formattedDataRow = stockMovement?.list!;

  return (
    <Box h="full" w="full">
      <AppSimpleGrid
        headers={headers}
        rows={formattedDataRow}
        maxW="100%"
        maxH={'100%'}
        textAlign="end"
        freezedColumns={[0]}
      />
    </Box>
  );
};

export default ReplenishmentInfoTable;
