import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ define decoded
    req.user = decoded; // Attach decoded token payload to req.user
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};
