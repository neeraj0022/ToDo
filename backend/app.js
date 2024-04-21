

const express = require('express');
const db = require('./db');
const cors = require('cors');
const authRouter = require('./routes/auth');
const listRouter = require('./routes/addList');
const dotenv = require("dotenv");
const path = require("path");

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());
app.use('/api/v1', authRouter);
app.use('/api/v2', listRouter);

// Serve static files from the frontend build directory
const buildPath = path.join(__dirname, '../frontend/build');
app.use(express.static(buildPath));

// Index route to serve the React frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

// Connect to the database
db(); 

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


