import { Box } from '@chakra-ui/react';
import AppSimpleGrid from 'components/newTheme/AppSimpleGrid/AppSimpleGrid';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  IRPLWhView,
  rplWHViewSliceSelector
} from 'state/pages/view/whReplenishmentView/whRplViewState';
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
  const rplWhViewState: IRPLWhView = useSelector(rplWHViewSliceSelector);
  const orderQtyDetails = rplWhViewState.rplWhPlanDetails?.orderQtyDetails;
  const headers = orderQtyDetails?.headers!;
  const dataRow = orderQtyDetails?.list!;
  return (
    <Box h="full" w="full">
      <AppSimpleGrid headers={headers} rows={dataRow} maxW="100%" maxH={tableHeight} />
    </Box>
  );
};

export default PlanTablePanel;
