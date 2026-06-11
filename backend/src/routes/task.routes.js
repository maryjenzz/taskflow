const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');
const authMiddleware = require('../middlewares/authMiddleware');

// Protect all task routes
router.use(authMiddleware);

router.get('/stats', TaskController.getTaskStats);
router.get('/', TaskController.getAllTasks);
router.get('/:id', TaskController.getTaskById);
router.post('/', TaskController.createTask);
router.put('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);
router.patch('/:id/status', TaskController.updateTaskStatus);

module.exports = router;
