//  Contains general utility functions that can be used across different components and modules
import { format, fromUnixTime, parseISO } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { IJobSchedule } from 'state/pages/shared/jobScheduling/jobSchedulingState';
import {
  blue_500,
  green_500,
  neutral_200,
  red_300,
  red_400,
  red_500,
  yellow_300,
  yellow_400
} from 'theme/colors';
import { ConfigurationI, TableDataI, CandidateAlgoTreeDataI } from 'types/forecastConfig';
import {
  ExternalUrlsI,
  ReportUrlsI
} from 'types/responses/systemConfigurations/systemConfigurations';
import { v4 as uuidv4 } from 'uuid';
import { ExternalUrlKeyEnum } from './enum';

// Function Definition for get group key by clicked row id
export const getGroupKeyByRowId = (tableData: TableDataI[], rowId: string) => {
  const getSelectedObj = tableData.find((configObj) => configObj.uuid === rowId); // find object from row id
  return getSelectedObj?.groupDetails.groupKey; // return group key
};

export const getGroupDetailsByRowId = (tableData: TableDataI[], rowId: string) => {
  const getSelectedObj = tableData.find((configObj) => configObj.uuid === rowId); // find object from row id
  return getSelectedObj?.groupDetails; // return group key
};

// Function Definition for Transform Forecast configuration Tree data
export const initCandidateAlgoState = (
  algoSelection: ConfigurationI,
  isUnivariate: boolean
): CandidateAlgoTreeDataI[] => {
  const initialTreeData: CandidateAlgoTreeDataI[] = [
    {
      id: '1',
      label: 'ML & DL Algorithms',
      key: 'ml_dl_algorithms',
      isParent: true,
      isDisabled: false,
      isSelected: algoSelection.ml_dl_algorithms.length === 3,
      children: [
        {
          id: '1-1',
          label: 'Machine Learning Algorithms',
          key: 'ML',
          isSelected: algoSelection.ml_dl_algorithms.includes('ML'),
          isParent: false,
          children: []
        },
        {
          id: '1-2',
          label: 'Optimized Prophet',
          key: 'prophet',
          isSelected: algoSelection.ml_dl_algorithms.includes('prophet'),
          isParent: false,
          children: []
        },
        {
          id: '1-3',
          label: 'Deep Learning Algorithms',
          key: 'DL',
          isSelected: algoSelection.ml_dl_algorithms.includes('DL'),
          isParent: false,
          children: []
        }
      ]
    },
    {
      id: '2',
      label: 'Parametric Time Series',
      key: 'parametric_algorithms',
      isParent: true,
      isDisabled: false,
      isSelected: algoSelection.parametric_algorithms.length === 1,
      children: [
        {
          id: '2-1',
          label: 'SARIMA',
          key: 'sarima',
          isSelected: algoSelection.parametric_algorithms.includes('sarima'),
          isParent: false,
          children: []
        }
      ]
    },
    {
      id: '3',
      label: 'Ensemble Algorithms',
      key: 'ensemble_algorithms',
      isParent: true,
      isDisabled: false,
      isSelected: algoSelection.ensemble_algorithms.length === 3,
      children: [
        {
          id: '3-1',
          label: 'Stacking Ensemble',
          key: 'stacking_ensemble',
          isSelected: algoSelection.ensemble_algorithms.includes('stacking_ensemble'),
          isParent: false,
          children: []
        },
        {
          id: '3-2',
          label: 'Blending Ensemble',
          key: 'blending_ensemble',
          isSelected: algoSelection.ensemble_algorithms.includes('blending_ensemble'),
          isParent: false,
          children: []
        },
        {
          id: '3-3',
          label: 'Weighted Ensemble',
          key: 'weighted_ensemble',
          isSelected: algoSelection.ensemble_algorithms.includes('weighted_ensemble'),
          isParent: false,
          children: []
        }
      ]
    },
    {
      id: '4',
      label: 'Smoothing Techniques',
      key: 'smoothing_algorithms',
      isParent: true,
      isDisabled: isUnivariate ? false : true,
      isSelected: algoSelection.smoothing_algorithms.length === 6,
      children: [
        {
          id: '4-1',
          label: 'Moving Average',
          key: 'moving_average',
          isSelected: algoSelection.smoothing_algorithms.includes('moving_average'),
          isParent: false,
          children: []
        },
        {
          id: '4-2',
          label: 'Simple Average',
          key: 'simple_average',
          isSelected: algoSelection.smoothing_algorithms.includes('simple_average'),
          isParent: false,
          children: []
        },
        {
          id: '4-3',
          label: 'Holt Winters',
          key: 'holt_winters',
          isSelected: algoSelection.smoothing_algorithms.includes('holt_winters'),
          isParent: false,
          children: []
        },
        {
          id: '4-4',
          label: 'Loess',
          key: 'loess',
          isSelected: algoSelection.smoothing_algorithms.includes('loess'),
          isParent: false,
          children: []
        },
        {
          id: '4-5',
          label: 'Naive ',
          key: 'naive',
          isSelected: algoSelection.smoothing_algorithms.includes('naive'),
          isParent: false,
          children: []
        },
        {
          id: '4-6',
          label: 'Stochastic Smoothing ',
          key: 'stochastic_smoothing',
          isSelected: algoSelection.smoothing_algorithms.includes('stochastic_smoothing'),
          isParent: false,
          children: []
        }
      ]
    }
  ];
  return initialTreeData;
};

