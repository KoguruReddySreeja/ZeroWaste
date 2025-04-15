import express from 'express';
import { getUserSettings, updateUserSettings, updatePassword } from '../../controllers/admin/settingsControllers.js';
import { verifyToken } from '../../middleware/authMiddleware.js';

const router = express.Router();

// Route to get user settings
router.get('/settings', verifyToken, getUserSettings);

// Route to update user settings
router.put('/settings', verifyToken, updateUserSettings);

// Route to update user password
router.put('/update-password', verifyToken, updatePassword);

export default router;
