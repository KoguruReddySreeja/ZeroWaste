import express from "express";
import { getPartners, deletePartner } from "../../controllers/admin/partnerControllers.js"; // ✅ Fixed import

const router = express.Router();

router.get("/", getPartners);
router.delete("/:id", deletePartner);

export default router;
