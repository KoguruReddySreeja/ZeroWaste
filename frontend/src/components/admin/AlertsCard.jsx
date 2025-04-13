import React from "react";

// Dummy alert data
const dummyAlerts = [
  {
    type: "expired",
    title: "Expired Food Donation Detected",
    desc: "A donation from Sector 12 exceeded its pickup deadline.",
  },
  {
    type: "warning",
    title: "Incomplete Pickup Logs",
    desc: "Several pickups from last week are missing location confirmation.",
  },
  {
    type: "expired",
    title: "Unclaimed Food Donation",
    desc: "A post in Zone 3 was never picked up and marked as expired.",
  },
];

const AlertsCard = () => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition duration-300">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Alerts & Flags</h2>
      <div className="flex flex-col gap-4">
        {dummyAlerts.length > 0 ? (
          dummyAlerts.map((alert, i) => (
            <div
              key={i}
              className={`border-l-4 pl-4 py-2 rounded-md ${
                alert.type === "expired"
                  ? "border-red-500 bg-red-50"
                  : "border-yellow-400 bg-yellow-50"
              }`}
            >
              <p className="text-sm font-medium text-gray-800">{alert.title}</p>
              <p className="text-xs text-gray-600">{alert.desc}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No alerts at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default AlertsCard;
