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
    params: {
      keyword,
      status,
      fileType,
      sortBy,
      sortDirection,
      page,
      size,
    },
  });

  return data.result;
}

export async function getDocumentById(id) {
  const data = await http.get(`/documents/${id}`);
  return data.result;
}

export async function createDocument(file, metadata) {
  const formData = new FormData();

  formData.append('file', file);

  formData.append(
    'metadata',
    new Blob([JSON.stringify(metadata)], {
      type: 'application/json',
    })
  );

  const data = await http.post('/documents', formData);

  return data.result;
}

export async function updateDocument(id, document) {
  const data = await http.put(`/documents/${id}`, document);

  return data.result;
}

export async function deleteDocument(id) {
  return http.delete(`/documents/${id}`);
}

export async function downloadDocumentFile(fileUrl) {
  const apiBaseUrl = import.meta.env.VITE_API_URL;
  const normalizedBaseUrl = apiBaseUrl.endsWith('/') ? apiBaseUrl : `${apiBaseUrl}/`;
  const resolvedUrl = new URL(fileUrl, normalizedBaseUrl);
  const apiOrigin = new URL(normalizedBaseUrl).origin;

  if (resolvedUrl.origin === apiOrigin) {
    return http.get(resolvedUrl.toString(), { responseType: 'blob' });
  }

  const response = await fetch(resolvedUrl.toString());
  if (!response.ok) {
    throw new Error(`Không thể tải tài liệu (${response.status})`);
  }
  return response.blob();
}
