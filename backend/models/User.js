import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  email: { type: Boolean, default: true },
  sms: { type: Boolean, default: false },
  push: { type: Boolean, default: true }
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String },
  role: { type: String, enum: ['admin', 'donor', 'receiver', 'partner', 'volunteer'], required: true },
  
  ngo: { type: String }, // Optional NGO name (for partners or org donors)
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
  },
  notifications: { type: notificationSchema, default: () => ({}) },
  feedback: { type: Number, default: 0 }, // Average rating (computed)

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.User || mongoose.model("User", userSchema);
