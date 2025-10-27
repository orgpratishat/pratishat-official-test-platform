const express = require('express');
const router = express.Router();
const {
  getAllYears,
  getPYQByYear,
  getPYQAttempts
} = require('../controllers/pyqController');
const { protect } = require('../middleware/auth');

router.get('/years', protect, getAllYears);
router.get('/:year', protect, getPYQByYear);
router.get('/:year/attempts', protect, getPYQAttempts);

module.exports = router;
