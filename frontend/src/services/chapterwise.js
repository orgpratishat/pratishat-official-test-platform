import api from './api';

// Get all subjects available for chapterwise practice
export const getSubjects = async () => {
  return await api.get('/chapterwise/subjects');
};

// Get chapters in a subject
export const getChapters = async (subject) => {
  return await api.get(`/chapterwise/${subject}/chapters`);
};

// Get topics in a chapter
export const getTopics = async (subject, chapter) => {
  return await api.get(`/chapterwise/${subject}/${chapter}/topics`);
};

// Get questions in a topic
export const getQuestionsByTopic = async (subject, chapter, topic) => {
  return await api.get(`/chapterwise/${subject}/${chapter}/${topic}/questions`);
};
