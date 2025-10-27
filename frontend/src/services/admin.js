// src/services/admin.js
import api from './api';

/**
 * Fetch overall admin statistics.
 * @returns {Promise<{stats: object}>} Statistics including counts for users, questions, tests, PYQs, attempts, subjectDistribution.
 */
export const getAdminStats = async () => {
  return await api.get('/admin/stats');
};

/**
 * Create a new question.
 * @param {object} data - Question payload.
 */
export const createQuestion = async (data) => {
  return await api.post('/admin/questions', data);
};

/**
 * Update an existing question.
 * @param {string} id - Question ID.
 * @param {object} data - Updated question payload.
 */
export const updateQuestion = async (id, data) => {
  return await api.put(`/admin/questions/${id}`, data);
};

/**
 * Delete a question.
 * @param {string} id - Question ID.
 */
export const deleteQuestion = async (id) => {
  return await api.delete(`/admin/questions/${id}`);
};

/**
 * Create a new test.
 * @param {object} data - Test payload.
 */
export const createTest = async (data) => {
  return await api.post('/admin/tests', data);
};

/**
 * Update an existing test.
 * @param {string} id - Test ID.
 * @param {object} data - Updated test payload.
 */
export const updateTest = async (id, data) => {
  return await api.put(`/admin/tests/${id}`, data);
};

/**
 * Delete a test.
 * @param {string} id - Test ID.
 */
export const deleteTest = async (id) => {
  return await api.delete(`/admin/tests/${id}`);
};

/**
 * Get all users (admin).
 * @param {object} params - Query params (e.g. pagination).
 */
export const getUsers = async (params = {}) => {
  return await api.get('/admin/users', { params });
};

/**
 * Update a user (admin).
 * @param {string} id - User ID.
 * @param {object} data - Updated user fields.
 */
export const updateUser = async (id, data) => {
  return await api.put(`/admin/users/${id}`, data);
};

/**
 * Delete a user (admin).
 * @param {string} id - User ID.
 */
export const deleteUser = async (id) => {
  console.log("reached here")
  return await api.delete(`/admin/users/${id}`);
};
