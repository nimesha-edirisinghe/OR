import { ScheduleType } from 'types/responses/jobScheduleResponses';

export type JobScheduleTypes = 'training' | 'forecasting' | 'replenishmentPlan';
export interface JobScheduleExecDetailsI {
  anchorCount?: number | null;
  groupKey?: number;
  jobGroupName?: string;
  jobGroupType: number;
  orgKey: number;
  forecastKey?: number | null;
  invPlanKey?: number | null;
  skuCount?: number;
  execType?: 'On-Request' | 'Scheduled';
}

export interface JobScheduleConfigI {
  days: number[];
  frequency: number | null;
}

export interface JobScheduleRequestI {
  scheduleConfiguration: JobScheduleConfigI;
  endDate: number | null;
  executionDetails: JobScheduleExecDetailsI;
  scheduleType: string;
  startDate: number | null;
  additionalConfig: { etlValidation: boolean };
  scheduleBatchId?: string | null;
  previousEnableStatus: 0 | 1;
  currentEnableStatus: 0 | 1 | null;
}

export interface GetJobSchedulesQueryParamI {
  groupKey?: number;
  orgKey: number;
  type: JobScheduleTypes;
}
export interface JobScheduleActionsQueryParamI {
  orgKey: number;
  scheduleId: string | null;
  scheduleType: ScheduleType;
}
