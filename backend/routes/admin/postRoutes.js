// routes/admin/postsRoutes.js
import express from 'express';
import { getPosts, updatePostStatus } from '../../controllers/admin/postController.js';

const router = express.Router();

// Route to get posts (filtered by status and food type)
router.get('/', getPosts);

// Route to update the status of a post
router.put('/:id/status', updatePostStatus);

export default router;
