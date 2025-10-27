import api from './api';

// Get all available PYQ years
export const getAllYears = async () => {
  return await api.get('/pyq/years');
};

// Get questions for a given year
export const getPYQByYear = async (year) => {
  return await api.get(`/pyq/${year}`);
};

// Get attempts for a given PYQ year
export const getPYQAttempts = async (year) => {
  return await api.get(`/pyq/${year}/attempts`);
};
