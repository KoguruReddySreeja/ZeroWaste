import express from 'express';
import { verifyToken } from '../../middleware/authMiddleware.js';
import { getFeedbacks, submitFeedback } from '../../controllers/receiver/receiverfeedbackControllers.js';

const router = express.Router();

// Get all feedbacks
router.get('/', verifyToken, getFeedbacks);

// Submit a feedback
router.post('/', verifyToken, submitFeedback);

export default router;
