import { FC, useCallback } from 'react';
import { Box, HStack, VStack } from '@chakra-ui/react';
import { AlertDetailsI } from 'types/responses/alertConfigResponse';
import { AlertNamesT, AlertTypesT } from 'types/alertConfig';
import {
  IAlert,
  alertSliceSelector,
  setEnableEditAlertScrolling,
  setSelectedAlertTypeObject,
  setSelectedEditAlertType,
  setSelectedViewAlert
} from 'state/pages/monitoringAndResolution/Alert/alertState';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  blue_500,
  neutral_100,
  neutral_300,
  ocean_blue_400,
  ocean_blue_500,
  ocean_blue_600,
  red_500
} from 'theme/colors';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppText from 'components/newTheme/AppText/AppText';
import { getAlertColor } from 'utils/utility';

interface PrimaryAlertCardProps {
  alertType: AlertNamesT;
  alertKey: number;
  cardIndex: number;
  alertDetails?: AlertDetailsI | undefined;
  isAvailable?: boolean;
  isPrimary?: boolean;
}

const PrimaryAlertCard: FC<PrimaryAlertCardProps> = ({
  alertKey,
  alertDetails,
  cardIndex,
  alertType,
  isAvailable = true,
  isPrimary = true
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alertState: IAlert = useSelector(alertSliceSelector);
  const alertSummaryList = alertState.alertSummaryList;
  const isEnabled:boolean= (alertDetails as any)?.enable;

  const renderCardContent = useCallback(() => {
    if (isAvailable&&isEnabled) {
      const alertColor = getAlertColor(alertDetails?.percentageChange!);
      return (
        <>
          <HStack justify="space-between" w="full" mb="8px" position="relative">
            <AppText size="body3" color={neutral_100}>
              {alertType}
            </AppText>
            <Box
              bg={alertColor}
              w="8px"
              h="8px"
              borderRadius={100}
              top="0px"
              position="absolute"
              right="0px"
            ></Box>
          </HStack>

          <AppText size="h1Semibold" color={neutral_100}>
            {alertDetails?.alertCount?.toLocaleString() || 0}
          </AppText>
          <HStack justify="space-between" w="full">
            <AppText size="caption" color={neutral_300}>
              SKU Locations
            </AppText>
            <AppText size="caption" color={red_500}>
              {`${alertDetails?.percentageChange}%`}
            </AppText>
          </HStack>
        </>
      );
    } else {
      return (
        <VStack>
          <AppText size="body3" color={neutral_100}>
            {`Add ${alertType} Alert`}
          </AppText>
          <AppIconButton
            aria-label="next"
            icon={
              <AppIcon
                transition="transform 0.25s ease"
                name="plus"
                width="14px"
                height="14px"
                fill={blue_500}
              />
            }
            variant="iconPrimary"
            size="iconLarge"
            onClick={() => {}}
            bg={ocean_blue_600}
            _hover={{
              bg: ''
            }}
          />
        </VStack>
      );
    }
  }, [isAvailable, alertType, alertDetails]);

  const onClickCardHandler = (alertKey: number, alertType?: AlertTypesT) => {
    const _selectedAlert = alertSummaryList.list?.find((alert) => alert.alertKey === alertKey);
    const selectedAlertType = _selectedAlert?.alertDetails.find(
      (typeObj) => typeObj.alertType === alertType
    );
    if (_selectedAlert && selectedAlertType) {
      dispatch(setSelectedViewAlert(_selectedAlert));
      dispatch(setSelectedAlertTypeObject(selectedAlertType));
    }
    navigate('/app/predictive-alerts/definition');
  };

  const onClickAddTypeHandler = (alertKey: number, alertType?: AlertTypesT) => {
    dispatch(setEnableEditAlertScrolling(true));
    const _selectedAlert = alertSummaryList.list?.find((alert) => alert.alertKey === alertKey);

    if (_selectedAlert) {
      dispatch(setSelectedViewAlert(_selectedAlert));
      dispatch(setSelectedEditAlertType(cardIndex));
    }
    navigate('/app/predictive-alerts/edit');
  };

  const cardHandler = isAvailable ? onClickCardHandler : onClickAddTypeHandler;

  return (
    <VStack
      w="full"
      h="103px"
      borderRadius="8px"
      p="16px"
      userSelect="none"
      bg={ocean_blue_500}
      justify={isAvailable ? '' : 'center'}
      align={isAvailable ? 'start' : 'center'}
      cursor="pointer"
      onClick={() => cardHandler(alertKey, alertDetails?.alertType)}
      spacing="0px"
      _hover={{
        bg: isEnabled?ocean_blue_400:''
      }}
      transition="all 0.25s ease-in"
    >
      {renderCardContent()}
    </VStack>
  );
};

export default PrimaryAlertCard;
