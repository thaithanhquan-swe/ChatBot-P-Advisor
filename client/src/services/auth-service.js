import http from '@/lib/http';
import { authStorage } from '@/lib/auth-storage';

const verificationRequests = new Map();

export async function login(credentials) {
  const { data } = await http.post('/auth/login', credentials);
  const token = data?.result?.token;
  if (!token) throw new Error('Backend không trả về access token.');
  authStorage.setToken(token);
  return data.result;
}

export async function register(user) {
  const { data } = await http.post('/auth/register', user);
  return data.result;
}

export async function logout() {
  const token = authStorage.getToken();
  try {
    if (token) await http.post('/auth/logout', { token });
  } finally {
    authStorage.clear();
  }
}

export function verifyEmail(token) {
  if (!verificationRequests.has(token)) {
    verificationRequests.set(
      token,
      http.post('/auth/verify-email', { token }).then(({ data }) => data)
    );
  }
  return verificationRequests.get(token);
}

export async function getCurrentUser() {
  const { data } = await http.get('/users/me');
  return data.result;
}
