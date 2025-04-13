import express from "express";
import { getAllDonations } from "../../controllers/admin/mapControllers.js";

const router = express.Router();

// Route to get all donations
router.get("/", getAllDonations);

export default router;
