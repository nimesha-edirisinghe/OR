import OrderParameterPage from 'pages/ReplenishmentRecommendation/OrderParameter/OrderParameterPage';
import OrderParameterViewPage from 'pages/ReplenishmentRecommendation/OrderParameter/OrderParameterViewPage/OrderParameterViewPage';
import ReplBulkEditPage from 'pages/View/ReplenishmentPlanning/ReplBulkEditPage/ReplBulkEditPage';
import ReplenishmentPlanningPage from 'pages/View/ReplenishmentPlanning/ReplenishmentPlanningPage';
import ReplenishmentViewPage from 'pages/View/ReplenishmentPlanning/ReplenishmentViewPage/ReplenishmentViewPage';
import WHGridViewPage from 'pages/View/WHReplenishmentPlanning/WHGridViewPage/WHGridViewPage';
import WHReplBulkEditPage from 'pages/View/WHReplenishmentPlanning/WHReplBulkEditPage/WHReplBulkEditPage';
import WHReplenishmentPlanning from 'pages/View/WHReplenishmentPlanning/WHReplenishmentPlanning';
import WHReplenishmentViewPage from 'pages/View/WHReplenishmentPlanning/WHReplenishmentViewPage/WHReplenishmentViewPage';
import GridViewPage from 'pages/View/ReplenishmentPlanning/GridViewPage/GridViewPage';

export const orderParameterRoutes = {
  path: 'order-parameter',
  children: [
    {
      index: true,
      element: <OrderParameterPage />
    },
    {
      path: 'view',
      element: <OrderParameterViewPage />
    }
  ]
};

export const storeReplenishmentPlanningRoutes = {
  path: 'replenishment-planning',
  children: [
    {
      index: true,
      element: <ReplenishmentPlanningPage />
    },
    {
      path: 'bulk-edit',
      element: <ReplBulkEditPage />
    },
    {
      path: 'view',
      element: <ReplenishmentViewPage />
    },
    {
      path: 'grid-view',
      element: <GridViewPage />
    }
  ]
};

export const whOrderingRoutes = {
  path: 'wh-replenishment',
  children: [
    {
      index: true,
      element: <WHReplenishmentPlanning />
    },
    {
      path: 'bulk-edit',
      element: <WHReplBulkEditPage />
    },
    {
      path: 'view',
      element: <WHReplenishmentViewPage />
    },
    {
      path: 'grid-view',
      element: <WHGridViewPage />
    }
  ]
};
