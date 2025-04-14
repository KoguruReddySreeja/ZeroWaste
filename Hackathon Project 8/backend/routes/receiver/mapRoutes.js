import express from 'express';
import { getMapDonations } from '../../controllers/receiver/mapController.js';
import { verifyToken } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get('/map-donations', verifyToken, getMapDonations);

export default router;
