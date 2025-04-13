import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  foodType: { type: String, enum: ['veg', 'non-veg'], required: true },
  perishability: { type: String, enum: ['perishable', 'non-perishable'], required: true },
  quantity: { type: String, required: true }, // e.g., "20 packs" or "15 kg"
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }
  },
  expiry: { type: Date, required: true },
  pickupTime: { type: Date, required: true },
  imageURL: { type: String },

  status: { type: String, enum: ['pending', 'accepted', 'picked', 'delivered', 'cancelled', 'fresh', 'near expiry'], default: 'pending' },
  statusHistory: [{
    status: { type: String },
    timestamp: { type: Date, default: Date.now }
  }],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

donationSchema.index({ location: "2dsphere" });

export default mongoose.models.Donation || mongoose.model("Donation", donationSchema);