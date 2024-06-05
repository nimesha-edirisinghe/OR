import { HStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { FC } from 'react';
import AppTooltip from 'components/AppTooltip/AppTooltip';
import { TableMapDataI } from 'pages/OperationsMonitoring/ActivityLog/TableSection/TableDataMapping';

interface AlertGeneralDataCellProps {
  children: string;
  tableMap: TableMapDataI;
}

const AlertGeneralDataCell: FC<AlertGeneralDataCellProps> = ({ children, tableMap }) => {
  return (
    <HStack
      px="4"
      bg="#373737"
      py="8px"
      minW={tableMap.styles?.width}
      justifyContent="space-between"
      h="36px"
    >
      <AppText fontSize="13px" fontWeight={500} color="#E6E6E6" noOfLines={1}>
        {children?.length > 18 ? (
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

export default AlertGeneralDataCell;
