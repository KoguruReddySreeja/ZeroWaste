import express from 'express';
import { getProfile, updateProfile, updatePassword } from '../../controllers/admin/settingsControllers.js';
import { verifyToken } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);
router.put('/password', verifyToken, updatePassword);

export default router;
