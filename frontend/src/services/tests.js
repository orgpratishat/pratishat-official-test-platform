import api from './api';

export const getAllTests = async params =>
  await api.get('/tests', { params });

export const getUpcomingTests = async () =>
  await api.get('/tests/upcoming');

export const getTestById = async id =>
  await api.get(`/tests/${id}`);

export const getTestQuestions = async id =>
  await api.get(`/tests/${id}/questions`);
