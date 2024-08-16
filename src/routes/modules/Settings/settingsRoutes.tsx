import ForecastConfigurationsPage from 'pages/AdvancedConfiguration/ForecastConfiguration/ForecastConfigurationsPage';
import GroupConfiguration from 'pages/AdvancedConfiguration/GroupConfiguration/GroupConfiguration';
import StoreGroupCreation from 'pages/AdvancedConfiguration/GroupConfiguration/MainSection/StoreGroup/StoreGroupCreation';
import WarehouseGroupCreation from 'pages/AdvancedConfiguration/GroupConfiguration/MainSection/WarehouseGroup/WarehouseGroupCreation/WarehouseGroupCreation';
import ReplenishmentConfigurationPage from 'pages/AdvancedConfiguration/ReplenishmentConfiguration/ReplenishmentConfigurationPage';

export const forecastConfigurationRoutes = {
  path: 'config',
  element: <ForecastConfigurationsPage />
};

export const groupConfigurationRoutes = {
  path: 'group-config',
  children: [
    {
      index: true,
      element: <GroupConfiguration />
    },
    {
      path: 'store/create',
      element: <StoreGroupCreation />
    },
    {
      path: 'warehouse/create',
      element: <WarehouseGroupCreation />
    }
  ]
};

export const replenishmentConfigurationRoutes = {
  path: 'replenishment-configs',
  element: <ReplenishmentConfigurationPage />
};
