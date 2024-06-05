import { TableHeader } from 'types/responses/viewResponses';

export const productActivationHeader: TableHeader[] = [
  {
    w: 147,
    displayValue: 'Group',
    key: 'group',
    cellType: 'generalCell'
  },
  {
    w: 159,
    displayValue: 'Anchor',
    key: 'anchor',
    cellType: 'generalCell'
  },
  {
    w: 300,
    displayValue: 'New SKU',
    key: 'newSku',
    cellType: 'generalCell'
  },
  {
    w: 200,
    displayValue: 'Department',
    key: 'department',
    cellType: 'generalCell'
  },
  {
    w: 88,
    displayValue: 'Location',
    key: 'location',
    cellType: 'generalCell'
  },
  {
    w: 88,
    displayValue: 'Configure',
    key: 'wrench',
    cellType: 'actionIconCell',
    actionIcons:['wrench']
  }
];
