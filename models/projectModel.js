const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
    {
        displayName: {
            type: String,
            required: true,
        },
        projectDescription: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            default: 'care',
            required: true
        }
    }
)

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;