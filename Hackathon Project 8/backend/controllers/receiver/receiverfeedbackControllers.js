import Feedback from '../../models/Feedback.js';
import Donation from '../../models/Donation.js';

// Get all feedbacks for the logged-in user
export const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ receiver: req.user.id }).populate('donor', 'name');
    console.log(feedbacks);
    // Calculate total waste reduced by the logged-in user
    const totalWasteReduced = await Donation.aggregate([
      { $match: { user: req.user.id } },
      { $group: { _id: null, total: { $sum: '$quantity' } } },
    ]);

    res.json({
      feedbacks,
      totalWasteReduced: totalWasteReduced[0]?.total || 0,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching feedbacks', error: err.message });
  }
};

// Submit feedback for a donation pickup
export const submitFeedback = async (req, res) => {
  try {
    const { rating, comment, pickup } = req.body; // Include pickup field
    
    if (!pickup) {
      return res.status(400).json({ message: 'Pickup is required' });
    }

    // Assuming the feedback is linked to a specific donation and receiver
    const feedback = new Feedback({
      donor: req.user.id,
      receiver: req.user.id, // This would typically be dynamic
      rating,
      comment,
      pickup, // Include pickup field in feedback submission
    });

    await feedback.save();
    res.status(201).json({ feedback });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error submitting feedback', error: err.message });
  }
};

