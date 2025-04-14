// components/admin/UserFilterBar.jsx
import React from "react";

const UserFilterBar = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex flex-wrap gap-4 items-center">
      <div>
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <select
          value={filters.role}
          onChange={(e) => onFilterChange("role", e.target.value)}
          className="mt-1 block w-40 rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
        >
          <option value="all">All</option>
          <option value="donor">Donor</option>
          <option value="receiver">Receiver</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Verification</label>
        <select
          value={filters.verified}
          onChange={(e) => onFilterChange("verified", e.target.value)}
          className="mt-1 block w-40 rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
        >
          <option value="all">All</option>
          <option value="verified">Verified</option>
          <option value="unverified">Unverified</option>
        </select>
      </div>
    </div>
  );
};

export default UserFilterBar;
