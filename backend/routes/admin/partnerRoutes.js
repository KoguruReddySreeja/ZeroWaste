import express from "express";
import { getAllPartners } from "../../controllers/admin/partnerControllers.js";

const router = express.Router();

router.get("/", getAllPartners);

export default router;
