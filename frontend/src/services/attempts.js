import api from './api';

export const submitAttempt = async data =>
  await api.post('/attempts', data);

export const getAttemptHistory = async params =>
  await api.get('/attempts/history', { params });

export const getAttemptReport = async id =>
  await api.get(`/attempts/${id}/report`);

export const getPreviousAttempts = async testId =>
  await api.get(`/attempts/test/${testId}/previous`);
