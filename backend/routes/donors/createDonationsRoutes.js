// routes/donors/createDonationRouter.js
import express from 'express';
import multer from 'multer';
import { createDonation } from '../../controllers/donors/createDonationsControllers.js';
import { verifyToken } from '../../middleware/authMiddleware.js';

const router = express.Router();

// Multer setup for image uploads (Using memoryStorage or diskStorage as required)
const storage = multer.memoryStorage(); // This stores the file in memory
// If you need to store files on disk, use diskStorage instead
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

const upload = multer({ storage });

// POST route for creating donation with image upload and token verification
router.post(
  '/create-donation',
  verifyToken,  // Verifies the user's authentication token
  upload.single('image'),  // Handles single image upload
  createDonation  // Controller for creating the donation
);

export default router;
