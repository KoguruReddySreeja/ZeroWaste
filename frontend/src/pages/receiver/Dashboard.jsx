import React from "react";
import { FaMapMarkerAlt, FaBox, FaTruck, FaUsers, FaUtensils, FaChartLine } from "react-icons/fa";
import { Link } from "react-router-dom";

const stats = [
  {
    title: "Food Received Today",
    value: "38 Kg",
    icon: <FaUtensils className="text-green-600 text-3xl" />,
  },
  {
    title: "People Fed",
    value: "152",
    icon: <FaUsers className="text-green-600 text-3xl" />,
  },
  {
    title: "Total Pickups",
    value: "347",
    icon: <FaChartLine className="text-green-600 text-3xl" />,
  },
];

const recentPickups = [
  { food: "Veg Rice", donor: "Anna Hotel", qty: "4 Kg", date: "April 11", status: "Completed" },
  { food: "Fruit Salad", donor: "Green Bites", qty: "2 Kg", date: "April 10", status: "Completed" },
  { food: "Dal Fry", donor: "Spicy Hub", qty: "3.5 Kg", date: "April 9", status: "Completed" },
];

const ReceiverDashboard = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-green-800">Good Morning, Alex!</h1>
        <p className="text-gray-600">Here's what's happening today on ZeroWaste.</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white p-6 rounded-2xl shadow-md flex items-center space-x-4 border border-green-200"
          >
            {stat.icon}
            <div>
              <div className="text-xl font-semibold text-green-900">{stat.value}</div>
              <div className="text-gray-600">{stat.title}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-green-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/receiver/map"
            className="bg-green-700 hover:bg-green-800 text-white flex items-center justify-center space-x-2 p-4 rounded-xl shadow-md"
          >
            <FaMapMarkerAlt className="text-xl" />
            <span>View Map</span>
          </Link>
          <Link
            to="/receiver/food-list"
            className="bg-green-700 hover:bg-green-800 text-white flex items-center justify-center space-x-2 p-4 rounded-xl shadow-md"
          >
            <FaBox className="text-xl" />
            <span>Filter Food</span>
          </Link>
          <Link
            to="/receiver/my-pickups"
            className="bg-green-700 hover:bg-green-800 text-white flex items-center justify-center space-x-2 p-4 rounded-xl shadow-md"
          >
            <FaTruck className="text-xl" />
            <span>Request Pickup</span>
          </Link>
        </div>
      </div>

      {/* Recent Pickups */}
      <div>
        <h2 className="text-xl font-semibold text-green-800 mb-4">Recent Pickups</h2>
        <div className="overflow-x-auto rounded-lg shadow-md border border-green-200">
          <table className="min-w-full bg-white">
            <thead className="bg-green-100">
              <tr>
                <th className="py-2 px-4 text-left text-green-900">Food</th>
                <th className="py-2 px-4 text-left text-green-900">Donor</th>
                <th className="py-2 px-4 text-left text-green-900">Quantity</th>
                <th className="py-2 px-4 text-left text-green-900">Date</th>
                <th className="py-2 px-4 text-left text-green-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentPickups.map((pickup, idx) => (
                <tr key={idx} className="hover:bg-green-50">
                  <td className="py-2 px-4 border-t">{pickup.food}</td>
                  <td className="py-2 px-4 border-t">{pickup.donor}</td>
                  <td className="py-2 px-4 border-t">{pickup.qty}</td>
                  <td className="py-2 px-4 border-t">{pickup.date}</td>
                  <td className="py-2 px-4 border-t text-green-600 font-medium">{pickup.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Quote */}
      <div className="text-center text-green-800 italic mt-10">
        "Every meal matters. Thank you for being the difference."
      </div>
    </div>
  );
};

export default ReceiverDashboard;