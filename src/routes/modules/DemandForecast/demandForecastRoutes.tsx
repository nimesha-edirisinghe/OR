import PromotionSummaryView from 'pages/MonitoringResolution/PromotionSummaryView/PromotionSummaryView';
import PromotionSummaryViewPage from 'pages/MonitoringResolution/PromotionSummaryView/PromotionSummaryViewPage/PromotionSummaryViewPage';
import BulkEditPage from 'pages/View/DemandForecasting/BulkEditPage/BulkEditPage';
import DemandForecastViewPage from 'pages/View/DemandForecasting/DemandForecastViewPage/DemandForecastViewPage';
import DemandForecastingPage from 'pages/View/DemandForecasting/DemandForecastingPage';
import AggregatedForecastAnalyzerPage from 'pages/View/DemandForecasting/ForecastAnalyzerPage/AggregatedForecastAnalyzerPage/AggregatedForecastAnalyzerPage';
import IndividualForecastAnalyzerPage from 'pages/View/DemandForecasting/ForecastAnalyzerPage/IndividualForecastAnalyzerPage/IndividualForecastAnalyzerPage';
import DemandGridViewPanel from 'pages/View/DemandForecasting/MainSection/GridView/DemandGridViewPanel';
import WHGridViewPanel from 'pages/View/WHDemandForecasting/MainSection/GridViewPanel/WHGridViewPanel';
import WHDemandForecastViewPage from 'pages/View/WHDemandForecasting/WHDemandForecastViewPage/WHDemandForecastViewPage';
import WHDemandForecastingPage from 'pages/View/WHDemandForecasting/WHDemandForecastingPage';

export const storeForecastRoutes = {
  path: 'demand-forecast',
  children: [
    {
      index: true,
      element: <DemandForecastingPage />
    },
    {
      path: 'bulk-edit',
      element: <BulkEditPage />
    },
    {
      path: 'view',
      element: <DemandForecastViewPage />
    },
    {
      path: 'aggregated-forecast-analyzer',
      element: <AggregatedForecastAnalyzerPage />
    },
    {
      path: 'individual-forecast-analyzer',
      element: <IndividualForecastAnalyzerPage />
    },
    {
      path: 'view/grid',
      element: <DemandGridViewPanel />
    }
  ]
};

export const promotionSummaryRoutes = {
  path: 'promotion-summary',
  children: [
    {
      index: true,
      element: <PromotionSummaryView />
    },
    {
      path: 'view',
      element: <PromotionSummaryViewPage />
    }
  ]
};

export const whForecastRoutes = {
  path: 'wh-forecast',
  children: [
    {
      index: true,
      element: <WHDemandForecastingPage />
    },
    {
      path: 'view',
      element: <WHDemandForecastViewPage />
    },
    {
      path: 'view/grid',
      element: <WHGridViewPanel />
    }
  ]
};
