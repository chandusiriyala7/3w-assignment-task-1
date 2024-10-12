const express = require('express');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');
dotenv.config();  // This should be at the top before accessing process.env

const app = express();
console.log("Mongo URI:", process.env.MONGO_URI);

// Connect to DB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);

module.exports = app;
