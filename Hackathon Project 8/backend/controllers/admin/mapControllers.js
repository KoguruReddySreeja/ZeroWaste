import Donation from '../../models/Donation.js';
import User from '../../models/User.js';

export const getMapDonations = async (req, res) => {
  try {
    // Only fetch donations with valid location data
    const donations = await Donation.find({
      location: { $exists: true },
    })
      .populate('user', 'name role location') // only include name, role, location of user
      .sort({ createdAt: -1 });
      console.log("Donations fetched:", donations); // <-- Do you see this?
    res.json(donations);
  } catch (error) {
    console.error('Error fetching donations for map:', error);
    res.status(500).json({ message: 'Server error while fetching map data' });
  }
};
