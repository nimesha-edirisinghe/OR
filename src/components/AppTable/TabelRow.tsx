import React, { useState } from 'react';
import { TableRowProps, Tr } from '@chakra-ui/react';
import AppTableCell, { CellDataMappingI } from 'components/AppTableCell/AppTableCell';
import { ocean_blue_400, ocean_blue_500 } from 'theme/colors';

interface Props extends TableRowProps {
  rowData: any;
  tableRowDataMapping: CellDataMappingI[];
}

const TableRow: React.FC<Props & TableRowProps> = ({
  rowData,
  tableRowDataMapping,
  ...rest
}: Props) => {
  const [rowActionsEnable, setRowActionsEnable] = useState(false);

  return (
    <Tr {...rest}>
      {Object.keys(rowData).map((cellData, index) => {
        return (
          <AppTableCell
            key={index}
            backgroundColor={ocean_blue_400}
            rowId={rowData.uuid}
            cellData={rowData}
            cellDataMapping={tableRowDataMapping[index]}
            rowActionsEnable={rowActionsEnable}
            onMouseEnter={() => {
              setRowActionsEnable(true);
            }}
            onMouseLeave={() => {
              setRowActionsEnable(false);
            }}
          />
        );
      })}
    </Tr>
  );
};

export default TableRow;
