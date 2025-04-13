import React, { useState } from "react";
import { FaLeaf, FaDrumstickBite, FaClock, FaMapMarkerAlt } from "react-icons/fa";

const foodData = [
  {
    id: 1,
    image: "https://source.unsplash.com/400x300/?food",
    type: "Veg",
    perishable: true,
    donor: "Green Cafe",
    distance: "2.5 km",
    expiry: "Today, 5:30 PM",
  },
  {
    id: 2,
    image: "https://source.unsplash.com/400x300/?meal",
    type: "Non-Veg",
    perishable: false,
    donor: "Spicy Kitchen",
    distance: "4.1 km",
    expiry: "Tomorrow, 11:00 AM",
  },

];

const FoodList = () => {
  const [filters, setFilters] = useState({
    veg: true,
    nonVeg: true,
    perishable: true,
    distance: 10,
  });

  const handleFilterChange = (filterKey) => {
    setFilters({ ...filters, [filterKey]: !filters[filterKey] });
  };

  const filteredFood = foodData.filter((food) => {
    if (!filters.veg && food.type === "Veg") return false;
    if (!filters.nonVeg && food.type === "Non-Veg") return false;
    if (!filters.perishable && food.perishable) return false;
    return true;
  });

  return (
    <div className="flex gap-6">
      {/* Filters */}
      <aside className="w-72 bg-green-900 text-white rounded-2xl p-6 space-y-6 shadow-lg">
        <h2 className="text-xl font-bold">Filter Food</h2>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.veg}
              onChange={() => handleFilterChange("veg")}
            />
            Veg
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.nonVeg}
              onChange={() => handleFilterChange("nonVeg")}
            />
            Non-Veg
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.perishable}
              onChange={() => handleFilterChange("perishable")}
            />
            Perishable Only
          </label>
          <div className="pt-2">
            <label htmlFor="distance" className="block mb-1">
              Distance (max: {filters.distance} km)
            </label>
            <input
              type="range"
              id="distance"
              min="1"
              max="20"
              value={filters.distance}
              onChange={(e) => setFilters({ ...filters, distance: e.target.value })}
              className="w-full"
            />
          </div>
        </div>
      </aside>

      {/* Food Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1">
        {filteredFood.map((food) => (
          <div key={food.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
            <img
              src={food.image}
              alt={food.donor}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{food.donor}</h3>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${
                    food.type === "Veg" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                  }`}
                >
                  {food.type}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-600 gap-2">
                <FaMapMarkerAlt /> <span>{food.distance}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 gap-2">
                <FaClock /> <span>Expires: {food.expiry}</span>
              </div>
              <div className="pt-2 flex justify-end">
                <button className="bg-green-700 text-white px-4 py-2 rounded-xl hover:bg-green-800 transition">
                  Request Pickup
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default FoodList;