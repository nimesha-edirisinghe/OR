import { ExclusionCriteriaResponseI } from 'types/responses/view/forecastAnalyzer';

export interface ExclusionCriteriaI {
  name: string;
  alerted: boolean;
  value: number | null;
}

const shouldAlert = (value: number): { alerted: boolean; value: number | null } => {
  return {
    alerted: value > 0,
    value: value > 0 ? value : null
  };
};

export const exclusionCriteriaFormatter = (
  criteria: ExclusionCriteriaResponseI
): ExclusionCriteriaI[] => {
  return [
    {
      name: 'Out of Stock',
      ...shouldAlert(criteria?.outOfStock!)
    },
    {
      name: 'Discount Diff. (Planned vs. Actual)',
      ...shouldAlert(criteria?.discountDiff!)
    },
    {
      name: 'Unprecedented Peaks & Drops',
      ...shouldAlert(criteria?.peaksAndDrops!)
    },
    {
      name: 'New Product(s)',
      ...shouldAlert(criteria?.newProduct!)
    },
    {
      name: 'Zero Sales',
      ...shouldAlert(criteria?.zeroSales!)
    }
  ];
};
