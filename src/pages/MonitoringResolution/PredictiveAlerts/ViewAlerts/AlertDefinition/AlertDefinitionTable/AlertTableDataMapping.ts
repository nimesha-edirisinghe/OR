import { TableMapDataI } from 'pages/OperationsMonitoring/ActivityLog/TableSection/TableDataMapping';

export const alertTableDataMap: TableMapDataI[] = [
  {
    id: 1,
    header: {
      headerName: 'Group',
      secondHeaderName: 'Group'
    },
    key: 'groupName',
    cellType: 'generalCell',
    styles: {
      width: '180px'
    }
  },
  {
    id: 2,
    header: {
      headerName: 'Department',
      secondHeaderName: 'Department'
    },
    key: 'department',
    cellType: 'generalCell',
    styles: {
      width: '180px'
    }
  },
  {
    id: 3,
    header: {
      headerName: 'Sub Department',
      secondHeaderName: 'Sub Department'
    },
    key: 'subDepartment',
    cellType: 'generalCell',
    styles: {
      width: '180px'
    }
  },
  {
    id: 4,
    header: {
      headerName: 'SKU Code',
      secondHeaderName: 'SKU Code'
    },
    key: 'skuCode',
    cellType: 'generalCell',
    styles: {
      width: '180px'
    }
  },
  {
    id: 5,
    header: {
      headerName: 'SKU Name',
      secondHeaderName: 'SKU Name'
    },
    key: 'skuDescription',
    cellType: 'generalCell',
    format: 'dateTime',
    styles: {
      width: '180px'
    }
  },
  {
    id: 6,
    header: {
      headerName: 'Store Code',
      secondHeaderName: 'Store Code'
    },
    key: 'storeCode',
    cellType: 'generalCell',
    format: 'time',
    styles: {
      width: '180px'
    }
  },
  {
    id: 7,
    header: {
      headerName: 'Store Name',
      secondHeaderName: 'Store Name'
    },
    key: 'store',
    cellType: 'generalCell',
    styles: {
      width: '180px'
    }
  },
  {
    id: 8,
    header: {
      headerName: 'Current Inventory',
      secondHeaderName: 'Growth %'
    },
    key: 'compareValue',
    cellType: 'generalCell',
    format: 'noZero',
    styles: {
      width: '180px'
    }
  },
  {
    id: 9,
    header: {
      headerName: 'Demand for [X] Days',
      secondHeaderName: 'Threshold %'
    },
    key: 'threshold',
    cellType: 'generalCell',
    styles: {
      width: '180px'
    }
  }
];
