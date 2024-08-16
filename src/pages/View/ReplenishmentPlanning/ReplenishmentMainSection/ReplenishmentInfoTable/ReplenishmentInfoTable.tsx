import { Box } from '@chakra-ui/react';
import AppSimpleGrid from 'components/newTheme/AppSimpleGrid/AppSimpleGrid';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  IRPLView,
  rplViewSliceSelector
} from 'state/pages/view/replenishmentView/rplViewPageState';
import { TableHeader } from 'types/responses/viewResponses';

interface Props {
  tableHeight: string;
  maximized: boolean;
}

const ReplenishmentInfoTable: FC<Props> = ({ tableHeight, maximized }) => {
  const rplViewState: IRPLView = useSelector(rplViewSliceSelector);
  const stockMovement = rplViewState.rplPlanDetails?.stockMovement;

  const headers = stockMovement?.headers.map((item, index) => {
    if (index !== 0) return { ...item, w: maximized ? 150 : 110 };
  });

  const formattedDataRow = stockMovement?.list!;
  return (
    <Box h="full" w="full">
      <AppSimpleGrid
        headers={headers as TableHeader[]}
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
