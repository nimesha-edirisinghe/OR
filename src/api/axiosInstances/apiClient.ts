import {
  addResponseInterceptor,
  addTokenInterceptor,
  addXTenantIdInterceptor
} from 'api/interceptors/interceptors';
import axios from 'axios';
import { REACT_APP_OR_API_BASE_URL } from 'config/constants';

const instance = axios.create({
  baseURL: REACT_APP_OR_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

addTokenInterceptor(instance);
addXTenantIdInterceptor(instance);
addResponseInterceptor(instance);

export default instance;
