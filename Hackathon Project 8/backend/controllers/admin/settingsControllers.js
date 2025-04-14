import User from '../../models/User.js';
import bcrypt from 'bcrypt';

// Get user settings
export const getUserSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Assuming req.user.id contains the user ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user settings' });
  }
};

// Update user settings
export const updateUserSettings = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user settings' });
  }
};

// Update password
export const updatePassword = async (req, res) => {
  const { newPassword } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await User.findByIdAndUpdate(req.user.id, {
      password: hashedPassword,
    }, { new: true });

    res.json({ message: 'Password updated successfully', updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating password' });
  }
};
