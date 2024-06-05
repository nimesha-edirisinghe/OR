import { HStack, StackProps } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { ocean_blue_500 } from 'theme/colors';

interface AlertHeaderCellProps extends StackProps {
  children: ReactNode;
  minW?: string;
}

const AlertHeaderCell: FC<AlertHeaderCellProps> = ({ children, minW = '180px', ...rest }) => {
  return (
    <HStack
      p="8px"
      bg={ocean_blue_500}
      justifyContent="space-between"
      minW={minW}
      h="36px"
      {...rest}
    >
      {children}
    </HStack>
  );
};

export default AlertHeaderCell;
