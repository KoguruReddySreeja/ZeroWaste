import express from "express";
import { getAdminDashboardOverview } from "../../controllers/admin/dashboardControllers.js";

const router = express.Router();

// GET /api/admin/dashboard/overview
router.get("/", getAdminDashboardOverview);

export default router;
