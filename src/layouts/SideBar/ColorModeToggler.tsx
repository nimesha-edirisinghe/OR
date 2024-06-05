import { HStack, useColorMode } from '@chakra-ui/react';
import { CiDark, CiLight } from 'react-icons/ci';

export default function ColorModeToggler() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack justify="center" width="full" pt={10}>
      {colorMode === 'light' ? (
        <CiDark onClick={toggleColorMode} size={60} cursor="pointer" color="white" />
      ) : (
        <CiLight onClick={toggleColorMode} size={60} cursor="pointer" color="white" />
      )}
    </HStack>
  );
}
