import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { FaRoute } from 'react-icons/fa';
import axios from '../../utils/axios';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const MapView = () => {
  const [currentPosition, setCurrentPosition] = useState([28.6448, 77.216721]);
  const [foodData, setFoodData] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [route, setRoute] = useState(null);

  // Get current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentPosition([position.coords.latitude, position.coords.longitude]);
      });
    }
  }, []);

  // Fetch donation data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/receiver/mapview/map-donations');
        setFoodData(res.data.donations);
      } catch (err) {
        console.error('Error fetching donations:', err);
      }
    };
    fetchData();
  }, []);

  // Create route to food
  const handleRoute = (foodLat, foodLon) => {
    const map = useMapEvents({
      click() {
        if (route) {
          map.removeControl(route);
        }
        const routeControl = L.Routing.control({
          waypoints: [
            L.latLng(currentPosition),
            L.latLng(foodLat, foodLon),
          ],
          routeWhileDragging: true,
        }).addTo(map);
        setRoute(routeControl);
      },
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'fresh': return 'green';
      case 'near expiry': return 'orange';
      case 'expired': return 'red';
      default: return 'gray';
    }
  };

  return (
    <div className="w-full h-full">
      <MapContainer
        center={currentPosition}
        zoom={14}
        style={{ width: '100%', height: '100vh' }}
        scrollWheelZoom={true}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {foodData.map(({ _id, foodType, user, expiry, location, status }) => (
          <Marker
            key={_id}
            position={[location.coordinates[1], location.coordinates[0]]}
            icon={new L.Icon({
              iconUrl: '/path/to/marker-icon.png', // Make sure to have this or a real icon
              iconSize: [25, 25],
              iconAnchor: [12, 24],
              popupAnchor: [0, -24],
            })}
            eventHandlers={{
              click: () => {
                setSelectedFood({
                  donor: user?.name || 'Unknown',
                  type: foodType,
                  status,
                  expiryTime: expiry,
                  lat: location.coordinates[1],
                  lon: location.coordinates[0],
                });
                handleRoute(location.coordinates[1], location.coordinates[0]);
              }
            }}
          >
            <Popup>
              <div className="w-40">
                <h3 className="font-semibold">{user?.name || 'Unknown Donor'}</h3>
                <p>{foodType} food</p>
                <p>Status: <span className={`text-${getStatusColor(status)}-500`}>{status}</span></p>
                <p>Expiry: {new Date(expiry).toLocaleString()}</p>
                <button
                  className="mt-2 text-white bg-green-600 px-2 py-1 rounded"
                  onClick={() => alert('Pickup requested!')}
                >
                  Request Pickup
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {selectedFood && (
          <div className="absolute top-4 right-4 p-2 bg-white rounded shadow-lg z-50">
            <h4 className="font-semibold">Selected Food</h4>
            <p>{selectedFood.donor} - {selectedFood.type} - {selectedFood.status}</p>
            <button
              className="mt-2 text-white bg-blue-600 px-3 py-1 rounded"
              onClick={() => handleRoute(selectedFood.lat, selectedFood.lon)}
            >
              Show Route
            </button>
          </div>
        )}
      </MapContainer>

      {route && (
        <div className="absolute bottom-4 right-4 p-3 bg-gray-800 text-white rounded">
          <FaRoute className="inline mr-2" />
          <span>Route to Food</span>
        </div>
      )}
    </div>
  );
};

export default MapView;
