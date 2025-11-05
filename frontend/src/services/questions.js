import api from './api';

export const getQuestions = async params =>
  await api.get('/questions', { params });


export const getAllQuestions = async (params = {}) => {
  return await api.get('/admin/questions', { params });
};


export const getQuestionById = async id =>
  await api.get(`/questions/${id}`);

export const getChaptersBySubject = async subject =>
  await api.get(`/questions/chapters/${subject}`);

export const getTopicsByChapter = async (subject, chapter) =>
  await api.get(`/questions/topics/${subject}/${chapter}`);


//new ones


// NEW: Create a new question (admin)
export const createQuestion = async (data) =>
  await api.post('/questions', data);

// NEW: Update a question (admin)
export const updateQuestion = async (id, data) =>
  await api.put(`/questions/${id}`, data);

// NEW: Delete a question (admin)
export const deleteQuestion = async (id) =>
  await api.delete(`/questions/${id}`);