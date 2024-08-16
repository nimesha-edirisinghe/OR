import BulkEditAlertsPage from 'pages/MonitoringResolution/PredictiveAlerts/BulkEditAlertsPage/BulkEditAlertsPage';
import CreateAlerts from 'pages/MonitoringResolution/PredictiveAlerts/CreateAlerts/CreateAlerts';
import EditAlerts from 'pages/MonitoringResolution/PredictiveAlerts/EditAlerts/EditAlerts';
import PredictiveAlerts from 'pages/MonitoringResolution/PredictiveAlerts/PredictiveAlerts';
import AlertDefinition from 'pages/MonitoringResolution/PredictiveAlerts/ViewAlerts/AlertDefinition/AlertDefinition';
import ViewAll from 'pages/MonitoringResolution/PredictiveAlerts/ViewAlerts/ViewAll/ViewAll';

export const predictiveAlertRoutes = {
  path: 'predictive-alerts',
  children: [
    {
      index: true,
      element: <PredictiveAlerts />
    },
    {
      path: 'definition',
      element: <AlertDefinition />
    },
    {
      path: 'create',
      element: <CreateAlerts />
    },
    {
      path: 'edit',
      element: <EditAlerts />
    },
    {
      path: 'view-all',
      element: <ViewAll />
    },
    {
      path: 'bulk-edit',
      element: <BulkEditAlertsPage />
    }
  ]
};
