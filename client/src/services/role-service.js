import http from '@/lib/http';

export async function getRoles(page = 0, size = 10) {
  const data = await http.get('/roles', {
    params: { page, size },
  });
  return data.result;
}

/** @param {{ name: string, description?: string }} role */
export async function createRole(role) {
  const data = await http.post('/roles', role);
  return data.result;
}

export async function deleteRole(roleId) {
  const data = await http.delete(`/roles/${roleId}`);
  return data;
}