// Function Definition for find Key name by value of tree data array object
export const findKeyByValue = (treeData: ConfigurationI, value: ConfigurationI): any => {
  const keys = Object.keys(treeData);
  for (const key of keys) {
    if (treeData[key].includes(value)) {
      return key;
    }
  }
  return value;
};

export const kFormatWithCommaSeparated = (x: string) => {
  const num = parseInt(x);
  if (num === 0) return String(0);
  if (num < 10000 && num > 999) return (num / 1e3).toFixed(1) + 'k';

  const y = Math.round(Number(x))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const z = splitLastOccurrence(y, ',');
  return z;
};

export const numberWithCommas = (x: string) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const numberWithCommaSeparator = (number: number) => {
  return number.toLocaleString('en-US');
};

export const splitLastOccurrence = (str: string, substring: string) => {
  const lastIndex = str.lastIndexOf(substring);
  if (lastIndex > 0) {
    const before = str.slice(0, lastIndex) + 'K';
    return before;
  }
  return str;
};

export const getStatusColor = (status: string | undefined, key: string): string => {
  const colorMap: Record<string, Record<string, string>> = {
    status: {
      C: green_500,
      P: yellow_400,
      F: red_400,
      W: blue_500
    }
  };

  const specificColorMap = colorMap[key] || {};
  return specificColorMap[status || ''] || '#E6E6E6';
};

export const getStatusBackgroundColor = (status: string | undefined, key: string): string => {
  const colorMap: Record<string, Record<string, string>> = {
    status: {
      C: '#3DC65333',
      P: '#FFA91447',
      F: '#F4312A47',
      W: '#0AA5FF4D'
    }
  };

  const specificColorMap = colorMap[key] || {};
  return specificColorMap[status || ''] || '#E6E6E6';
};

export const isEmpty = (value: any): boolean => {
  if (Array.isArray(value)) {
    return value.length === 0;
  } else if (typeof value === 'object' && value !== null) {
    return Object.keys(value).length === 0;
  } else {
    return false;
  }
};

export const statusTypes = {
  W: 'Queued',
  N: 'Queued',
  P: 'Processing',
  C: 'Completed',
  F: 'Failed'
};

export const etlStatusTypes = {
  W: 'Queued',
  N: 'Queued',
  P: 'Running',
  C: 'Completed',
  F: 'Failed'
};

export const activityTypes = {
  training: 'Training',
  forecasting: 'Forecasting',
  inv_plan: 'Replenishment Planning',
  training_forecasting: 'Training & Forecasting',
  wh_forecast: 'Replenishment Planning',
  forecasting_invplan: 'Not Mapped',
  training_forecasting_invplan: 'Not Mapped',
  forecasting_invplan_wh_invplan: 'Not Mapped'
};

export const findObject = (name: string, obj: Partial<{}>) => {
  return Object.entries(obj).find((stat) => name === stat['0'] || name === stat['1']);
};

