import { Box } from '@chakra-ui/react';
import { FC, useCallback } from 'react';
import AppSimpleGrid from 'components/newTheme/AppSimpleGrid/AppSimpleGrid';
import { layoutSliceSelector } from 'state/layout/layoutState';
import { useSelector } from 'react-redux';
import { PlannedActualObjI } from 'types/responses/view/forecastAnalyzer';

interface Props {
  tableData: PlannedActualObjI | null;
}

const PlannedVsActualSection: FC<Props> = ({ tableData }) => {
  const leftMenuOpen = useSelector(layoutSliceSelector).leftMenuOpen;
  const freezeCols = [0];

  const tableHeaders = tableData?.headers;
  const tableRows = tableData?.list;

  const renderGrid = useCallback(() => {
    const gridWidth = leftMenuOpen ? 'calc(52.32vw)' : 'calc(62.25vw)';

    return (
      <Box h="148px" w={gridWidth} transition="width 0.2s ease-in">
        <AppSimpleGrid
          headers={tableHeaders ? tableHeaders : []}
          maxW="full"
          rows={tableRows ? tableRows : []}
          maxH="148px"
          freezedColumns={freezeCols}
          textAlign="end"
        />
      </Box>
    );
  }, [leftMenuOpen, tableHeaders, tableRows]);

  return <>{renderGrid()}</>;
};

export default PlannedVsActualSection;
