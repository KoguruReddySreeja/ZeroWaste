// controllers/admin/postsControllers.js
import Donation from '../../models/Donation.js';

// Controller to fetch posts with filtering
export const getPosts = async (req, res) => {
  const { status, type } = req.query;

  try {
    let filter = {};
    if (status && status !== "All") {
      filter.status = status;
    }
    if (type && type !== "All") {
      filter.foodType = type;
    }

    const posts = await Donation.find(filter)
      .populate('user', 'name email') // Populate donor details (name, email)
      .sort({ createdAt: -1 }); // Sort by most recent post

    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ message: 'Error fetching posts.' });
  }
};

// Controller to update the status of a post
export const updatePostStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    if (!status || !['pending', 'accepted', 'picked', 'delivered', 'cancelled', 'fresh', 'near expiry'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status provided.' });
    }

    const post = await Donation.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    // Add status history
    post.statusHistory.push({
      status,
      timestamp: new Date(),
    });

    // Update the status
    post.status = status;
    post.updatedAt = new Date();

    await post.save();

    return res.status(200).json({ message: 'Post status updated successfully.' });
  } catch (error) {
    console.error("Error updating post status:", error);
    return res.status(500).json({ message: 'Error updating post status.' });
  }
};
