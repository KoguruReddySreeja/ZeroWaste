// backend/middleware/verifyToken.js
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // 'Bearer TOKEN'

  if (!token) return res.status(401).json({ message: "No token, access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Now `req.user.id`, `req.user.role` available
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
