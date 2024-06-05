import { FC, ReactNode } from 'react';
import GeneralDataCell from './GeneralDataCell';
import { TableMapDataI } from '../TableDataMapping';
import OperationCell from './OperationCell';
import { ActivityLogDataList } from 'types/activityLog';

interface DataCellMapProps {
  children: ReactNode;
  mapData: TableMapDataI;
  dataList: ActivityLogDataList;
  uuid: number | null;
}

const DataCellMap: FC<DataCellMapProps> = ({ uuid, children, mapData, dataList }) => {
  switch (mapData.cellType) {
    case 'generalCell':
      return (
        <GeneralDataCell key={mapData.id} tableMap={mapData}>
          {children as string}
        </GeneralDataCell>
      );
    case 'operationCell':
      return (
        <OperationCell
          key={mapData.id}
          jobGroupId={uuid}
          tableMap={mapData}
          status={dataList.status}
        >
          {children}
        </OperationCell>
      );
  }
};

export default DataCellMap;
