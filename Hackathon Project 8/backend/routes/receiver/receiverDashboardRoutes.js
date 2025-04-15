import express from 'express';
import { verifyToken } from '../../middleware/authMiddleware.js';
import {
  getDonations,
  requestPickup
} from '../../controllers/receiver/receiverfoodlistControllers.js';

const router = express.Router();

// GET /receiver/foodlist — fetch food donations
router.get('/foodlist', verifyToken, getDonations);

// PATCH /receiver/request-pickup/:id — request pickup for a specific donation
router.patch('/request-pickup/:id', verifyToken, requestPickup);

export default router;
