import { FC, useCallback } from 'react';
import { HStack, VStack } from '@chakra-ui/react';
import { IAlert, alertSliceSelector } from 'state/pages/monitoringAndResolution/Alert/alertState';
import { useSelector } from 'react-redux';
import AlertDefinitionCard from './AlertDefinitionCard';

interface AlertCardTabProps {}

const AlertCardTab: FC<AlertCardTabProps> = () => {
  const alertState: IAlert = useSelector(alertSliceSelector);
  const defaultAlertTypes = alertState.defaultAlertTypes;
  const selectedViewAlertObj = alertState.alertLocalScope.selectedViewAlertObj!;
  const selectedAlertTypeObj = alertState.alertLocalScope.selectedAlertTypeObj;

  const renderAlertCards = useCallback(() => {
    // eslint-disable-next-line array-callback-return
    return defaultAlertTypes?.map((alertType, index) => {
      const alertObj =
        selectedViewAlertObj?.alertDetails &&
        selectedViewAlertObj?.alertDetails?.find((alert) => alert.alertType === alertType.type);

      const isSelectedType = alertType?.type === selectedAlertTypeObj?.alertType;

      if (alertObj) {
        return (
          <AlertDefinitionCard
            alertDetails={alertObj}
            key={index}
            alertType={alertType.name}
            isSelected={isSelectedType}
            isPrimary={alertType.isPrimaryAlert}
          />
        );
      } else {
        return (
          <AlertDefinitionCard
            alertDetails={alertObj}
            key={index}
            alertType={alertType.name}
            isAvailable={false}
            cardIndex={index}
          />
        );
      }
    });
  }, [selectedViewAlertObj, defaultAlertTypes, selectedAlertTypeObj]);

  return (
    <VStack w="full" height="auto" borderRadius="10px" py="2px" userSelect="none">
      <HStack w="full" justify="stretch" spacing="8px">
        {renderAlertCards()}
      </HStack>
    </VStack>
  );
};

export default AlertCardTab;
