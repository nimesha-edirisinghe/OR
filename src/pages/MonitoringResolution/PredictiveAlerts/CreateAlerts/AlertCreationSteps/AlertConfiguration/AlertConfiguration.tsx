import { FC } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import AlertConfigurationItem from './AlertConfigurationItem';
import { IAlert, alertSliceSelector } from 'state/pages/monitoringAndResolution/Alert/alertState';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { neutral_200, white } from 'theme/colors';

interface AlertConfigurationProps {}

const AlertConfiguration: FC<AlertConfigurationProps> = () => {
  const alertState: IAlert = useSelector(alertSliceSelector);
  const defaultAlertTypes = alertState.defaultAlertTypes;
  return (
    <Box
      w="full"
      height="full"
      borderRadius="10px"
      userSelect="none"
      overflow="hidden"
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition="1s"
    >
      <AppText fontSize="12px" fontWeight={400} textAlign="center" color={white}>
        Select the alert types you wish to configure for for the SKU location list.
      </AppText>
      <VStack h="auto" w="full" spacing="8px" pt="20px">
        {defaultAlertTypes.map((alertType) => (
          <AlertConfigurationItem alertTypeData={alertType} key={alertType.type} />
        ))}
      </VStack>
    </Box>
  );
};

export default AlertConfiguration;
