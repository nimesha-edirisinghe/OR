export const menuResponse = {
  status: 1,
  message: 'Menu fetched successfully',
  data: {
    askMaya: {
      iconName: 'maya',
      displayName: 'askMaya',
      path: '/app/maya',
      accessType: 'S',
      subMenu: null
    },
    Home: {
      iconName: 'home',
      displayName: 'Home',
      path: '/app/home',
      accessType: 'S',
      subMenu: null
    },
    Insights: {
      iconName: 'insights',
      displayName: 'Insights',
      path: null,
      accessType: 'S',
      subMenu: {
        'Inventory and Availability Dashboard': {
          path: '/app/report/inventory',
          iconName: 'inventoryAvailDashboard',
          displayName: 'Inventory and Availability Dashboard',
          accessType: 'S'
        },
        'Sales and Forecast Dashboard': {
          path: '/app/report/sales',
          iconName: 'salesForecastDashboard',
          displayName: 'Sales and Forecast Dashboard',
          accessType: 'S'
        },
        'Replenishment Summary': {
          path: '/app/insights/replenishment-summary',
          iconName: 'replenishment',
          displayName: 'Replenishment Summary',
          accessType: 'S'
        },
        'Forecast Summary': {
          path: '/app/insights/forecast-summary',
          iconName: 'forecasting',
          displayName: 'Forecast Summary',
          accessType: 'S'
        }
      }
    },
    'Predictive Alerts': {
      iconName: 'predictiveAlerts',
      displayName: 'Predictive Alerts',
      path: '/app/predictive-alerts',
      accessType: 'S',
      subMenu: null
    },
    'Demand Forecasts': {
      iconName: 'demandForecast',
      displayName: 'Demand Forecasts',
      path: null,
      accessType: 'S',
      subMenu: {
        'Discounts & Promotions': {
          path: '/app/promotion-summary',
          iconName: 'promotionSummary',
          displayName: 'Discounts & Promotions',
          accessType: 'S'
        },
        'Store Forecasts': {
          path: '/app/demand-forecast',
          iconName: 'demandForecasting',
          displayName: 'Store Forecasts',
          accessType: 'S'
        },
        'Warehouse Forecasts': {
          path: '/app/wh-forecast',
          iconName: 'warehouseForecasting',
          displayName: 'Warehouse Forecasts',
          accessType: 'S'
        }
      }
    },
    'Replenishment Recommendations': {
      iconName: 'replenishmentRecommendations',
      displayName: 'Replenishment Recommendations',
      path: null,
      accessType: 'S',
      subMenu: {
        'Order Parameters': {
          path: '/app/order-parameter',
          iconName: 'orderParameters',
          displayName: 'Order Parameters',
          accessType: 'S'
        },
        'Store Replenishment and DSD': {
          path: '/app/replenishment-planning',
          iconName: 'replenishmentPlanning',
          displayName: 'Store Replenishment and DSD',
          accessType: 'S'
        },
        'WH Ordering': {
          path: '/app/wh-replenishment',
          iconName: 'whReplenishment',
          displayName: 'WH Ordering',
          accessType: 'S'
        },
        'Distribution Network': {
          path: '/app/distribution-network',
          iconName: 'distributionNetwork',
          displayName: 'Distribution Network',
          accessType: 'S'
        }
      }
    },
    Products: {
      iconName: 'products',
      displayName: 'Products',
      path: null,
      accessType: 'S',
      subMenu: {
        'New Product Activation': {
          path: '/app/products/new-activation',
          iconName: 'newProductActivation',
          displayName: 'New Product Activation',
          accessType: 'S'
        },
        'Product Discontinuation': {
          path: '/app/product-discount',
          iconName: 'productDiscontinuation',
          displayName: 'Product Discontinuation',
          accessType: 'S'
        }
      }
    },
    Stores: {
      iconName: 'stores',
      displayName: 'Stores',
      path: null,
      accessType: 'S',
      subMenu: {
        'New Store Activation': {
          path: '/app/stores/new-activation',
          iconName: 'newStoreActivation',
          displayName: 'New Store Activation',
          accessType: 'S'
        },
        'Store Discontinuation': {
          path: '/app/store-discount',
          iconName: 'storeDiscontinuation',
          displayName: 'Store Discontinuation',
          accessType: 'S'
        }
      }
    },
    'Order Review and Approval': {
      iconName: 'orderReviewAndApproval',
      displayName: 'Order Review and Approval',
      path: '/',
      accessType: 'S',
      subMenu: {
        'View Plans and Request Orders': {
          path: '/app/vl/po-repl-req',
          iconName: 'vlPoReplenishmentReq',
          displayName: 'View Plans and Request Orders',
          accessType: 'S'
        },
        'Track Order Requests': {
          path: '/app/vl/task-board',
          iconName: 'vlMenu',
          displayName: 'Track Order Requests',
          accessType: 'S'
        }
      }
    },
    Monitoring: {
      iconName: 'monitoringResolution',
      displayName: 'Monitoring',
      path: null,
      accessType: 'S',
      subMenu: {
        'Data Ingestion': {
          path: '/app/data-ingestion-summary',
          iconName: 'dataIngestionSummary',
          displayName: 'Data Ingestion',
          accessType: 'S'
        },
        'Algorithm Execution': {
          path: '/app/operations-tracker',
          iconName: 'operationsTracker',
          displayName: 'Algorithm Execution',
          accessType: 'S'
        }
      }
    },
    Settings: {
      iconName: 'settings',
      displayName: 'Settings',
      path: null,
      accessType: 'S',
      subMenu: {
        'Anchor Configuration': {
          path: '/app/anchor-config',
          iconName: 'anchorConfiguration',
          displayName: 'Anchor Configuration',
          accessType: 'S'
        },
        'Group Configuration': {
          path: '/app/group-config',
          iconName: 'groupConfiguration',
          displayName: 'Group Configuration',
          accessType: 'V'
        },
        'Forecasting Setup and Scheduling': {
          path: '/app/config',
          iconName: 'forecastConfiguration',
          displayName: 'Forecasting Setup and Scheduling',
          accessType: 'S'
        },
        'Replenishment Setup and Scheduling': {
          path: '/app/replenishment-configs',
          iconName: 'replenishmentConfiguration',
          displayName: 'Replenishment Setup and Scheduling',
          accessType: 'S'
        },
        'Alert Creation': {
          path: '/app/predictive-alerts/create',
          iconName: 'alertCreation',
          displayName: 'Alert Creation',
          accessType: 'S'
        }
      }
    }
  }
};
