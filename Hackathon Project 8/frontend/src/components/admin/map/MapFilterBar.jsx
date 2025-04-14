import React from "react";

const MapFilterBar = () => {
  return (
    <div className="absolute z-10 top-4 left-4 bg-white shadow-xl rounded-lg p-4 w-72">
      <h2 className="font-semibold text-gray-700 mb-2">Filters</h2>
      <div className="space-y-3 text-sm text-gray-600 italic">
        Real-time food posts shown on the map. Filters coming soon.
      </div>
    </div>
  );
};

export default MapFilterBar;
