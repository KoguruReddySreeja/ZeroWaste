import express from "express";
import {
  getWeeklyFoodData,
  getTopDonors,
  getStatsSnapshot,
} from "../../controllers/admin/reportsControllers.js";

const router = express.Router();

router.get("/weekly-food", getWeeklyFoodData);  // Weekly food data
router.get("/top-donors", getTopDonors);        // Top donors
router.get("/stats", getStatsSnapshot);         // CO2 stats

export default router;
