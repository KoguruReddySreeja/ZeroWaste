import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

import MapFilterBar from "../../components/admin/map/MapFilterBar";
import PostModal from "../../components/admin/map/PostModal";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const getColorByStatus = (status) => {
  if (status === "fresh") return "green";
  if (status === "near expiry") return "orange";
  return "red";
};

const MapPage = () => {
  const [donations, setDonations] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/map"); // Ensure this route exists
        setDonations(res.data);
      } catch (err) {
        console.error("Failed to fetch donations:", err);
      }
    };

    fetchDonations();
  }, []);

  return (
    <div className="h-[calc(100vh-64px)] relative">
      <MapFilterBar />

      <MapContainer center={[28.6139, 77.209]} zoom={13} className="h-full z-0">
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {donations.map((post) => (
          <Marker
            key={post._id}
            position={[post.location.coordinates[1], post.location.coordinates[0]]}
            icon={
              new L.Icon({
                iconUrl: markerIcon,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                className: `marker-${getColorByStatus(post.status)}`,
              })
            }
            eventHandlers={{
              click: () => setSelectedPost(post),
            }}
          >
            <Popup>
              <div className="text-sm">
                <strong>{post.user?.name || "Anonymous"}</strong>
                <br />
                {post.foodType} • {post.quantity}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
};

export default MapPage;
