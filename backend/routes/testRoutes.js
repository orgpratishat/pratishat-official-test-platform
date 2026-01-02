// // const express = require('express');
// // const router = express.Router();
// // const {
// //   getAllTests,
// //   getTestById,
// //   getTestQuestions,
// //   getUpcomingTests
// // } = require('../controllers/testController');
// // const { protect } = require('../middleware/auth');

// // router.get('/', protect, getAllTests);
// // router.get('/upcoming', protect, getUpcomingTests);
// // router.get('/:id', protect, getTestById);
// // router.get('/:id/questions', protect, getTestQuestions);

// // module.exports = router;



// const express = require('express');
// const router = express.Router();
// const {
//   getAllTests,
//   getTestById,
//   getTestQuestions,
//   getUpcomingTests,
//   startTestSession,
//   saveTestProgress
// } = require('../controllers/testController');
// const { protect } = require('../middleware/auth');

// router.get('/', protect, getAllTests);
// router.get('/upcoming', protect, getUpcomingTests);
// router.get('/:id', protect, getTestById);
// router.get('/:id/questions', protect, getTestQuestions);

// // NEW ROUTES FOR SERVER TIMER
// router.post('/:id/start-session', protect, startTestSession);
// router.post('/:id/save-progress', protect, saveTestProgress);

// module.exports = router;



const express = require('express');
const router = express.Router();
const {
  getAllTests,
  getTestById,
  getTestQuestions,
  getUpcomingTests,
  startTestSession,
  saveTestProgress
} = require('../controllers/testController');
const { protect } = require('../middleware/auth');

// 🕒 SERVER TIMER: Specific logging for timer endpoints
router.post('/:id/start-session', protect, (req, res, next) => {
  console.log('🕒 [SERVER_TIMER] Starting test session:', {
    testId: req.params.id,
    userId: req.user.id,
    clientTime: new Date().toISOString()
  });
  next();
}, startTestSession);

router.post('/:id/save-progress', protect, (req, res, next) => {
  console.log('🕒 [SERVER_TIMER] Saving progress:', {
    testId: req.params.id,
    userId: req.user.id,
    responsesCount: Object.keys(req.body.responses || {}).length,
    markedCount: Object.keys(req.body.marked || {}).length,
    currentIndex: req.body.currentQuestionIndex
  });
  next();
}, saveTestProgress);

// Keep existing routes without extra logging
router.get('/', protect, getAllTests);
router.get('/upcoming', protect, getUpcomingTests);
router.get('/:id', protect, getTestById);
router.get('/:id/questions', protect, getTestQuestions);

module.exports = router;