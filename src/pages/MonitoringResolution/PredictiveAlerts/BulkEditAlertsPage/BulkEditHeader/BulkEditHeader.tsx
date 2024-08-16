import { HStack } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  IAlert,
  alertSliceSelector,
  getAlertConfigsRequest,
  getAlertsRequest,
  setUploadHistoryPageNo,
  updateAlertShouldReloadData
} from 'state/pages/monitoringAndResolution/Alert/alertState';
import { AlertTypeEnum } from 'state/pages/monitoringAndResolution/Alert/sagaHelpers/sgH_alert';
import {
  IDFView,
  dfViewSliceSelector,
  getUploadHistoryDataRequest,
  setUploadHistorySearchKey,
  updateShouldReloadData
} from 'state/pages/view/demandForecastView/dfViewPageState';
import {
  IRPLView,
  rplGetUploadHistoryDataRequest,
  rplViewSliceSelector
} from 'state/pages/view/replenishmentView/rplViewPageState';
import { blue_500, neutral_100, neutral_300, ocean_blue_100, ocean_blue_600 } from 'theme/colors';

interface Props {
  enabledAction?: boolean;
}

const BulkEditHeader: FC<Props> = ({ enabledAction = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dfViewState: IDFView = useSelector(dfViewSliceSelector);
  const rplViewState: IRPLView = useSelector(rplViewSliceSelector);
  const alertState: IAlert = useSelector(alertSliceSelector);
  const forecastLastUpdateDataTime = dfViewState.lastUpdatedDateTime;
  const rplLastUpdateDataTime = rplViewState.rplLastUpdatedDateTime;
  const selectedAlertType = alertState.alertLocalScope.selectedAlertTypeObj.alertType;
  const isForecastAlert =
    selectedAlertType === AlertTypeEnum.DE_GROWTH || selectedAlertType === AlertTypeEnum.GROWTH;
  const pageTitle = isForecastAlert ? 'Bulk Edit Forecast' : 'Bulk Edit Replenishment';
  const lastUpdatedDate = isForecastAlert ? forecastLastUpdateDataTime : rplLastUpdateDataTime;

  const backHandler = () => {
    navigate('/app/predictive-alerts/definition');
    dispatch(updateAlertShouldReloadData(false));
    dispatch(getAlertConfigsRequest({}));
    dispatch(getAlertsRequest({ alertOnly: 1 }));
  };

  const onRefreshHandler = () => {
    const action = isForecastAlert
      ? getUploadHistoryDataRequest({
          pageNumber: 1
        })
      : rplGetUploadHistoryDataRequest({
          pageNumber: 1
        });
    dispatch(setUploadHistoryPageNo(1));
    dispatch(action);
    dispatch(setUploadHistorySearchKey(''));
  };
  return (
    <HStack
      w="full"
      height="36px"
      borderRadius="10px"
      py="2px"
      userSelect="none"
      justifyContent="space-between"
    >
      <HStack spacing="8px">
        <AppIconButton
          aria-label="next"
          icon={
            <AppIcon
              transition="transform 0.25s ease"
              name="chevronLeft"
              width="7px"
              height="11px"
              fill={neutral_300}
            />
          }
          variant="secondary"
          size="iconMedium"
          onClick={backHandler}
          bg={ocean_blue_600}
        />
        <AppText size="h3Semibold" color={neutral_100}>
          {pageTitle}
        </AppText>
      </HStack>
      {enabledAction && (
        <HStack spacing="16px">
          <HStack spacing="4px">
            <AppText size="body3" color={ocean_blue_100} lineHeight="18px">
              Last Update:
            </AppText>
            <AppText size="body3" color={ocean_blue_100} lineHeight="18px">
              {lastUpdatedDate}
            </AppText>
          </HStack>
          <AppIconButton
            aria-label="next"
            icon={
              <AppIcon
                transition="transform 0.25s ease"
                name="refresh"
                width="14px"
                height="14px"
                fill={blue_500}
              />
            }
            variant="secondary"
            size="iconMedium"
            onClick={onRefreshHandler}
            bg={ocean_blue_600}
          />
        </HStack>
      )}
    </HStack>
  );
};

export default BulkEditHeader;
