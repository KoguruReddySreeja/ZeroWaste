import Donation from "../../models/Donation.js";

export const getUserDonationsForMap = async (req, res) => {
  try {
    const userId = req.user.id;

    const donations = await Donation.find({ user: userId })
      .select("foodType quantity location expiry pickupTime status")
      .sort({ createdAt: -1 });

    res.json(donations);
  } catch (error) {
    console.error("Error fetching map donations:", error);
    res.status(500).json({ message: "Server error fetching donations" });
  }
};
