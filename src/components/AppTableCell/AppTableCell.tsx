import { BoxProps } from '@chakra-ui/react';
import { FC } from 'react';
import GetGeneralCellDataMap from './CellDataMap/GeneralCellDataMap';
import ForecastConfigGroupNameCellDataMap from './CellDataMap/ForecastConfigGroupNameCellDataMap';
import { iconName } from 'assets/svg/chakraIcons';
import { ForecastConfigTableAction } from 'components/AppTable/TableDataMapping/ForecastingConfigTable';
import ReplenishmentConfigGroupNameCellDataMap from './CellDataMap/ReplenishmentConfigGroupNameCellDataMap';

export type cellType = 'gc' | 'groupNameCell' | 'rplGroupNameCell';

export type cellActionType = {
  iconName: iconName;
  action: ForecastConfigTableAction;
  onClick: (action: string, rowId?: string) => void;
};
export interface CellDataMappingI {
  cellType: cellType;
  actions?: [];
  w?: string;
  formatTo?: string;
}

interface Props extends BoxProps {
  cellDataMapping: CellDataMappingI;
  cellData: CellDataMappingI;
  rowActionsEnable: boolean;
  rowId: string;
}

const AppTableCell: FC<Props> = ({
  rowId,
  rowActionsEnable,
  cellData,
  cellDataMapping,
  ...rest
}) => {
  if (cellDataMapping) {
    switch (cellDataMapping.cellType) {
      case 'gc':
        return (
          <GetGeneralCellDataMap
            rowId={rowId}
            cellData={cellData}
            cellDataMapping={cellDataMapping}
            rowActionsEnable={rowActionsEnable}
            {...rest}
          />
        );
        break;
      case 'groupNameCell':
        return (
          <ForecastConfigGroupNameCellDataMap
            rowId={rowId}
            cellData={cellData}
            cellDataMapping={cellDataMapping}
            {...rest}
          />
        );
        break;
      case 'rplGroupNameCell':
        return (
          <ReplenishmentConfigGroupNameCellDataMap
            rowId={rowId}
            cellData={cellData}
            cellDataMapping={cellDataMapping}
            {...rest}
          />
        );
    }
  } else {
    return <></>;
  }
};

export default AppTableCell;
