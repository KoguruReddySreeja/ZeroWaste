import React from "react";
import { Outlet } from "react-router-dom";
import DonorSidebar from "./DonorSidebar";

const DonorLayout = () => {
  return (
    <div className="flex min-h-screen">
      <DonorSidebar />
      <main className="flex-1 p-4 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default DonorLayout;
