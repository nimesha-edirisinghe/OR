import { Img, VStack } from '@chakra-ui/react';
import { MayaLogo } from 'assets/images/mayaLogo';
import AppButton from 'components/newTheme/AppButton/AppButton';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { neutral_200, ocean_blue_600 } from 'theme/colors';

interface Props {}

const MayaSection: FC<Props> = () => {
  const navigate = useNavigate();

  const onMayaHandler = () => {
    navigate('/app/maya');
  };
  return (
    <VStack minH="232px" w="full" bg={ocean_blue_600} borderRadius="8px" p="20px" spacing="12px">
      <Img style={{ width: '80px', height: '80px' }} src={MayaLogo} />
      <VStack spacing="8px">
        <AppText size="h3Semibold" color={neutral_200}>
          Meet your AI assistant!
        </AppText>
        <AppText color={neutral_200} size="body2">
          Simplify your workday with our chatbot assistant.
        </AppText>
      </VStack>
      <AppButton variant="primary" size="medium" onClick={onMayaHandler}>
        Ask Maya
      </AppButton>
    </VStack>
  );
};

export default MayaSection;
