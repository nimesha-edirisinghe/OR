import { FC } from 'react';
import { CellDataMappingI, cellActionType } from '../AppTableCell';
import GeneralCellLayout from '../CellLayouts/GeneralCellLayout';
import AppText from 'components/AppText/AppText';
import { valueForKeyPath } from 'utils/objectFn';
import { format } from 'date-fns';
import { RplConfigTableDataI } from 'types/replenishmentConfig';
import { neutral_200 } from 'theme/colors';

export interface GeneralCellDataMappingI extends CellDataMappingI {
  mainLabel: string;
  subLabel?: string;
  actions?: [];
}

export interface GeneralCellI {
  rowId: string;
  cellData: Partial<GeneralCellDataMappingI>;
  cellDataMapping?: Partial<GeneralCellDataMappingI>;
  rowActionsEnable?: boolean;
}

const GetGeneralCellDataMap: FC<GeneralCellI> = ({
  rowId,
  rowActionsEnable,
  cellData,
  cellDataMapping,
  ...rest
}) => {
  // TODO: move cell formatter to separate location
  const mainLabel =
    cellDataMapping?.mainLabel && valueForKeyPath(cellData, cellDataMapping?.mainLabel);
  let formattedLabel = '';
  if (cellDataMapping?.formatTo === 'date' && cellDataMapping?.mainLabel && mainLabel !== '') {
    try {
      formattedLabel = format(new Date(mainLabel), 'yyyy-MM-dd');
    } catch (e) {
      console.error('error in date format ', e);
    }
  } else if (
    cellDataMapping?.formatTo === 'schedule' &&
    cellDataMapping?.mainLabel &&
    mainLabel !== null
  ) {
    const schedule = mainLabel as RplConfigTableDataI['scheduled'];
    try {
      if (!schedule) {
        formattedLabel = '-';
      } else {
        if (schedule.active) {
          formattedLabel = `Enabled (${schedule.active})`;
        }
      }
    } catch (e) {
      console.error('error in date format ', e);
    }
  } else {
    formattedLabel = mainLabel;
  }

  return (
    <GeneralCellLayout
      rowId={rowId}
      mainLabel={
        <AppText whiteSpace="nowrap" fontSize="12px" color={neutral_200} fontWeight={400}>
          {formattedLabel}
        </AppText>
      }
      subLabel={
        <AppText whiteSpace="nowrap" fontSize="13px" fontWeight={400}>
          {cellDataMapping?.subLabel && valueForKeyPath(cellData, cellDataMapping?.subLabel)}
        </AppText>
      }
      actions={cellDataMapping?.actions ? cellDataMapping?.actions : []}
      rowActionsEnable={rowActionsEnable}
      w={cellDataMapping?.w ? cellDataMapping?.w : ''}
      {...rest}
    />
  );
};

export default GetGeneralCellDataMap;
