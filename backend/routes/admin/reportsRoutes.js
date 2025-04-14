import express from 'express';
import { verifyToken } from '../../middleware/authMiddleware.js';
import {
  getReportStats,
  getTopDonors
} from '../../controllers/admin/reportsControllers.js';

const router = express.Router();

router.get('/stats', verifyToken, getReportStats);
router.get('/top-donors', verifyToken, getTopDonors);

export default router;
