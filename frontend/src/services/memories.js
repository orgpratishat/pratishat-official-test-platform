import api from './api';

// Get memories, optionally filtered by query parameters
export const getMemories = async (params = {}) => {
  return await api.get('/memories', { params });
};

// Get memory statistics
export const getMemoryStats = async () => {
  return await api.get('/memories/stats');
};

// Delete a memory by its ID
export const deleteMemory = async (memoryId) => {
  return await api.delete(`/memories/${memoryId}`);
};
