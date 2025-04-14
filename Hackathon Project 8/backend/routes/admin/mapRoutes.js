import express from 'express';
import { getMapDonations } from '../../controllers/admin/mapControllers.js';
import { verifyToken } from '../../middleware/authMiddleware.js';

const router = express.Router();

// Protected route
router.get('/', verifyToken, getMapDonations);

export default router;
