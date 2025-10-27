const express = require('express');
const router = express.Router();
const {
  getAllTests,
  getTestById,
  getTestQuestions,
  getUpcomingTests
} = require('../controllers/testController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getAllTests);
router.get('/upcoming', protect, getUpcomingTests);
router.get('/:id', protect, getTestById);
router.get('/:id/questions', protect, getTestQuestions);

module.exports = router;
