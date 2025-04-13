import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

// Dummy data for donations (line chart)
const dummyDonations = [
  { _id: "Jan", count: 30 },
  { _id: "Feb", count: 50 },
  { _id: "Mar", count: 45 },
  { _id: "Apr", count: 70 },
  { _id: "May", count: 60 },
  { _id: "Jun", count: 90 },
];

// Dummy data for active users (bar chart)
const dummyUsers = [
  { _id: "Week 1", count: 12 },
  { _id: "Week 2", count: 20 },
  { _id: "Week 3", count: 17 },
  { _id: "Week 4", count: 25 },
  { _id: "Week 5", count: 21 },
];

const DashboardChart = ({ type }) => {
  const data = type === "donations" ? dummyDonations : dummyUsers;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition duration-300">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        {type === "donations" ? "Food Donations Over Time" : "Active Users"}
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        {type === "donations" ? (
          <LineChart data={data}>
            <Line type="monotone" dataKey="count" stroke="#10b981" strokeWidth={2} />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
          </LineChart>
        ) : (
          <BarChart data={data}>
            <Bar dataKey="count" fill="#3b82f6" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;
