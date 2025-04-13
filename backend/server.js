import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';  
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from "./routes/admin/dashboardRoutes.js";
import adminUserRoutes from "./routes/admin/userRoutes.js";
import postsRoutes from './routes/admin/postRoutes.js';
import mapRoutes from "./routes/admin/mapRoutes.js";
import partnerRoutes from "./routes/admin/partnerRoutes.js";
import reportRoutes from './routes/admin/reportsRoutes.js'; 
import settingsRoutes from './routes/admin/settingsRoutes.js';
import donorDashboardRoutes from './routes/donors/dashboardRoutes.js';
import createDonationRoutes from "./routes/donors/createDonationsRoutes.js";
import donationRoutes from './routes/donors/donationsRoutes.js';
dotenv.config();  

const app = express(); // ✅ Must come before any app.use()

// Middleware
app.use(express.json());  
app.use(cors({
  origin: "http://localhost:5173",  // Frontend URL
})); 

// ✅ Mount Routes AFTER initializing app
app.use('/api/auth', authRoutes);
app.use("/admin/dashboard", dashboardRoutes);
app.use("/api/admin/users", adminUserRoutes);
app.use('/api/admin/posts', postsRoutes); 
app.use("/api/map", mapRoutes);
app.use("/api/partners", partnerRoutes);
app.use('/api/admin/reports', reportRoutes);
app.use('/api/user', settingsRoutes);
app.use('/api/dashboard', donorDashboardRoutes);
app.use("/api/donor", createDonationRoutes);
app.use('/api/donations', donationRoutes); // Use the donations routes

// Database connection
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/zerowaste';  

mongoose.connect(dbURI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.log('❌ MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
