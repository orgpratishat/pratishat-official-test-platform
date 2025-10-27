// import { create } from 'zustand';

// import { submitAttempt, getAttemptHistory, getAttemptReport, getPreviousAttempts } from '../services/attempts';

// export const useAttemptStore = create((set) => ({
//   history: [],
//   report: null,
//   previousAttempts: [],
//   loading: false,
//   error: null,

//   submit: async (data) => {
//     set({ loading: true, error: null });
//     try {
//       const response = await submitAttempt(data);
//       return response;
//     } catch (err) {
//       set({ error: err.message || 'Submission failed' });
//       throw err;
//     } finally {
//       set({ loading: false });
//     }
//   },

//   fetchHistory: async (params = {}) => {
//     set({ loading: true, error: null });
//     try {
//       const response = await getAttemptHistory(params);
//       set({ history: response.attempts || response });
//     } catch (err) {
//       set({ error: err.message || 'Failed to fetch history' });
//     } finally {
//       set({ loading: false });
//     }
//   },

//   fetchReport: async (attemptId) => {
//     set({ loading: true, error: null });
//     try {
//       const response = await getAttemptReport(attemptId);
//       set({ report: response.attempt || response });
//     } catch (err) {
//       set({ error: err.message || 'Failed to fetch report' });
//     } finally {
//       set({ loading: false });
//     }
//   },

//   fetchPrevious: async (testId) => {
//     set({ loading: true, error: null });
//     try {
//       const response = await getPreviousAttempts(testId);
//       set({ previousAttempts: response.attempts || response });
//     } catch (err) {
//       set({ error: err.message || 'Failed to fetch previous attempts' });
//     } finally {
//       set({ loading: false });
//     }
//   }
// }));







// src/store/attemptStore.js

// import { create } from 'zustand';
// import { submitAttempt, getAttemptHistory, getAttemptReport, getPreviousAttempts } from '../services/attempts';

// export const useAttemptStore = create((set) => ({
//   history: [],
//   report: null,
//   previousAttempts: [],
//   loading: false,
//   error: null,

//   submit: async (data) => {
//     set({ loading: true, error: null });
//     try {
//       console.log('Submitting attempt:', data);
//       const response = await submitAttempt(data);
//       console.log('Submit response:', response);
//       set({ loading: false });
//       return response;
//     } catch (err) {
//       console.error('Submit error:', err);
//       set({ error: err.message || 'Submission failed', loading: false });
//       throw err;
//     }
//   },

//   fetchHistory: async (params = {}) => {
//     set({ loading: true, error: null });
//     try {
//       const response = await getAttemptHistory(params);
//       set({ history: response.attempts || response, loading: false });
//     } catch (err) {
//       set({ error: err.message || 'Failed to fetch history', loading: false });
//     }
//   },

//   fetchReport: async (attemptId) => {
//     set({ loading: true, error: null });
//     try {
//       const response = await getAttemptReport(attemptId);
//       set({ report: response.attempt || response, loading: false });
//     } catch (err) {
//       set({ error: err.message || 'Failed to fetch report', loading: false });
//     }
//   },

//   fetchPrevious: async (testId) => {
//     set({ loading: true, error: null });
//     try {
//       const response = await getPreviousAttempts(testId);
//       set({ previousAttempts: response.attempts || response, loading: false });
//     } catch (err) {
//       set({ error: err.message || 'Failed to fetch previous attempts', loading: false });
//     }
//   }
// }));










// src/store/attemptStore.js

import { create } from 'zustand';
import {
  submitAttempt,
  getAttemptHistory,
  getAttemptReport,
  getPreviousAttempts
} from '../services/attempts';

export const useAttemptStore = create((set) => ({
  history: [],
  report: null,
  previousAttempts: [],
  loading: false,
  submitting: false,
  error: null,

  submit: async (data) => {
    set({ submitting: true, error: null });
    try {
      console.log('Submitting attempt:', data);
      const response = await submitAttempt(data);
      console.log('Submit response:', response);
      return response;
    } catch (err) {
      console.error('Submit error:', err);
      set({ error: err.message || 'Submission failed' });
      throw err;
    } finally {
      set({ submitting: false });
    }
  },

  fetchHistory: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await getAttemptHistory(params);
      set({ history: response.attempts || response });
    } catch (err) {
      set({ error: err.message || 'Failed to fetch history' });
    } finally {
      set({ loading: false });
    }
  },

  fetchReport: async (attemptId) => {
    set({ loading: true, error: null });
    try {
      const response = await getAttemptReport(attemptId);
      // New backend returns { report: { … } }
      set({ report: response.report || response, loading: false });
    } catch (err) {
      console.error('fetchReport error:', err);
      set({ error: err.message || 'Failed to fetch report', loading: false });
    }
  },

  fetchPrevious: async (testId) => {
    set({ loading: true, error: null });
    try {
      const response = await getPreviousAttempts(testId);
      set({ previousAttempts: response.attempts || response });
    } catch (err) {
      set({ error: err.message || 'Failed to fetch previous attempts' });
    } finally {
      set({ loading: false });
    }
  }
}));
