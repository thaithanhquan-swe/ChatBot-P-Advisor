const ACCESS_TOKEN_KEY = 'p_advisor_access_token';
let sessionVersion = 0;

export const authStorage = {
  getToken: () => localStorage.getItem(ACCESS_TOKEN_KEY),
  getSessionVersion: () => sessionVersion,
  setToken: (token) => {
    sessionVersion += 1;
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },
  replaceToken: (token) => localStorage.setItem(ACCESS_TOKEN_KEY, token),
  clear: () => {
    sessionVersion += 1;
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },
};
