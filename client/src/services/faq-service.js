import http from '@/lib/http';

export async function getFaqs({ keyword, faqCategoryId, page = 0, size = 10 } = {}) {
  const data = await http.get('/faq', {
    params: { keyword, faqCategoryId, page, size },
  });
  return data.result;
}

export async function getFaqsForManagement({
  keyword,
  status,
  faqCategoryId,
  updatedFrom,
  updatedTo,
  sortBy = 'updatedAt',
  sortDirection = 'DESC',
  page = 0,
  size = 10,
} = {}) {
  const data = await http.get('/faq/management', {
    params: {
      keyword,
      status,
      faqCategoryId,
      updatedFrom,
      updatedTo,
      sortBy,
      sortDirection,
      page,
      size,
    },
  });

  return data.result;
}

export async function getFaqById(id) {
  const data = await http.get(`/faq/${id}`);
  return data.result;
}

export async function createFaq(payload) {
  const data = await http.post('/faq', payload);
  return data.result;
}

export async function updateFaq(id, payload) {
  const data = await http.put(`/faq/${id}`, payload);
  return data.result;
}

export async function deleteFaq(id) {
  return http.delete(`/faq/${id}`);
}
