// JWT Token utilities
export const getToken = () => {
  return localStorage.getItem('token');
};

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const isTokenValid = () => {
  const token = getToken();
  if (!token) return false;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export const getTokenPayload = () => {
  const token = getToken();
  if (!token) return null;
  
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
};