import { Box } from '@chakra-ui/react';
import AppSimpleGrid from 'components/newTheme/AppSimpleGrid/AppSimpleGrid';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  IRPLView,
  rplViewSliceSelector
} from 'state/pages/view/replenishmentView/rplViewPageState';
import { RplOrderQtyDetailsI } from 'types/responses/viewResponses';

interface Props {
  tableHeight: string;
}

interface PlanTableHeader {
  w: number;
  displayValue: string;
  key: keyof RplOrderQtyDetailsI;
}

const PlanTablePanel: FC<Props> = ({ tableHeight }) => {
  const rplViewState: IRPLView = useSelector(rplViewSliceSelector);
  const orderQtyDetails = rplViewState.rplPlanDetails?.orderQtyDetails;
  const headers = orderQtyDetails?.headers!;
  const dataRow = orderQtyDetails?.list!;

  return (
    <Box h="full" w="full">
      <AppSimpleGrid
        headers={headers}
        rows={dataRow}
        maxW="100%"
        maxH={tableHeight}
        textAlign="start"
      />
    </Box>
  );
};

export default PlanTablePanel;
