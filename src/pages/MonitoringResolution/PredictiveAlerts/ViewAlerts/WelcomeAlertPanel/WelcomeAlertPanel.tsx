import { FC } from 'react';
import { Box, Center, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import AppText from 'components/newTheme/AppText/AppText';
import AppButton from 'components/newTheme/AppButton/AppButton';
import { neutral_100, ocean_blue_500 } from 'theme/colors';

interface WelcomeAlertPanelProps {}

const WelcomeAlertPanel: FC<WelcomeAlertPanelProps> = () => {
  const navigate = useNavigate();
  return (
    <Center>
      <VStack
        overflow="auto"
        w="804px"
        height="auto"
        borderRadius="10px"
        p="40px"
        userSelect="none"
        bg={ocean_blue_500}
      >
        <AppText size="h3Semibold">Create your first alert</AppText>
        <Box pt="16px" pb="24px">
          <AppText size="body2" color={neutral_100} textAlign="center">
            Alerts will give you the ability to define rules for proactively identifying potential
            future risks and initiating necessary actions. Let’s create your first alert!
          </AppText>
        </Box>
        <AppButton
          variant="primary"
          size="medium"
          px="25px"
          onClick={() => navigate('/app/predictive-alerts/create')}
        >
          Create new alert
        </AppButton>
      </VStack>
    </Center>
  );
};

export default WelcomeAlertPanel;
