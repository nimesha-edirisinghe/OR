import {
  getAnchorPredictorsConfig,
  getSKUPredictorRequest,
  getForecastConfigDataRequest,
  tableCellAction,
  getTableDataRequest
} from 'state/pages/advancedConfiguration/forecastConfigurationPage/pageState';
import {
  getJobSchedulesRequest,
  setSelectedJobScheduleType
} from 'state/pages/shared/jobScheduling/jobSchedulingState';
import store from 'state/store';
export type trainingConfigurationType = 'default' | 'custom';

export interface ForecastingConfigTableRowI {
  groupDetails: {
    groupName: string;
    groupKey: number;
    anchorCount: number;
    skuCount: number;
  };
  trainingConfiguration: trainingConfigurationType;
  influencingFactor: string;
  scheduled: string;
  trainedUpto: number;
  forecastedFrom: number;
}

export type ForecastConfigTableAction =
  | 'openTrainingConfigDrawer'
  | 'openInfluencingFactorDrawer'
  | 'openRunNowDrawer'
  | 'openJobScheduleDrawer';

const onIconClick = (action: ForecastConfigTableAction, rowId: string) => {
  switch (action) {
    case 'openTrainingConfigDrawer':
      store.dispatch(tableCellAction({ actionType: action, rawId: rowId }));
      store.dispatch(
        getForecastConfigDataRequest({
          rowId: rowId
        })
      );
      break;
    case 'openInfluencingFactorDrawer':
      store.dispatch(tableCellAction({ actionType: action, rawId: rowId }));
      store.dispatch(
        getAnchorPredictorsConfig({
          rowId: rowId
        })
      );
      store.dispatch(
        getSKUPredictorRequest({
          rowId: rowId
        })
      );
      break;
    case 'openRunNowDrawer':
      store.dispatch(tableCellAction({ actionType: action, rawId: rowId }));
      break;
    case 'openJobScheduleDrawer':
      store.dispatch(tableCellAction({ actionType: action, rawId: rowId }));
      store.dispatch(setSelectedJobScheduleType('training'));
      store.dispatch(getJobSchedulesRequest('fc'));
      break;
    default:
      break;
  }
};

export const onTableSearch = (searchKey: string) => {
  store.dispatch(
    getTableDataRequest({
      pageNo: 1,
      groupName: searchKey
    })
  );
};

export const tableHeaders = [
  'Group name',
  'Training configuration',
  'Influencing factors',
  'Schedule',
  'Trained up to',
  'Forecasted from'
];

export const getForecastConfigTableRowDataMapping = (accessibilityCheck: boolean = false) => {
  return [
    {
      cellType: 'groupNameCell',
      w: '27%'
    },
    {
      cellType: 'gc',
      mainLabel: 'trainingConfiguration',
      subLabel: null,
      actions: [
        {
          iconName: 'wrench',
          onClick: onIconClick,
          action: 'openTrainingConfigDrawer'
        }
      ],
      w: '17%'
    },
    {
      cellType: 'gc',
      mainLabel: 'influencingFactor',
      subLabel: null,
      actions: [
        {
          iconName: 'plus',
          onClick: onIconClick,
          action: 'openInfluencingFactorDrawer'
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
          action: 'openRunNowDrawer',
          isDisabled: accessibilityCheck
        },
        {
          iconName: 'calender',
          onClick: onIconClick,
          action: 'openJobScheduleDrawer'
        }
      ],
      w: '17%',
      formatTo: 'schedule'
    },
    {
      cellType: 'gc',
      mainLabel: 'trainedUpto',
      subLabel: null,
      actions: [],
      w: '11%',
      formatTo: 'date'
    },
    {
      cellType: 'gc',
      mainLabel: 'forecastedFrom',
      subLabel: null,
      actions: [],
      w: '11%',
      formatTo: 'date'
    }
  ];
};
