import express from 'express';
import { verifyToken } from '../../middleware/authMiddleware.js'; // Assuming the token verification middleware is in this path
import { getDonations } from '../../controllers/receiver/receiverfoodlistControllers.js';
import { requestPickup } from '../../controllers/receiver/receiverfoodlistControllers.js';
const router = express.Router();

// Apply token verification middleware for protected routes
router.get('/', verifyToken, getDonations);
router.post('/requestPickup', verifyToken, requestPickup);
export default router;
