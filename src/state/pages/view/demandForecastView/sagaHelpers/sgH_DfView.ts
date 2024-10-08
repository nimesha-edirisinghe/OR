import { GroupFilterI } from 'types/requests/groupConfigRequests';
import { GetAlertList } from 'types/responses/alertConfigResponse';
import {
  ReplenishmentPlanDetailsResI,
  ReplenishmentPlanDetailsStateI,
  RplOrderQtyDetailsI,
  RplStockMovementI,
  TableHeader
} from 'types/responses/viewResponses';
import { AlertReplenishmentActionTypeEnum } from 'utils/enum';

export interface PlanTableHeader {
  w: number;
  displayValue: string;
  key: keyof RplOrderQtyDetailsI;
}

export const orderQtyTblHeader: PlanTableHeader[] = [
  { displayValue: 'Order Date', key: 'order_date', w: 150 },
  { displayValue: 'Order Qty (Selling Units)', key: 'sellingUom', w: 150 },
  { displayValue: 'Order Qty (Buying Units)', key: 'buyingUOM', w: 150 },
  { displayValue: 'Value', key: 'value', w: 150 },
  { displayValue: 'ETA', key: 'delivery_date', w: 150 }
];

const orderQtyListFormatter = (orderQtyData: RplOrderQtyDetailsI[]) => {
  const formatterOrderQtyList =
    orderQtyData?.map((item, index) => ({
      id: index,
      action: AlertReplenishmentActionTypeEnum.UNCHANGED,
      fresh: false,
      row: orderQtyTblHeader?.map((header) => item[header.key]) || []
    })) || [];
  return formatterOrderQtyList;
};

const stockMovementHeaderFormatter = (stockMovementData: RplStockMovementI[],defaultWidth:number = 150): TableHeader[] => {
  const stockMovementTblHeader: TableHeader[] = [
    { displayValue: '', key: 'order_date', w: 150 },
    ...(stockMovementData || []).map((item) => ({
      displayValue: item.date,
      key: item.date,
      w: defaultWidth
    }))
  ];

  return stockMovementTblHeader;
};

const stockMovementListFormatter = (stockMovementData: RplStockMovementI[]) => {
  const list: { id?: any; row: any[] }[] = [];

  if (stockMovementData) {
    list.push({
      id: 0,
      row: ['Opening Stock', ...stockMovementData.map((i) => i.opening_stock)]
    });
    list.push({
      id: 1,
      row: ['Demand Forecast', ...stockMovementData.map((i) => i.demand)]
    });
    list.push({
      id: 2,
      row: ['Pending Stock', ...stockMovementData.map((i) => i.pending)]
    });
    list.push({
      id: 3,
      row: ['Proposed Stock', ...stockMovementData.map((i) => i.planned)]
    });
    list.push({
      id: 4,
      row: ['Expired Stock', ...stockMovementData.map((i) => i.expired)]
    });
    list.push({
      id: 5,
      row: ['Closing Stock', ...stockMovementData.map((i) => i.closing_stock)]
    });
    list.push({
      id: 6,
      row: ['Loss of Sales', ...stockMovementData.map((i) => i.lost_sales)]
    });
    list.push({
      id: 7,
      row: ['Inventory Days', ...stockMovementData.map((i) => i.closing_inv_days_for_future_demand)]
    });
    list.push({
      id: 8,
      row: ['Inventory value', ...stockMovementData.map((i) => i.inventory_value)]
    });
  }

  return list;
};

export const replenishmentViewReFormatter = (data: ReplenishmentPlanDetailsResI,columWidth:number) => {
  const formatterOrderQtyList = orderQtyListFormatter(data?.orderQtyDetails!);
  const formattedResponse: ReplenishmentPlanDetailsStateI = {
    orderPlan: data?.orderPlan,
    orderQtyDetails: {
      headers: orderQtyTblHeader,
      list: formatterOrderQtyList,
      defaultList: formatterOrderQtyList
    },
    stockMovement: {
      headers: stockMovementHeaderFormatter(data?.stockMovement,columWidth),
      list: stockMovementListFormatter(data?.stockMovement)
    },
    anchor_prod_key: data?.anchor_prod_key,
    isEdited: data?.isEdited!
  };
  return formattedResponse;
};

export const generateGroupFilters = (
  filters: GroupFilterI[],
  isSelectedAll: boolean,
  selectedSKUList: GetAlertList[] | [],
  searchKey?: string
): GroupFilterI[] => {
  let groupFilters = filters.filter((filter) => !(filter.code === 1 && filter.type === 'group'));

  if (isSelectedAll) {
    const additionalBody: GroupFilterI = {
      code: 2,
      isSelectAll: true,
      search: searchKey || '',
      selectedItems: [],
      type: 'sku'
    };

    groupFilters = [...groupFilters, additionalBody];
  } else if (selectedSKUList.length > 0) {
    const additionalBody: GroupFilterI = {
      code: 1,
      isSelectAll: false,
      search: searchKey || '',
      selectedItems: selectedSKUList.map((sku) => sku.anchorProdKey.toString()),
      type: 'sku'
    };

    groupFilters = [...groupFilters, additionalBody];
  }

  return groupFilters;
};
