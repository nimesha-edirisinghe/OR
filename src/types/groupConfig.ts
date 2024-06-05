import { KeyValueI } from './responses/insightResponses';
import { ScheduleType } from './responses/jobScheduleResponses';

export type GroupTypes = 'store' | 'warehouse';

export type InfluencingFactorTypes = 'sku' | 'anchor';

export type FilterLoadType = 'page' | 'drawer';

export interface FilterLocalScopeI {
  isOpenFilterDrawer: boolean;
  isOpenItemSelectionDrawer: boolean;
  itemSelectionDrawerOpenFrom: FilterLoadType;
  viewFilter: boolean;
  viewOutOfCount: number;
  viewFilterActiveStep: 0 | 1 | 2;
  rightPanelRetainDataList: RightFilterItemContentI[];
  beforeEditFilterOptionsLevel1: RightFilterItemContentI[] | undefined;
  beforeEditFilterOptionsLevel2: RightFilterItemContentI[] | undefined;
}

export interface RightFilterItemContentI {
  code: number;
  isSelectAll: boolean;
  search?: null | string;
  selectedItems: KeyValueI[] | string[] | [];
  outOfCount?: number;
  type: string;
}

export interface GroupConfigurationLocalScopeI {
  storeGroupCreationDrawer: boolean;
  storeGroupViewDrawer: boolean;
  isWarehouseGroup: boolean;
  currantPageNumber: number;
  isFilterApplied: boolean;
}

export interface GroupLabelI {
  code: number;
  name: string;
  label?: string;
  sku?: boolean;
  anchor?: boolean;
}

export interface PredictorLabelI {
  predictorCode: number;
  predictorName: string;
  sku?: boolean;
  anchor?: boolean;
}

export type LabelTypes = 'product' | 'location' | 'predictor' | 'store' | 'anchor' | 'all';

export type FormattedLabelsI = {
  [key in LabelTypes]: GroupLabelI[];
};

export interface GroupDetailsI {
  name: string;
  frequency: ScheduleType;
  horizon: number;
}

export interface FilterDataApiResponseI {
  list: KeyValueI[] | [];
  totalCount: number;
}

export type GroupDetailsKeyT = 'name' | 'frequency' | 'horizon';
