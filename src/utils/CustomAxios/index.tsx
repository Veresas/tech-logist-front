import axios from 'axios';
//import { BASE_PATH } from '../../api/base';
const BASE_PATH = import.meta.env.VITE_BASE_PATH;

export const customAxiosInstance = axios.create({
  baseURL: BASE_PATH,
});

customAxiosInstance.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
  (error) => Promise.reject(error)
);

customAxiosInstance.interceptors.response.use(
  (response) => {
    const redirectUri = response.headers['x-redirect-uri']

    if (redirectUri) {
      console.log('[Interceptor] Redirecting to:', redirectUri);

      window.location.href = redirectUri;
      return new Promise(() => {});
    }
    return response;
  },
  (error) => {
    console.log('Какая - то ошибка: ', error.response.data);
    if (error.response?.status === 401) {
      console.log('[Interceptor] Redirecting to login');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
