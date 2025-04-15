import User from '../../models/User.js';
import Donation from '../../models/Donation.js';

// GET /api/admin/users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // exclude password field
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// GET /api/admin/users/:id/posts
export const getUserPosts = async (req, res) => {
  const userId = req.params.id;

  try {
    const posts = await Donation.find({ user: userId });
    res.status(200).json({ posts });
  } catch (err) {
    console.error('Error fetching user posts:', err);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
};
