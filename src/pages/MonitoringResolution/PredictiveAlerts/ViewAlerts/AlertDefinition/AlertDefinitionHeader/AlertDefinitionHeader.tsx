import { FC } from 'react';
import { HStack } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { blue_500, neutral_100, neutral_300, ocean_blue_100, ocean_blue_600 } from 'theme/colors';
import AppText from 'components/newTheme/AppText/AppText';
import AppButton from 'components/newTheme/AppButton/AppButton';
import { useNavigate } from 'react-router-dom';
import {
  IAlert,
  alertSliceSelector,
  setAlertDefinitionPaginationPageNo,
  setAlertDefinitionSearchKey,
  setEnableEditAlertScrolling
} from 'state/pages/monitoringAndResolution/Alert/alertState';
import { useDispatch, useSelector } from 'react-redux';
import { timeStampToDateString } from 'utils/utility';
import { resetGroupFilter } from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import useAccessType from 'hooks/useMenuAccessType';
import { hasAccessPermission } from 'utils/permissions';
import { AccessPermissionEnum, MenuItems } from 'utils/enum';

interface Props {}

const AlertDefinitionHeader: FC<Props> = () => {
  const navigate = useNavigate();
  const alertState: IAlert = useSelector(alertSliceSelector);
  const accessType = useAccessType(MenuItems.PREDICTIVE_ALERTS);
  const isDisabled = !hasAccessPermission(accessType, [AccessPermissionEnum.EDIT]);

  const selectedViewAlertObj = alertState.alertLocalScope?.selectedViewAlertObj;

  const dispatch = useDispatch();

  const onEditHandler = () => {
    dispatch(setEnableEditAlertScrolling(false));
    navigate('/app/predictive-alerts/edit');
  };

  const clickViewAllSKULocations = () => {
    dispatch(setAlertDefinitionSearchKey(''));
    dispatch(setAlertDefinitionPaginationPageNo(1));
    navigate('/app/predictive-alerts/view-all');
  };

  const onBackButtonClick = () => {
    dispatch(resetGroupFilter());
    dispatch(setAlertDefinitionSearchKey(''));
    dispatch(setAlertDefinitionPaginationPageNo(1));
    navigate('/app/predictive-alerts');
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
          onClick={onBackButtonClick}
          bg={ocean_blue_600}
        />
        <AppText size="h3Semibold" color={neutral_100}>
          {selectedViewAlertObj?.alertName}
        </AppText>
        <HStack spacing="4px" pt="2px">
          <AppText size="body3" color={ocean_blue_100}>
            Last Update:
          </AppText>
          <AppText size="body3" color={ocean_blue_100}>
            {selectedViewAlertObj?.lastUpdatedOn &&
              timeStampToDateString(selectedViewAlertObj?.lastUpdatedOn, 'yyyy-MM-dd hh:mm a')}
          </AppText>
        </HStack>
      </HStack>
      <HStack spacing="12px">
        <AppButton variant="secondary" size="medium" onClick={clickViewAllSKULocations} px="14px">
          <AppText size="body2" variant="secondary" color={blue_500}>
            View All SKU Locations
          </AppText>
        </AppButton>
        <AppButton
          variant="secondary"
          size="medium"
          onClick={onEditHandler}
          px="14px"
          isDisabled={isDisabled}
        >
          <AppText size="body2" variant="secondary" color={blue_500}>
            Edit Alerts
          </AppText>
        </AppButton>
      </HStack>
    </HStack>
  );
};

export default AlertDefinitionHeader;
