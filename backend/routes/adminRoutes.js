const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/adminAuth');
const {
  // Question Management
  createQuestion,
  updateQuestion,
  deleteQuestion,
  bulkUploadQuestions,
  
  // Test Management
  createTest,
  updateTest,
  deleteTest,
  
  // PYQ Management
  createPYQ,
  updatePYQ,
  deletePYQ,
  
  // Rank Range Management
  createRankRange,
  bulkUploadRankRanges,
  
  // User Management
  getAllUsers,
  updateUserRole,
  
  // Change Logs
  getChangeLogs,
  
  // Dashboard Stats
  getDashboardStats,
  deleteUser
} = require('../controllers/adminController');

// Apply auth middleware to all admin routes
router.use(protect);
router.use(adminOnly);

// ============= QUESTION ROUTES =============
router.post('/questions', createQuestion);
router.post('/questions/bulk', bulkUploadQuestions);
router.put('/questions/:id', updateQuestion);
router.delete('/questions/:id', deleteQuestion);

// ============= TEST ROUTES =============
router.post('/tests', createTest);
router.put('/tests/:id', updateTest);
router.delete('/tests/:id', deleteTest);

// ============= PYQ ROUTES =============
router.post('/pyq', createPYQ);
router.put('/pyq/:id', updatePYQ);
router.delete('/pyq/:id', deletePYQ);

// ============= RANK RANGE ROUTES =============
router.post('/rankranges', createRankRange);
router.post('/rankranges/bulk', bulkUploadRankRanges);

// ============= USER MANAGEMENT ROUTES =============
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id/role', updateUserRole);

// ============= CHANGELOG ROUTES =============
router.get('/changelogs', getChangeLogs);

// ============= DASHBOARD ROUTES =============
router.get('/stats', getDashboardStats);

module.exports = router;
