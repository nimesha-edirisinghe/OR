import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IRootState } from 'state/rootState';
import { GetLastUpdatedDataI } from 'types/responses/common/common';

export interface ICommon {
  lastLoginData: GetLastUpdatedDataI | null;
}

export const CommonSlice = createSlice({
  name: 'common',
  initialState: {
    lastLoginData: null
  } as ICommon,
  reducers: {
    getCommonLastUpdateDateRequest: (state) => {},
    getCommonLastUpdateDateSuccess: (state, action: PayloadAction<GetLastUpdatedDataI>) => {
      state.lastLoginData = action.payload;
    },
    getCommonLastUpdateDateFailure: (state) => {}
  }
});

export const commonSliceSelector = (state: IRootState) => state.common;

export const {
  getCommonLastUpdateDateRequest,
  getCommonLastUpdateDateFailure,
  getCommonLastUpdateDateSuccess
} = CommonSlice.actions;

export default CommonSlice.reducer;
