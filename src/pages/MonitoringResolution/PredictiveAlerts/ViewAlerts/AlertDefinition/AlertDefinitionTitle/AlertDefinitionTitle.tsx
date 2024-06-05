import { FC } from 'react';
import { HStack, VStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import AppButton from 'components/AppButton/AppButton';
import { IAlert, alertSliceSelector } from 'state/pages/monitoringAndResolution/Alert/alertState';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { timeStampToDateString } from 'utils/utility';
import { neutral_100 } from 'theme/colors';

interface AlertDefinitionTitleProps {}

const AlertDefinitionTitle: FC<AlertDefinitionTitleProps> = () => {
  const navigate = useNavigate();
  const alertState: IAlert = useSelector(alertSliceSelector);
  const selectedViewAlertObj = alertState.alertLocalScope.selectedViewAlertObj!;
  const lastUpdateDate = alertState.alertLocalScope.selectedViewAlertObj?.lastUpdatedOn;
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
        <AppText fontSize="20px" fontWeight={600} lineHeight="26px" color={neutral_100}>
          {selectedViewAlertObj.alertName}
        </AppText>
        <AppText fontSize="14px" fontWeight={400} lineHeight="26px" color={neutral_100}>
          {selectedViewAlertObj.skuLocation} SKU Locations
        </AppText>
      </HStack>
      <HStack spacing="25px">
        <VStack spacing="0px" align="start">
          <AppText fontSize="10px" fontWeight={400} lineHeight="15px" color="#E6E6E6">
            Forecast Last Update:
          </AppText>
          <AppText fontSize="12px" fontWeight={400} lineHeight="18px" color="#8C8C8C">
            {lastUpdateDate && timeStampToDateString(lastUpdateDate, 'yyyy-MM-dd hh:mm a')}
          </AppText>
        </VStack>
        {/* <AppButton
          variant="outline"
          onClick={() => navigate('/app/predictive-alerts/edit')}
          px="30px"
          py="8px"
        >
          <AppText fontWeight={400} fontSize="14px" lineHeight="22px">
            Edit
          </AppText>
        </AppButton> */}
      </HStack>
    </HStack>
  );
};

export default AlertDefinitionTitle;
