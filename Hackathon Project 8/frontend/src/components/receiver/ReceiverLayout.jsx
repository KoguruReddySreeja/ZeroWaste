import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import ReceiverSidebar from "./Sidebar";

const ReceiverLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <ReceiverSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ease-in-out flex-1 p-6 bg-gray-100 ml-${
          isCollapsed ? "20" : "64"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default ReceiverLayout;
