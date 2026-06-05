const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  let token = req.cookies.token; // Get token from cookies

  // Fallback to Authorization Bearer token header in case cookies are blocked
  if (!token && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1];
    }
  }

  if (!token) {
    return res.status(401).json({ msg: 'Unauthorized. No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next(); // Continue to the next middleware
  } catch (err) {
    return res.status(401).json({ msg: 'Unauthorized. Invalid token' });
  }
};

module.exports = authMiddleware;
