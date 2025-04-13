import User from "../../models/User.js";
import Donation from "../../models/Donation.js";

export const getAllPartners = async (req, res) => {
  try {
    const partners = await User.find({
      role: { $in: ["partner", "volunteer"] },
    });

    // For each partner, fetch donation count
    const enriched = await Promise.all(
      partners.map(async (partner) => {
        const donationCount = await Donation.countDocuments({ user: partner._id });
        return {
          ...partner.toObject(),
          donationCount,
        };
      })
    );

    res.status(200).json(enriched);
  } catch (err) {
    console.error("Error in getAllPartners:", err);
    res.status(500).json({ error: "Server error" });
  }
};
