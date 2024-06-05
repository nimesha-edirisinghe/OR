import { HStack } from '@chakra-ui/react';
import { FC } from 'react';
import TableHeaderCell from './DataCells/HeaderCell';
import { TableMapDataI } from './TableDataMapping';

interface TableHeaderProps {
  tableDataMap: TableMapDataI[];
}

const TableHeader: FC<TableHeaderProps> = ({ tableDataMap }) => {
  return (
    <HStack fontWeight="bold" spacing="2px">
      {tableDataMap.map((td) => (
        <TableHeaderCell key={td.id} tableMap={td}>
          {td.header.headerName}
        </TableHeaderCell>
      ))}
    </HStack>
  );
};

export default TableHeader;
