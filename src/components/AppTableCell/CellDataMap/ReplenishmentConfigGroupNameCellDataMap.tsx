import { FC } from 'react';
import { CellDataMappingI } from '../AppTableCell';
import GeneralCellLayout from '../CellLayouts/GeneralCellLayout';
import AppText from 'components/AppText/AppText';
import { GeneralCellI } from './GeneralCellDataMap';
import ReplenishmentConfigGroupNameSubLabel from '../CustomCellLabels/ReplenishmentConfigGroupNameSubLabel';
import { neutral_200 } from 'theme/colors';

export interface ReplenishmentConfigGroupNameCellI extends CellDataMappingI {
  groupName: string;
  groupKey: number;
  anchorCount: number;
  skuCount: number;
  groupDisplayName?: string;
}

export interface ReplenishmentConfigGroupNameCell extends GeneralCellI {
  cellData: Partial<ReplenishmentConfigGroupNameCellI>;
  cellDataMapping?: Partial<CellDataMappingI>;
}

const ReplenishmentConfigGroupNameCellDataMap: FC<ReplenishmentConfigGroupNameCell> = ({
  cellData,
  cellDataMapping,
  ...rest
}) => {
  return (
    <GeneralCellLayout
      {...rest}
      rowId={'0'}
      mainLabel={
        <AppText
          whiteSpace="nowrap"
          fontSize="13px"
          color={neutral_200}
          fontWeight={400}
          style={{ userSelect: 'text' }}
        >
          {cellData?.groupDisplayName}
        </AppText>
      }
      subLabel={<ReplenishmentConfigGroupNameSubLabel skuCount={cellData.skuCount || 0} />}
      actions={[]}
      w={cellDataMapping?.w ? cellDataMapping?.w : ''}
    />
  );
};

export default ReplenishmentConfigGroupNameCellDataMap;
