const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        assignee: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['To Do', 'In Progress', 'Done'],
            default: 'To Do',
            required: true
        },
        createdBy: {
            type: String,
            required: true
        },
        priority: {
            type: String,
            enum: ['High', 'Medium', 'Low'],
            default: 'Medium',
            required: true
        },
        projectId: {
            type: String,
            required: true
        },
        reporter: {
            type: String,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        ticketNumber: {
            type: Number,
            default: 0
        },
        history: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true
                },
                timestamp: Date,
                changes: {
                    field: String,
                    from: String,
                    to: String
                }
            }
        ]
    },
    {
        timestamps: true
    }
)

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;