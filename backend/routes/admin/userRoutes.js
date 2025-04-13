import express from "express";
import {
  getAllUsers,
  getUserPosts,
} from "../../controllers/admin/userControllers.js";

const router = express.Router();

// @route   GET /api/admin/users
// @desc    Get all users (with optional filters)
// @access  Admin
router.get("/", getAllUsers);

// @route   GET /api/admin/users/:id/posts
// @desc    Get all posts by a specific user
// @access  Admin
router.get("/:id/posts", getUserPosts);

export default router;
