import Donation from '../../models/Donation.js';
import User from '../../models/User.js';

// GET all posts (admin only)
export const getAllPosts = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    const posts = await Donation.find({})
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// PATCH /approve
export const approvePost = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    const post = await Donation.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Donation post not found' });
    }

    post.status = 'accepted';
    await post.save();

    res.json({ message: 'Post approved successfully', post });
  } catch (error) {
    console.error("Error approving post:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// PATCH /flag
export const flagPost = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    const post = await Donation.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Donation post not found' });
    }

    post.status = 'cancelled';
    await post.save();

    res.json({ message: 'Post flagged successfully', post });
  } catch (error) {
    console.error("Error flagging post:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// DELETE post
export const deletePost = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    const post = await Donation.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Donation post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
