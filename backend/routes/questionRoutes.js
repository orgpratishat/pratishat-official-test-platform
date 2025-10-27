// const express = require('express');
// const router = express.Router();
// const {
//   getQuestions,
//   getQuestionById,
//   getChaptersBySubject,
//   getTopicsByChapter
// } = require('../controllers/questionController');
// const { protect } = require('../middleware/auth');

// router.get('/', protect, getQuestions);
// router.get('/chapters/:subject', protect, getChaptersBySubject);
// router.get('/topics/:subject/:chapter', protect, getTopicsByChapter);
// router.get('/:id', protect, getQuestionById);

// module.exports = router;




const express = require('express');
const router = express.Router();
const {
  getQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getChaptersBySubject,
  getTopicsByChapter,
  updateQuestionAnalytics
} = require('../controllers/questionController');
const { protect} = require('../middleware/auth');

// Public/Protected routes (depending on your requirements)
router.get('/', protect, getQuestions);
router.get('/chapters/:subject', protect, getChaptersBySubject);
router.get('/topics/:subject/:chapter', protect, getTopicsByChapter);
router.get('/:id', protect, getQuestionById);

// Protected routes for analytics
router.put('/:id/analytics', protect, updateQuestionAnalytics);

// Admin-only routes
router.post('/', protect, createQuestion);
router.put('/:id', protect,  updateQuestion);
router.delete('/:id', protect, deleteQuestion);

module.exports = router;
