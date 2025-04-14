import Donation from '../../models/Donation.js';

// Get donations for the logged-in donor
export const getUserDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ user: req.user.id });
    res.status(200).json(donations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching donations' });
  }
};

// Cancel a donation
export const cancelDonation = async (req, res) => {
  const { donationId } = req.params;

  try {
    const donation = await Donation.findById(donationId);

    // Check if donation exists and belongs to the logged-in user
    if (!donation || donation.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Donation not found or unauthorized' });
    }

    // You can add a status check here, like preventing cancellation if already picked up
    donation.status = 'cancelled'; // or any status you use for cancellation
    await donation.save();

    res.status(200).json({ message: 'Donation cancelled successfully', donation });
  } catch (error) {
    console.error('Error cancelling donation:', error);
    res.status(500).json({ message: 'Failed to cancel donation' });
  }
};
