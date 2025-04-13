import User from "../../models/User.js";
import Donation from "../../models/Donation.js";

// @desc    Get all users with optional filters
// @route   GET /api/admin/users
// @access  Admin
export const getAllUsers = async (req, res) => {
  try {
    const { role = "all", verified = "all" } = req.query;

    let filter = {};
    if (role !== "all") {
      filter.role = role;
    }
    if (verified === "verified") {
      filter.verified = true;
    } else if (verified === "unverified") {
      filter.verified = false;
    }

    const users = await User.find(filter).select("-password").lean();

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get all posts by a specific user
// @route   GET /api/admin/users/:id/posts
// @access  Admin
export const getUserPosts = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select("name").lean();
    if (!user) return res.status(404).json({ message: "User not found" });

    const posts = await Donation.find({ createdBy: userId })
      .sort({ createdAt: -1 })
      .select("title description createdAt")
      .lean();

    const formattedPosts = posts.map((post) => ({
      title: post.title || "Untitled Donation",
      description: post.description || "No description",
      date: new Date(post.createdAt).toLocaleString(),
    }));

    res.status(200).json({ name: user.name, posts: formattedPosts });
  } catch (error) {
    console.error("Error fetching user posts:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
