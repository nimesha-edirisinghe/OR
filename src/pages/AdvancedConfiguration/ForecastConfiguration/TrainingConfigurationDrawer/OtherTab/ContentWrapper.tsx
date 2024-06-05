import { VStack } from '@chakra-ui/layout';
import { FC, ReactNode } from 'react';
import { ocean_blue_500 } from 'theme/colors';

interface Props {
  children: ReactNode;
}

const CardWrapper: FC<Props> = ({ children }) => {
  return (
    <VStack
      w="full"
      bg={ocean_blue_500}
      borderRadius="6px"
      mt="7px"
      p="15px"
      align="start"
      transition="all 2s ease"
      gap="5px"
      spacing="0px"
    >
      {children}
    </VStack>
  );
};

export default CardWrapper;
