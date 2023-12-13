const User = require('../models/userModel');

module.exports.createUser = async (req, res) => {
    try {
        const { name, designation, role, department, location, operating, mobile, email } = req.body;
        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists!' });
        }
        // Create a new user instance
        const newUser = new User({
            name, designation, role, department, location, operating, mobile, email
        });
        // Save the new user to the database
        const savedUser = await newUser.save();

        res.status(201).json({ user: savedUser, message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports.getUsers = async (req, res) => {
    try {
        // Use Mongoose to query the database for all users
        const users = await User.find();
        // Respond with the list of users
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ error: error.message });
    }
}