import Feedback from "../../models/Feedback.js";
import Pickup from "../../models/Pickup.js";
import Donation from "../../models/Donation.js";
import User from "../../models/User.js";

export const getDonorFeedback = async (req, res) => {
  try {
    const donorId = req.user.id;

    const feedbacks = await Feedback.find({ donor: donorId })
      .populate("receiver", "name")
      .populate("pickup")
      .populate({
        path: "pickup",
        populate: {
          path: "donation",
          model: "Donation"
        }
      });

    if (!feedbacks.length) {
      return res.json({ feedback: [], averageRating: 0, mostLovedDish: "—" });
    }

    const total = feedbacks.length;
    let ratingSum = 0;
    const dishCount = {};

    const formatted = feedbacks.map(fb => {
      const rating = fb.rating;
      const comment = fb.comment;
      const receiverName = fb.receiver?.name || "Anonymous";
      const dish = fb.pickup?.donation?.foodType || "N/A";

      ratingSum += rating;
      dishCount[dish] = (dishCount[dish] || 0) + 1;

      return { rating, comment, receiverName, dish };
    });

    const averageRating = ratingSum / total;
    const mostLovedDish = Object.entries(dishCount).sort((a, b) => b[1] - a[1])[0][0];

    res.json({
      feedback: formatted,
      averageRating,
      mostLovedDish
    });

  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ message: "Server error" });
  }
};
