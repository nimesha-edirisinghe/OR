import { FC } from 'react';
import { HStack } from '@chakra-ui/react';
import { tableDataMap } from './TableDataMapping';
import { ActivityLogDataList } from 'types/activityLog';
import DataCellMap from './DataCells/DataCellMap';
import { getFormattedChildren } from './TableHelper';

interface TableRowProps {
  data: ActivityLogDataList;
}

const TableRow: FC<TableRowProps> = ({ data }) => {
  let jobGroupId: number = 0;

  return (
    <HStack alignItems="center" spacing="2px" mt="2px">
      {tableDataMap.map((tableMap) => {
        let { id, key } = tableMap;
        const childData = data[key as keyof ActivityLogDataList];
        const isActivityKey = tableMap.key === 'activity';
        const formattedChild =
          tableMap.format || isActivityKey
            ? getFormattedChildren(tableMap, childData, data)
            : childData;
        const isJobGroupKey = tableMap.key === 'jobGroupId';

        if (isJobGroupKey) jobGroupId = childData as number;

        return (
          <DataCellMap key={id} uuid={jobGroupId} mapData={tableMap} dataList={data}>
            {formattedChild}
          </DataCellMap>
        );
      })}
    </HStack>
  );
};

export default TableRow;
