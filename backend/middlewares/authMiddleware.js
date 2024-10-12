const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, 'secret');
    req.adminId = decoded.adminId;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};
