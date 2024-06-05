import { AlertPredictorListI } from "types/alertConfig";

interface Option {
  label: string;
  value: string;
}

interface GroupOption {
  groupName: string;
  options: { label: string; value: string }[];
}

export const historyOptions: Option[] = [
  {
    label: '2',
    value: '1 Year Back'
  },
  {
    label: '3',
    value: '2 Year Back'
  }
];

export const generateOptions = (list: AlertPredictorListI[]): GroupOption[] => {
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
