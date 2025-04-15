import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  pickup: { type: mongoose.Schema.Types.ObjectId, ref: 'Pickup', required: true },
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);