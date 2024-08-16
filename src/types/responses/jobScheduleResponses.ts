import { JobSchedulingConfigI } from 'types/jobSchedule';
import { FCRunNowReqPayloadI } from 'types/requests/forecastConfigRequests';

export type ScheduleType = 'DAILY' | 'WEEKLY' | 'MONTHLY' | '' | null;
export interface JobScheduleResponseI {
  totalJobCount: number;
  scheduleBatchId: string;
}

export interface JobScheduleConfigurationI {
  scheduleConfiguration: JobSchedulingConfigI;
  endDate: number | null;
  previousEnableStatus: 0 | 1;
  currentEnableStatus: null | 0 | 1;
  executionDetails: FCRunNowReqPayloadI | null;
  scheduleType: string | null;
  startDate: number | null;
  scheduleBatchId: string | null;
  additionalConfig: { etlValidation: boolean };
  [key: string]: any;
}
