import { addTokenInterceptor, addXTenantIdInterceptor } from 'api/interceptors/interceptors';
import axios from 'axios';
import { REACT_APP_OR_API_BASE_URL } from 'config/constants';

const instance = axios.create({
  baseURL: REACT_APP_OR_API_BASE_URL,
  responseType: 'blob'
});

addTokenInterceptor(instance);
addXTenantIdInterceptor(instance);

export default instance;
