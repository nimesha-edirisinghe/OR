import { FC } from 'react';
import GeneralCell from './CellTypes/GeneralCell';
import { TableCellT } from 'types/responses/viewResponses';
import IndicatorCell from './CellTypes/IndicatorCell';
import ActionIconCell from './CellTypes/ActionIconCell';
import EditableCell from './CellTypes/EditableCell';
import { CellTextAlignmentT } from '../AppSimpleGrid';
import { iconName } from 'components/AppIcon/svgIcons';
import OperationCell from 'pages/OperationsMonitoring/ActivityLog/TableSection/DataCells/OperationCell';
import AppOperationCell from './CellTypes/AppOperationCell';
import { TableHeader } from 'types/responses/viewResponses';

interface Props {
  rowColorBg: string;
  displayValue: string;
  id: string;
  cellType?: TableCellT;
  onActionHandler?: (id: string, metaInfo: string, iconName?: iconName) => void;
  metaInfo?: string;
  enableAction?: boolean;
  showIndicator?: boolean;
  tableRoot?: any;
  cellCallback?: (id: number | string, index: number, value: string | number) => void;
  index?: number;
  textAlign?: CellTextAlignmentT;
  actionIcons?: iconName[];
  onEditActionHandler?: (
    ref: any,
    id: number | string,
    index: number,
    value: number | string,
    metaInfo?: string,
    icon?: iconName
  ) => any;
  jobGroupId?: number;
  cellWidth?: number;
}

const AppSimpleGridCellsMap: FC<Props> = ({
  rowColorBg,
  displayValue,
  id,
  cellType,
  onActionHandler,
  metaInfo,
  enableAction,
  showIndicator = true,
  tableRoot,
  cellCallback = (id: number | string, index: number, value: string | number) => {},
  actionIcons = ['download'],
  index = 0,
  textAlign,
  onEditActionHandler = (
    ref: any,
    id: number | string,
    index: number,
    value: number | string,
    metaInfo?: string,
    icon?: iconName
  ) => {},
  jobGroupId = 0,
  cellWidth = 0
}) => {
  switch (cellType) {
    case 'generalCell':
      return (
        <GeneralCell
          displayValue={displayValue}
          rowColorBg={rowColorBg}
          tableRoot={tableRoot}
          textAlign={textAlign}
          cellWidth={cellWidth}
        />
      );
    case 'indicatorCell':
      return <IndicatorCell displayValue={displayValue} showIndicator={showIndicator} />;
    case 'actionIconCell':
      return (
        <ActionIconCell
          onActionHandler={onActionHandler}
          id={id}
          metaInfo={metaInfo}
          enableAction={enableAction}
          actionIcons={actionIcons}
        />
      );
    case 'editableCell':
      return (
        <EditableCell
          id={id}
          metaInfo={metaInfo}
          displayValue={displayValue}
          rowColorBg={rowColorBg}
          cellCallback={cellCallback}
          index={index}
          enableAction={enableAction}
          actionIcons={actionIcons}
          textAlign={textAlign}
          onEditActionHandler={onEditActionHandler}
        />
      );
    case 'operationCell':
      return (
        <AppOperationCell
          key={id}
          jobGroupId={jobGroupId}
          displayValue={displayValue}
          actionIcons={actionIcons}
          cellCallback={cellCallback}
          index={index}
        />
      );
    default:
      return (
        <GeneralCell
          displayValue={displayValue}
          rowColorBg={rowColorBg}
          tableRoot={tableRoot}
          textAlign={textAlign}
          cellWidth={cellWidth}
        />
      );
  }
};

export default AppSimpleGridCellsMap;
