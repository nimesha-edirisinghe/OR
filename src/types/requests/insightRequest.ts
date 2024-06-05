import { FilterDataT } from 'types/insight';
import { KeyValueI } from 'types/responses/insightResponses';
import { HotListIndicators } from 'utils/enum';

export interface ProductHierarchyI {
  classes: [string] | [];
  departments: [string] | [];
  products: [string] | [];
  subClasses: [string] | [];
  subDepartments: [string] | [];
}

export type HotListIndicatorsT = `${HotListIndicators}`;

export interface FilterItemContentI {
  isSelectAll: boolean;
  search: null | string;
  selectedItems: [string] | [];
  outOfCount?: number;
}
export interface InsightFilterRequestPayloadI {
  group: {
    storeGroup: FilterItemContentI;
    warehouseGroup: FilterItemContentI;
  };
  hotListIndicator: HotListIndicatorsT[];
  location: {
    storeCode: FilterItemContentI;
    warehouseCode: FilterItemContentI;
  };
  productHierarchy: {
    classes: FilterItemContentI;
    departments: FilterItemContentI;
    products: FilterItemContentI;
    subClasses: FilterItemContentI;
    subDepartments: FilterItemContentI;
  };

  duration: {
    startDate: string;
    endDate: string;
  };
}

export interface RightFilterItemContentI {
  isSelectAll: boolean;
  search: null | string;
  selectedItems: KeyValueI[] | [];
  outOfCount?: number;
}

export interface RightPanelRetainDataList {
  group: {
    storeGroup: RightFilterItemContentI;
    warehouseGroup: RightFilterItemContentI;
  };
  location: {
    storeCode: RightFilterItemContentI;
    warehouseCode: RightFilterItemContentI;
  };
  productHierarchy: {
    classes: RightFilterItemContentI;
    departments: RightFilterItemContentI;
    products: RightFilterItemContentI;
    subClasses: RightFilterItemContentI;
    subDepartments: RightFilterItemContentI;
  };
}

export interface FilterDataReqQueryParamI {
  pageNumber?: number;
  pageSize: number;
  orgKey: number;
  sort: 'ASC' | 'DESC';
  type: FilterDataT;
}
