import DataIngestionSummaryView from 'pages/MonitoringResolution/DataIngestionSummaryView/DataIngestionSummaryView';
import ActivityLogPage from 'pages/OperationsMonitoring/ActivityLog/ActivityLogPage';

export const dataIngestionSummaryRoutes = {
  path: 'data-ingestion-summary',
  element: <DataIngestionSummaryView />
};

export const algorithmExecutionRoutes = {
  path: 'operations-tracker',
  element: <ActivityLogPage />
};
