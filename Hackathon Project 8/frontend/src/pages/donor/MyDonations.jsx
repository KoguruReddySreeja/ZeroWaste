import React, { useState, useEffect } from "react";
import { BadgeCheck, Clock, Truck, CheckCircle, X } from "lucide-react"; // Removed Pencil
import axios from "../../utils/axios";

const statusColorMap = {
  pending: "bg-gray-200 text-gray-700",
  accepted: "bg-blue-200 text-blue-700",
  picked: "bg-orange-200 text-orange-700",
  verified: "bg-green-200 text-green-700",
  cancelled: "bg-red-200 text-red-700",
};

const statusSteps = ["pending", "accepted", "picked", "verified"];

const MyDonations = () => {
  const [donations, setDonations] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await axios.get("/donor/donations");
      setDonations(response.data);
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  const handleCancel = async (donationId) => {
    try {
      await axios.patch(`/donor/donations/${donationId}/cancel`);
      fetchDonations(); // Refresh list
    } catch (error) {
      console.error("Error cancelling donation:", error);
      alert("Failed to cancel donation.");
    }
  };

  const filteredDonations =
    filter === "all"
      ? donations
      : donations.filter((d) => d.status.toLowerCase() === filter);

  return (
    <div className="p-6 bg-[#f6fef8] min-h-screen">
      <h1 className="text-3xl font-bold text-[#2f5d3a] mb-4">My Donations</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {["all", ...statusSteps].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full font-medium shadow text-sm transition ${
              filter === status ? "bg-[#2a9d8f] text-white" : "bg-white text-[#2a9d8f]"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Donation Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDonations.map((donation) => {
          const status = donation.status.toLowerCase();

          return (
            <div key={donation._id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <img
                src={`../../../../backend/${donation.imageURL?.replace(/\\/g, '/')}` || "https://via.placeholder.com/400"}
                alt={donation.foodType}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-[#2f5d3a] mb-1">{donation.foodType}</h2>
                <p className="text-sm text-gray-600 mb-1">Quantity: {donation.quantity}</p>
                <p className="text-sm text-gray-600 mb-1">Donated On: {new Date(donation.createdAt).toLocaleDateString()}</p>
                <p className="text-sm text-gray-600 mb-3">Pickup Time: {new Date(donation.pickupTime).toLocaleString()}</p>

                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${statusColorMap[status]}`}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>

                {/* Timeline */}
                <div className="flex justify-between items-center text-xs text-gray-400 mb-4">
                  {statusSteps.map((step) => (
                    <div key={step} className="flex flex-col items-center">
                      <div
                        className={`w-5 h-5 rounded-full mb-1 flex items-center justify-center text-white text-[10px] ${
                          step === status || statusSteps.indexOf(step) < statusSteps.indexOf(status)
                            ? "bg-[#2a9d8f]"
                            : "bg-gray-300"
                        }`}
                      >
                        {step === "pending" && <Clock size={12} />}
                        {step === "accepted" && <BadgeCheck size={12} />}
                        {step === "picked" && <Truck size={12} />}
                        {step === "verified" && <CheckCircle size={12} />}
                      </div>
                      <span>{step.charAt(0).toUpperCase() + step.slice(1)}</span>
                    </div>
                  ))}
                </div>

                {/* Cancel Action */}
                {status === "pending" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleCancel(donation.id)}
                      className="flex-1 bg-red-400 text-white px-3 py-1 rounded text-sm flex items-center gap-1 hover:bg-red-500"
                    >
                      <X size={14} /> Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyDonations;
