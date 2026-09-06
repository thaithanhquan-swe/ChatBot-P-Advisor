import http from '@/lib/http';

export async function getDocuments({
  keyword,
  status,
  fileType,
  sortBy = 'updatedAt',
  sortDirection = 'DESC',
  page = 0,
  size = 10,
} = {}) {
  const data = await http.get('/documents', {
    params: { keyword, status, fileType, sortBy, sortDirection, page, size },
  });
  return data.result;
}

export async function getDocumentById(id) {
  const data = await http.get(`/documents/${id}`);
  return data.result;
}

/**
 * @param {File} file
 * @param {{ title: string, description?: string, status?: string }} metadata
 */
export async function createDocument(file, metadata) {
  const formData = new FormData();
  formData.append('file', file);
  // Spring expects the metadata part to have an application/json content type.
  formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));

  const data = await http.post('/documents', formData);
  return data.result;
}

/**
 * @param {string} id
 * @param {{ title: string, description?: string, status: string }} document
 */
export async function updateDocument(id, document) {
  const data = await http.put(`/documents/${id}`, document);
  return data.result;
}

export async function deleteDocument(id) {
  const data = await http.delete(`/documents/${id}`);
  return data;
}
