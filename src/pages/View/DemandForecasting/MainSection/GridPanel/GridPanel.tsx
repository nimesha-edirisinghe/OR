import { FC, useEffect, useState } from 'react';
import AppSimpleGrid from 'components/newTheme/AppSimpleGrid/AppSimpleGrid';
import { Box, BoxProps } from '@chakra-ui/react';
import { dfViewSliceSelector, IDFView } from 'state/pages/view/demandForecastView/dfViewPageState';
import { useSelector } from 'react-redux';
import { DemandForecastChartTable } from 'types/view';

interface Props extends BoxProps {}

const GridPanel: FC<Props> = ({ ...rest }) => {
  const dfViewState: IDFView = useSelector(dfViewSliceSelector);
  const headers = dfViewState.dfTable?.headers || [];
  const [rows, setRows] = useState<
    (DemandForecastChartTable['skuForecast'] | DemandForecastChartTable['compareForecast'])[]
  >([]);
  const isAnchorSelected =
    dfViewState.selectedChartType !== 'sku' && dfViewState.selectedChartType !== 'aggregate';

  const formattedDataRow = rows
    .filter((arr) => arr.every((value) => value !== null))
    .map((row, idx) => {
      return {
        id: idx,
        row: row
      };
    });

  useEffect(() => {
    const _rows = [];
    if (dfViewState.dfTable?.skuForecast) {
      _rows.push(dfViewState.dfTable?.skuForecast);
    }
    if (dfViewState.dfTable?.compareForecast) {
      _rows.push(dfViewState.dfTable?.compareForecast);
    }
    setRows(_rows);
  }, [dfViewState.dfTable?.skuForecast, dfViewState.dfTable?.compareForecast]);

  return (
    <Box h={isAnchorSelected ? '115px' : '75px'} w="full">
      <AppSimpleGrid
        headers={headers}
        rows={formattedDataRow}
        maxW="100%"
        maxH="120px"
        freezedColumns={[0]}
        textAlign="end"
      />
    </Box>
  );
};

export default GridPanel;
