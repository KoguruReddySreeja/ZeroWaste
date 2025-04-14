import StatsSnapshot from '../../models/StatsSnapshot.js';
import Donation from '../../models/Donation.js';
import User from '../../models/User.js';

export const getReportStats = async (req, res) => {
  try {
    const latestStats = await StatsSnapshot.findOne().sort({ date: -1 });

    // Weekly food saved calculation
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);

    const donations = await Donation.find({
      createdAt: { $gte: oneWeekAgo }
    });

    const foodPerDay = {};
    donations.forEach(donation => {
      const dateStr = donation.createdAt.toLocaleDateString('en-US', { weekday: 'short' });
      foodPerDay[dateStr] = (foodPerDay[dateStr] || 0) + 1;
    });

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weeklyFoodSaved = days.map(day => ({
      date: day,
      amount: foodPerDay[day] || 0
    }));

    res.json({
      co2PreventedKg: latestStats?.co2PreventedKg || 0,
      weeklyFoodSaved
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch report stats' });
  }
};

export const getTopDonors = async (req, res) => {
  try {
    const top = await Donation.aggregate([
      {
        $group: {
          _id: '$user',
          total: { $sum: 1 }
        }
      },
      {
        $sort: { total: -1 }
      },
      {
        $limit: 5
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      {
        $unwind: '$userDetails'
      },
      {
        $project: {
          name: '$userDetails.name',
          total: 1
        }
      }
    ]);

    res.json(top);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch top donors' });
  }
};
