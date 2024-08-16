import { GetAlertList } from 'types/responses/alertConfigResponse';

export const getUniqueGroupCodeCount = (skuList: GetAlertList[] | []) => {
  const uniqueGroupCodes = new Set(skuList.map((item) => item.groupCode));
  return uniqueGroupCodes.size;
};

export const getUniqueGroupCodes = (skuList: GetAlertList[] | []): number[] => {
  return skuList.reduce((acc: number[], item: GetAlertList) => {
    const groupCodeNumber = Number(item.groupCode);
    if (!acc.includes(groupCodeNumber)) {
      acc.push(groupCodeNumber);
    }
    return acc;
  }, []);
};
