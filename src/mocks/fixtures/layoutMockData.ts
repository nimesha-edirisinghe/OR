export const menuResponse = {
  status: 1,
  message: 'Menu fetched successfully',
  data: {
    askMaya: {
      iconName: 'maya',
      displayName: 'askMaya',
      path: '/app/maya',
      subMenu: null
    },
    Home: {
      iconName: 'home',
      displayName: 'Home',
      path: '/app/home',
      subMenu: null
    },
    Insights: {
      iconName: 'insights',
      displayName: 'Insights',
      path: null,
      subMenu: {
        'Inventory and Availability Dashboard': {
          path: '/app/report/inventory',
          iconName: 'inventoryAvailDashboard',
          displayName: 'Inventory and Availability Dashboard'
        },
        'Sales and Forecast Dashboard': {
          path: '/app/report/sales',
          iconName: 'salesForecastDashboard',
          displayName: 'Sales and Forecast Dashboard'
        },
        'Replenishment Summary': {
          path: '/app/insights/replenishment-summary',
          iconName: 'replenishment',
          displayName: 'Replenishment Summary'
        },
        'Forecast Summary': {
          path: '/app/insights/forecast-summary',
          iconName: 'forecasting',
          displayName: 'Forecast Summary'
        }
      }
    },
    'Predictive Alerts': {
      iconName: 'predictiveAlerts',
      displayName: 'Predictive Alerts',
      path: '/app/predictive-alerts',
      subMenu: null
    },
    'Demand Forecasts': {
      iconName: 'demandForecast',
      displayName: 'Demand Forecasts',
      path: null,
      subMenu: {
        'Discounts & Promotions': {
          path: '/app/promotion-summary',
          iconName: 'promotionSummary',
          displayName: 'Discounts & Promotions'
        },
        'Store Forecasts': {
          path: '/app/demand-forecast',
          iconName: 'demandForecasting',
          displayName: 'Store Forecasts'
        },
        'Warehouse Forecasts': {
          path: '/app/wh-forecast',
          iconName: 'warehouseForecasting',
          displayName: 'Warehouse Forecasts'
        }
      }
    },
    'Replenishment Recommendations': {
      iconName: 'replenishmentRecommendations',
      displayName: 'Replenishment Recommendations',
      path: null,
      subMenu: {
        'Order Parameters': {
          path: '/app/order-parameter',
          iconName: 'orderParameters',
          displayName: 'Order Parameters'
        },
        'Store Replenishment and DSD': {
          path: '/app/replenishment-planning',
          iconName: 'replenishmentPlanning',
          displayName: 'Store Replenishment and DSD'
        },
        'WH Ordering': {
          path: '/app/wh-replenishment',
          iconName: 'whReplenishment',
          displayName: 'WH Ordering'
        },
        'Distribution Network': {
          path: '/app/distribution-network',
          iconName: 'distributionNetwork',
          displayName: 'Distribution Network'
        }
      }
    },
    Products: {
      iconName: 'products',
      displayName: 'Products',
      path: null,
      subMenu: {
        'New Product Activation': {
          path: '/app/products/new-activation',
          iconName: 'newProductActivation',
          displayName: 'New Product Activation'
        },
        'Product Discontinuation': {
          path: '/app/product-discount',
          iconName: 'productDiscontinuation',
          displayName: 'Product Discontinuation'
        }
      }
    },
    Stores: {
      iconName: 'stores',
      displayName: 'Stores',
      path: null,
      subMenu: {
        'New Store Activation': {
          path: '/app/stores/new-activation',
          iconName: 'newStoreActivation',
          displayName: 'New Store Activation'
        },
        'Store Discontinuation': {
          path: '/app/store-discount',
          iconName: 'storeDiscontinuation',
          displayName: 'Store Discontinuation'
        }
      }
    },
    'Order Review and Approval': {
      iconName: 'orderReviewAndApproval',
      displayName: 'Order Review and Approval',
      path: '/',
      subMenu: {
        'View Plans and Request Orders': {
          path: '/app/vl/po-repl-req',
          iconName: 'vlPoReplenishmentReq',
          displayName: 'View Plans and Request Orders'
        },
        'Track Order Requests': {
          path: '/app/vl/task-board',
          iconName: 'vlMenu',
          displayName: 'Track Order Requests'
        }
      }
    },
    Monitoring: {
      iconName: 'monitoringResolution',
      displayName: 'Monitoring',
      path: null,
      subMenu: {
        'Data Ingestion': {
          path: '/app/data-ingestion-summary',
          iconName: 'dataIngestionSummary',
          displayName: 'Data Ingestion'
        },
        'Algorithm Execution': {
          path: '/app/operations-tracker',
          iconName: 'operationsTracker',
          displayName: 'Algorithm Execution'
        }
      }
    },
    Settings: {
      iconName: 'settings',
      displayName: 'Settings',
      path: null,
      subMenu: {
        'Anchor Configuration': {
          path: '/app/anchor-config',
          iconName: 'anchorConfiguration',
          displayName: 'Anchor Configuration'
        },
        'Group Configuration': {
          path: '/app/group-config',
          iconName: 'groupConfiguration',
          displayName: 'Group Configuration'
        },
        'Forecasting Setup and Scheduling': {
          path: '/app/config',
          iconName: 'forecastConfiguration',
          displayName: 'Forecasting Setup and Scheduling'
        },
        'Replenishment Setup and Scheduling': {
          path: '/app/replenishment-configs',
          iconName: 'replenishmentConfiguration',
          displayName: 'Replenishment Setup and Scheduling'
        },
        'Alert Creation': {
          path: '/app/predictive-alerts/create',
          iconName: 'alertCreation',
          displayName: 'Alert Creation'
        }
      }
    }
  }
};
