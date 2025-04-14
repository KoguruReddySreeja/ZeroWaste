import React from "react";

const bgColor = {
  green: "bg-green-100 text-green-700",
  blue: "bg-blue-100 text-blue-700",
  emerald: "bg-emerald-100 text-emerald-700",
};

const StatsCard = ({ label, value, icon, color = "green" }) => {
  return (
    <div className="rounded-2xl p-5 shadow-md bg-white hover:shadow-lg transition duration-300">
      <div className="flex items-center gap-4">
        <div className={`p-3 text-2xl rounded-full ${bgColor[color]}`}>
          {icon}
        </div>
        <div>
          <p className="text-gray-500 text-sm">{label}</p>
          <p className="text-xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
