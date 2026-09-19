import http from '@/lib/http';

export async function getCurrentUser() {
  const data = await http.get('/users/me');
  return data.result;
}

export async function getUsers({
  keyword,
  role,
  emailVerified,
  createdFrom,
  createdTo,
  sortBy = 'createdAt',
  sortDirection = 'DESC',
  page = 0,
  size = 20,
} = {}) {
  const params = {
    keyword: keyword?.trim() || undefined,
    role: role === 'ALL' ? undefined : role,
    emailVerified:
      emailVerified === 'ALL' || emailVerified === undefined ? undefined : emailVerified === 'true',
    createdFrom: createdFrom || undefined,
    createdTo: createdTo || undefined,
    sortBy,
    sortDirection,
    page,
    size,
  };

  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== '' && value !== null && value !== undefined
    )
  );

  const data = await http.get('/users', {
    params: cleanParams,
  });

  return data.result;
}

export async function getUserStatistics() {
  const data = await http.get('/users/statistics');
  return data.result;
}

export async function getUserById(id) {
  if (!id) {
    throw new Error('User id is required');
  }

  const data = await http.get(`/users/${id}`);
  return data.result;
}

export async function updateUser(userId, user) {
  const data = await http.put(`/users/${userId}`, user);

  return data.result;
}
