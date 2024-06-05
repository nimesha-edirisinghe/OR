import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import { ocean_blue_700 } from 'theme/colors';

export default function ModuleLayout() {
  return (
    <Flex
      minH="100vh"
      direction={'row'}
      width={{ base: '100%', '2xl': '1980px' }}
      margin="auto"
      bg={ocean_blue_700}
    >
      <Flex width="full" direction="column">
        <Header isModuleHeader={true} />
        <Outlet />
      </Flex>
    </Flex>
  );
}
