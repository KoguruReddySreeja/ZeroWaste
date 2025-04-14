// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminRoutes from "./routes/AdminRoutes";
import DonorRoutes from "./routes/DonorRoutes";
import ReceiverRoutes from "./routes/ReceiverRoutes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import PrivateRoute from "./components/PrivateRoute"; // ✅ import

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute>
              <AdminRoutes />
            </PrivateRoute>
          }
        />
        <Route
          path="/donor/*"
          element={
            <PrivateRoute>
              <DonorRoutes />
            </PrivateRoute>
          }
        />
        <Route
          path="/receiver/*"
          element={
            <PrivateRoute>
              <ReceiverRoutes />
            </PrivateRoute>
          }
        />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Router>
  );
}

export default App;
