import http from '@/lib/http';

export async function getCurrentUser() {
  const data = await http.get('/users/me');
  return data.result;
}
