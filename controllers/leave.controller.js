const Leave = require('../models/leaveModel');
const User = require('../models/userModel');

// For employee to create a leave request
module.exports.createLeaveRequest = async (req, res) => {
    try {
        const { userId, startDate, endDate, reason, leaveType, leaveDescription } = req.body;
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Check if there is an existing pending leave request for the user
        const existingPendingLeave = await Leave.findOne({
            user: userId,
            status: 'Pending'
        });

        if (existingPendingLeave) {
            return res.status(400).json({ error: 'You have a pending leave request!' });
        }
        // Fetch the department from the user's schema
        const department = user.department;

        // Check if leaveType is valid
        const validLeaveTypes = ['Casual', 'Earn', 'Loss of Pay'];
        if (!validLeaveTypes.includes(leaveType)) {
            return res.status(400).json({ error: 'Invalid leave type' });
        }
        // Create a new leave request for the user
        const newLeaveRequest = new Leave({
            user: userId, startDate, endDate, reason, leaveType,leaveDescription, department
        });
        // Save the leave request to the database
        const savedLeaveRequest = await newLeaveRequest.save();

        res.status(201).json({ leaveRequest: savedLeaveRequest, message: 'Leave request created successfully!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// For Manager to get leave requests by department
module.exports.getAllLeaveRequests = async (req, res) => {
    try {
        const leaveRequests = await Leave.find()
        res.status(200).json({leaveRequests});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// For Manager to update the leave status
module.exports.updateLeaveStatus = async (req, res) => {
    try {
        const { leaveId } = req.params; // Assuming leaveId is the identifier for the leave request
        const { status } = req.body; // New status to be updated
        // Validate the status against the Leave schema's enum values
        const isValidStatus = Leave.schema.path('status').enumValues.includes(status);
        if (!isValidStatus) {
            return res.status(400).json({ error: 'Invalid status update!' });
        }
        // Update the status of the leave request by leaveId
        const updatedLeaveRequest = await Leave.findByIdAndUpdate(
            leaveId,
            { $set: { status } },
            { new: true } // To return the updated document
        );

        if (!updatedLeaveRequest) {
            return res.status(404).json({ error: 'Leave request not found' });
        }

        res.status(200).json({ leaveRequest: updatedLeaveRequest, message: 'Leave request status updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// For employee to cancel (delete) the leave request
module.exports.deleteLeaveRequest = async (req, res) => {
    try {
        const { leaveId } = req.params; // Assuming leaveId is the identifier for the leave request

        // Find and delete the leave request by leaveId
        const deletedLeaveRequest = await Leave.findByIdAndDelete(leaveId);

        if (!deletedLeaveRequest) {
            return res.status(404).json({ error: 'Leave request not found' });
        }

        res.status(200).json({ message: 'Leave request deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};