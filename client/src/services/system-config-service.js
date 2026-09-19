import http from '@/lib/http';

export async function getSystemConfig() {
  const data = await http.get('/systems-config');
  return data.result;
}

export async function updateSystemConfig(payload) {
  const data = await http.put('/systems-config', payload);
  return data.result;
}

export async function uploadSystemConfigImage(file) {
  const formData = new FormData();
  formData.append('file', file);
  const data = await http.post('/systems-config/images', formData);
  return data.result;
}
