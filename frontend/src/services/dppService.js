// import axios from 'axios';

// const API_BASE = '/api/dpp';

// export const getDPPSubjects = async () => {
//   const response = await axios.get(`${API_BASE}/subjects`);
//   return response.data;
// };

// export const getSubjectChapters = async (subject) => {
//   const response = await axios.get(`${API_BASE}/subjects/${subject}/chapters`);
//   return response.data;
// };

// export const getChapterDPPs = async (subject, chapter) => {
//   const response = await axios.get(`${API_BASE}/subjects/${subject}/chapters/${chapter}/dpps`);
//   return response.data;
// };

// export const getDPPById = async (id) => {
//   const response = await axios.get(`${API_BASE}/${id}`);
//   return response.data;
// };

// export const createDPP = async (dppData) => {
//   const response = await axios.post(API_BASE, dppData);
//   return response.data;
// };


import axios from 'axios';

const API_BASE = '/api/dpp';

// Your existing functions...
export const getDPPSubjects = async () => {
  const response = await axios.get(`${API_BASE}/subjects`);
  return response.data;
};

export const getSubjectChapters = async (subject) => {
  const response = await axios.get(`${API_BASE}/subjects/${subject}/chapters`);
  return response.data;
};

export const getChapterDPPs = async (subject, chapter) => {
  const response = await axios.get(`${API_BASE}/subjects/${subject}/chapters/${chapter}/dpps`);
  return response.data;
};

export const getDPPById = async (id) => {
  const response = await axios.get(`${API_BASE}/${id}`);
  return response.data;
};

export const createDPP = async (dppData) => {
  const response = await axios.post(API_BASE, dppData);
  return response.data;
};

// NEW FUNCTIONS FOR MANAGEMENT:

// Get all DPPs (for management list)
export const getAllDPPs = async (params = {}) => {
  const queryParams = new URLSearchParams(params);
  const response = await axios.get(`${API_BASE}?${queryParams}`);
  return response.data;
};

// Update DPP
export const updateDPP = async (id, dppData) => {
  const response = await axios.put(`${API_BASE}/${id}`, dppData);
  return response.data;
};

// Delete DPP
export const deleteDPP = async (id) => {
  const response = await axios.delete(`${API_BASE}/${id}`);
  return response.data;
};