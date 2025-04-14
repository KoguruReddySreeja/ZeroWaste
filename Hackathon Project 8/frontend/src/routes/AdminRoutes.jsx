import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../pages/admin/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Posts from "../pages/admin/Posts";
import Map from "../pages/admin/Map";
import Partners from "../pages/admin/Partners"; 
import Reports from "../pages/admin/Reports";
import Settings from "../pages/admin/Settings";
// Dummy auth (replace with real logic)
const isAdmin = true; 
const AdminRoutes = () => {
  return isAdmin ? (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="posts" element={<Posts />} />
        <Route path="map" element={<Map />} />
        <Route path="partners" element={<Partners />} /> 
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminRoutes;
