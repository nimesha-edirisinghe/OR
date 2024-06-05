import { FC, ReactNode } from 'react';
import GeneralDataCell from './AlertGeneralDataCell';
import { TableMapDataI } from 'pages/OperationsMonitoring/ActivityLog/TableSection/TableDataMapping';

interface AlertDataCellMapProps {
  children: ReactNode;
  mapData: TableMapDataI;
}

const AlertDataCellMap: FC<AlertDataCellMapProps> = ({ children, mapData }) => {
  switch (mapData.cellType) {
    case 'generalCell':
      return (
        <GeneralDataCell key={mapData.id} tableMap={mapData}>
          {children as string}
        </GeneralDataCell>
      );
    default:
      return <></>;
  }
};

export default AlertDataCellMap;
