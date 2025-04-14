import express from "express";
import { getAdminDashboardOverview } from "../../controllers/admin/dashboardControllers.js";
import { verifyToken } from "../../middleware/authMiddleware.js"; // ✅ import middleware

const router = express.Router();

// GET /api/admin/dashboard/overview
router.get("/", verifyToken, getAdminDashboardOverview); // ✅ add verifyToken middleware

export default router;
