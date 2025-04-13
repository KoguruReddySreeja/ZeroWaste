import Donation from "../../models/Donation.js";

// Controller to fetch all donations
export const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate("user", "name") // just get donor name
      .sort({ createdAt: -1 });

    res.json(donations);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch donations" });
  }
};
