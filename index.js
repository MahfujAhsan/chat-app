const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./utils/dbConnect');
const port = process.env.PORT || 8080;
const usersRoutes = require('./routes/v1/users.route');
const leaveRoutes = require('./routes/v1/leaves.route');
const tasksRoutes = require('./routes/v1/tasks.route');
const projectsRoutes = require('./routes/v1/projects.route');

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// api routes
app.use('/api/v1/users', usersRoutes)
app.use('/api/v1/leave-request', leaveRoutes);
app.use('/api/v1/tasks', tasksRoutes);
app.use('/api/v1/projects', projectsRoutes);

app.get('/', (req, res) => {
    res.send('Server Running...')
});

const database = 'hr-management-database';

const startServer = async (req, res) => {
    try {
        await connectDB(database);
        app.listen(port, () => {
            console.log(`Server Running on port ${port}`);
        });
    }
    catch (error) {
        console.log(error)
    }
};

startServer();