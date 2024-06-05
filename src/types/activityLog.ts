import { ActivityLogFilterDateTypesEnum } from 'utils/enum';
import { KeyValueI } from './responses/insightResponses';

export type ActivityLogFilterTRec = Record<ActivityLogFilterT, string>;

export type DrawerTitleT =
  | 'Activity'
  | 'Date'
  | 'Execution Type'
  | 'Group Name'
  | 'Status'
  | 'User';

export type ActivityLogFilterT =
  | 'activity'
  | 'date'
  | 'execType'
  | 'group'
  | 'status'
  | 'user'
  | '';

export type ActivityLogFilterDateT =
  `${ActivityLogFilterDateTypesEnum}` extends `${infer T extends number}` ? T : never;

export interface FilterItemContentI {
  isSelectAll: boolean;
  search: null | string;
  selectedItems: KeyValueI[] | [];
  outOfCount?: number;
}

export interface ActivityLogFilterI {
  activity: FilterItemContentI;
  date: FilterDateContentI;
  execType: FilterItemContentI;
  groupName: FilterItemContentI;
  status: FilterItemContentI;
  user: FilterItemContentI;
}

export interface FilterDateContentI {
  dateType: string | number;
  endDate: number | null;
  startDate: number | null;
  zoneId: string;
}
export interface RightPanelRetainDataList {
  activity: FilterItemContentI;
  execType: FilterItemContentI;
  group: FilterItemContentI;
  status: FilterItemContentI;
  user: FilterItemContentI;
  date: FilterDateContentI;
}

export interface FilterLocalScopeI {
  isOpenFilterDrawer: boolean;
  isOpenItemSelectionDrawer: boolean;
  isOpenFilterDateSelectionDrawer: boolean;
  rightPanelRetainDataList: RightPanelRetainDataList;
  beforeEditFilterOptionsLevel1: RightPanelRetainDataList;
  beforeEditFilterOptionsLevel2: RightPanelRetainDataList;
}

export interface ActivityLogDataList {
  jobGroupId: number;
  groupKey: number;
  groupName: string;
  anchorLocations: number;
  skuLocations: number;
  activity: string;
  execType: string;
  startTime: number;
  elapsedTime: string;
  status: string;
  user: string;
}

export interface ActivityLogDataI {
  totalCount: number;
  list: ActivityLogDataList[] | [];
}

export interface JobSummaryI {
  jobKey: number;
  jobType: string;
  jobTypeDesc: string;
  executionLevel: 'anchor' | 'sku';
  status: string;
  anchorLocations: number;
  skuLocations: number;
  totalCount: null;
  successCount: null;
  failureCount: null;
}

export interface ActivityLogSummaryDataI {
  jobGroupId: number;
  groupKey: number;
  orgKey: number;
  details: JobSummaryI[];
}

export interface ActivityLogLocalScopeI {
  ascendingSort: boolean;
  currentPageNumber?: number;
}
