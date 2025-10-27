// import api from './api';
// import { STORAGE_KEYS } from '../utils/constants';

// export const register = async data => {
//   const res = await api.post('/auth/register', data);
//   if (res.success) {
//     localStorage.setItem(STORAGE_KEYS.TOKEN, res.token);
//     localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(res.user));
//   }
//   return res;
// };

// export const login = async creds => {
//   const res = await api.post('/auth/login', creds);
//   if (res.success) {
//     localStorage.setItem(STORAGE_KEYS.TOKEN, res.token);
//     localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(res.user));
//   }
//   return res;
// };


// export const logout = () => {
//   localStorage.removeItem(STORAGE_KEYS.TOKEN);
//   localStorage.removeItem(STORAGE_KEYS.USER);
// };

// export const getCurrentUser = async () =>
//   await api.get('/auth/me');


// export const updateProfile = async (profileData) => {
//   return await api.put('/auth/profile', profileData);
// };


import api from './api';
import { STORAGE_KEYS } from '../utils/constants';

export const register = async (data) => {
  try {
    const res = await api.post('/auth/register', data);
    if (res.success) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, res.token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(res.user));
    }
    return res;
  } catch (error) {
    throw error;
  }
};

export const login = async (creds) => {
  try {
    const res = await api.post('/auth/login', creds);
    if (res.success) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, res.token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(res.user));
    }
    return res;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
};

export const getCurrentUser = async () => {
  return await api.get('/auth/me');
};

export const updateProfile = async (profileData) => {
  return await api.put('/auth/profile', profileData);
};