import { IUser } from './user/userState';
import { ILayout } from './layout/layoutState';
import userReducer from 'state/user/userState';
import layoutReducer from 'state/layout/layoutState';
import pageReducer, {
  IPage
} from 'state/pages/advancedConfiguration/forecastConfigurationPage/pageState';
import { toastReducer } from 'state/toast/toastState';
import { IInsight } from './pages/insights/insightState';
import insightReducer from './pages/insights/insightState';
import replenishmentConfigReducer from './pages/advancedConfiguration/replenishmentConfigurationPage/rplConfigPageState';
import { IReplenishmentConfigPage } from './pages/advancedConfiguration/replenishmentConfigurationPage/rplConfigPageState';
import { IDFView } from './pages/view/demandForecastView/dfViewPageState';
import dfViewReducer from './pages/view/demandForecastView/dfViewPageState';
import { combineReducers } from 'redux';

import { IRPLView } from './pages/view/replenishmentView/rplViewPageState';
import rplViewReducer from './pages/view/replenishmentView/rplViewPageState';
import rplWhViewReducer, { IRPLWhView } from './pages/view/whReplenishmentView/whRplViewState';
import activityLogReducer, {
  IActivityLogSlice
} from './pages/operationAndMonitoring/activityLog/activityLogState';
import jobScheduleReducer, { IJobSchedule } from './pages/shared/jobScheduling/jobSchedulingState';
import groupConfigurationReducer, {
  IGroupConfigurationSlice
} from './pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import alertReducer, { IAlert } from './pages/monitoringAndResolution/Alert/alertState';
import sharedGroupConfigReducer, {
  IGroupConfig
} from './pages/shared/groupConfig/groupConfigState';
import chatWithMayaReducer, { IChatWithMayaSlice } from './pages/chatWithMaya/chatWithMayaState';
import dfWhViewReducer, { IWhDFView } from './pages/view/whDemandForecastView/whDfViewPageState';
import promotionSummaryViewReducer, {
  IPromotionSummaryView
} from './pages/monitoringAndResolution/promotionSummaryView/promotionSummaryViewState';
import dataIngestionSummaryViewReducer, {
  IDataIngestionSummaryView
} from './pages/monitoringAndResolution/dataIngestionSummaryView/dataIngestionSummaryViewState';
import orderParameterReducer, {
  IOrderParameter
} from './pages/replenishmentRecommendation/orderParameter/orderParameterState';
import commonReducer, { ICommon } from './pages/common/commonState';
import dashboardReducer, { IDashboard } from './pages/dashboard/dashboardState';
import storeNewActivationReducer, {
  IStoreNewActivationView
} from './pages/stores/newActivation/storeNewActivationState';
import productNewActivationReducer, {
  IProductNewActivationView
} from './pages/product/newActivation/productNewActivationState';
import forecastAnalyzerReducer, {
  IForecastAnalyzer
} from './pages/view/forecastAnalyzer/forecastAnalyzerState';
import homeReducer, { IHome } from './pages/home/homeState';
import systemConfigurationReducer, {
  ISystemConfiguration
} from './pages/systemConfiguration/systemConfigurationState';

export interface IRootState {
  user: IUser;
  layout: ILayout;
  fcConfigPage: IPage;
  rplConfigPage: IReplenishmentConfigPage;
  insight: IInsight;
  dfView: IDFView;
  dfWhView: IWhDFView;
  rplView: IRPLView;
  rplWhView: IRPLWhView;
  activityLog: IActivityLogSlice;
  jobSchedule: IJobSchedule;
  groupConfiguration: IGroupConfigurationSlice;
  alert: IAlert;
  sharedGroupConfig: IGroupConfig;
  chatWithMaya: IChatWithMayaSlice;
  dataIngestionSummaryView: IDataIngestionSummaryView;
  promotionSummaryView: IPromotionSummaryView;
  storeNewActivation: IStoreNewActivationView;
  orderParameter: IOrderParameter;
  common: ICommon;
  dashboard: IDashboard;
  productNewActivation: IProductNewActivationView;
  forecastAnalyzer: IForecastAnalyzer;
  home: IHome;
  systemConfigurations: ISystemConfiguration;
}

export const rootReducer = combineReducers({
  user: userReducer,
  layout: layoutReducer,
  fcConfigPage: pageReducer,
  toast: toastReducer,
  insight: insightReducer,
  rplConfigPage: replenishmentConfigReducer,
  dfView: dfViewReducer,
  dfWhView: dfWhViewReducer,
  rplWhView: rplWhViewReducer,
  rplView: rplViewReducer,
  activityLog: activityLogReducer,
  jobSchedule: jobScheduleReducer,
  groupConfiguration: groupConfigurationReducer,
  alert: alertReducer,
  sharedGroupConfig: sharedGroupConfigReducer,
  chatWithMaya: chatWithMayaReducer,
  dataIngestionSummaryView: dataIngestionSummaryViewReducer,
  common: commonReducer,
  promotionSummaryView: promotionSummaryViewReducer,
  storeNewActivation: storeNewActivationReducer,
  orderParameter: orderParameterReducer,
  dashboard: dashboardReducer,
  productNewActivation: productNewActivationReducer,
  forecastAnalyzer: forecastAnalyzerReducer,
  home: homeReducer,
  systemConfigurations: systemConfigurationReducer
});
