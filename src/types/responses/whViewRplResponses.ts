import { PlanTableHeader } from 'state/pages/view/demandForecastView/sagaHelpers/sgH_DfView';
import { TableHeader } from './viewResponses';

export interface RplWHOrderPlanI {
  plannedOn: string;
  leadTime: number;
  daysOfCover: number;
  orderingFrequency: number;
  unitPrice: number;
  moq: number;
  unitOrderQty: number;
  wayOfSupply: string;
}

export interface RplWHStockMovementI {
  date: string;
  opening_stock: number;
  demand: number;
  pending: number;
  expired: number;
  lost_sales: number;
  closing_stock: number;
  closing_inv_days_for_future_demand: number;
  closing_inventory_days: number;
  inventory_value: number;
  planned: number;
}

export interface RplWHOrderQtyDetailsI {
  order_date: string;
  delivery_date: string;
  quantity: number;
  value: number;
}

export interface WHOrderQtyDetailsStateI {
  headers: PlanTableHeader[];
  list: { id?: any; isSelected?: boolean; row: any[] }[] | null;
}
export interface WHStockMovementsI {
  headers: TableHeader[];
  list: { id?: any; isSelected?: boolean; row: any[] }[] | null;
}

export interface WHReplenishmentPlanDetailsResI {
  orderPlan: RplWHOrderPlanI;
  orderQtyDetails: RplWHOrderQtyDetailsI[];
  stockMovement: RplWHStockMovementI[];
  anchor_prod_key: number;
  isEdited?: 0 | 1;
}

export interface ReplenishmentWHPlanDetailsStateI {
  orderPlan: RplWHOrderPlanI;
  orderQtyDetails: WHOrderQtyDetailsStateI;
  stockMovement: WHStockMovementsI;
  anchor_prod_key: number;
  isEdited?: 0 | 1;
}
