import Donation from '../../models/Donation.js';

export const getMapDonations = async (req, res) => {
  try {
    const donations = await Donation.find({
      status: { $in: ['accepted', 'pending'] }
    })
      .populate('user', 'name') // only get donor name
      .select('foodType perishability quantity location expiry pickupTime status user');
    console.log(donations);
    res.status(200).json({ donations });
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ message: 'Server error while fetching donations' });
  }
};
