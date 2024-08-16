import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRootState } from 'state/rootState';
import {
  JobScheduleLocalScopeI,
  JobSchedulingConfigI,
  JobSchedulingFieldTypes
} from 'types/jobSchedule';
import { JobScheduleTypes } from 'types/requests/jobScheduleRequest';
import { JobScheduleConfigurationI } from 'types/responses/jobScheduleResponses';
import { defaultSchedulingData, getEndOfDayTimestamp } from 'utils/utility';

export interface IJobSchedule {
  isLoading: boolean;
  jobSchedulingData: JobScheduleConfigurationI;
  jobScheduleLocalScope: JobScheduleLocalScopeI;
}

export const JobScheduleSlice = createSlice({
  name: 'jobSchedule',
  initialState: {
    isLoading: false,
    jobSchedulingData: defaultSchedulingData,
    jobScheduleLocalScope: {
      selectedJobScheduleType: 'training',
      selectedJobSchedulingData: defaultSchedulingData,
      currentEnableStatus: 1
    }
  } as IJobSchedule,
  reducers: {
    setJobScheduleConfig: (
      state,
      action: PayloadAction<{
        field: JobSchedulingFieldTypes;
        value: string | number | boolean;
      }>
    ) => {
      try {
        switch (action.payload.field) {
          case 'startDateTime':
            state.jobSchedulingData.startDate = action.payload.value as number;
            break;
          case 'frequency':
            state.jobSchedulingData.scheduleConfiguration.frequency = action.payload
              .value as JobSchedulingConfigI['frequency'];
            break;
          case 'scheduleType':
            state.jobSchedulingData.scheduleType = action.payload
              .value as JobScheduleConfigurationI['scheduleType'];
            state.jobSchedulingData.scheduleConfiguration.days =
              action.payload.value === 'DAILY' ? [] : [1];
            break;
          case 'repeatOnDays':
            state.jobSchedulingData.scheduleConfiguration.days = [action.payload.value as number];
            break;
          case 'endDate':
            state.jobSchedulingData.endDate = getEndOfDayTimestamp(
              action.payload.value as JobScheduleConfigurationI['endDate']
            );

            break;
          case 'etlValidation':
            state.jobSchedulingData.additionalConfig.etlValidation = action.payload
              .value as boolean;
            break;
          default:
            break;
        }
      } catch (e) {
        console.error('setJobScheduleConfig', e);
      }
    },
    clearJobScheduleConfig: (state) => {
      state.jobSchedulingData = {
        ...state.jobSchedulingData,
        scheduleConfiguration: {
          days: [],
          frequency: null
        },
        previousEnableStatus: 1,
        currentEnableStatus: 1,
        endDate: null,
        executionDetails: null,
        scheduleType: '',
        startDate: null,
        additionalConfig: {
          etlValidation: false
        }
      };
    },
    getJobSchedulesRequest: (state, action: PayloadAction<'fc' | 'repl'>) => {
      state.isLoading = true;
    },
    getJobSchedulesSuccess: (
      state,
      action: PayloadAction<{
        data: JobScheduleConfigurationI;
      }>
    ) => {
      const { data } = action.payload;
      const scheduleTypeMapping: any = {
        MONTHLY: 'Months',
        WEEKLY: 'Weeks',
        DAILY: 'Days'
      };

      if (data) {
        data.scheduleType = scheduleTypeMapping[data.scheduleType!];
      }

      state.isLoading = false;
      state.jobSchedulingData = data ?? defaultSchedulingData;
      state.jobScheduleLocalScope.currentEnableStatus = data?.previousEnableStatus ?? 1;
      state.jobScheduleLocalScope.selectedJobSchedulingData = data ?? defaultSchedulingData;
    },
    getJobSchedulesFailure: (state) => {
      state.isLoading = false;
      state.jobSchedulingData = defaultSchedulingData;
      state.jobScheduleLocalScope.selectedJobSchedulingData = defaultSchedulingData;
    },

    createScheduleRequest: (state, action: PayloadAction<'fc' | 'repl'>) => {
      state.isLoading = true;
    },
    createScheduleSuccess: (state, action) => {
      state.isLoading = false;
    },
    createScheduleFailure: (state) => {
      state.isLoading = false;
    },
    setSelectedJobScheduleType: (state, action: PayloadAction<JobScheduleTypes>) => {
      state.jobScheduleLocalScope.selectedJobScheduleType = action.payload;
    },
    updateJobScheduleState: (state, action: PayloadAction<0 | 1>) => {
      state.jobScheduleLocalScope.currentEnableStatus = action.payload;
    },
    removeScheduleJobRequest: (state) => {
      state.isLoading = true;
    },
    removeScheduleJobSuccess: (state) => {
      state.isLoading = false;
    },
    removeScheduleJobFailure: (state) => {
      state.isLoading = false;
    }
  }
});

export const jobScheduleSliceSelector = (state: IRootState) => state.jobSchedule;

export const {
  setJobScheduleConfig,
  createScheduleRequest,
  createScheduleSuccess,
  createScheduleFailure,
  getJobSchedulesRequest,
  getJobSchedulesSuccess,
  getJobSchedulesFailure,
  setSelectedJobScheduleType,
  updateJobScheduleState,
  removeScheduleJobRequest,
  removeScheduleJobSuccess,
  removeScheduleJobFailure,
  clearJobScheduleConfig
} = JobScheduleSlice.actions;

export default JobScheduleSlice.reducer;
