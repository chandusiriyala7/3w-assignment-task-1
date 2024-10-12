const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const path = require('path');
const cors = require('cors');



dotenv.config();

const app = express();
app.use(cors());
// Middleware to handle JSON and form-data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder to serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

// Use user routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
// Static folder to serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
