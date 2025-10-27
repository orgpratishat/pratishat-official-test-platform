// import axios from 'axios';
// import { API_BASE_URL, STORAGE_KEYS } from '../utils/constants';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: { 'Content-Type': 'application/json' }
// });

// api.interceptors.request.use(config => {
//   const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// // api.interceptors.response.use(
// //   res => res.data,
// //   err => {
// //     if (err.response) {
// //       if (err.response.status === 401) {
// //         localStorage.removeItem(STORAGE_KEYS.TOKEN);
// //         localStorage.removeItem(STORAGE_KEYS.USER);
// //         window.location.href = '/login';
// //       }
// //       return Promise.reject(err.response.data);
// //     }
// //     return Promise.reject({ success: false, message: 'Network error' });
// //   }
// // );

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor - handle responses
// api.interceptors.response.use(
//   (response) => response.data,
//   (error) => {
//     // DON'T automatically clear localStorage here
//     // Let the user/UI handle logout explicitly
//     return Promise.reject(error);
//   }
// );



// export default api;



import axios from 'axios';
import { API_BASE_URL, STORAGE_KEYS } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Single request interceptor that sets Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
   
    if (token) {
      // Ensure token is not undefined/null
      config.headers.Authorization = `Bearer ${token}`;
     
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default api;
