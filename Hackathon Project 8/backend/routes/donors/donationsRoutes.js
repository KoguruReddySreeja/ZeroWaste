import express from 'express';
import { verifyToken } from '../../middleware/authMiddleware.js';
import { getUserDonations, cancelDonation } from '../../controllers/donors/donationControllers.js';

const router = express.Router();

// Get donations for the logged-in user
router.get('/', verifyToken, getUserDonations);

// Cancel a specific donation
router.patch('/:donationId/cancel', verifyToken, cancelDonation);

export default router;
