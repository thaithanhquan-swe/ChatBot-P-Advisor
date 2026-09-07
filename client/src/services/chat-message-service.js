import http from '@/lib/http';

export async function getChatMessages(sessionToken) {
  const data = await http.get(`/chat-messages/${sessionToken}`);
  return data.result || [];
}

export async function sendChatMessage(sessionToken, content, file = null) {
  const formData = new FormData();
  formData.append('content', content);
  if (file) formData.append('file', file);

  const data = await http.post(`/chat-messages/${sessionToken}`, formData);
  return data.result;
}

export async function sendStaffMessage(sessionId, content) {
  const data = await http.post(`/chat-messages/staff/${sessionId}`, { content });
  return data.result;
}
