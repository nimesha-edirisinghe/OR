import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IRootState } from 'state/rootState';
import { ModuleKeyI } from 'types/dashboard';

export interface IDashboard {
  loading: {
    forecastLoading: boolean;
    inventoryLoading: boolean;
  };
  tableauToken: string | null;
}

export const DashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    loading: {
      forecastLoading: false,
      inventoryLoading: false
    },
    tableauToken: null
  } as IDashboard,
  reducers: {
    fetchTableauTokenRequest: (state, action: PayloadAction<ModuleKeyI>) => {},
    fetchTableauTokenRequestSuccess: (state, action: PayloadAction<string>) => {
      state.tableauToken = action.payload;
    },
    fetchTableauTokenRequestFailure: (state) => {},
    setForecastLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.forecastLoading = action.payload;
    }
  }
});

export const dashboardSliceSelector = (state: IRootState) => state.dashboard;

export const {
  fetchTableauTokenRequest,
  fetchTableauTokenRequestSuccess,
  fetchTableauTokenRequestFailure,
  setForecastLoading
} = DashboardSlice.actions;

export default DashboardSlice.reducer;
