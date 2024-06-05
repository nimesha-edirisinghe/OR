import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Sidebar from './SideBar/Sidebar';
import Header from './Header/Header';
import { ocean_blue_700 } from 'theme/colors';

export default function AppLayout() {
  return (
    <Flex
      minH="100vh"
      direction={'row'}
      width={{ base: '100%', '2xl': '1980px' }}
      margin="auto"
      bg={ocean_blue_700}
      overflow="hidden"
      h="100vh"
    >
      <Sidebar />
      <Flex width="full" direction="column">
        <Header />
        <Outlet />
      </Flex>
    </Flex>
  );
}
