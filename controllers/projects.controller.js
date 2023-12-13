const Task = require('../models/taskModel');

module.exports.createProject = async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).send(project);
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).send(projects);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports.updateProject = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['displayName', 'projectDescription', 'category'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!project) {
            return res.status(404).send({ error: 'Project not found' });
        }

        res.status(200).send(project);
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            return res.status(404).send({ error: 'Project not found' });
        }

        res.status(200).send(project);
    } catch (error) {
        res.status(500).send(error);
    }
}