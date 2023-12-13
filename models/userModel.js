const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        designation: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['manager', 'employee'],
            default: 'employee'
        },
        department: {
            type: [String],
            required: true
        },
        location: {
            type: String,
            required: true
        },
        operating: {
            type: String,
            required: true
        },
        mobile: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
    },
    {
        timestamps: true,
        collection: 'Users'
    }
);

const User = mongoose.model('Users', userSchema);

module.exports = User;