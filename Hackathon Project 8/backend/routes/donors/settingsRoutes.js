import express from 'express';
import { verifyToken } from '../../middleware/authMiddleware.js';
import { getUserProfile, updateUserProfile, updateUserPassword } from '../../controllers/donors/settingsControllers.js';

const router = express.Router();

router.get('/profile', verifyToken, getUserProfile);
router.put('/profile', verifyToken, updateUserProfile);
router.put('/update-password', verifyToken, updateUserPassword);

export default router;
