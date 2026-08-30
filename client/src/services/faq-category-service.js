import http from '@/lib/http';

export async function getFaqCategories(page = 0, size = 10) {
  const data = await http.get('/faq-categories', {
    params: { page, size },
  });
  return data.result;
}

export async function getFaqCategoryById(id) {
  const data = await http.get(`/faq-categories/${id}`);
  return data.result;
}

export async function createFaqCategory(category) {
  const data = await http.post('/faq-categories', category);
  return data.result;
}

export async function updateFaqCategory(id, category) {
  const data = await http.put(`/faq-categories/${id}`, category);
  return data.result;
}

export async function deleteFaqCategory(id) {
  const data = await http.delete(`/faq-categories/${id}`);
  return data;
}
