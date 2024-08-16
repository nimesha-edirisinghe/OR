import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IRootState } from 'state/rootState';
import { TaskCountI } from 'types/responses/home/home';

export interface IHome {
  taskCount: TaskCountI | null;
}

export const HomeSlice = createSlice({
  name: 'home',
  initialState: {
    taskCount: {}
  } as IHome,
  reducers: {
    getWorkflowTaskCountRequest: (state) => {},
    getWorkflowTaskCountRequestSuccess: (state, action: PayloadAction<TaskCountI>) => {
      state.taskCount = action.payload;
    },
    getWorkflowTaskCountRequestFailure: (state) => {},
    resetWorkflowTaskCount: (state) => {
      state.taskCount = null;
    }
  }
});

export const homeSliceSelector = (state: IRootState) => state.home;

export const {
  getWorkflowTaskCountRequest,
  getWorkflowTaskCountRequestSuccess,
  getWorkflowTaskCountRequestFailure,
  resetWorkflowTaskCount
} = HomeSlice.actions;

export default HomeSlice.reducer;
