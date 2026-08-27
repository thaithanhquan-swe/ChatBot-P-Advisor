const ACCESS_TOKEN_KEY = 'p_advisor_access_token';

export const authStorage = {
  getToken: () => localStorage.getItem(ACCESS_TOKEN_KEY),
  setToken: (token) => localStorage.setItem(ACCESS_TOKEN_KEY, token),
  clear: () => localStorage.removeItem(ACCESS_TOKEN_KEY),
};
