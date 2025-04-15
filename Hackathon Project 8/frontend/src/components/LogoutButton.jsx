// src/components/LogoutButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/auth";
import { toast } from "react-toastify";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
