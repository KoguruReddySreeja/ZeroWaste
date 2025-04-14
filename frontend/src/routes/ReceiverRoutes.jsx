import React from "react";
import { Routes, Route } from "react-router-dom";
import ReceiverLayout from "../components/receiver/ReceiverLayout";  
import Dashboard from "../pages/receiver/Dashboard"; 
import FoodList from "../pages/receiver/FoodList";
import MapView from "../pages/receiver/MapView";
import MyPickups from "../pages/receiver/MyPickups";
import Feedback from "../pages/receiver/Feedback";
import Settings from "../pages/receiver/Settings";

const ReceiverRoutes = () => {
  return (
    <Routes>
      {/* Wrapped each page with the ReceiverLayout */}
      <Route element={<ReceiverLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/food-list" element={<FoodList />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/my-pickups" element={<MyPickups />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default ReceiverRoutes;
