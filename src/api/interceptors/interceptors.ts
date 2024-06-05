import { AxiosInstance } from 'axios';
import store, { RootState } from 'state/store';

export const addTokenInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use((config) => {
    const state: RootState = store.getState(); // Access the Redux state
    const token = state.user.keyCloakInfo.token; // Access the token value from the auth slice of the state
    // Set the token in the headers
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });
};

export const addXTenantIdInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use((config) => {
    const state: RootState = store.getState(); // Access the Redux state
    const orgId = state.user.selectedOrg.orgKey; // Get Organization id
    // Set the X-TenantID in the headers
    if (orgId) {
      config.headers['X-TenantID'] = orgId;
    }
    return config;
  });
};

export const addResponseInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use((response) => {
    return response;
  }, error => {

    if (error.response && error.response.status === 401) {
      window.location.href = '/accessdenied';
      return Promise.reject('Unauthorized');
    }

    return Promise.reject(error);
  });
};

