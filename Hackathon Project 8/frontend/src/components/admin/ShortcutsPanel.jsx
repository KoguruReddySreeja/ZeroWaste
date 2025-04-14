import React from "react";
import { useNavigate } from "react-router-dom";

const ShortcutsPanel = () => {
  const navigate = useNavigate();

  const shortcuts = [
    { label: "Verify NGOs", path: "/admin/partners", icon: "🏥" },
    { label: "View Map", path: "/admin/map", icon: "🗺️" },
    { label: "Moderate Posts", path: "/admin/posts", icon: "🍱" },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition duration-300">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Quick Shortcuts</h2>
      <div className="flex flex-col gap-3">
        {shortcuts.map((item, i) => (
          <button
            key={i}
            onClick={() => navigate(item.path)}
            className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition"
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShortcutsPanel;
