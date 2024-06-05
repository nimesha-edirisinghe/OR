import React, { ReactNode } from 'react';
import { TableCellProps, Td } from '@chakra-ui/react';

interface Props extends TableCellProps {
  children?: ReactNode;
}

const TableCell: React.FC<Props & TableCellProps> = ({ children, ...rest }) => {
  return <></>;
};

export default TableCell;
