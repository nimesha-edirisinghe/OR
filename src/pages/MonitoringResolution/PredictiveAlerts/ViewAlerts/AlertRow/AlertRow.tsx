import { FC, useCallback, useState } from 'react';
import { Box, Collapse, HStack, VStack } from '@chakra-ui/react';
import PrimaryAlertCard from './AlertCards/PrimaryAlertCard';
import { AlertDetailsI, AlertListI } from 'types/responses/alertConfigResponse';
import {
  IAlert,
  alertSliceSelector,
  setSelectedAlertTypeObject,
  setSelectedViewAlert
} from 'state/pages/monitoringAndResolution/Alert/alertState';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { defaultAlertTypeList } from 'state/pages/monitoringAndResolution/Alert/stateHelpers/stH_alert';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppButton from 'components/newTheme/AppButton/AppButton';
import AppText from 'components/newTheme/AppText/AppText';
import { blue_500, neutral_200, ocean_blue_600 } from 'theme/colors';

interface AlertRowProps {
  alertData: AlertListI;
}

const AlertRow: FC<AlertRowProps> = ({ alertData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const alertState: IAlert = useSelector(alertSliceSelector);
  const defaultAlertTypes = alertState.defaultAlertTypes;
  const alertSummaryList = alertState.alertSummaryList;

  const renderAlertCards = useCallback(() => {
    return defaultAlertTypes.map((alertType, index) => {
      const alertObj = alertData?.alertDetails?.find((alert) => alert.alertType === alertType.type);
      if (alertObj) {
        return (
          <PrimaryAlertCard
            alertDetails={alertObj}
            key={alertObj.alertType}
            alertType={alertType.name}
            isPrimary={alertType.isPrimaryAlert}
            alertKey={alertData.alertKey}
            cardIndex={index}
          />
        );
      } else {
        return (
          <PrimaryAlertCard
            key={alertType.name}
            alertType={alertType.name}
            isAvailable={false}
            alertKey={alertData.alertKey}
            cardIndex={index}
          />
        );
      }
    });
  }, [defaultAlertTypes, alertData]);

  const sortAlertTypes = (data: AlertDetailsI[]) => {
    const _alertTypesOrder = defaultAlertTypeList.map((alert) => alert.type);
    const sortedData = [...data];

    sortedData.sort((a, b) => {
      const alertTypeA = a.alertType || '';
      const alertTypeB = b.alertType || '';

      const indexA = _alertTypesOrder.indexOf(alertTypeA);
      const indexB = _alertTypesOrder.indexOf(alertTypeB);

      return indexA - indexB;
    });

    return sortedData;
  };

  const alertHandler = (alertKey: number) => {
    const _selectedAlert = alertSummaryList.list?.find((alert) => alert.alertKey === alertKey);
    if (_selectedAlert) {
      const _defaultSelectedAlertDetails = _selectedAlert?.alertDetails;
      const _sortedAlertDetails = sortAlertTypes(_defaultSelectedAlertDetails);
      dispatch(setSelectedViewAlert(_selectedAlert));
      dispatch(setSelectedAlertTypeObject(_sortedAlertDetails[0]));
    }
    navigate('/app/predictive-alerts/definition');
  };

  const expandHandler = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <VStack w="full" h="auto" borderRadius="12px" userSelect="none" mb="20px" spacing="16px">
      <HStack w="full" h="35px" justify="space-between">
        <HStack>
          <AppIconButton
            aria-label="next"
            icon={
              <AppIcon
                transform={isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}
                transition="transform 0.25s ease"
                name="chevronDown"
                fill="header.icon._default"
                color={neutral_200}
                w="7.6px"
                h="13.3px"
              />
            }
            variant="iconPrimary"
            size="iconSmall"
            onClick={expandHandler}
            bg="header.panelBg._default"
          />
          <AppText size="body2" lineHeight="28px" fontSize="13px">
            {alertData?.alertName}
          </AppText>
        </HStack>
        <AppButton variant="secondary" onClick={() => alertHandler(alertData?.alertKey)} h="36px">
          <AppText size="body2" variant="secondary" color={blue_500}>
            View More Details
          </AppText>
        </AppButton>
      </HStack>
      <Box h="full" w="full" borderBottom="2px solid" borderColor={ocean_blue_600} pb="16px">
        <Collapse in={isOpen} animateOpacity style={{ padding: 0 }}>
          <HStack h="full" w="full" justify="stretch" spacing="10px">
            {renderAlertCards()}
          </HStack>
        </Collapse>
      </Box>
    </VStack>
  );
};

export default AlertRow;
