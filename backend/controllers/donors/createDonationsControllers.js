import Donation from "../../models/Donation.js";
import uploadImageToCloud from "../../utils/uploadImageToCloud.js"; // You must define this function
import mongoose from "mongoose";

export const createDonation = async (req, res) => {
  try {
    const {
      foodType,
      perishability,
      expiry,
      pickupTime,
      quantity,
      coordinates
    } = req.body;

    if (!foodType || !perishability || !expiry || !pickupTime || !quantity || !coordinates) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    const parsedCoordinates = JSON.parse(coordinates);

    let imageURL = null;
    if (req.file) {
      imageURL = await uploadImageToCloud(req.file); // this should return a URL
    }

    const donation = await Donation.create({
      user: req.user._id,
      foodType,
      perishability,
      expiry: new Date(expiry),
      pickupTime: new Date(pickupTime),
      quantity,
      imageURL,
      location: {
        type: "Point",
        coordinates: parsedCoordinates
      },
      statusHistory: [
        {
          status: "pending"
        }
      ]
    });

    res.status(201).json({ message: "Donation created successfully.", donation });
  } catch (error) {
    console.error("Error creating donation:", error);
    res.status(500).json({ message: "Server error while creating donation." });
  }
};
