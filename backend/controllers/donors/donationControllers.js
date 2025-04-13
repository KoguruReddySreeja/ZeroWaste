import Donation from '../../models/Donation.js';

export const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ user: req.user._id }); // Assuming the user is authenticated
    console.log("📦 Donations found:", donations);
    res.json(donations);
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({ message: "Failed to fetch donations" });
  }
};
