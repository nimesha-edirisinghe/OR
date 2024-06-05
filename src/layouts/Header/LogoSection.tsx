import { HStack, VStack } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import { ocean_blue_100 } from 'theme/colors';

const LogoSection: FC = () => {
  return (
    <HStack py="30px" w="full" pl="20px" gap="14px" minW="280px">
      <AppIcon
        name="logo"
        width="24px"
        height="24px"
        cursor="pointer"
        _groupHover={{
          fill: 'left-menu-icon-hover-color'
        }}
      />
      <VStack alignItems="start" spacing="0px" m="0px">
        <AppText size="h2Regular">Order Right</AppText>
        <AppText size="caption" lineHeight="15px" mt="0px" color={ocean_blue_100} textAlign="left">By Algonomy</AppText>
      </VStack>
    </HStack>
  );
};

export default LogoSection;
