

const express = require('express');
const router = express.Router();
const {
  getDPPSubjects,
  getSubjectChapters,
  getChapterDPPs,
  getDPPById,
  createDPP,
  getAllDPPs,
  updateDPP,
  deleteDPP
} = require('../controllers/dppController');

// Your existing routes...
router.get('/subjects', getDPPSubjects);
router.get('/subjects/:subject/chapters', getSubjectChapters);
router.get('/subjects/:subject/chapters/:chapter/dpps', getChapterDPPs);
router.get('/', getAllDPPs); // for management
router.get('/:id', getDPPById);
router.post('/', createDPP);

// NEW ROUTES FOR MANAGEMENT:

router.put('/:id', updateDPP);
router.delete('/:id', deleteDPP);

module.exports = router;