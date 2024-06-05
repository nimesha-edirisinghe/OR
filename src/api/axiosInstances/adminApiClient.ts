import axios from 'axios';
import { addResponseInterceptor, addTokenInterceptor } from 'api/interceptors/interceptors';
import { REACT_APP_OR_ADMIN_BASE_URL } from 'config/constants';

const instance = axios.create({
  baseURL: REACT_APP_OR_ADMIN_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

addTokenInterceptor(instance);
addResponseInterceptor(instance);

export default instance;
