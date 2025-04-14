import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaMapMarkerAlt,
  FaStar,
  FaCog,
  FaBars,
} from "react-icons/fa";

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const menuItems = [
    { label: "Dashboard", icon: <FaHome />, path: "/receiver/dashboard" },
    { label: "Food Listings", icon: <FaBox />, path: "/receiver/food-list" },
    { label: "Map View", icon: <FaMapMarkerAlt />, path: "/receiver/map" },
    { label: "My Pickups", icon: <FaBox />, path: "/receiver/my-pickups" },
    { label: "Feedback", icon: <FaStar />, path: "/receiver/feedback" },
    { label: "Settings", icon: <FaCog />, path: "/receiver/settings" },
  ];

  return (
    <div
      className={`h-screen bg-green-800 text-white transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      } flex flex-col fixed left-0 top-0 z-50 shadow-lg`}
    >
      {/* Toggle Button */}
      <div className="flex justify-between items-center p-4 border-b border-green-600">
        {!isCollapsed && (
          <span className="text-xl font-bold tracking-wide">Receiver</span>
        )}
        <button
          onClick={toggleSidebar}
          className="text-white hover:text-green-300"
        >
          <FaBars size={20} />
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
        {menuItems.map(({ label, icon, path }) => (
          <Link
            to={path}
            key={label}
            className="flex items-center space-x-4 p-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <span className="text-lg">{icon}</span>
            {!isCollapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>

      {/* Info Message */}
      {!isCollapsed && (
        <div className="p-4 text-sm bg-green-900 text-green-200 mt-auto">
          <p className="font-semibold mb-1">🌿 Receiver Panel</p>
          <p>Find and rescue fresh food with just a few clicks!</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
