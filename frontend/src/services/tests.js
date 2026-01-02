// import api from './api';

// export const getAllTests = async params =>
//   await api.get('/tests', { params });

// export const getUpcomingTests = async () =>
//   await api.get('/tests/upcoming');

// export const getTestById = async id =>
//   await api.get(`/tests/${id}`);

// export const getTestQuestions = async id =>
//   await api.get(`/tests/${id}/questions`);






// services/tests.js - ENHANCED DEBUGGING
import api from './api';

export const getAllTests = async params =>
  await api.get('/tests', { params });

export const getUpcomingTests = async () =>
  await api.get('/tests/upcoming');

export const getTestById = async id =>
  await api.get(`/tests/${id}`);

export const getTestQuestions = async id =>
  await api.get(`/tests/${id}/questions`);

// FIXED: Enhanced with maximum debugging
export const startTestSession = async (testId) => {
  try {
    console.log('📡 [API] Starting test session for:', testId);
    
    const response = await api.post(`/tests/${testId}/start-session`);
    
    console.log('✅ [API] Request successful - Full response structure:', {
      status: response.status,
      statusText: response.statusText,
      hasData: !!response.data,
      dataKeys: response.data ? Object.keys(response.data) : 'NO DATA',
      fullData: response.data
    });
    
    // CRITICAL: Return the entire response for debugging
    return response;
    
  } catch (error) {
    console.error('❌ [API] startTestSession failed:', {
      message: error.message,
      responseData: error.response?.data,
      responseStatus: error.response?.status
    });
    throw error;
  }
};

export const saveTestProgress = async (testId, progressData) => {
  try {
    const response = await api.post(`/tests/${testId}/save-progress`, progressData);
    return response.data;
  } catch (error) {
    console.error('❌ [API] saveTestProgress error:', error);
    throw error;
  }
};