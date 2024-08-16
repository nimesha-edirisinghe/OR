import { Box, Skeleton } from '@chakra-ui/react';
import { FC } from 'react';
import { scrollbarXYStyles } from 'theme/styles';
import { useSelector } from 'react-redux';
import {
  IActivityLogSlice,
  activityLogSliceSelector
} from 'state/pages/operationAndMonitoring/activityLog/activityLogState';
import { getActivity, isEmpty, timeStampToDateString } from 'utils/utility';
import { algorithmTableDataMap, onIconClick, onLeaveAction } from './TableDataMapping';
import AppNoDataAvailablePanel from 'components/newTheme/AppNoDataAvailablePanel/AppNoDataAvailablePanel';
import AppSimpleGrid from 'components/newTheme/AppSimpleGrid/AppSimpleGrid';
import { formatTimeDuration } from 'utils/dateTimeUtils';

interface TableSectionProps {}

const TableSection: FC<TableSectionProps> = () => {
  const activityLogState: IActivityLogSlice = useSelector(activityLogSliceSelector);
  const activityLogTableData = activityLogState.activityLogListData.list;
  const dataItem: any = activityLogTableData.map((item, index) => ({
    id: index,
    isSelected: false,
    row: [
      item.jobGroupId,
      item.groupName,
      getActivity(item.activity, 'activity'),
      item.execType,
      item.status,
      timeStampToDateString(item.startTime as number, 'yyyy-MM-dd hh:mm a'),
      formatTimeDuration(item.startTime, +item.elapsedTime),
      item.anchorLocations || '',
      item.skuLocations,
      item.user
    ]
  }));

  const statusSummaryCallBack = (
    id: number | string,
    index: number,
    actionType: string | number
  ) => {
    switch (actionType) {
      case 'summaryPopUp':
        onIconClick(actionType, index);
        break;
      case 'onLeaveAction':
        onLeaveAction();
        break;
    }
  };

  return (
    <Box w="full" height={'calc(100vh - 210px)'} maxH={'calc(100vh - 210px)'}>
      <Skeleton w="full" h="full" isLoaded={!activityLogState.isLoading} fadeDuration={1} speed={1}>
        {!isEmpty(activityLogTableData) && (
          <AppSimpleGrid
            headers={algorithmTableDataMap}
            isSelectedAll={false}
            rows={dataItem}
            maxW="100%"
            maxH="full"
            cellCallback={statusSummaryCallBack}
          />
        )}
        {isEmpty(activityLogTableData) && <AppNoDataAvailablePanel />}
      </Skeleton>
    </Box>
  );
};

export default TableSection;
