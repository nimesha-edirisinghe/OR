import { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { IAlert, alertSliceSelector } from 'state/pages/monitoringAndResolution/Alert/alertState';
import ForecastDownload from './Forecast/ForecastDownload';
import ReplenishmentDownload from './Replenishment/ReplenishmentDownload';
import { AlertTypeEnum } from 'state/pages/monitoringAndResolution/Alert/sagaHelpers/sgH_alert';

interface Props {}

const DownloadTab: FC<Props> = () => {
  const alertState: IAlert = useSelector(alertSliceSelector);
  const selectedAlertType = alertState.alertLocalScope.selectedAlertTypeObj.alertType;
  const isForecastAlert =
    selectedAlertType === AlertTypeEnum.DE_GROWTH || selectedAlertType === AlertTypeEnum.GROWTH;

  const renderForecastDownload = useCallback(() => {
    return <ForecastDownload />;
  }, []);
  const renderReplenishmentDownload = useCallback(() => {
    return <ReplenishmentDownload />;
  }, []);

  return <>{isForecastAlert ? renderForecastDownload() : renderReplenishmentDownload()}</>;
};

export default DownloadTab;
