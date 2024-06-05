import TableauForecastDashboardPage from 'pages/Dashboard/TableauForecastDashboardPage';
import TableauInventoryDashboardPage from 'pages/Dashboard/TableauInventoryDashboardPage';
import ForecastSummaryPage from 'pages/Insights/ForecastSummaryPage/ForecastSummaryPage';
import InsightsPage from 'pages/Insights/InsightsPage';
import ReplenishmentSummaryPage from 'pages/Insights/ReplenishmentSummaryPage/ReplenishmentSummaryPage';
import VL from 'pages/VL/VL';
import VLPOReplenishmentRequest from 'pages/VL/VLPOReplenishmentRequest';

export const dashboardRoutes = {
  path: 'report',
  children: [
    {
      path: 'inventory',
      element: <TableauInventoryDashboardPage />
    },
    {
      path: 'sales',
      element: <TableauForecastDashboardPage />
    }
  ]
};

export const vlRoutes = {
  path: 'vl',
  children: [
    {
      index: true,
      path: 'task-board',
      element: <VL />
    },
    {
      path: 'po-repl-req',
      element: <VLPOReplenishmentRequest />
    }
  ]
};
export const overviewRoutes = {
  path: 'insights',
  children: [
    {
      index: true,
      element: <InsightsPage />
    },
    {
      path: 'forecast-summary',
      element: <ForecastSummaryPage />
    },
    {
      path: 'replenishment-summary',
      element: <ReplenishmentSummaryPage />
    }
  ]
};
