import { handlers as userHandlers } from './domains/users';
import { handlers as orgHandlers } from './domains/organizations';
import { handlers as insightHandlers } from './domains/insights';
import { handlers as layoutHandlers } from './domains/layout';
import { handlers as viewHandlers } from './domains/view';
import { handlers as operationsAndMonitoringHandlers } from './domains/operationsAndMonitoring';
import { handlers as jobScheduleHandlers } from './domains/jobSchedule';
import { handlers as filter } from './domains/filter';
import { handlers as alertConfiguration } from './domains/alertConfiguration';
import { handlers as groups } from './domains/groups';
import { handlers as viewForecast } from './domains/viewForecast';
import { handlers as viewReplenishment } from './domains/viewReplenishment';
import { handlers as maya } from './domains/maya';
import { handlers as dataIngestionSummaryView } from './domains/dataIngestionSummaryView';
import { handlers as promotionSummaryView } from './domains/promotionSummaryView';
import { handlers as forecastAnalyzer } from './domains/demandForecast/forecastAnalyzer';
import { handlers as common } from './domains/common/common';

export const handlers = [
  ...userHandlers,
  ...orgHandlers,
  ...insightHandlers,
  ...layoutHandlers,
  ...viewHandlers,
  ...operationsAndMonitoringHandlers,
  ...jobScheduleHandlers,
  ...filter,
  ...alertConfiguration,
  ...groups,
  ...viewForecast,
  ...viewReplenishment,
  ...maya,
  ...dataIngestionSummaryView,
  ...promotionSummaryView,
  ...forecastAnalyzer,
  ...common
];
