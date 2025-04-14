import React, { useState, useEffect } from "react";
import { FaLeaf, FaDrumstickBite, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import axios from "../../utils/axios";

const FoodList = () => {
  const [foodData, setFoodData] = useState([]);
  const [filters, setFilters] = useState({
    veg: true,
    nonVeg: true,
    perishable: true,
  });

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const params = new URLSearchParams();
        if (filters.veg) params.append("veg", true);
        if (filters.nonVeg) params.append("nonVeg", true);
        if (filters.perishable) params.append("perishable", true);

        const response = await axios.get(`/receiver/foodlist?${params.toString()}`);
        setFoodData(response.data);
      } catch (error) {
        console.error("Error fetching food data", error);
      }
    };

    fetchFoodData();
  }, [filters]);

  const handleFilterChange = (filterKey) => {
    setFilters({ ...filters, [filterKey]: !filters[filterKey] });
  };

  const filteredFood = foodData.filter((food) => {
    if (!filters.veg && food.foodType === "veg") return false;
    if (!filters.nonVeg && food.foodType === "non-veg") return false;
    if (!filters.perishable && food.perishability === "perishable") return false;
    return true;
  });

  const handleRequestPickup = async (donationId) => {
    try {
      await axios.patch(`/receiver/request-pickup/${donationId}`);
      setFoodData((prevData) =>
        prevData.map((food) =>
          food._id === donationId ? { ...food, status: "accepted" } : food
        )
      );
    } catch (error) {
      console.error("Error requesting pickup", error);
      alert("Failed to request pickup. Please try again.");
    }
  };

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
        </div>
      </aside>

      {/* Food Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1">
        {filteredFood.map((food) => (
          <div key={food._id} className="bg-white rounded-2xl shadow-md overflow-hidden">
            <img
              src={food.imageURL}
              alt={food.donor}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{food.user.ngo || food.user.name}</h3>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${
                    food.foodType === "veg"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {food.foodType}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-600 gap-2">
                <FaMapMarkerAlt /> <span>{food.user.location?.address || "Unknown Location"}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 gap-2">
                <FaClock />
                <span>Expires: {new Date(food.expiry).toLocaleString()}</span>
              </div>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => handleRequestPickup(food._id)}
                  disabled={food.status === "accepted"}
                  className={`px-4 py-2 rounded-xl transition ${
                    food.status === "accepted"
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-green-700 text-white hover:bg-green-800"
                  }`}
                >
                  {food.status === "accepted" ? "Pickup Requested" : "Request Pickup"}
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
