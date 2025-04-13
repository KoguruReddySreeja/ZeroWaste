import React, { useEffect, useState } from "react";
import {
  PlusCircle,
  MapPin,
  Package,
  Users,
  Leaf,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const DonorDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalDonations: 0,
    peopleServed: 0,
    co2PreventedKg: 0,
    recentDonations: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dashboard/donor");
        setDashboardData(res.data);
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-full overflow-y-auto p-6 bg-[#eaf4eb]">
      {/* Greeting */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-[#204122]">Hi 👋</h1>
        <p className="text-lg text-[#344e41] mt-2">
          You've donated {" "}
          <span className="font-semibold text-[#e76f51]">
            {dashboardData.totalDonations} items
          </span>{" "}
          recently. Thank you! 💚
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow rounded-2xl p-6 flex items-center gap-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-100 cursor-pointer">
          <Package className="w-10 h-10 text-[#1b4332]" />
          <div>
            <p className="text-md text-[#344e41] font-medium">Total Donations</p>
            <p className="text-2xl font-bold text-[#081c15]">{dashboardData.totalDonations}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-2xl p-6 flex items-center gap-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-100 cursor-pointer">
          <Users className="w-10 h-10 text-[#d00000]" />
          <div>
            <p className="text-md text-[#344e41] font-medium">People Served</p>
            <p className="text-2xl font-bold text-[#081c15]">{dashboardData.peopleServed}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-2xl p-6 flex items-center gap-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-100 cursor-pointer">
          <Leaf className="w-10 h-10 text-[#007f5f]" />
          <div>
            <p className="text-md text-[#344e41] font-medium">CO₂ Saved</p>
            <p className="text-2xl font-bold text-[#081c15]">{dashboardData.co2PreventedKg} kg</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <Link
          to="/donor/create"
          className="flex items-center justify-center gap-3 bg-[#007f5f] text-white px-6 py-4 rounded-xl text-lg font-semibold shadow hover:bg-[#005f45] transition"
        >
          <PlusCircle className="w-6 h-6" />
          Create New Donation
        </Link>
        <Link
          to="/donor/map"
          className="flex items-center justify-center gap-3 bg-[#e76f51] text-white px-6 py-4 rounded-xl text-lg font-semibold shadow hover:bg-[#d3543a] transition"
        >
          <MapPin className="w-6 h-6" />
          View Map
        </Link>
      </div>

      {/* Scrollable Extra Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Recent Donations */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-xl font-bold mb-4 text-[#204122]">
            Recent Donations
          </h2>
          <ul className="space-y-4">
            {dashboardData.recentDonations.map((donation) => (
              <li key={donation._id} className="flex justify-between items-center">
                <p className="text-[#081c15] text-md">
                  {donation.foodType === 'veg' ? '🥦' : '🍗'} {donation.quantity}
                </p>
                <span
                  className={`text-sm font-semibold ${
                    donation.status === 'delivered'
                      ? 'text-green-600'
                      : donation.status === 'pending'
                      ? 'text-yellow-600'
                      : 'text-gray-600'
                  }`}
                >
                  {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Impact / Motivation */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-xl font-bold mb-4 text-[#204122]">Your Impact</h2>
          <div className="flex flex-col gap-4 text-md text-[#081c15]">
            <div className="flex items-start gap-4">
              <TrendingUp className="w-6 h-6 text-[#e76f51]" />
              <p>
                Every 1kg of food saved prevents ~2.5kg of CO₂ emissions.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <Leaf className="w-6 h-6 text-[#007f5f]" />
              <p>
                Let’s keep the planet and people healthy. Thank you for being a hero 💚
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
