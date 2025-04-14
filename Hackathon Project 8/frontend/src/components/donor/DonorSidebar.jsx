import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Plus,
  Box,
  Map,
  MessageCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const SidebarItem = ({ to, icon: Icon, label, isCollapsed }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `group flex items-center gap-4 px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200 ${
        isActive
          ? "bg-[#dbe7c9] text-[#264d36]"
          : "text-[#264d36] hover:bg-[#e3f6e5]"
      }`
    }
    title={isCollapsed ? label : ""}
  >
    <Icon className="w-6 h-6 min-w-[24px]" />
    {!isCollapsed && <span className="whitespace-nowrap">{label}</span>}
  </NavLink>
);

const DonorSidebar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? "w-20" : "w-64";

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-[#fdfaf4] shadow-md z-10 
          ${sidebarWidth} 
          transition-[width] duration-300 ease-in-out overflow-hidden`}
      >
        <div className="flex items-center justify-between px-4 py-4">
          {!collapsed && (
            <h2 className="text-xl font-bold text-[#264d36]">Donor Panel</h2>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-[#264d36]"
          >
            {collapsed ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
          </button>
        </div>

        <nav className="space-y-2 mt-6 px-2">
          <SidebarItem to="/donor/dashboard" icon={Home} label="Dashboard" isCollapsed={collapsed} />
          <SidebarItem to="/donor/create" icon={Plus} label="Create Donation" isCollapsed={collapsed} />
          <SidebarItem to="/donor/my-donations" icon={Box} label="My Donations" isCollapsed={collapsed} />
          <SidebarItem to="/donor/map" icon={Map} label="Map View" isCollapsed={collapsed} />
          <SidebarItem to="/donor/feedback" icon={MessageCircle} label="Feedback" isCollapsed={collapsed} />
          <SidebarItem to="/donor/settings" icon={Settings} label="Settings" isCollapsed={collapsed} />
        </nav>
      </aside>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 flex-1`}
        style={{ paddingLeft: collapsed ? "5rem" : "16rem" }}
      >
        <div className="p-6 min-h-screen bg-[#fffefb]">{children}</div>
      </div>
    </div>
  );
};

export default DonorSidebar;
