import { differenceInSeconds } from 'date-fns';
import { getActivity, timeStampToDateString } from 'utils/utility';
import { TableMapDataI } from './TableDataMapping';
import { ReactNode } from 'react';
import { ActivityLogDataList } from 'types/activityLog';

export const formatTimeDuration = (
  startDateTime: number | null,
  endDateTime: number | null
): string => {
  if (startDateTime === null || endDateTime === null) return '';

  const start = new Date(startDateTime);
  const end = new Date(endDateTime);

  const timeDifferenceInSeconds = differenceInSeconds(end, start);

  if (timeDifferenceInSeconds < 0) return '';

  const hours = Math.floor(timeDifferenceInSeconds / 3600);
  const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60);
  const seconds = timeDifferenceInSeconds % 60;

  let formattedDuration = '';

  if (hours > 0) {
    formattedDuration += `${hours} hr `;
  }

  if (minutes > 0) {
    formattedDuration += `${minutes} min `;
  }

  if (seconds > 0 || formattedDuration === '') {
    formattedDuration += `${seconds} sec`;
  }

  return formattedDuration.trim();
};

export const getFormattedChildren = (
  tableMap: TableMapDataI,
  children: ReactNode,
  dataList: ActivityLogDataList
): ReactNode => {
  let formattedChildren: ReactNode = children;

  if (tableMap.format) {
    switch (tableMap.format) {
      case 'dateTime':
        formattedChildren = timeStampToDateString(children as number, 'yyyy-MM-dd hh:mm a');
        break;
      case 'time':
        formattedChildren = formatTimeDuration(dataList.startTime, children as number);
        break;
      case 'noZero':
        formattedChildren = children ? children : '';
        break;
    }
  }

  if (tableMap.key === 'activity') {
    formattedChildren = getActivity(children as string, tableMap.key);
  }

  return formattedChildren;
};
