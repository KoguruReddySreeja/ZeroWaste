import express from 'express';
import {
  getAllPosts,
  approvePost,
  flagPost,
  deletePost
} from '../../controllers/admin/postController.js';
import { verifyToken } from '../../middleware/authMiddleware.js';

const router = express.Router();

// Only admin can view, approve, flag, or delete posts
router.get('/', verifyToken, getAllPosts);
router.patch('/:id/approve', verifyToken, approvePost);
router.patch('/:id/flag', verifyToken, flagPost);
router.delete('/:id', verifyToken, deletePost);

export default router;