export const activityLogMap: Record<string, Record<string, string>> = {
  activity: activityTypes
};

export const getActivity = (activity: string | undefined, key: string): string => {
  const specificActivityMap = activityLogMap[key] || {};
  return specificActivityMap[activity || ''] || '';
};

export const getStatus = (status: string | undefined, key: string): string => {
  const statusMap: Record<string, Record<string, string>> = {
    status: statusTypes
  };
  const specificStatusMap = statusMap[key] || {};
  return specificStatusMap[status || ''] || '';
};

export const timeStampToDateString = (timestamp: number | null, dateFormat: string): string => {
  if (!timestamp) return '';

  const formattedDate = format(new Date(timestamp), dateFormat);
  return formattedDate;
};

export const dateStringToTimestamp = (dateString: string | null): number | null => {
  try {
    if (!dateString) return null;

    const date = parseISO(dateString);
    return date.getTime();
  } catch (error) {
    console.error('Invalid date string:', error);
    return null;
  }
};

export const addSecondsToTimestamp = (timestamp: number | null, seconds: number): number | null => {
  if (timestamp === null) {
    return null;
  }

  return timestamp + seconds;
};

export const getEndOfDayTimestamp = (startOfDayTimestamp: number | null): number | null => {
  if (startOfDayTimestamp === null) {
    return null;
  }
  const startOfDay = new Date(startOfDayTimestamp);
  startOfDay.setHours(23, 59, 59);
  return startOfDay.getTime();
};

export const repeatDurationOptions = [
  // { key: 'Select', value: 'Select' },
  { key: 'DAILY', value: 'Days' },
  { key: 'WEEKLY', value: 'Weeks' },
  { key: 'MONTHLY', value: 'Months' }
];

export const defaultSchedulingData: IJobSchedule['jobSchedulingData'] = {
  scheduleConfiguration: {
    days: [],
    frequency: 1
  },
  previousEnableStatus: 1,
  currentEnableStatus: 1,
  endDate: null,
  executionDetails: null,
  scheduleType: '',
  startDate: null,
  scheduleBatchId: null,
  additionalConfig: { etlValidation: false }
};

export const formatUnixDateTime = (
  unixDateTime: number | null
): { date: string | null; time: string | null } => {
  if (unixDateTime === null) {
    return { date: null, time: null };
  }
  unixDateTime /= 1000;
  const date = fromUnixTime(unixDateTime);
  const formattedDate = format(date, 'yyyy-MM-dd').toString();
  const formattedTime = `${date.getHours()}:${date.getMinutes()}`;

  return { date: formattedDate, time: formattedTime };
};

export const getTimeFromTimestamp = (
  timestamp: number | null
): { hours: number | null; minutes: number | null; seconds: number | null } => {
  if (timestamp === null) {
    return { hours: null, minutes: null, seconds: null };
  }

  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return { hours, minutes, seconds };
};

export const getAlertColor = (percentageValue: number) => {
  if (percentageValue > 50) {
    return red_500;
  } else if (percentageValue > 5 && percentageValue <= 50) {
    return red_300;
  } else {
    return yellow_300;
  }
};

export const generateShortId = (): string => {
  const fullId = uuidv4();
  const shortId = fullId.substring(0, 8);
  return shortId;
};

export const formatFileSize = (size: number): string => {
  if (size < 1024) {
    return size + ' B';
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + ' KB';
  } else {
    return (size / (1024 * 1024)).toFixed(2) + ' MB';
  }
};

export const shouldUseTooltip = (str: string, limit: number) => {
  return str.toLowerCase().length > limit;
};

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const convertToShortDateFormat = (inputDate?: string): string => {
  if (!inputDate) return '';

  const parsedDate = parseISO(inputDate);
  const formattedDate = format(parsedDate, 'dd-MMM-yy', {
    locale: enUS
  });
  return formattedDate;
};

export const getReportUrlValueByKey = (obj: ReportUrlsI, key: ExternalUrlKeyEnum): string => {
  if (!obj || typeof obj !== 'object') {
    return '';
  }
  if (!(key in obj)) {
    return '';
  }
  return obj[key as keyof ReportUrlsI] ?? '';
};
