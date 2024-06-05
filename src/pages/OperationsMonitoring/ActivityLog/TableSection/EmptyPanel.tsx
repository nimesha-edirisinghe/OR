import { VStack } from '@chakra-ui/react';
import { AppIconChakra } from 'assets/svg/chakraIcons';
import AppText from 'components/AppText/AppText';
import { FC } from 'react';
import { ocean_blue_400 } from 'theme/colors';

interface EmptyPanelProps {}

const EmptyPanel: FC<EmptyPanelProps> = () => {
  return (
    <VStack
      w="full"
      height={'calc(100vh - 285px)'}
      bgColor={ocean_blue_400}
      py="20px"
      px="24px"
      userSelect="none"
      spacing="10px"
      pt="120px"
    >
      <AppIconChakra
        name="circleInfo"
        fill="left-menu-icon-color"
        width="20px"
        height="20px"
        transition="fill 0.3s"
      />
      <AppText fontSize="14px" fontWeight={500} color="#B3B3B3">
        No data available
      </AppText>
    </VStack>
  );
};

export default EmptyPanel;
