import http from '@/lib/http';

/**
 * @param {{ question: string, chatSessionId?: string, email?: string, phone?: string }} request
 */
export async function createConsultationRequest(request) {
  const data = await http.post('/consultation-requests', request);
  return data.result;
}

// Date filters use YYYY-MM-DD, matching the backend LocalDate parameters.
export async function getConsultationRequests({
  keyword,
  status,
  createdFrom,
  createdTo,
  sortBy = 'createdAt',
  sortDirection = 'DESC',
  page = 0,
  size = 10,
} = {}) {
  const data = await http.get('/consultation-requests', {
    params: { keyword, status, createdFrom, createdTo, sortBy, sortDirection, page, size },
  });
  return data.result;
}

export async function assignConsultationRequest(id) {
  const data = await http.post(`/consultation-requests/${id}/assign`);
  return data.result;
}

export async function resolveConsultationRequest(id) {
  const data = await http.post(`/consultation-requests/${id}/resolve`);
  return data.result;
}
