// src/components/admin/map/MapPinPopup.jsx
import React from "react";

const MapPinPopup = ({ post }) => {
  return (
    <div className="text-sm">
      <strong>{post.user?.name || "Donor"}</strong>
      <br />
      {post.foodType} • {post.quantity}
    </div>
  );
};

export default MapPinPopup;
