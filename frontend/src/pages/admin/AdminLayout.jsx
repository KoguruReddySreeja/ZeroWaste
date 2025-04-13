import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";

const AdminLayout = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <Sidebar open={open} setOpen={setOpen} />
      <div
        className={`transition-all duration-300 min-h-screen p-6 bg-gray-100 ${
          open ? "ml-64" : "ml-20"
        }`}
      >
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
