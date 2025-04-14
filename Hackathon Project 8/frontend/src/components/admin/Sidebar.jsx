// src/components/admin/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PieChart, Users, Utensils, MapPin, Handshake, BarChart2, Settings } from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: <PieChart />, path: "/admin/dashboard" },
  { name: "Users", icon: <Users />, path: "/admin/users" },
  { name: "Food Posts", icon: <Utensils />, path: "/admin/posts" },
  { name: "Map View", icon: <MapPin />, path: "/admin/map" },
  { name: "Partners", icon: <Handshake />, path: "/admin/partners" },
  { name: "Reports", icon: <BarChart2 />, path: "/admin/reports" },
  { name: "Settings", icon: <Settings />, path: "/admin/settings" },
];

const Sidebar = ({ open, setOpen }) => {
  const location = useLocation();

  return (
    <div className={`fixed top-0 left-0 h-screen bg-[#1B1F32] text-white transition-all duration-300 z-50 ${open ? "w-64" : "w-20"}`}>
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
        <h1 className={`text-xl font-bold transition-all duration-300 ${open ? "block" : "hidden"}`}>ZeroWaste</h1>
        <button onClick={() => setOpen(!open)} className="text-white">{open ? "⏪" : "⏩"}</button>
      </div>

      <nav className="mt-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center px-4 py-3 hover:bg-[#2A2E45] transition rounded-lg ${
              location.pathname === item.path ? "bg-[#2A2E45]" : ""
            }`}
          >
            <span className="mr-4">{item.icon}</span>
            <span className={`${open ? "block" : "hidden"}`}>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
