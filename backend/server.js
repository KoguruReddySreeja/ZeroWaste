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
import mapRoutesRoutes from './routes/donors/mapRoutes.js';
import feedbackRoutes from "./routes/donors/feedbackRoutes.js";
import userRoutes from './routes/donors/settingsRoutes.js';
import receiverDashbaordRoutes from './routes/receiver/receiverDashboardRoutes.js';
import receiverfoodlistRoutes from './routes/receiver/receiverfoodlistRoutes.js';
import receiverMapRoutes from './routes/receiver/mapRoutes.js';
import receiverfeedbackRoutes from './routes/receiver/receiverfeedbackRoutes.js';


// backend/server.js or a middleware file
import fs from "fs";

// Ensure uploads folder exists

dotenv.config();  

const app = express(); // ✅ Must come before any app.use()

// Middleware
app.use(express.json());  
app.use(cors({
  origin: "http://localhost:5173",  // Frontend URL
})); 
app.use(express.urlencoded({ extended: true })); // ✅ Parses URL-encoded bodies

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}
// ✅ Mount Routes AFTER initializing app
app.use('/api/auth', authRoutes);
app.use("/admin/dashboard", dashboardRoutes);
app.use("/api/admin/users", adminUserRoutes);
app.use('/api/admin/posts', postsRoutes); 
app.use("/api/admin/map", mapRoutes);
app.use("/api/admin/partners", partnerRoutes);
app.use('/api/admin/reports', reportRoutes);
app.use('/api/user', settingsRoutes);
app.use('/api/donor/dashboard', donorDashboardRoutes);
app.use("/api/donor/create-donation", createDonationRoutes);
app.use('/api/donor/donations', donationRoutes); // Use the donations routes
app.use('/api/donor/map', mapRoutes); // Use the donations routes
// Inside app setup
app.use("/api/donor/feedback", feedbackRoutes);
app.use('/api/donor/settings', userRoutes);
app.use('/api/receiver/dashboard', receiverDashbaordRoutes);
app.use('/api/receiver/foodlist', receiverfoodlistRoutes);
app.use('/api/receiver/mapview', receiverMapRoutes);
app.use('/api/receiver/feedbacks', receiverfeedbackRoutes);

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
