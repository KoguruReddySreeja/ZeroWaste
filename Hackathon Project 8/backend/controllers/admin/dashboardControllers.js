import StatsSnapshot from "../../models/StatsSnapshot.js";
import Donation from "../../models/Donation.js";
import User from "../../models/User.js";
import Alert from "../../models/Alert.js";

export const getAdminDashboardOverview = async (req, res) => {
  try {
    // Log user info from the decoded token
    console.log("User from token (req.user):", req.user); // ✅ LOG user info

    // 1. Latest stats snapshot
    const latestStats = await StatsSnapshot.findOne().sort({ date: -1 });

    // Log latest stats
    console.log("Latest stats snapshot:", latestStats);

    const stats = latestStats || {
      totalFoodSavedKg: 0,
      peopleServed: 0,
      co2PreventedKg: 0
    };

    // 2. Donation trend - Last 7 days
    const donations = await Donation.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Log donation trend data
    console.log("Donation trend (last 7 days):", donations);

    // 3. User trend by role
    const users = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 }
        }
      }
    ]);

    // Log user trend by role
    console.log("User trend by role:", users);

    // 4. Alerts (latest 5)
    const alerts = await Alert.find().sort({ createdAt: -1 }).limit(5);

    // Log alerts data
    console.log("Latest alerts:", alerts);

    // Send response
    res.json({
      stats,
      charts: {
        donations,
        users
      },
      alerts
    });
  } catch (err) {
    console.error("Dashboard Overview Error:", err);
    res.status(500).json({ message: "Failed to fetch dashboard data" });
  }
};
