const express = require('express');
const router = express.Router();
const leaveController = require('../../controllers/leave.controller');

router.route('/')
    .post(leaveController.createLeaveRequest)
    .get(leaveController.getAllLeaveRequests)

router.route('/:leaveId')
    .patch(leaveController.updateLeaveStatus)
    .delete(leaveController.deleteLeaveRequest)

module.exports = router;