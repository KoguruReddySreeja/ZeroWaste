import express from 'express';
import { getUserDonationsForMap } from '../../controllers/donors/donormapControllers.js';
import { verifyToken } from '../../middleware/authMiddleware.js';

const router = express.Router();

// Get authenticated user's donation markers
router.get('/', verifyToken, getUserDonationsForMap);

export default router;
