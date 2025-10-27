import api from './api';

export const getOverallAnalytics = async () =>
  await api.get('/analytics/overall');

export const getProgress = async params =>
  await api.get('/analytics/progress', { params });
