import ConfigurationDetails from 'pages/Products/ConfigurationDetails/ConfigurationDetails';
import NewProductActivationPage from 'pages/Products/NewProductActivation/NewProductActivationPage';
import ProductConfigurationPage from 'pages/Products/ProductConfiguration/ProductConfigurationPage';

export const productsRoutes = {
  path: 'products',
  children: [
    {
      path: 'new-activation',
      index: true,
      element: <NewProductActivationPage />
    },
    {
      path: 'new-activation/location-selection',
      index: true,
      element: <ProductConfigurationPage />
    },
    {
      path: 'new-activation/configuration-details',
      index: true,
      element: <ConfigurationDetails />
    }
  ]
};
