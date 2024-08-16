import { Box, Tr } from '@chakra-ui/react';
import AppSimpleGrid from 'components/newTheme/AppSimpleGrid/AppSimpleGrid';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  IRPLView,
  rplViewSliceSelector
} from 'state/pages/view/replenishmentView/rplViewPageState';
import { ocean_blue_400 } from 'theme/colors';
import { TableHeader } from 'types/responses/viewResponses';
import { numberWithCommaSeparator } from 'utils/utility';

interface Props {}

const TableSection: FC<Props> = () => {
  const rplViewState: IRPLView = useSelector(rplViewSliceSelector);
  const tableHeaders = rplViewState.rplSkuExpandedDataList?.headers as TableHeader[];
  const tableDataList = rplViewState.rplSkuExpandedDataList?.list;
  const rplPlanTotalCount = rplViewState.rplPlanTotalCount;

  const totalCountsRplPlan = () => {
    return (
      <Tr p="0px" m="0px">
        <td
          colSpan={2}
          style={{
            position: 'sticky',
            left: 0,
            zIndex: 1,
            height: '36px',
            backgroundColor: ocean_blue_400
          }}
        >
          <AppText size="body2">
            Total ({rplViewState.rplSkuExpandedDataList?.totalCount} SKU-locations)
          </AppText>
        </td>
        <td colSpan={2}></td>
        {rplPlanTotalCount?.map((c) => (
          <td key={c.key} style={{ backgroundColor: ocean_blue_400, height: '36px' }}>
            <AppText size="body2">
              {c.value !== 'null' ? numberWithCommaSeparator(parseFloat(c.value)) : ''}
            </AppText>
          </td>
        ))}
      </Tr>
    );
  };

  const renderSimpleGrid = () => {
    if (!tableHeaders) return null;

    let rowData: { id?: any; isSelected?: boolean; row: any[] }[] = [];

    rowData =
      tableDataList?.map((item) => ({
        id: item.anchorProdKey,
        isSelected: item.isSelected,
        row: (tableHeaders.length && tableHeaders.map((header) => item[header.key])) || []
      })) || [];
    const freezeCols = [0, 1];
    return (
      <AppSimpleGrid
        headers={tableHeaders}
        rows={rowData}
        maxW="100%"
        maxH="full"
        freezedColumns={freezeCols}
        footerRow={rowData.length > 0 && totalCountsRplPlan()}
        isLastColExpandable
      />
    );
  };

  return (
    <Box w="full" h={'calc(100vh - 235px)'}>
      {renderSimpleGrid()}
    </Box>
  );
};

export default TableSection;
