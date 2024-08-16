import { FC } from 'react';
import { CellDataMappingI } from '../AppTableCell';
import GeneralCellLayout from '../CellLayouts/GeneralCellLayout';
import AppText from 'components/AppText/AppText';
import ForecastConfigGroupNameSubLabel from '../CustomCellLabels/ForecastConfigGroupNameSubLabel';
import { GeneralCellI } from './GeneralCellDataMap';

export interface ForecastingConfigGroupNameCellI extends CellDataMappingI {
  groupDetails: {
    groupName: string;
    groupKey: number;
    anchorCount: number;
    skuCount: number;
    groupDisplayName: string;
  };
}

export interface ForecastConfigGroupNameCell extends GeneralCellI {
  cellData: Partial<ForecastingConfigGroupNameCellI>;
  cellDataMapping?: Partial<CellDataMappingI>;
}

const ForecastConfigGroupNameCellDataMap: FC<ForecastConfigGroupNameCell> = ({
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
          fontSize="12px"
          fontWeight={400}
          style={{ userSelect: 'text' }}
        >
          {cellData.groupDetails?.groupDisplayName}
        </AppText>
      }
      subLabel={
        <ForecastConfigGroupNameSubLabel
          anchorCount={cellData.groupDetails?.anchorCount || 0}
          skuCount={cellData.groupDetails?.skuCount || 0}
        />
      }
      actions={[]}
      w={cellDataMapping?.w ? cellDataMapping?.w : ''}
    />
  );
};

export default ForecastConfigGroupNameCellDataMap;
