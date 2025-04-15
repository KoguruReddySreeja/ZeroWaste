import Donation from "../../models/Donation.js";
import Pickup from "../../models/Pickup.js";
import StatsSnapshot from "../../models/StatsSnapshot.js";

// Fetch dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    // Get total food received today (for simplicity, we will query based on today's date)
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const foodReceivedToday = await Donation.aggregate([
      {
        $match: { createdAt: { $gte: startOfDay, $lte: endOfDay } }
      },
      {
        $group: { _id: null, totalQuantity: { $sum: "$quantity" } }
      }
    ]);
    console.log(foodReceivedToday);
    // Fetch total pickups
    const totalPickups = await Pickup.countDocuments();
    console.log(totalPickups);
    // Fetch people fed (assuming donations are distributed evenly to people)
    const totalPeopleFed = await Donation.aggregate([
      { $group: { _id: null, totalQuantity: { $sum: "$quantity" } } }
    ]);
    console.log(totalPeopleFed);
    res.status(200).json([
      {
        title: "Food Received Today",
        value: foodReceivedToday.length ? foodReceivedToday[0].totalQuantity + " Kg" : "0 Kg",
        icon: "food-icon",
      },
      {
        title: "People Fed",
        value: totalPeopleFed.length ? totalPeopleFed[0].totalQuantity / 2 : "0", // Assuming 2 kg per person
        icon: "people-fed-icon",
      },
      {
        title: "Total Pickups",
        value: totalPickups,
        icon: "pickup-icon",
      }
    ]);
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ message: "Error fetching stats" });
  }
};

// Fetch recent pickups
export const getRecentPickups = async (req, res) => {
  try {
    const recentPickups = await Pickup.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate({
        path: 'donation',
        populate: {
          path: 'user', // Populate user (donor) in the donation
          select: 'name' // Only select the 'name' field of the user
        }
      })
      .populate('receiver');

    const pickups = recentPickups.map(pickup => {
      // Ensure donation is populated and has foodType
      const foodType = pickup.donation ? pickup.donation.foodType : 'Unknown';
      const donorName = pickup.donation && pickup.donation.user ? pickup.donation.user.name : 'Unknown Donor';
      const qty = pickup.donation ? pickup.donation.quantity : 'N/A';
      
      return {
        food: foodType,
        donor: donorName,
        qty: qty,
        date: new Date(pickup.createdAt).toLocaleDateString(),
        status: pickup.status,
      };
    });

    console.log(pickups);  // Log the populated data to ensure it's working
    res.status(200).json(pickups);
  } catch (err) {
    console.error("Error fetching recent pickups:", err);
    res.status(500).json({ message: "Error fetching recent pickups" });
  }
};

