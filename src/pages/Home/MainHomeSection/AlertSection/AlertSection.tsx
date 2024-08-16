import { Box, Img, VStack } from '@chakra-ui/react';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import { neutral_200, ocean_blue_600 } from 'theme/colors';
import HomeAlertImage from 'assets/svg/homeAlertImage.svg';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setActiveSubMenuItem } from 'state/layout/layoutState';

interface Props {
  isDisabled?: boolean;
}

const AlertSection: FC<Props> = ({ isDisabled = true }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const alertHandler = () => {
    if (!isDisabled) {
      dispatch(setActiveSubMenuItem({ subMenuItem: '/app/predictive-alerts' }));
      navigate('/app/predictive-alerts');
    }
  };

  return (
    <VStack
      minH="460px"
      w="full"
      bg={ocean_blue_600}
      borderRadius="8px"
      p="20px"
      spacing="12px"
      align="start"
      cursor={isDisabled ? 'not-allowed' : 'pointer'}
    >
      <VStack align="start">
        <AppText color={neutral_200} size="h3Semibold">
          Alerts
        </AppText>
        <AppText color={neutral_200} size="body2">
          You have some critical alerts! Take a look, resolve, and keep your operations seamless.
        </AppText>
      </VStack>
      <Box w="full" h="334px" pos="relative">
        <Img
          src={HomeAlertImage}
          w="full"
          h="full"
          objectFit="cover"
          alt="Quick Insight Image"
          top="0"
          left="0"
          borderRadius="8px"
          onClick={alertHandler}
          cursor={isDisabled ? 'not-allowed' : 'pointer'}
          opacity={isDisabled ? 0.7 : 1}
        />
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="1"
          opacity={isDisabled ? 0.3 : 1}
        >
          <AppIcon
            transition="transform 0.25s ease"
            name="redirect"
            color={neutral_200}
            h="24px"
            w="24px"
            onClick={alertHandler}
            cursor={isDisabled ? 'not-allowed' : 'pointer'}
          />
        </Box>
      </Box>
    </VStack>
  );
};

export default AlertSection;
