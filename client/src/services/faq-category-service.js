import http from '@/lib/http';

export async function getFaqCategories({ page = 0, size = 100 } = {}) {
  const data = await http.get('/faq-categories', {
    params: { page, size },
  });

  return data.result;
}

export async function createFaqCategory(payload) {
  const data = await http.post('/faq-categories', payload);
  return data.result;
}

export async function updateFaqCategory(id, payload) {
  const data = await http.put(`/faq-categories/${id}`, payload);
  return data.result;
}

export async function deleteFaqCategory(id) {
  return http.delete(`/faq-categories/${id}`);
}
