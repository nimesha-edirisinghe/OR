import { AxiosError, AxiosInstance } from 'axios';
import keycloak from 'config/keyCloakAuth';
import store, { RootState } from 'state/store';
import { saveKeyCloakInfo } from 'state/user/userState';

export const addTokenInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    async (config) => {
      try {
        const state: RootState = store.getState();
        const token = state.user.keyCloakInfo.token;

        if (token) {
          const keycloakInstance = keycloak;
          const isTokenExpired = keycloakInstance.isTokenExpired(5);
          if (isTokenExpired) {
            await keycloakInstance.updateToken(30);
            const refreshedToken = keycloakInstance.token;
            store.dispatch(saveKeyCloakInfo(keycloakInstance));
            if (refreshedToken) {
              config.headers['Authorization'] = `Bearer ${refreshedToken}`;
            }
          } else {
            config.headers['Authorization'] = `Bearer ${token}`;
          }
        }
      } catch (error) {
        console.error('Failed to refresh token:', error);
        throw error;
      }

      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );
};

// export const addTokenInterceptor = (axiosInstance: AxiosInstance) => {
//   axiosInstance.interceptors.request.use((config) => {
//     const state: RootState = store.getState(); // Access the Redux state
//     const token = state.user.keyCloakInfo.token; // Access the token value from the auth slice of the state
//     // Set the token in the headers
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   });
// };

export const addXTenantIdInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use((config) => {
    const state: RootState = store.getState();
    const orgId = state.user.selectedOrg.orgKey;
    if (orgId) {
      config.headers['X-TenantID'] = orgId;
    }
    return config;
  });
};

export const addResponseInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        window.location.href = '/accessdenied';
        return Promise.reject('Unauthorized');
      }

      return Promise.reject(error);
    }
  );
};
