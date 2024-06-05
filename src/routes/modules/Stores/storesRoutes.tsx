import React from 'react';
import NewStoreActivationViewPage from 'pages/Stores/NewStoreActivation/ViewPage/NewStoreActivationViewPage';
import SkuSelectionPage from 'pages/Stores/NewStoreActivation/SkuSelectionPage/SkuSelectionPage';
import StoreConfigDetailPage from 'pages/Stores/NewStoreActivation/StoreConfigDetailPage/StoreConfigDetailPage';

export const storesRoutes = {
  path: 'stores',
  children: [
    {
      path: 'new-activation',
      element: <NewStoreActivationViewPage />
    },
    {
      path: 'new-activation/sku-selection',
      index: true,
      element: <SkuSelectionPage />
    },
    {
      path: 'new-activation/detail-selection',
      index: true,
      element: <StoreConfigDetailPage />
    }
  ]
};
