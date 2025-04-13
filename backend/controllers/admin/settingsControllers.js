import User from '../../models/User.js';
import { verifyToken } from '../../middleware/authMiddleware.js';

// Controller to fetch user profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from decoded token

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
};

// Controller for updating user profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from decoded token
    const { name, email, ngo, phone, notifications } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.ngo = ngo ?? user.ngo;
    user.phone = phone ?? user.phone;
    user.notifications = notifications ?? user.notifications;
    user.updatedAt = new Date();

    await user.save();

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

// Controller for updating user password
export const updatePassword = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from decoded token
    const { newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.password = newPassword; // Add bcrypt hash in production
    user.updatedAt = new Date();

    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Failed to update password' });
  }
};
