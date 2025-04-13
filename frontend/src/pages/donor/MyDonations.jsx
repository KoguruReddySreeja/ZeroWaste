import React, { useState, useEffect } from "react";
import { BadgeCheck, Clock, Truck, CheckCircle, X, Pencil } from "lucide-react";
import axios from "axios";

// The status color map based on the donation status
const statusColorMap = {
  Pending: "bg-gray-200 text-gray-700",
  Accepted: "bg-blue-200 text-blue-700",
  Picked: "bg-orange-200 text-orange-700",
  Verified: "bg-green-200 text-green-700",
  Cancelled: "bg-red-200 text-red-700",
};

const statusSteps = ["Pending", "Accepted", "Picked", "Verified"];

const MyDonations = () => {
  const [donations, setDonations] = useState([]);
  const [filter, setFilter] = useState("All");

  // Fetch donations data from the backend
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const token = localStorage.getItem("token"); // Make sure the token was saved here on login
        console.log(token); // Log the token to check if it's there

        const response = await axios.get("http://localhost:5000/api/donations", {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in the request header
          },
        });
        
  
        setDonations(response.data);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };
    fetchDonations();
  }, []);
  
  // Filter donations based on selected status
  const filteredDonations = filter === "All"
    ? donations
    : donations.filter((d) => d.status === filter);

  return (
    <div className="p-6 bg-[#f6fef8] min-h-screen">
      <h1 className="text-3xl font-bold text-[#2f5d3a] mb-4">My Donations</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {["All", "Pending", "Accepted", "Picked", "Verified"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full font-medium shadow text-sm transition-all duration-300 ${
              filter === status
                ? "bg-[#2a9d8f] text-white shadow-md hover:shadow-lg hover:shadow-emerald-200"
                : "bg-white text-[#2a9d8f] hover:shadow-md hover:shadow-emerald-100"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Donation Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDonations.map((donation) => (
          <div key={donation._id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <img
              src={donation.imageURL || "https://source.unsplash.com/400x300/?food"} // Use default image if none exists
              alt={donation.foodType}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-[#2f5d3a] mb-1">
                {donation.foodType} Donation
              </h2>
              <p className="text-sm text-gray-600 mb-1">Quantity: {donation.quantity}</p>
              <p className="text-sm text-gray-600 mb-1">Donated On: {new Date(donation.createdAt).toLocaleDateString()}</p>
              <p className="text-sm text-gray-600 mb-3">Pickup Time: {new Date(donation.pickupTime).toLocaleString()}</p>

              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                  statusColorMap[donation.status] || "bg-gray-200 text-gray-700"
                }`}
              >
                {donation.status}
              </span>

              {/* Timeline */}
              <div className="flex justify-between items-center text-xs text-gray-400 mb-4">
                {statusSteps.map((step) => (
                  <div key={step} className="flex flex-col items-center">
                    <div
                      className={`w-5 h-5 rounded-full mb-1 flex items-center justify-center text-white text-[10px] ${
                        step === donation.status || statusSteps.indexOf(step) < statusSteps.indexOf(donation.status)
                          ? "bg-[#2a9d8f]"
                          : "bg-gray-300"
                      }`}
                    >
                      {step === "Pending" && <Clock size={12} />}
                      {step === "Accepted" && <BadgeCheck size={12} />}
                      {step === "Picked" && <Truck size={12} />}
                      {step === "Verified" && <CheckCircle size={12} />}
                    </div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              {donation.status === "Pending" && (
                <div className="flex gap-3">
                  <button className="flex-1 bg-yellow-400 text-white px-3 py-1 rounded text-sm flex items-center gap-1 hover:bg-yellow-500">
                    <Pencil size={14} /> Edit
                  </button>
                  <button className="flex-1 bg-red-400 text-white px-3 py-1 rounded text-sm flex items-center gap-1 hover:bg-red-500">
                    <X size={14} /> Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyDonations;
