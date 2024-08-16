import { HStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { FC, ReactNode } from 'react';
import { TableMapDataI } from '../TableDataMapping';
import { AppIconChakra } from 'assets/svg/chakraIcons';
import { neutral_200, ocean_blue_500 } from 'theme/colors';

interface HeaderCellProps {
  children: ReactNode;
  tableMap: TableMapDataI;
}

const HeaderCell: FC<HeaderCellProps> = ({ children, tableMap }) => {
  return (
    <HStack
      px="4"
      bg={ocean_blue_500}
      py="8px"
      minW={tableMap.styles?.width}
      justifyContent="space-between"
    >
      <AppText fontSize="13px" fontWeight={600} color={neutral_200} noOfLines={1}>
        {children}
      </AppText>
      {tableMap.header.action && tableMap.header.action.iconName && (
        <AppIconChakra
          name={tableMap.header.action.iconName}
          fill="left-menu-icon-color"
          width="16px"
          height="16px"
          transition="fill 0.3s"
          cursor="pointer"
        />
      )}
    </HStack>
  );
};

export default HeaderCell;
