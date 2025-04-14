import Donation from '../../models/Donation.js';

export const createDonation = async (req, res) => {
  try {
    // Use multer or equivalent middleware for file handling before this point
    const {
      foodType,
      perishability,
      quantity,
      expiry,
      pickupTime,
    } = req.body;

    let coordinates = [];
    if (req.body.coordinates) {
      coordinates = JSON.parse(req.body.coordinates); // Parse string to array
    }

    const imageURL = req.file ? req.file.path : null; // assuming you use multer to store image in local folder

    const newDonation = new Donation({
      user: req.user.id,
      foodType,
      perishability,
      quantity,
      expiry,
      pickupTime,
      location: {
        type: 'Point',
        coordinates,
      },
      imageURL,
    });

    await newDonation.save();
    res.status(201).json({ message: 'Donation created successfully', donation: newDonation });
  } catch (err) {
    console.error('Donation creation error:', err);
    res.status(500).json({ message: 'Error creating donation' });
  }
};
