import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Badge } from "../../components/ui/badge";

// Custom status colors
const statusColors = {
  pending: "#2a9d8f",
  transit: "#0077b6",
  delivered: "#2f5d3a",
};

const mockDonations = [
  {
    id: 1,
    name: "Veg Biryani",
    status: "pending",
    location: { lat: 28.6448, lng: 77.2167 },
    quantity: "2kg",
    address: "Donor's Home, Delhi",
    time: "2025-04-11 11:00 AM",
  },
  {
    id: 2,
    name: "Dal Makhani",
    status: "transit",
    location: { lat: 28.6548, lng: 77.2367 },
    quantity: "1.5kg",
    address: "Pickup Center, Delhi",
    time: "2025-04-11 09:30 AM",
  },
  {
    id: 3,
    name: "Rotis",
    status: "delivered",
    location: { lat: 28.6628, lng: 77.2422 },
    quantity: "3kg",
    address: "NGO Center, Delhi",
    time: "2025-04-10 06:00 PM",
  },
];

const createIcon = (color) =>
  new L.DivIcon({
    html: `<div style="background-color:${color}; border-radius: 50%; width: 16px; height: 16px; border: 2px solid white"></div>`
  });

const DonorMapView = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    // Replace this with actual API call to fetch user-specific donations
    setDonations(mockDonations);
  }, []);

  return (
    <div className="h-[calc(100vh-4rem)] w-full bg-[#f6fef8]">
      <div className="px-6 pt-6 pb-2">
        <h2 className="text-3xl font-bold text-[#2f5d3a] mb-2">Your Donations</h2>
        <p className="text-[#556b5c] text-sm mb-4">This map shows only your active and completed donations.</p>
      </div>

      <MapContainer
        center={[28.6448, 77.2167]}
        zoom={13}
        scrollWheelZoom={true}
        className="h-[85%] rounded-xl mx-6 shadow"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {donations.map((donation) => (
          <Marker
            key={donation.id}
            position={[donation.location.lat, donation.location.lng]}
            icon={createIcon(statusColors[donation.status])}
          >
            <Popup>
              <div className="text-sm text-gray-700">
                <h3 className="font-semibold text-base mb-1">{donation.name}</h3>
                <p><strong>Quantity:</strong> {donation.quantity}</p>
                <p><strong>Time:</strong> {donation.time}</p>
                <p><strong>Address:</strong> {donation.address}</p>
                <div className="mt-2">
                  <Badge className="capitalize" variant="outline">
                    {donation.status === "pending" && "Awaiting Pickup"}
                    {donation.status === "transit" && "In Transit"}
                    {donation.status === "delivered" && "Delivered"}
                  </Badge>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="px-6 pt-4 pb-6">
        <div className="text-sm text-[#2f5d3a] flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#2a9d8f]"></div>
            Awaiting Pickup
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#0077b6]"></div>
            In Transit
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#2f5d3a]"></div>
            Delivered
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorMapView;