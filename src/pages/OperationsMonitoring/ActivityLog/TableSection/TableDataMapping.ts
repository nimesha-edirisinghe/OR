import { iconName } from 'assets/svg/chakraIcons';
import { debounce } from 'lodash';
import {
  clearActivityLogSummary,
  getActivityLogListRequest,
  getActivityLogSummaryRequest
} from 'state/pages/operationAndMonitoring/activityLog/activityLogState';
import store from 'state/store';

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
const onIconClick = (action: ActivityLogActionsT, rowId?: number) => {
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

const onLeaveAction = () => {
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
      width: '60px'
    }
  },
  {
    id: 2,
    header: {
      headerName: 'Group Name'
    },
    key: 'groupName',
    cellType: 'generalCell',
    styles: {
      width: '315px'
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
      width: '200px'
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
      width: '180px'
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
      width: '180px'
    }
  },
  {
    id: 6,
    header: {
      headerName: 'Execution Time'
    },
    key: 'elapsedTime',
    cellType: 'generalCell',
    format: 'time',
    styles: {
      width: '180px'
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
      width: '180px'
    },
    action: {
      actionName: 'summaryPopUp',
      iconName: 'iIcon',
      onIconClick,
      onLeaveAction
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
      width: '180px'
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
      width: '180px'
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
      width: '200px'
    }
  }
];
