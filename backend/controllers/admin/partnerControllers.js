import User from '../../models/User.js';
import Donation from '../../models/Donation.js';
import Pickup from '../../models/Pickup.js';

export const getPartners = async (req, res) => {
  try {
    const partners = await User.find({ role: 'partner' }).select('name role location phone');

    const enrichedPartners = await Promise.all(
      partners.map(async (partner) => {
        const donationCount = await Donation.countDocuments({ user: partner._id });

        const pickupsWithRating = await Pickup.find({
          receiver: partner._id,
          rating: { $exists: true },
        }).select('rating');

        const feedbackSum = pickupsWithRating.reduce((sum, p) => sum + (p.rating || 0), 0);
        const feedback = pickupsWithRating.length
          ? (feedbackSum / pickupsWithRating.length).toFixed(1)
          : null;

        return {
          _id: partner._id,
          name: partner.name,
          role: partner.role,
          location: partner.location,
          phone: partner.phone,
          donationCount,
          feedback,
        };
      })
    );

    res.status(200).json(enrichedPartners);
  } catch (error) {
    console.error('Error fetching partners:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deletePartner = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await User.findOneAndDelete({ _id: id, role: 'partner' });

    if (!deleted) {
      return res.status(404).json({ message: 'Partner not found or not authorized to delete' });
    }

    res.status(200).json({ message: 'Partner deleted successfully' });
  } catch (error) {
    console.error('Error deleting partner:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
