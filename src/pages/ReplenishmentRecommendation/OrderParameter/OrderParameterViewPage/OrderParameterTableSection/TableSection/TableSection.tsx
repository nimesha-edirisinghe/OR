import { HStack, Skeleton } from '@chakra-ui/react';
import AppSimpleGrid from 'components/newTheme/AppSimpleGrid/AppSimpleGrid';
import { FC } from 'react';
import { replenishmentParameterSummaryTableHeader } from 'utils/constants';

interface Props {
  rowData: { id?: any; isSelected?: boolean; row: any[] }[] | null;
  loading: boolean;
}

const TableSection: FC<Props> = ({ rowData, loading }) => {
  const freezeCols = [0, 1];
  return (
    <HStack w="full" h="full" align="start">
      <Skeleton
        w="full"
        height="full"
        borderRadius="10px"
        isLoaded={!loading}
        fadeDuration={1}
        speed={1}
      >
        <AppSimpleGrid
          headers={replenishmentParameterSummaryTableHeader}
          rows={rowData}
          maxW="100%"
          maxH="calc(100vh - 288px)"
          freezedColumns={freezeCols}
          isLastColExpandable
        />
      </Skeleton>
    </HStack>
  );
};

export default TableSection;
