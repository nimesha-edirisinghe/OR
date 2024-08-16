import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IRootState } from 'state/rootState';
import { ExternalUrlsI } from 'types/responses/systemConfigurations/systemConfigurations';

export interface ISystemConfiguration {
  dynamicConfigData: ExternalUrlsI | null;
}

export const SystemConfigurationSlice = createSlice({
  name: 'systemConfiguration',
  initialState: {
    dynamicConfigData: null
  } as ISystemConfiguration,
  reducers: {
    getDynamicConfigDataRequest: (state) => {},
    getDynamicConfigDataRequestSuccess: (state, action: PayloadAction<ExternalUrlsI>) => {
      state.dynamicConfigData = action.payload;
    },
    getDynamicConfigDataRequestFailure: (state) => {}
  }
});

export const systemConfigurationSliceSelector = (state: IRootState) => state.systemConfigurations;

export const {
  getDynamicConfigDataRequest,
  getDynamicConfigDataRequestSuccess,
  getDynamicConfigDataRequestFailure
} = SystemConfigurationSlice.actions;

export default SystemConfigurationSlice.reducer;
