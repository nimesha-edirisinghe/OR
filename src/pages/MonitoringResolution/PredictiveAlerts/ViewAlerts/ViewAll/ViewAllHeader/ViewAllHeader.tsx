import { FC } from 'react';
import { HStack } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import {
  blue_500,
  neutral_100,
  neutral_300,
  neutral_400,
  ocean_blue_100,
  ocean_blue_600
} from 'theme/colors';
import AppText from 'components/newTheme/AppText/AppText';
import AppButton from 'components/newTheme/AppButton/AppButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  IAlert,
  alertSliceSelector,
  getAlertsRequest,
  setAlertDefinitionPaginationPageNo,
  setAlertDefinitionSearchKey
} from 'state/pages/monitoringAndResolution/Alert/alertState';
import { timeStampToDateString } from 'utils/utility';

interface Props {}

const ViewAllHeader: FC<Props> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const alertState: IAlert = useSelector(alertSliceSelector);
  const selectedViewAlertObj = alertState.alertLocalScope?.selectedViewAlertObj;
  const refreshHandler = () => {
    dispatch(setAlertDefinitionSearchKey(''));
    dispatch(setAlertDefinitionPaginationPageNo(1));
    dispatch(
      getAlertsRequest({
        alertOnly: 0
      })
    );
  };
  const onBackButtonClick = () => {
    dispatch(setAlertDefinitionSearchKey(''));
    dispatch(setAlertDefinitionPaginationPageNo(1));
    navigate('/app/predictive-alerts/definition');
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
          aria-label="back"
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
          onClick={onBackButtonClick}
          bg={ocean_blue_600}
        />
        <HStack spacing="8px">
          <AppText size="h3Semibold" color={neutral_100} lineHeight="19.5px">
            {selectedViewAlertObj?.alertName}
          </AppText>
          <AppText size="body2" color={neutral_400}>
            {selectedViewAlertObj?.skuLocation?.toLocaleString('en-US')} SKU Locations
          </AppText>
          <HStack spacing="4px">
            <AppText size="body3" color={ocean_blue_100} lineHeight="18px">
              Forecast Last Update:
            </AppText>
            <AppText size="body3" color={ocean_blue_100} lineHeight="18px">
              {selectedViewAlertObj?.lastUpdatedOn &&
                timeStampToDateString(selectedViewAlertObj?.lastUpdatedOn, 'yyyy-MM-dd hh:mm a')}
            </AppText>
          </HStack>
        </HStack>
      </HStack>
      <HStack spacing="12px">
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
          onClick={refreshHandler}
          bg={ocean_blue_600}
        />
        <AppButton
          variant="secondary"
          size="medium"
          onClick={() => navigate('/app/predictive-alerts/edit')}
          px="14px"
        >
          <AppText size="body2" variant="secondary" color={blue_500}>
            Edit Alerts
          </AppText>
        </AppButton>
      </HStack>
    </HStack>
  );
};

export default ViewAllHeader;
