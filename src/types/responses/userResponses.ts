import { permissionType } from 'utils/auth';
import { ScheduleType } from './jobScheduleResponses';

export interface UserDataApiResponse {
  username: string;
  base_modules: {
    ADMIN: number;
    DF: number;
    DS: number;
    INV: number;
    Factory: number;
  };
  factory_modules?: {
    GroupConfig: permissionType;
    DF: permissionType;
    DS: permissionType;
    Inv: permissionType;
  };
}

export interface orgDetailsI {
  name: string;
  orgKey: number;
  responseTimeGranularity: ScheduleType;
}

export interface orgFetchingResponseI {
  orgDetails: orgDetailsI[];
  username: string;
}
