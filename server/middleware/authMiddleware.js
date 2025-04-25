const jwt = require('jsonwebtoken');

// Middleware to check if the user is authenticated
const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();  
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authenticateUser;
