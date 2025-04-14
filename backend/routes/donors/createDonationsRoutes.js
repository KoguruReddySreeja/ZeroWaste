import express from 'express';
import { createDonation } from '../../controllers/donors/createDonationsControllers.js';
import { verifyToken } from '../../middleware/authMiddleware.js';  // Import middleware
import multer from "multer";
import path from "path";
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ensure this folder exists or create dynamically
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post(
  "/",
  verifyToken,
  upload.single("image"), // image from formData
  createDonation
);
export default router;