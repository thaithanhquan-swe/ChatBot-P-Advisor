import http from '@/lib/http';

export async function getFaqs({ keyword, faqCategoryId, page = 0, size = 10 } = {}) {
  const data = await http.get('/faq', {
    params: { keyword, faqCategoryId, page, size },
  });
  return data.result;
}

// The public detail endpoint only returns published FAQs.
export async function getFaqById(id) {
  const data = await http.get(`/faq/${id}`);
  return data.result;
}

// Date filters use YYYY-MM-DD, matching the backend LocalDate parameters.
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

/** @param {{ question: string, answer: string, faqCategoryId: string, status?: string }} faq */
export async function createFaq(faq) {
  const data = await http.post('/faq', faq);
  return data.result;
}

export async function updateFaq(id, faq) {
  const data = await http.put(`/faq/${id}`, faq);
  return data.result;
}

export async function deleteFaq(id) {
  const data = await http.delete(`/faq/${id}`);
  return data;
}
