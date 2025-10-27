const express = require('express');
const router = express.Router();
const {
  submitAttempt,
  getAttemptHistory,
  getAttemptReport,
  getPreviousAttemptsForTest
} = require('../controllers/attemptController');
const { protect } = require('../middleware/auth');

router.post('/', protect, submitAttempt);
router.get('/history', protect, getAttemptHistory);
router.get('/test/:testId/previous', protect, getPreviousAttemptsForTest);
router.get('/:id/report', protect, getAttemptReport);

module.exports = router;
