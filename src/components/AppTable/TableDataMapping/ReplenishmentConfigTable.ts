import {
  executePlanningRunNowRequest,
  getPlanningEstimatedTimeRequest,
  getReplenishmentConfigDataRequest,
  rplTableCellAction
} from 'state/pages/advancedConfiguration/replenishmentConfigurationPage/rplConfigPageState';
import {
  getJobSchedulesRequest,
  setSelectedJobScheduleType
} from 'state/pages/shared/jobScheduling/jobSchedulingState';
import store from 'state/store';

export type trainingConfigurationType = 'default' | 'custom';

export type ReplenishmentConfigTableAction =
  | 'openPlanningConfigDrawer'
  | 'openRplRunNowDrawer'
  | 'openRplJobScheduleDrawer';

const onIconClick = (action: ReplenishmentConfigTableAction, rowId: string) => {
  switch (action) {
    case 'openPlanningConfigDrawer':
      store.dispatch(rplTableCellAction({ actionType: action, rawId: rowId }));
      break;
    case 'openRplRunNowDrawer':
      store.dispatch(rplTableCellAction({ actionType: action, rawId: rowId }));
      store.dispatch(getPlanningEstimatedTimeRequest(''));
      break;
    case 'openRplJobScheduleDrawer':
      store.dispatch(rplTableCellAction({ actionType: action, rawId: rowId }));
      store.dispatch(setSelectedJobScheduleType('replenishmentPlan'));
      store.dispatch(getJobSchedulesRequest('repl'));
      break;
    default:
      break;
  }
};

export const onTableSearch = (searchKey: string) => {
  store.dispatch(
    getReplenishmentConfigDataRequest({
      pageNo: 1,
      searchKey: searchKey
    })
  );
};

export const rplTableHeaders = ['Group name', 'Planning Configuration', 'Schedule', 'Planned On'];

// TODO: implement type support for tableRowDataMapping
export const replenishmentConfigTableRowDataMapping = [
  {
    cellType: 'rplGroupNameCell',
    mainLabel: 'groupName',
    subLabel: null,
    w: '32%'
  },
  {
    cellType: 'gc',
    mainLabel: 'config',
    subLabel: null,
    actions: [
      {
        iconName: 'wrench',
        onClick: onIconClick,
        action: 'openPlanningConfigDrawer'
      }
    ],
    w: '17%'
  },
  {
    cellType: 'gc',
    mainLabel: 'scheduled',
    subLabel: null,
    actions: [
      {
        iconName: 'play',
        onClick: onIconClick,
        action: 'openRplRunNowDrawer'
      },
      {
        iconName: 'calender',
        onClick: onIconClick,
        action: 'openRplJobScheduleDrawer'
      }
    ],
    w: '17%',
    formatTo: 'schedule'
  },
  {
    cellType: 'gc',
    mainLabel: 'date',
    subLabel: null,
    actions: [],
    w: '11%',
    formatTo: 'date'
  }
];
