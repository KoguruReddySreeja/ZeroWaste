import express from "express";
import { getDonorFeedback } from "../../controllers/donors/feedbackController.js";
import { verifyToken } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/donor", verifyToken, getDonorFeedback);

export default router;
