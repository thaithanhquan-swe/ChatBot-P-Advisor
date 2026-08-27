import http from '@/lib/http';

export async function createChatSession(title = 'Cuộc trò chuyện mới') {
  const { data } = await http.post('/chat-sessions', { title });
  return data.result;
}

export async function getChatSession(sessionToken) {
  const { data } = await http.get(`/chat-sessions/${sessionToken}`);
  return data.result;
}

export async function getChatMessages(sessionToken) {
  const { data } = await http.get(`/chat-messages/${sessionToken}`);
  return data.result || [];
}

export async function sendChatMessage(sessionToken, content, file = null) {
  const formData = new FormData();
  formData.append('content', content);
  if (file) formData.append('file', file);

  const { data } = await http.post(`/chat-messages/${sessionToken}`, formData);
  return data.result;
}

export async function requestStaff(sessionToken) {
  const { data } = await http.post(`/chat-sessions/${sessionToken}/request-staff`);
  return data.result;
}
