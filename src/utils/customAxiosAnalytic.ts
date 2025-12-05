// ./src/utils/customAxios.ts (обёрнутая функция)
import axios, { type AxiosRequestConfig, type AxiosInstance, type AxiosResponse } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8500/analytic_api",
  withCredentials: true, // Включаем отправку cookies (включая httpOnly)
});

// Interceptor для установки withCredentials на каждый запрос
instance.interceptors.request.use((config) => {
  // Убеждаемся, что withCredentials всегда true
  config.withCredentials = true;
  return config;
});

// Response interceptor для обработки ошибок и редиректов
instance.interceptors.response.use(
  (response) => {
    const redirectUri = response.headers['x-redirect-uri'];
    if (redirectUri) {
      window.location.href = redirectUri;
      return new Promise(() => {}); // Останавливаем выполнение при редиректе
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Экспортируем как функцию с generic типом
export const apiClient = <T = unknown>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return instance.request<T>(config);
};