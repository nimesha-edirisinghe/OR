import axios from 'axios';
import { addResponseInterceptor, addTokenInterceptor } from 'api/interceptors/interceptors';

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
});

addTokenInterceptor(instance);
// addResponseInterceptor(instance);

export default instance;
