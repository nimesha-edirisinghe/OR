import Module from 'pages/Modules';
import AppLayout from 'layouts/AppLayout';
import Home from 'pages/Home';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AccessDeniedPage from 'pages/Common/AccessDeniedPage';
import ModuleLayout from 'layouts/ModuleLayout';
import { homeRoutes } from './modules/Home/homeRoutes';
import { dashboardRoutes, overviewRoutes, vlRoutes } from './modules/Insights/dashboardRoutes';
import { predictiveAlertRoutes } from './modules/PredictiveAlert/predictiveAlertRoutes';
import {
  promotionSummaryRoutes,
  storeForecastRoutes,
  whForecastRoutes
} from './modules/DemandForecast/demandForecastRoutes';
import {
  orderParameterRoutes,
  storeReplenishmentPlanningRoutes,
  whOrderingRoutes
} from './modules/ReplenishmentRecommendation/replenishmentRecommendationRoutes';
import { mayaRoutes } from './modules/Maya/mayaRoutes';
import {
  algorithmExecutionRoutes,
  dataIngestionSummaryRoutes
} from './modules/Monitoring/monitoringRoutes';
import {
  forecastConfigurationRoutes,
  groupConfigurationRoutes,
  replenishmentConfigurationRoutes
} from './modules/Settings/settingsRoutes';
import { unAuthorizedRoutes } from './modules/Unauthorized/unauthorizedRoutes';
import { productsRoutes } from './modules/Products/productsRoutes';
import { storesRoutes } from './modules/Stores/storesRoutes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/accessdenied',
    element: <AccessDeniedPage />
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: '/app',
        element: <AppLayout />,
        children: [
          mayaRoutes,
          homeRoutes,
          dashboardRoutes,
          predictiveAlertRoutes,
          storeForecastRoutes,
          orderParameterRoutes,
          storeReplenishmentPlanningRoutes,
          whOrderingRoutes,
          promotionSummaryRoutes,
          whForecastRoutes,
          dataIngestionSummaryRoutes,
          algorithmExecutionRoutes,
          forecastConfigurationRoutes,
          groupConfigurationRoutes,
          productsRoutes,
          storesRoutes,
          replenishmentConfigurationRoutes,
          vlRoutes,
          overviewRoutes,
          unAuthorizedRoutes
        ]
      },
      {
        path: '/modules',
        element: <ModuleLayout />,
        children: [
          {
            element: <Module />,
            index: true
          }
        ]
      },
      {
        path: '*',
        element: <Navigate to="/app/unauthorized" replace />
      }
    ]
  }
]);

export default router;
