import mongoose from 'mongoose';

const pickupSchema = new mongoose.Schema({
  donation: { type: mongoose.Schema.Types.ObjectId, ref: 'Donation', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pickupTime: { type: Date, required: true },
  status: { type: String, enum: ['requested', 'approved', 'picked', 'confirmed'], default: 'requested' },
  rating: { type: Number, min: 1, max: 5 }, // Rating after pickup is confirmed
  feedback: { type: String },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Pickup || mongoose.model("Pickup", pickupSchema);