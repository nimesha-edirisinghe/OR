import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IRootState } from 'state/rootState';
import { ViewGroupI } from 'types/view';

export interface IGroupConfig {
  isLoading: boolean;
  selectedGroupKey: string | null;
  groupList: ViewGroupI;
}

export const GroupConfigSlice = createSlice({
  name: 'groupConfig',
  initialState: {
    isLoading: false,
    selectedGroupKey: null,
    groupList: {
      totalCount: 0,
      list: []
    }
  } as IGroupConfig,
  reducers: {
    getGroupListRequest: (state, action: PayloadAction<{ whFlag?: 0 | 1 | 2 }>) => {
      state.isLoading = true;
    },
    getGroupListSuccess: (state, action: PayloadAction<{ data: ViewGroupI }>) => {
      state.groupList = action.payload.data;
      state.isLoading = false;
    },
    getGroupListFailure: (state) => {
      state.isLoading = false;
    },
    selectGroupKey: (state, action: PayloadAction<string | null>) => {
      state.selectedGroupKey = action.payload;
    }
  }
});

export const groupConfigSliceSelector = (state: IRootState) => state.sharedGroupConfig;

export const { getGroupListRequest, getGroupListSuccess, getGroupListFailure, selectGroupKey } =
  GroupConfigSlice.actions;

export default GroupConfigSlice.reducer;
