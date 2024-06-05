interface LabelMappingI {
  [key: string]: string;
}

export const labelMapping: LabelMappingI = {
  activity: 'Activity',
  date: 'Date',
  execType: 'Execution Type',
  status: 'Status',
  group: 'Group Name',
  user: 'User'
};

export const chipsOrder: string[] = [
  'Group Name',
  'Activity',
  'Execution Type',
  'Status',
  'User',
  'Date'
];

export const customSort = (a: { label: string }, b: { label: string }, order: string[]): number => {
  const indexA = order.indexOf(a.label);
  const indexB = order.indexOf(b.label);
  return indexA - indexB;
};
