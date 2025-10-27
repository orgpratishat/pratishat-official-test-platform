


// import { create } from 'zustand';
// import { login as loginService, logout as logoutService, getCurrentUser } from '../services/auth';
// import { STORAGE_KEYS } from '../utils/constants';

// export const useAuthStore = create((set, get) => ({
//   user: null,
//   token: null,
//   loading: false,
//   error: null,

// // Initialize store from localStorage
// initialize: () => {
//   set({ loading: true });

//   const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
//   const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);

//   if (storedUser && storedToken) {
//     set({
//       user: JSON.parse(storedUser),
//       token: storedToken,
//       loading: false,
//     });
//   } else {
//     set({ loading: false });
//   }
// },


//   // Login action
//   login: async (credentials) => {
//     set({ loading: true, error: null });
//     try {
//       const res = await loginService(credentials);

//       if (res.success) {
//         // Save to store
//         set({ user: res.user, token: res.token });

//         // Save to localStorage
//         localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(res.user));
//         localStorage.setItem(STORAGE_KEYS.TOKEN, res.token);
//       } else {
//         set({ error: res.message });
//         throw new Error(res.message);
//       }
//     } catch (err) {
//       set({ error: err.message || 'Login failed' });
//       throw err;
//     } finally {
//       set({ loading: false });
//     }
//   },

//   // Logout action
//   logout: () => {
//     logoutService();
//     set({ user: null, token: null });
//     localStorage.removeItem(STORAGE_KEYS.USER);
//     localStorage.removeItem(STORAGE_KEYS.TOKEN);
//   },

//   // Refresh current user from API
//   fetchCurrentUser: async () => {
//     set({ loading: true, error: null });
//     try {
//       const res = await getCurrentUser();
//       if (res.success) {
//         set({ user: res.user });
//         localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(res.user));
//       } else {
//         set({ error: res.message });
//       }
//     } catch (err) {
//       set({ error: err.message || 'Fetch user failed' });
//     } finally {
//       set({ loading: false });
//     }
//   },
// }));





// import { create } from 'zustand';
// import { login as loginService, logout as logoutService, getCurrentUser } from '../services/auth';
// import { STORAGE_KEYS } from '../utils/constants';

// export const useAuthStore = create((set, get) => ({
//   user: null,
//   token: null,
//   initializing: true,  // new flag
//   loading: false,
//   error: null,

//   initialize: () => {
//     const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
//     const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);

//     if (storedUser && storedToken) {
//       set({
//         user: JSON.parse(storedUser),
//         token: storedToken,
//         initializing: false,
//       });
//     } else {
//       set({ initializing: false });
//     }
//   },

//   login: async (credentials) => {
//     set({ loading: true, error: null });
//     try {
//       const res = await loginService(credentials);
//       if (res.success) {
//         set({ user: res.user, token: res.token });
//         localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(res.user));
//         localStorage.setItem(STORAGE_KEYS.TOKEN, res.token);
//       } else {
//         set({ error: res.message });
//         throw new Error(res.message);
//       }
//     } catch (err) {
//       set({ error: err.message || 'Login failed' });
//       throw err;
//     } finally {
//       set({ loading: false });
//     }
//   },

//   logout: () => {
//     logoutService();
//     set({ user: null, token: null });
//     localStorage.removeItem(STORAGE_KEYS.USER);
//     localStorage.removeItem(STORAGE_KEYS.TOKEN);
//   },

//   fetchCurrentUser: async () => {
//     set({ loading: true, error: null });
//     try {
//       const res = await getCurrentUser();
//       if (res.success) {
//         set({ user: res.user });
//         localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(res.user));
//       } else {
//         set({ error: res.message });
//       }
//     } catch (err) {
//       set({ error: err.message || 'Fetch user failed' });
//     } finally {
//       set({ loading: false });
//     }
//   },
// }));






import { create } from 'zustand';
import { login as loginService, logout as logoutService } from '../services/auth';
import { STORAGE_KEYS } from '../utils/constants';

const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);

export const useAuthStore = create((set) => ({
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
  loading: false,
  error: null,

  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const res = await loginService(credentials);
      if (res.success) {
        console.log("Login successful", res);
        
        // Store in localStorage - FIX: Don't stringify the token
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(res.user));
        localStorage.setItem(STORAGE_KEYS.TOKEN, res.token); // Remove JSON.stringify
        
        console.log("Stored user:", res.user);
        console.log("Stored token:", res.token);
        
        set({ user: res.user, token: res.token });
        
        // Return the response so the component can use it
        return res;
      } else {
        set({ error: res.message });
        throw new Error(res.message);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Login failed';
      set({ error: errorMessage });
      throw new Error(errorMessage);
    } finally {
      set({ loading: false });
    }
  },

  logout: () => {
    logoutService();
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    set({ user: null, token: null, error: null });
  },

  clearError: () => set({ error: null })
}));