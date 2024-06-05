import * as userApi from './endpoints/user';
import * as forecastConfigApi from './endpoints/forecastConfig';
import * as insightApi from './endpoints/insight';
import * as layoutApi from './endpoints/layout';
import * as replenishmentConfigApi from './endpoints/replenishmentConfig';
import * as viewApi from './endpoints/view';
import * as activityLogApi from './endpoints/activityLog';
import * as jobScheduleApi from './endpoints/jobSchedule';
import * as groupConfigApi from './endpoints/groupConfiguration';
import * as alertConfigApi from './endpoints/alertConfiguration';
import * as demandForecastApi from './endpoints/view/demandForecast';
import * as replenishmentViewApi from './endpoints/view/replenishmentView';
import * as genAiApi from './endpoints/chatWithMaya';
import * as dataIngestionSummaryViewApi from './endpoints/dataIngestionSummaryView';
import * as trainingSummaryApi from './endpoints/view/trainingSummary';
import * as promotionSummaryApi from './endpoints/promotionSummaryView';
import * as orderParameterApi from './endpoints/replenishmentRecommendation/orderParameter';
import * as commonApi from './endpoints/common/common';
import * as dashboardApi from './endpoints/dashboard/dashboard';
import * as forecastAnalyzerApi from './endpoints/view/forecastAnalyzer';

export {
  userApi,
  forecastConfigApi,
  insightApi,
  layoutApi,
  replenishmentConfigApi,
  viewApi,
  activityLogApi,
  jobScheduleApi,
  groupConfigApi,
  alertConfigApi,
  demandForecastApi,
  genAiApi,
  replenishmentViewApi,
  dataIngestionSummaryViewApi,
  trainingSummaryApi,
  orderParameterApi,
  promotionSummaryApi,
  commonApi,
  dashboardApi,
  forecastAnalyzerApi
};
