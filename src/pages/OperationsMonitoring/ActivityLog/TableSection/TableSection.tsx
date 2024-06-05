import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import { scrollbarXYStyles } from 'theme/styles';
import { useSelector } from 'react-redux';
import {
  IActivityLogSlice,
  activityLogSliceSelector
} from 'state/pages/operationAndMonitoring/activityLog/activityLogState';
import { isEmpty } from 'utils/utility';
import { tableDataMap } from './TableDataMapping';
import AppNoDataAvailablePanel from 'components/newTheme/AppNoDataAvailablePanel/AppNoDataAvailablePanel';

interface TableSectionProps {}

const TableSection: FC<TableSectionProps> = () => {
  const activityLogState: IActivityLogSlice = useSelector(activityLogSliceSelector);
  const activityLogTableData = activityLogState.activityLogListData;
  return (
    <Box w="full" height={'calc(100vh - 245px)'}>
      <Box
        position="relative"
        overflow="hidden"
        maxH={'calc(100vh - 245px)'}
        overflowX="auto"
        overflowY="auto"
        transition="all .2s ease-in"
        __css={scrollbarXYStyles}
      >
        {!isEmpty(activityLogTableData?.list) && (
          <>
            <TableHeader tableDataMap={tableDataMap} />
            {activityLogTableData?.list.map((dataItem, index) => (
              <TableRow key={index} data={dataItem} />
            ))}
          </>
        )}
      </Box>
      {isEmpty(activityLogTableData?.list) && <AppNoDataAvailablePanel />}
    </Box>
  );
};

export default TableSection;
