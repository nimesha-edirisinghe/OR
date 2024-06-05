import { Box } from '@chakra-ui/react';
import AppSimpleGrid from 'components/newTheme/AppSimpleGrid/AppSimpleGrid';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  IRPLView,
  rplViewSliceSelector
} from 'state/pages/view/replenishmentView/rplViewPageState';

interface Props {
  tableHeight: string;
}

const ReplenishmentInfoTable: FC<Props> = ({ tableHeight }) => {
  const rplViewState: IRPLView = useSelector(rplViewSliceSelector);
  const stockMovement = rplViewState.rplPlanDetails?.stockMovement;

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
        freezedColumns={[0]}
      />
    </Box>
  );
};

export default ReplenishmentInfoTable;
