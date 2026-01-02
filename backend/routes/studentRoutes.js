const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Student registration routes
router.post('/register', studentController.registerStudent);
router.get('/', studentController.getAllStudents);
router.get('/stats', studentController.getStatistics);
router.get('/:id', studentController.getStudent);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;