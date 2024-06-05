import { Box, Center, VStack } from '@chakra-ui/layout';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { iconName } from 'components/AppIcon/svgIcons';
import AppText from 'components/newTheme/AppText/AppText';
import { REACT_APP_WORKBENCH_BASE_URL } from 'config/constants';
import { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { userSliceSelector } from 'state/user/userState';
import { blue_500, ocean_blue_100, ocean_blue_50, ocean_blue_500 } from 'theme/colors';
import { baseModule } from 'utils/auth';

interface BaseModuleTileI {
  url: string;
  logo: iconName;
  text: string;
  module: baseModule;
}

const BaseModuleTile: FC<BaseModuleTileI> = ({ url, logo, text, module }) => {
  const user = useSelector(userSliceSelector).user;
  const isModuleEnabled = user['base_modules'] && user['base_modules']![module];

  const baseModuleEnabled = useCallback(() => {
    return (
      <a href={`${REACT_APP_WORKBENCH_BASE_URL}/${url}`}>
        <VStack
          w="160px"
          h="128px"
          justify="center"
          align="center"
          p="20px"
          bg={ocean_blue_500}
          borderRadius="8px"
          spacing="16px"
          _hover={{
            bg: '#1A3445'
          }}
        >
          <Center>
            <AppIcon name={logo} w="24px" h="24px" fill={blue_500} />
          </Center>
          <Center>
            <AppText size="body1" color={ocean_blue_50} textAlign="center">
              {text}
            </AppText>
          </Center>
        </VStack>
      </a>
    );
  }, [user]);

  const baseModuleDisabled = useCallback(() => {
    return (
      <VStack
        w="160px"
        h="128px"
        justify="center"
        align="center"
        p="20px"
        bg={ocean_blue_100}
        borderRadius="8px"
        spacing="16px"
      >
        <Center>
          <AppIcon name={logo} w="24px" h="24px" fill={blue_500} />
        </Center>
        <Center>
          <AppText size="body1" color={ocean_blue_50} textAlign="center">
            {text}
          </AppText>
        </Center>
      </VStack>
    );
  }, [user]);

  return isModuleEnabled ? baseModuleEnabled() : baseModuleDisabled();
};

export default BaseModuleTile;
