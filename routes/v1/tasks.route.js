const express = require('express');
const router = express.Router();
const tasksController = require('../../controllers/task.controller')


router.route('/')
    .post(tasksController.createTask)

router.route('/:taskId')
    .put(tasksController.updateTask)
    .delete(tasksController.deleteTask)

module.exports = router;