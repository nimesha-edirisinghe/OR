import { FC } from 'react';
import { Box, HStack, VStack } from '@chakra-ui/react';
import { AlertDetailsI } from 'types/responses/alertConfigResponse';
import { AlertNamesT } from 'types/alertConfig';
import { useDispatch } from 'react-redux';
import {
  getAlertsRequest,
  resetSelectedSkuList,
  setAlertDefinitionPaginationPageNo,
  setAlertDefinitionSearchKey,
  setEnableEditAlertScrolling,
  setSelectedAlertTypeObject,
  setSelectedEditAlertType
} from 'state/pages/monitoringAndResolution/Alert/alertState';
import {
  blue_500,
  neutral_100,
  neutral_300,
  ocean_blue_400,
  ocean_blue_500,
  ocean_blue_600
} from 'theme/colors';
import AppText from 'components/newTheme/AppText/AppText';
import { getAlertColor } from 'utils/utility';
import { useNavigate } from 'react-router-dom';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { AppIcon } from 'components/AppIcon/AppIcon';

interface AlertDefinitionCardProps {
  alertType: AlertNamesT;
  alertDetails?: AlertDetailsI | null;
  isAvailable?: boolean;
  isSelected?: boolean;
  isPrimary?: boolean;
  cardIndex?: number;
}

const AlertDefinitionCard: FC<AlertDefinitionCardProps> = ({
  alertDetails,
  alertType,
  isAvailable = true,
  isSelected = false,
  isPrimary = true,
  cardIndex
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClickCardHandler = (alertTypeObj: AlertDetailsI) => {
    dispatch(setSelectedAlertTypeObject(alertTypeObj));
    dispatch(setAlertDefinitionSearchKey(''));
    dispatch(setAlertDefinitionPaginationPageNo(1));
    dispatch(getAlertsRequest({ alertOnly: 1 }));
    dispatch(resetSelectedSkuList());
  };

  const onClickAddTypeHandler = (alertTypeObj: AlertDetailsI) => {
    dispatch(setEnableEditAlertScrolling(true));
    dispatch(setSelectedAlertTypeObject(alertTypeObj));
    dispatch(setSelectedEditAlertType(cardIndex!));
    navigate('/app/predictive-alerts/edit');
    dispatch(resetSelectedSkuList());
  };

  const isEnabled: boolean = (alertDetails as any)?.enable;

  const alertTypeCardHandler = isAvailable ? onClickCardHandler : onClickAddTypeHandler;

  const alertColor = getAlertColor(alertDetails?.percentageChange!);

  const growthAndDegrowthSuffix = ['Growth', 'Degrowth'].includes(alertType) ? ' (YoY)' : '';

  return (
    <VStack
      w="full"
      h="163px"
      borderRadius="8px"
      p="20px"
      userSelect="none"
      spacing="0px"
      bg={ocean_blue_500}
      justify={isAvailable && isEnabled ? '' : 'center'}
      align="center"
      cursor="pointer"
      onClick={() => alertTypeCardHandler(alertDetails!)}
      pos="relative"
      borderBottom={isSelected ? '2px solid' : 'none'}
      borderColor={alertColor}
      transition="all 0.25s ease-in"
      _hover={{
        bg: ocean_blue_400
      }}
    >
      {isAvailable && isEnabled ? (
        <>
          <AppText size="body1" color={neutral_100}>
            {alertType} {growthAndDegrowthSuffix}
          </AppText>
          <Box
            pos="absolute"
            right="15.5px"
            top="16px"
            bg={alertColor}
            borderRadius={100}
            w="8px"
            h="8px"
          ></Box>
          <VStack spacing="0px">
            <AppText size="numeric" color={neutral_100}>
              {alertDetails?.alertCount || 0}
            </AppText>
            <AppText size="caption" color={neutral_300}>
              SKU Locations
            </AppText>
          </VStack>
          <HStack pt="8px">
            <AppText size="caption" color={neutral_100}>
              Threshold :
            </AppText>
            <AppText size="caption" color={neutral_100}>
              {isPrimary ? alertDetails?.compareValue : alertDetails?.threshold}{' '}
              {isPrimary ? ' Days' : ' %'}
            </AppText>
          </HStack>
          {!isPrimary && (
            <HStack>
              <AppText size="caption" color={neutral_100}>
                Compare :
              </AppText>
              <AppText size="caption" color={neutral_100}>
                {alertDetails?.compareValue} weeks
              </AppText>
            </HStack>
          )}
        </>
      ) : (
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
      )}
    </VStack>
  );
};

export default AlertDefinitionCard;
