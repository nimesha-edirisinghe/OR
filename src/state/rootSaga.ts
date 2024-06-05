import { fork } from 'redux-saga/effects';
import userSaga from './user/userSaga';
import layoutSaga from './layout/layoutSaga';
import forecastConfigSaga from './pages/advancedConfiguration/forecastConfigurationPage/pageSaga';
import insightSaga from './pages/insights/insightSaga';
import replenishmentConfigSaga from './pages/advancedConfiguration/replenishmentConfigurationPage/rplConfigPageSaga';
import dfViewSaga from './pages/view/demandForecastView/dfViewPageSaga';
import dfWhViewSaga from './pages/view/whDemandForecastView/whDfViewPageSaga';
import rplViewSaga from './pages/view/replenishmentView/rplViewPageSaga';
import rplWhViewSaga from './pages/view/whReplenishmentView/whRplViewSaga';
import activityLogSaga from './pages/operationAndMonitoring/activityLog/activityLogSaga';
import jobSchedulingSaga from './pages/shared/jobScheduling/jobSchedulingSaga';
import groupConfigurationSaga from './pages/advancedConfiguration/groupConfiguration/groupConfigurationSaga';
import alertConfigurationSaga from './pages/monitoringAndResolution/Alert/alertSaga';
import sharedGroupConfig from './pages/shared/groupConfig/groupConfigSaga';
import mayaSaga from './pages/chatWithMaya/chatWithMayaSaga';
import dataIngestionSummaryViewSaga from './pages/monitoringAndResolution/dataIngestionSummaryView/dataIngestionSummaryViewSaga';
import promotionSummaryViewSaga from './pages/monitoringAndResolution/promotionSummaryView/promotionSummaryViewSaga';
import orderParameterSaga from './pages/replenishmentRecommendation/orderParameter/orderParameterSaga';
import commonSaga from './pages/common/commonSaga';
import dashboardSaga from './pages/dashboard/dashboardSaga';
import newStoreActivationSaga from './pages/stores/newActivation/storeNewActivationSaga';
import newProductActivationSaga from './pages/product/newActivation/productNewActivationSaga';
import forecastAnalyzerSaga from './pages/view/forecastAnalyzer/forecastAnalyzerSaga';

export interface GeneralResponse {
  data?: any;
  status?: number;
  json: () => { data: [] };
}

export default function* rootSaga() {
  yield fork(layoutSaga);
  yield fork(forecastConfigSaga);
  yield fork(userSaga);
  yield fork(insightSaga);
  yield fork(replenishmentConfigSaga);
  yield fork(dfViewSaga);
  yield fork(dfWhViewSaga);
  yield fork(rplViewSaga);
  yield fork(activityLogSaga);
  yield fork(jobSchedulingSaga);
  yield fork(groupConfigurationSaga);
  yield fork(alertConfigurationSaga);
  yield fork(sharedGroupConfig);
  yield fork(mayaSaga);
  yield fork(rplWhViewSaga);
  yield fork(dataIngestionSummaryViewSaga);
  yield fork(promotionSummaryViewSaga);
  yield fork(orderParameterSaga);
  yield fork(commonSaga);
  yield fork(dashboardSaga);
  yield fork(newStoreActivationSaga);
  yield fork(newProductActivationSaga);
  yield fork(forecastAnalyzerSaga);
}
