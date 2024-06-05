import { KeyValueI } from './insightResponses';

export interface ActivityLogFilterCountApiResponseI {
  activity: number | string;
  execType: number | string;
  group: number | string;
  status: number | string;
  user: number | string;
}

export interface ActivityLogFilterDataApiResponseI {
  list: string[] | [];
  totalCount: number;
}

export interface ActivityLogFilterGroupDataApiResponseI {
  list: KeyValueI[] | [];
  totalCount: number;
}
