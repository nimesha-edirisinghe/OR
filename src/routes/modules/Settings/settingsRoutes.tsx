import ForecastConfigurationsPage from 'pages/AdvancedConfiguration/ForecastConfiguration/ForecastConfigurationsPage';
import GroupConfiguration from 'pages/AdvancedConfiguration/GroupConfiguration/GroupConfiguration';
import ReplenishmentConfigurationPage from 'pages/AdvancedConfiguration/ReplenishmentConfiguration/ReplenishmentConfigurationPage';

export const forecastConfigurationRoutes = {
  path: 'config',
  element: <ForecastConfigurationsPage />
};

export const groupConfigurationRoutes = {
  path: 'group-config',
  element: <GroupConfiguration />
};

export const replenishmentConfigurationRoutes = {
  path: 'replenishment-configs',
  element: <ReplenishmentConfigurationPage />
};
