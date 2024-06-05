import { Box } from '@chakra-ui/react';
import AppSimpleGrid from 'components/newTheme/AppSimpleGrid/AppSimpleGrid';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  IRPLWhView,
  rplWHViewSliceSelector
} from 'state/pages/view/whReplenishmentView/whRplViewState';

interface Props {
  tableHeight: string;
}

const ReplenishmentInfoTable: FC<Props> = ({ tableHeight }) => {
  const rplWhViewState: IRPLWhView = useSelector(rplWHViewSliceSelector);
  const stockMovement = rplWhViewState.rplWhPlanDetails?.stockMovement;

  const headers = stockMovement?.headers!;
  const formattedDataRow = stockMovement?.list!;
  return (
    <Box h="full" w="full">
      <AppSimpleGrid
        headers={headers}
        rows={formattedDataRow}
        maxW="100%"
        maxH={tableHeight}
        textAlign="end"
      />
    </Box>
  );
};

export default ReplenishmentInfoTable;
