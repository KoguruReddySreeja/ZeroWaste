import Donation from '../../models/Donation.js';
import Pickup from '../../models/Pickup.js';
import mongoose from 'mongoose';

// GET /receiver/foodlist
export const getDonations = async (req, res) => {
    try {
      const { veg, nonVeg, perishable } = req.query;
  
      const filters = {
        status: { $in: ['pending', 'fresh', 'near expiry'] },
        expiry: { $gt: new Date() }
      };
  
      const foodTypeFilter = [];
      if (veg === 'true') foodTypeFilter.push('veg');
      if (nonVeg === 'true') foodTypeFilter.push('non-veg');
      if (foodTypeFilter.length) filters.foodType = { $in: foodTypeFilter };
  
      if (perishable === 'true') filters.perishability = 'perishable';
  
      console.log("Filters applied:", filters);
  
      const donations = await Donation.find(filters)
        .populate('user', 'name ngo location')
        .lean();
  
      console.log("Donations found:", donations.length);
      res.status(200).json(donations);
    } catch (error) {
      console.error('Error fetching donations:', error);
      res.status(500).json({ message: 'Failed to fetch donations' });
    }
  };
  

// PATCH /receiver/request-pickup/:id
export const requestPickup = async (req, res) => {
  const { id: foodId } = req.params;
  const receiverId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(foodId)) {
    return res.status(400).json({ message: 'Invalid donation ID' });
  }

  try {
    const donation = await Donation.findById(foodId);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    if (donation.status === 'accepted' || donation.status === 'picked') {
      return res.status(400).json({ message: 'Pickup request already processed' });
    }

    donation.status = 'accepted';
    donation.statusHistory.push({ status: 'accepted' });
    await donation.save();

    const pickup = new Pickup({
      donation: foodId,
      receiver: receiverId,
      pickupTime: donation.pickupTime
    });
    await pickup.save();

    res.status(200).json({
      message: 'Pickup request has been successfully made!',
      pickup
    });
  } catch (error) {
    console.error('Error requesting pickup:', error);
    res.status(500).json({ message: 'Failed to request pickup' });
  }
};
