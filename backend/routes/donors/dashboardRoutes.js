import express from 'express';
import { getDonorDashboard } from '../../controllers/donors/dashboardControllers.js';
import { verifyToken } from '../../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/dashboard/donor
router.get('/donor', verifyToken, getDonorDashboard);

export default router;
