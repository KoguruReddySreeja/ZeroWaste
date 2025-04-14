import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Dashboard from "../pages/donor/Dashboard";
import CreateDonation from "../pages/donor/CreateDonation";
import MyDonations from "../pages/donor/MyDonations";
import MapView from "../pages/donor/MapView";
import Feedback from "../pages/donor/Feedback";
import Settings from "../pages/donor/Settings";

// Layout
import DonorSidebar from "../components/donor/DonorSidebar";

const DonorRoutes = () => {
  return (
    <DonorSidebar>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateDonation />} />
        <Route path="/my-donations" element={<MyDonations />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/donor/dashboard" />} />
      </Routes>
    </DonorSidebar>
  );
};

export default DonorRoutes;
