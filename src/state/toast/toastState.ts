import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToastContainerProps, ToastOptions, toast } from 'react-toastify';

interface ToastState {
  toastContainerProps: ToastContainerProps;
}

const initialState: ToastState = {
  toastContainerProps: {}
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    updateToastContainerProps: (state, action: PayloadAction<ToastContainerProps>) => {
      state.toastContainerProps = action.payload;
    }
  }
});

export const { updateToastContainerProps } = toastSlice.actions;
export const toastReducer = toastSlice.reducer;

export const showSuccessToast = (message: string) => {
  toast.success(message);
};

export const showErrorToast = (message: string) => {
  toast.error(message);
};

export const showInfoToast = (message: string) => {
  toast.info(message);
};

export const showWarningToast = (message: string) => {
  toast.warning(message);
};
