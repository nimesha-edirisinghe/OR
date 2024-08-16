import { iconName } from 'assets/svg/chakraIcons';
import { debounce } from 'lodash';
import {
  clearActivityLogSummary,
  getActivityLogListRequest,
  getActivityLogSummaryRequest
} from 'state/pages/operationAndMonitoring/activityLog/activityLogState';
import store from 'state/store';
import { TableHeader } from 'types/responses/viewResponses';

export type ActivityLogActionsT = 'sorting' | 'summaryPopUp';

export interface TableActionI {
  actionName: ActivityLogActionsT;
  onIconClick: (action: ActivityLogActionsT, rowId?: number) => void;
  onLeaveAction: () => void;
  iconName?: iconName;
}

const debouncedRequest = debounce(async (rowId) => {
  store.dispatch(getActivityLogSummaryRequest({ rowId }));
}, 100);

const getSummaryRequest = (rowId: number | undefined) => {
  debouncedRequest(rowId);
};

// TODO: have to implement onclick actions
export const onIconClick = (action: ActivityLogActionsT, rowId?: number) => {
  switch (action) {
    case 'sorting':
      store.dispatch(
        getActivityLogListRequest({
          pageNumber: 1
        })
      );
      break;
    case 'summaryPopUp':
      getSummaryRequest(rowId);
      break;
    default:
      break;
  }
};

export const onLeaveAction = () => {
  store.dispatch(clearActivityLogSummary());
};

export interface TableHeaderI {
  headerName?: string;
  secondHeaderName?: string;
  action?: {
    iconName?: iconName;
    actionName?: ActivityLogActionsT;
    onClick?: (actionName: ActivityLogActionsT) => void;
  };
}
export interface TableMapDataI {
  id: number;
  header: TableHeaderI;
  key: string;
  cellType: 'generalCell' | 'operationCell';
  action?: TableActionI;
  format?: 'dateTime' | 'time' | 'noZero';
  styles?: {
    width: string;
  };
}

export const tableDataMap: TableMapDataI[] = [
  {
    id: 1,
    header: {
      headerName: 'ID'
    },
    key: 'jobGroupId',
    cellType: 'generalCell',
    styles: {
      width: '67px'
    }
  },
  {
    id: 2,
    header: {
      headerName: 'Group'
    },
    key: 'groupName',
    cellType: 'generalCell',
    styles: {
      width: '137px'
    }
  },
  {
    id: 3,
    header: {
      headerName: 'Activity'
    },
    key: 'activity',
    cellType: 'generalCell',
    styles: {
      width: '216px'
    }
  },
  {
    id: 4,
    header: {
      headerName: 'Execution Type'
    },
    key: 'execType',
    cellType: 'generalCell',
    styles: {
      width: '155px'
    }
  },
  {
    id: 7,
    header: {
      headerName: 'Status'
    },
    key: 'status',
    cellType: 'operationCell',
    styles: {
      width: '155px'
    },
    action: {
      actionName: 'summaryPopUp',
      iconName: 'iIcon',
      onIconClick,
      onLeaveAction
    }
  },
  {
    id: 5,
    header: {
      headerName: 'Start Time'
    },
    key: 'startTime',
    cellType: 'generalCell',
    format: 'dateTime',
    styles: {
      width: '155px'
    }
  },
  {
    id: 6,
    header: {
      headerName: 'Elapsed Time'
    },
    key: 'elapsedTime',
    cellType: 'generalCell',
    format: 'time',
    styles: {
      width: '155px'
    }
  },
  {
    id: 8,
    header: {
      headerName: 'Anchor Locations'
    },
    key: 'anchorLocations',
    cellType: 'generalCell',
    format: 'noZero',
    styles: {
      width: '155px'
    }
  },
  {
    id: 9,
    header: {
      headerName: 'SKU Locations'
    },
    key: 'skuLocations',
    cellType: 'generalCell',
    styles: {
      width: '155px'
    }
  },
  {
    id: 10,
    header: {
      headerName: 'User'
    },
    key: 'user',
    cellType: 'generalCell',
    styles: {
      width: '155px'
    }
  }
];

export const algorithmTableDataMap: TableHeader[] = [
  {
    key: '1',
    w: 67,
    displayValue: 'ID',
    cellType: 'generalCell'
  },
  {
    key: '2',
    w: 13,
    displayValue: 'Group',
    cellType: 'generalCell'
  },
  {
    key: '3',
    w: 216,
    displayValue: 'Activity',
    cellType: 'generalCell'
  },
  {
    key: '4',
    w: 155,
    displayValue: 'Execution Type',
    cellType: 'generalCell'
  },
  {
    key: '7',
    w: 155,
    displayValue: 'Status',
    cellType: 'operationCell',
    actionIcons: ['iIcon']
  },
  {
    key: '5',
    w: 155,
    displayValue: 'Start Time',
    cellType: 'generalCell'
  },
  {
    key: '6',
    w: 155,
    displayValue: 'Elapsed Time',
    cellType: 'generalCell'
  },
  {
    key: '8',
    w: 155,
    displayValue: 'Anchor Locations',
    cellType: 'generalCell'
  },
  {
    key: '9',
    w: 155,
    displayValue: 'SKU Locations',
    cellType: 'generalCell'
  },
  {
    key: '10',
    w: 155,
    displayValue: 'User',
    cellType: 'generalCell'
  }
];
