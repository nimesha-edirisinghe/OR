import { FCAnalyzerSkuResponseI } from 'types/responses/view/forecastAnalyzer';

export interface SkuItemObjI {
  id: number;
  label: string;
  value: string;
}

export const transformSkuObjectToArray = (
  skuDetails: FCAnalyzerSkuResponseI | null | undefined
): SkuItemObjI[] => {
  if (!skuDetails) {
    return [];
  }

  return Object.entries(skuDetails)?.map(([key, value], index) => ({
    id: index + 1,
    label:
      key.toUpperCase() === 'SKU'
        ? 'SKU'
        : key === 'validationPeriod'
        ? 'Validation Period'
        : key.charAt(0).toUpperCase() + key.slice(1),
    value: String(value)
  }));
};

export const transformAccDistributionObj = (obj: { [key: string]: number } | null) => {
  if (!obj) return [];

  return Object.entries(obj)?.map(([key, value]) => ({
    name: key === 'high' ? 'High' : key === 'average' ? 'Avg' : 'Low',
    value: value
  }));
};
