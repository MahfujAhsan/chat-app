const Task = require('../models/taskModel')
const mongoose = require('mongoose');

module.exports.createTask = async (req, res) => {
    try {
        const { title, description, assignee, status, createdBy, priority, projectId, reporter, endDate } = req.body;
        // Check if the email already exists in the database
        const existingTask = await Task.findOne({ projectId });

        if (existingTask) {
            return res.status(400).json({ error: 'Task is already exists!' });
        }
        // Create a new user instance
        const newTask = new Task({
            title, description, assignee, status, createdBy, priority, projectId, reporter, endDate
        });
        // Save the new user to the database
        const savedTask = await newTask.save();

        res.status(201).json({ task: savedTask, message: 'Task created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports.updateTask = async (req, res) => {
    try {
        const taskId = req.params.taskId; 

        // Validate that taskId is a valid MongoDB ObjectId, assuming you're using MongoDB
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({ error: 'Invalid Task ID' });
        }

        // Assuming req.body contains the updated values
        const {
            title,
            description,
            assignee,
            status,
            priority,
            endDate
        } = req.body;

        // Build the update object with the provided values
        const updateFields = {};
        if (title) updateFields.title = title;
        if (description) updateFields.description = description;
        if (assignee) updateFields.assignee = assignee;
        if (status) updateFields.status = status;
        if (priority) updateFields.priority = priority;
        if (endDate) updateFields.endDate = endDate;
        updateFields.updatedAt = new Date(); // Update the 'updatedAt' field

        // Find the task by ID and update it with the new values
        const updatedTask = await Task.findByIdAndUpdate(taskId, updateFields, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Respond with the updated task
        res.json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports.deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params; // Assuming leaveId is the identifier for the leave request

        // Find and delete the leave request by leaveId
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}