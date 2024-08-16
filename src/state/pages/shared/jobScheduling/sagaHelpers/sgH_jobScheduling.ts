import { TableDataI } from 'types/forecastConfig';
import { RplConfigTableDataI } from 'types/replenishmentConfig';
import { JobScheduleRequestI, JobScheduleTypes } from 'types/requests/jobScheduleRequest';
import { JobScheduleConfigurationI } from 'types/responses/jobScheduleResponses';
import { JobExecutionTypesEnum, JobGroupTypes } from 'utils/enum';

export const getJobGroupTypeByTab = (tab: JobScheduleTypes): JobGroupTypes => {
  switch (tab) {
    case 'training':
      return JobGroupTypes.TRAINING;
    case 'forecasting':
      return JobGroupTypes.FORECASTING;
    default:
      return JobGroupTypes.INV_PLAN_GENERATION;
  }
};

const scheduleTypeMapping: any = {
  Months: 'MONTHLY',
  Weeks: 'WEEKLY',
  Days: 'DAILY'
};

export const executionDetailsFormatter = (
  currentModule: 'fc' | 'repl',
  orgKey: number,
  selectedJobScheduleType: JobScheduleTypes,
  selectedConfigRowObj?: TableDataI,
  selectedReplConfigRowObj?: RplConfigTableDataI
) => {
  if (currentModule === 'fc') {
    return {
      anchorCount: selectedConfigRowObj?.groupDetails.anchorCount,
      execType: JobExecutionTypesEnum.SCHEDULED,
      forecastKey: selectedConfigRowObj?.groupDetails.forecastKey,
      groupKey: selectedConfigRowObj?.groupDetails.groupKey,
      invPlanKey: null,
      jobGroupName: selectedConfigRowObj?.groupDetails.groupName,
      jobGroupType: getJobGroupTypeByTab(selectedJobScheduleType),
      orgKey: orgKey,
      skuCount: selectedConfigRowObj?.groupDetails.skuCount
    };
  } else {
    return {
      anchorCount: null,
      execType: JobExecutionTypesEnum.SCHEDULED,
      forecastKey: selectedReplConfigRowObj?.forecastKey,
      groupKey: selectedReplConfigRowObj?.groupKey,
      invPlanKey: selectedReplConfigRowObj?.invPlanKey,
      jobGroupName: selectedReplConfigRowObj?.groupName,
      jobGroupType: getJobGroupTypeByTab(selectedJobScheduleType),
      orgKey: orgKey,
      skuCount: selectedReplConfigRowObj?.skuCount
    };
  }
};

export const createJobSchedulingRequestFormatter = (
  currentModule: 'fc' | 'repl',
  jobSchedulingConfig: JobScheduleConfigurationI,
  orgKey: number,
  selectedJobScheduleType: JobScheduleTypes,
  currentEnableStatus: null | 0 | 1,
  selectedConfigRowObj?: TableDataI,
  selectedReplConfigRowObj?: RplConfigTableDataI
) => {
  const request: JobScheduleRequestI = {
    endDate: jobSchedulingConfig.endDate,
    executionDetails: executionDetailsFormatter(
      currentModule,
      orgKey,
      selectedJobScheduleType,
      selectedConfigRowObj,
      selectedReplConfigRowObj
    ),
    scheduleBatchId: jobSchedulingConfig.scheduleBatchId,
    previousEnableStatus: jobSchedulingConfig.previousEnableStatus,
    currentEnableStatus: currentEnableStatus,
    scheduleConfiguration: jobSchedulingConfig.scheduleConfiguration,
    scheduleType: scheduleTypeMapping[jobSchedulingConfig.scheduleType!],
    startDate: Number(jobSchedulingConfig.startDate),
    additionalConfig: {
      etlValidation: jobSchedulingConfig.additionalConfig.etlValidation
    }
  };

  return request;
};
