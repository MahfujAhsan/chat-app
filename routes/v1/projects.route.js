const express = require('express');
const router = express.Router();
const projectsController = require('../../controllers/projects.controller');

router.route('/')
    .post(projectsController.createProject)
    .get(projectsController.getProjects)

router.route('/:id')
    .patch(projectsController.updateProject)
    .delete(projectsController.deleteProject)

module.exports = router;
