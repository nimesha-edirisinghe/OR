import { HStack, Skeleton } from '@chakra-ui/react';
import { FC } from 'react';
import AppSimpleGrid from 'components/newTheme/AppSimpleGrid/AppSimpleGrid';
import {
  IPromotionSummaryView,
  promotionSummaryViewSliceSelector
} from 'state/pages/monitoringAndResolution/promotionSummaryView/promotionSummaryViewState';
import { useSelector } from 'react-redux';
import { TableHeader } from 'types/responses/viewResponses';

interface TableSectionProps {}

const TableSection: FC<TableSectionProps> = () => {
  const promotionSummaryViewState: IPromotionSummaryView = useSelector(
    promotionSummaryViewSliceSelector
  );
  const tableDataList = promotionSummaryViewState.skuListData?.list;
  const tableHeaders = promotionSummaryViewState.skuListData?.headers as TableHeader[];
  const promotionSummaryDataLoading = promotionSummaryViewState.loading?.skuDataLoading;

  let rowData: { id?: any; row: any[] }[] = [];

  rowData =
    tableDataList?.map((item, index) => ({
      id: index,
      row: (tableHeaders.length && tableHeaders.map((header) => item[header.key])) || []
    })) || [];

  const freezeCols = [0, 1];

  return (
    <HStack w="full" h="full" align="start">
      <Skeleton
        w="full"
        height="full"
        borderRadius="10px"
        isLoaded={!promotionSummaryDataLoading}
        fadeDuration={1}
        speed={1}
      >
        <AppSimpleGrid
          headers={tableHeaders}
          rows={rowData}
          maxW="100%"
          maxH="calc(100vh - 288px)"
          freezedColumns={freezeCols}
        />
      </Skeleton>
    </HStack>
  );
};

export default TableSection;
