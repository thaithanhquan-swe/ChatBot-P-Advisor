import axios from 'axios';
import { authStorage } from './auth-storage';

export const API_BASE_URL = import.meta.env.VITE_API_URL;

const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 180_000,
  headers: { Accept: 'application/json' },
});

http.interceptors.request.use((config) => {
  const token = authStorage.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let refreshPromise = null;

http.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const request = error.config;
    const token = authStorage.getToken();
    const isAuthRequest = request?.url?.startsWith('/auth/');

    if (error.response?.status !== 401 || !token || request?._retried || isAuthRequest) {
      return Promise.reject(error);
    }

    request._retried = true;
    refreshPromise ??= axios
      .post(`${API_BASE_URL}/auth/refresh_token`, { token })
      .then(({ data }) => {
        const nextToken = data?.result?.token;
        if (!nextToken) throw new Error('Refresh token response is invalid');
        authStorage.setToken(nextToken);
        return nextToken;
      })
      .finally(() => {
        refreshPromise = null;
      });

    try {
      const nextToken = await refreshPromise;
      request.headers.Authorization = `Bearer ${nextToken}`;
      return http(request);
    } catch (refreshError) {
      authStorage.clear();
      return Promise.reject(refreshError);
    }
  }
);

export function getApiErrorMessage(error, fallback = 'Không thể kết nối máy chủ.') {
  return error.response?.data?.message || error.message || fallback;
}

export default http;
