import { useSelector } from 'react-redux';
import { layoutSliceSelector, LeftMenu } from 'state/layout/layoutState';
import { findAccessType } from 'hooks/useMenuAccessType';

export const useHomeSectionAccess = () => {
  const sidebar = useSelector(layoutSliceSelector);
  const leftMenu: LeftMenu = sidebar.leftMenu;

  return {
    askMayaAccessAllowed: sidebar.isMayaActive,
    fcSummaryAccessAllowed: !!findAccessType(leftMenu, 'Forecast Summary'),
    rplSummaryAccessAllowed: !!findAccessType(leftMenu, 'Replenishment Summary'),
    dataIngestionAccessAllowed: !!findAccessType(leftMenu, 'Data Ingestion'),
    opTrackerAccessAllowed: !!findAccessType(leftMenu, 'Algorithm Execution'),
    alertAccessAllowed: !!findAccessType(leftMenu, 'Predictive Alerts'),
    trackOrdersAccessAllowed: !!findAccessType(leftMenu, 'Track Order Requests')
  };
};
