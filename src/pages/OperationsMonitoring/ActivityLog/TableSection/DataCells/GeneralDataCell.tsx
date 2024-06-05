import { HStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { FC } from 'react';
import { TableMapDataI } from '../TableDataMapping';
import AppTooltip from 'components/AppTooltip/AppTooltip';
import { ocean_blue_400 } from 'theme/colors';

interface GeneralDataCellProps {
  children: string;
  tableMap: TableMapDataI;
}

const GeneralDataCell: FC<GeneralDataCellProps> = ({ children, tableMap }) => {
  return (
    <HStack
      px="4"
      bg={ocean_blue_400}
      py="8px"
      minW={tableMap.styles?.width}
      justifyContent="space-between"
      h="35px"
    >
      <AppText fontSize="13px" fontWeight={500} color="#E6E6E6" noOfLines={1}>
        {children.length > 35 ? (
          <AppTooltip label={children} placement="auto-start">
            <span>{children}</span>
          </AppTooltip>
        ) : (
          <span>{children}</span>
        )}
      </AppText>
    </HStack>
  );
};

export default GeneralDataCell;
