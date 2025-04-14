import express from 'express';
import { verifyToken } from '../../middleware/authMiddleware.js';
import { getAllUsers, getUserPosts } from '../../controllers/admin/userControllers.js';

const router = express.Router();

// Fetch all users
router.get('/', verifyToken, getAllUsers);

// Fetch specific user's posts
router.get('/:id/posts', verifyToken, getUserPosts);

export default router;
