import { DFPredictorListI } from 'types/responses/viewResponses';

interface Option {
  label: string;
  value: string;
}

interface GroupOption {
  groupName: string;
  options: { label: string; value: string }[];
}

export const generateOptions = (list: DFPredictorListI[]): GroupOption[] => {
  return list?.reduce<GroupOption[]>((acc, item) => {
    let groupName = '';
    if (item.processLevel === 'anchor-prod') {
      groupName = 'Sku';
    } else if (item.processLevel === 'anchor') {
      groupName = 'Anchor';
    }

    const existingGroup = acc?.find((opt) => opt.groupName === groupName);
    const label = item.predictorCode.toString();
    const value = item.predictorName;

    if (existingGroup) {
      existingGroup.options.push({ label, value });
    } else {
      acc.push({ groupName, options: [{ label, value }] });
    }

    return acc;
  }, []);
};
