// src/services/leaderboard.js
import api from './api';

/**
 * Fetch leaderboard details for a given test ID.
 * @param {string} testId - The test identifier.
 * @param {object} params - Additional query parameters (optional).
 * @returns {Promise<object>} Leaderboard data.
 */
export const getLeaderboard = async (testId, params = {}) => {
  return await api.get(`/leaderboard/test/${testId}`, { params });
};
