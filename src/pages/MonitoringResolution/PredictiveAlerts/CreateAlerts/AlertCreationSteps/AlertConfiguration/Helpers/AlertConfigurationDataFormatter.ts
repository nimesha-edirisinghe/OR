export const getLabelFromFrequency = (key: string | null): string => {
  switch (key) {
    case 'DAILY':
      return 'days';
    case 'WEEKLY':
      return 'weeks';
    case 'MONTHLY':
      return 'months';
    default:
      return '';
  }
};

export const getCaptionFromFrequency = (key: string | null): string => {
  switch (key) {
    case 'DAILY':
      return 'Max: 60 days';
    case 'WEEKLY':
      return 'Max: 12 weeks';
    case 'MONTHLY':
      return 'Max: 12 moths';
    default:
      return '';
  }
};
