import { createSlice } from '@reduxjs/toolkit';
import { IRootState } from 'state/rootState';
import { orgDetailsI, orgFetchingResponseI } from 'types/responses/userResponses';
import { permissionType } from 'utils/auth';
import { storeInLocal } from 'utils/localStorage';

export interface IUser {
  user: {
    username: string;
    name: string;
    last_login: number;
    base_modules?: {
      DF: boolean;
      DS: boolean;
      INV: boolean;
      Factory: boolean;
      ADMIN: boolean;
    };
    'factory-modules'?: {
      GroupConfig: permissionType;
      DF: permissionType;
      DS: permissionType;
      Inv: permissionType;
    };
  };
  userOrgs: orgFetchingResponseI;
  selectedOrg: orgDetailsI;
  keyCloakInfo: any;
  isLoading: boolean;
}

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    userOrgs: {},
    selectedOrg: {},
    isLoading: false
  } as IUser,
  reducers: {
    getUserFetch: (state) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      storeInLocal('user', JSON.stringify(action.payload));
    },
    getUserFailure: (state) => {
      state.isLoading = false;
    },
    saveKeyCloakInfo: (state, action) => {
      state.keyCloakInfo = action.payload;
    },
    fetchOrganizationsRequest: (state) => {
      state.isLoading = true;
    },
    fetchOrganizationsSuccess: (state, action) => {
      state.userOrgs = action.payload;
      state.selectedOrg = action.payload.orgDetails[0];
      state.isLoading = false;
    },
    fetchOrganizationsFailure: (state) => {
      state.isLoading = false;
    },
    setUserSelectedOrg: (state, action: { payload: orgDetailsI }) => {
      state.selectedOrg = action.payload;
    }
  }
});

export const userSliceSelector = (state: IRootState) => state.user;

export const {
  getUserFetch,
  getUserSuccess,
  getUserFailure,
  saveKeyCloakInfo,
  fetchOrganizationsRequest,
  fetchOrganizationsSuccess,
  fetchOrganizationsFailure,
  setUserSelectedOrg
} = UserSlice.actions;

export default UserSlice.reducer;
