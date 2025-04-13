import Donation from "../../models/Donation.js";
import StatsSnapshot from "../../models/StatsSnapshot.js";
import User from "../../models/User.js";

// Weekly food saved (fake group-by, simplified)
export const getWeeklyFoodData = async (req, res) => {
  try {
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 6);

    const donations = await Donation.find({ createdAt: { $gte: last7Days } });

    const data = Array(7).fill(0).map((_, i) => {
      const date = new Date();
      date.setDate(last7Days.getDate() + i);
      const label = date.toLocaleDateString("en-US", { weekday: "short" });

      const total = donations.filter(d =>
        new Date(d.createdAt).toDateString() === date.toDateString()
      ).length;

      return { date: label, amount: total };
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weekly food saved." });
  }
};

export const getTopDonors = async (req, res) => {
  try {
    const donations = await Donation.aggregate([
      {
        $group: {
          _id: "$user",
          total: { $sum: 1 },
        },
      },
      {
        $sort: { total: -1 },
      },
      { $limit: 5 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $project: {
          name: "$userDetails.name",
          total: 1,
        },
      },
    ]);

    res.json(donations);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch top donors." });
  }
};

export const getStatsSnapshot = async (req, res) => {
  try {
    const latest = await StatsSnapshot.findOne().sort({ date: -1 });
    if (!latest) return res.json({ co2PreventedKg: 0 });

    res.json(latest);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats." });
  }
};
