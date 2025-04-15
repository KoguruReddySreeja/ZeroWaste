// components/admin/AdminPageHeader.jsx
import React from "react";

const AdminPageHeader = ({ title, subtitle, icon }) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          {icon && <span>{icon}</span>}
          {title}
        </h1>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
};

export default AdminPageHeader;
