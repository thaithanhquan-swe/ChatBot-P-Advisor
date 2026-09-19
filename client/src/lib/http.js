import axios from 'axios';
import { authStorage } from './auth-storage.js';

export const API_BASE_URL = import.meta.env?.VITE_API_URL;
export const AUTH_SESSION_EXPIRED = 'auth:session-expired';

const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 180_000,
  headers: { Accept: 'application/json' },
});

let refreshRequest = null;
const isAuthRequest = (config) => config.url?.startsWith('/auth/');

function expireSession(token) {
  if (authStorage.getToken() !== token) return;
  authStorage.clear();
  window.dispatchEvent(new Event(AUTH_SESSION_EXPIRED));
}

function isTokenExpired(token) {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const { exp } = JSON.parse(atob(payload));
    // This is only a scheduling hint. The backend still validates the JWT.
    return typeof exp === 'number' && exp * 1000 <= Date.now();
  } catch {
    return false;
  }
}

// Shared by explicit refresh calls and automatic API retries.
export function refreshAccessToken(token = authStorage.getToken()) {
  if (!token || token !== authStorage.getToken()) {
    return Promise.reject(new axios.CanceledError('Phiên đăng nhập đã thay đổi.'));
  }
  if (refreshRequest?.token === token) return refreshRequest.promise;

  const sessionVersion = authStorage.getSessionVersion();
  const pending = { token };
  pending.promise = (async () => {
    try {
      const data = await http.post('/auth/refresh_token', { token }, { timeout: 30_000 });
      if (authStorage.getToken() !== token || authStorage.getSessionVersion() !== sessionVersion) {
        throw new axios.CanceledError('Phiên đăng nhập đã thay đổi.');
      }
      const nextToken = data?.result?.token;
      if (!nextToken) throw new Error('Backend không trả về access token.');
      authStorage.replaceToken(nextToken);
      return data.result;
    } catch (error) {
      // Keep the session on network/server errors so the user can retry.
      if (error.response?.status === 401 || error.response?.status === 403) expireSession(token);
      throw error;
    } finally {
      if (refreshRequest === pending) refreshRequest = null;
    }
  })();
  refreshRequest = pending;
  return pending.promise;
}

http.interceptors.request.use(async (config) => {
  // Spring can reject an expired bearer before reaching a public auth endpoint.
  if (isAuthRequest(config)) {
    config.headers.delete('Authorization');
    return config;
  }

  const sessionVersion = authStorage.getSessionVersion();
  if (config._sessionVersion !== undefined && config._sessionVersion !== sessionVersion) {
    throw new axios.CanceledError('Phiên đăng nhập đã thay đổi.');
  }
  config._sessionVersion = sessionVersion;

  let token = authStorage.getToken();
  if (token && !config._retried && (isTokenExpired(token) || refreshRequest?.token === token)) {
    token = (await refreshAccessToken(token)).token;
  }
  if (sessionVersion !== authStorage.getSessionVersion()) {
    throw new axios.CanceledError('Phiên đăng nhập đã thay đổi.');
  }
  if (token) config.headers.Authorization = `Bearer ${token}`;
  else config.headers.delete('Authorization');
  config._authToken = token;
  return config;
});

http.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const request = error.config;
    if (error.response?.status !== 401 || !request || isAuthRequest(request)) throw error;

    const token = authStorage.getToken();
    if (
      !token ||
      !request._authToken ||
      request._sessionVersion !== authStorage.getSessionVersion()
    ) {
      throw error;
    }
    if (request._retried) {
      expireSession(request._authToken);
      throw error;
    }

    request._retried = true;
    // A delayed 401 may belong to the token another request already refreshed.
    if (token === request._authToken) await refreshAccessToken(token);
    return http(request);
  }
);

export function getApiErrorMessage(error, fallback = 'Không thể kết nối máy chủ.') {
  return error.response?.data?.message || error.message || fallback;
}

export default http;
