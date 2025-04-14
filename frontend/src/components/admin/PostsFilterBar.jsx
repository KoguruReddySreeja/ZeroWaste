import React from "react";

const PostsFilterBar = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="All">All</option>
          <option value="Fresh">Fresh</option>
          <option value="Near Expiry">Near Expiry</option>
          <option value="Expired">Expired</option>
          <option value="Picked">Picked</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Food Type</label>
        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="All">All</option>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
          <option value="Perishable">Perishable</option>
          <option value="Non-Perishable">Non-Perishable</option>
        </select>
      </div>
    </div>
  );
};

export default PostsFilterBar;
