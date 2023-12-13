const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        reason: {
            type: String,
            required: true
        },
        leaveType: {
            type: String,
            enum: ['Casual', 'Earn', 'Loss of Pay'],
            required: true
        },
        leaveDescription: {
            type: String,
            required: true
        },
        department: {
            type: [String],
            required: true
        },
        status: {
            type: String,
            enum: ['Pending', 'Cancel', 'Approved', 'Rejected'],
            default: 'Pending'
        }
    },
    { timestamps: true }
);

const Leave = mongoose.model('Leave', leaveSchema);

module.exports = Leave;
