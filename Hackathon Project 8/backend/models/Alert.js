import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  message: { type: String, required: true },
  severity: { type: String, enum: ['info', 'warning', 'danger'], default: 'info' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Alert || mongoose.model("Alert", alertSchema);