import { JobScheduleTypes } from './requests/jobScheduleRequest';
import { JobScheduleConfigurationI } from './responses/jobScheduleResponses';

export interface FCStartOnI {
  dateTime: string;
}

export interface JobSchedulingConfigI {
  days: number[] | [];
  frequency: number | null;
}

export type JobSchedulingFieldTypes =
  | 'startDateTime'
  | 'frequency'
  | 'scheduleType'
  | 'repeatOnDays'
  | 'endDate'
  | 'etlValidation';

export interface WeekDay {
  id: number;
  label: string;
  value: string;
}

export interface JobScheduleLocalScopeI {
  selectedJobScheduleType: JobScheduleTypes;
  selectedJobSchedulingData: JobScheduleConfigurationI;
  currentEnableStatus: null | 0 | 1;
}
