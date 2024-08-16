import { HStack, Img, VStack } from '@chakra-ui/react';
import { MayaLogo } from 'assets/images/mayaLogo';
import AppButton from 'components/newTheme/AppButton/AppButton';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setActiveSubMenuItem } from 'state/layout/layoutState';
import { neutral_200, ocean_blue_300, ocean_blue_400, ocean_blue_600 } from 'theme/colors';

interface Props {
  isDisabled?: boolean;
}

const MayaSection: FC<Props> = ({ isDisabled = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onMayaHandler = () => {
    if (!isDisabled) {
      dispatch(setActiveSubMenuItem({ subMenuItem: '/app/maya' }));
      navigate('/app/maya');
    }
  };
  return (
    <VStack
      minH="232px"
      w="full"
      bg={ocean_blue_600}
      borderRadius="8px"
      p="20px"
      spacing="12px"
      position="relative"
    >
      <AppText
        bg={ocean_blue_400}
        fontSize="12px"
        fontWeight={400}
        color={ocean_blue_300}
        w="44px"
        h="22px"
        borderRadius="16px"
        p="2px 8px 2px 8px"
        noOfLines={1}
        position="absolute"
        right="16px"
        top="16px"
      >
        Beta
      </AppText>
      <Img style={{ width: '80px', height: '80px' }} src={MayaLogo} />

      <VStack spacing="8px">
        <AppText size="h3Semibold" color={neutral_200}>
          Meet your AI assistant!
        </AppText>
        <AppText color={neutral_200} size="body2">
          Simplify your workday with our chatbot assistant.
        </AppText>
      </VStack>
      <AppButton variant="primary" size="medium" onClick={onMayaHandler} isDisabled={isDisabled}>
        Ask Maya
      </AppButton>
    </VStack>
  );
};

export default MayaSection;
