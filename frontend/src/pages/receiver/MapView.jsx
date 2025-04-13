import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { FaRoute, FaMapMarkerAlt } from 'react-icons/fa';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const foodData = [
  {
    id: 1,
    type: 'Veg',
    donor: 'John Doe',
    expiryTime: '2023-04-15T14:00:00Z',
    lat: 28.6448,
    lon: 77.216721,
    status: 'fresh', 
  },
  {
    id: 2,
    type: 'Non-Veg',
    donor: 'Jane Doe',
    expiryTime: '2023-04-14T10:00:00Z',
    lat: 28.6440,
    lon: 77.2205,
    status: 'nearExpiry', 
  },

];

const MapView = () => {
  const [currentPosition, setCurrentPosition] = useState([28.6448, 77.216721]); 
  const [selectedFood, setSelectedFood] = useState(null);
  const [route, setRoute] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentPosition([position.coords.latitude, position.coords.longitude]);
      });
    }
  }, []);

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
      case 'fresh':
        return 'green';
      case 'nearExpiry':
        return 'orange';
      case 'expired':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <div className="w-full h-full">
      <MapContainer
        center={currentPosition}
        zoom={14}
        style={{ width: '100%', height: '100vh' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Add food donation pins */}
        {foodData.map(({ id, type, donor, expiryTime, lat, lon, status }) => (
          <Marker
            key={id}
            position={[lat, lon]}
            icon={new L.Icon({
              iconUrl: '/path/to/marker-icon.png', 
              iconSize: [25, 25],
              iconAnchor: [12, 24],
              popupAnchor: [0, -24],
            })}
            eventHandlers={{
              click: () => {
                setSelectedFood({ type, donor, expiryTime, lat, lon, status });
                handleRoute(lat, lon);
              },
            }}
          >
            <Popup>
              <div className="w-40">
                <h3 className="font-semibold">{donor}</h3>
                <p>{type} food</p>
                <p>Status: <span className={`text-${getStatusColor(status)}-500`}>{status}</span></p>
                <p>Expiry: {new Date(expiryTime).toLocaleString()}</p>
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
