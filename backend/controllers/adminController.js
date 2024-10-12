const Admin = require('../models/Admin');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });
  if (!admin || admin.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ adminId: admin._id }, 'secret', { expiresIn: '1h' });
  res.json({ token });
};

exports.getDashboardData = async (req, res) => {
  const users = await User.find();
  res.json(users);
};
