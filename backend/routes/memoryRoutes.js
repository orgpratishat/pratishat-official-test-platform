const express = require('express');
const router = express.Router();
const {
  getMemories,
  getMemoriesStats,
  deleteMemory
} = require('../controllers/memoryController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getMemories);
router.get('/stats', protect, getMemoriesStats);
router.delete('/:id', protect, deleteMemory);

module.exports = router;
