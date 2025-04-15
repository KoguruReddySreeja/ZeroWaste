import Donation from '../../models/Donation.js';

export const getDonorDashboard = async (req, res) => {
  try {
    const donorId = req.user.id;
    // Get all donations by this donor
    const donations = await Donation.find({ user: donorId });
    const totalDonations = donations.length;

    // Extract number from quantity string like "20 packs", "15 kg"
    const extractNumber = (str) => {
      const match = str?.toString().match(/\d+(\.\d+)?/);
      return match ? parseFloat(match[0]) : 0;
    };

    // Estimate people served assuming 1 unit feeds ~2 people
    const peopleServed = donations.reduce((acc, d) => acc + extractNumber(d.quantity) * 2, 0);

    // Estimate CO2 prevented: 1 kg of food = ~2.5 kg CO2 saved
    const co2PreventedKg = donations.reduce((acc, d) => acc + extractNumber(d.quantity) * 2.5, 0);

    // Get last 5 donations, newest first
    const recentDonations = donations
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
      .map(d => ({
        foodType: d.foodType,
        quantity: d.quantity,
        status: d.status,
        createdAt: d.createdAt
      }));

    res.json({
      totalDonations,
      peopleServed: Math.round(peopleServed),
      co2PreventedKg: parseFloat(co2PreventedKg.toFixed(1)),
      recentDonations,
    });
  } catch (error) {
    console.error('Error fetching donor dashboard:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard data' });
  }
};
