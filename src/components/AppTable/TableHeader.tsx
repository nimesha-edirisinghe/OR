import React, { ReactNode } from 'react';
import { TableColumnHeaderProps, Th } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { ocean_blue_500 } from 'theme/colors';

interface Props extends TableColumnHeaderProps {
  children: ReactNode;
}

const TableHeader: React.FC<Props> = ({ children }) => {
  return (
    <Th p={1} justifyContent="start" h="36px"  backgroundColor={ocean_blue_500}>
      <AppText fontSize="12px" fontWeight={600}>
        {children}
      </AppText>
    </Th>
  );
};

export default TableHeader;
