import express from 'express';
import { getDonations } from '../../controllers/donors/donationControllers.js'; // Corrected import path
import { verifyToken } from '../../middleware/authMiddleware.js'; // Adjusted path if needed

const router = express.Router();

// ✅ Protect the route with token verification
router.get('/', verifyToken, getDonations);

export default router;
