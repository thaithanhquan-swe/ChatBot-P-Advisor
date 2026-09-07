import http from '@/lib/http';

export async function createChatSession(title = 'Cuộc trò chuyện mới') {
  const data = await http.post('/chat-sessions', { title });
  return data.result;
}

export async function getChatSession(sessionToken) {
  const data = await http.get(`/chat-sessions/${sessionToken}`);
  return data.result;
}

export async function requestStaff(sessionToken) {
  const data = await http.post(`/chat-sessions/${sessionToken}/request-staff`);
  return data.result;
}

export async function getChatHistory(page = 0, size = 20) {
  const data = await http.get('/chat-sessions/me/history', {
    params: { page, size },
  });
  return data.result;
}

export async function attachChatSession(sessionToken) {
  const data = await http.post(`/chat-sessions/${sessionToken}/attach`);
  return data.result;
}

// This endpoint consumes one question from the session quota.
export async function consumeChatQuestion(sessionToken) {
  const data = await http.post(`/chat-sessions/${sessionToken}/questions`);
  return data.result;
}

export async function getWaitingChatSessions(page = 0, size = 20) {
  const data = await http.get('/chat-sessions/staff/waiting', {
    params: { page, size },
  });
  return data.result;
}

export async function getAssignedChatSessions(page = 0, size = 20) {
  const data = await http.get('/chat-sessions/staff/assigned-to-me', {
    params: { page, size },
  });
  return data.result;
}

export async function assignChatSession(sessionId) {
  const data = await http.post(`/chat-sessions/staff/${sessionId}/assign`);
  return data.result;
}

export async function returnChatSessionToBot(sessionId) {
  const data = await http.post(`/chat-sessions/staff/${sessionId}/return-to-bot`);
  return data.result;
}

export async function deleteChatSession(sessionToken) {
  const data = await http.delete(`/chat-sessions/${sessionToken}`);
  return data;
}
