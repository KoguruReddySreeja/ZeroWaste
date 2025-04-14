import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaStar } from 'react-icons/fa';

const pickupData = [
  {
    id: 1,
    donor: 'John Doe',
    foodType: 'Veg',
    status: 'Confirmed', 
    pickupDate: '2023-04-12',
    rating: null,
  },
  {
    id: 2,
    donor: 'Jane Smith',
    foodType: 'Non-Veg',
    status: 'Picked',
    pickupDate: '2023-04-11',
    rating: null,
  },
  {
    id: 3,
    donor: 'Alice Johnson',
    foodType: 'Veg',
    status: 'Requested',
    pickupDate: '2023-04-10',
    rating: null,
  },
];

const MyPickups = () => {
  const [pickups, setPickups] = useState(pickupData);
  const [filteredPickups, setFilteredPickups] = useState(pickupData);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    let filtered = pickups;
    if (statusFilter) {
      filtered = filtered.filter(pickup => pickup.status === statusFilter);
    }
    if (dateFilter) {
      filtered = filtered.filter(pickup => pickup.pickupDate === dateFilter);
    }
    setFilteredPickups(filtered);
  }, [statusFilter, dateFilter, pickups]);

  const handleConfirmReceipt = (id) => {
    const updatedPickups = pickups.map((pickup) =>
      pickup.id === id ? { ...pickup, status: 'Confirmed' } : pickup
    );
    setPickups(updatedPickups);
  };

  const handleRateDonor = (id, rating) => {
    const updatedPickups = pickups.map((pickup) =>
      pickup.id === id ? { ...pickup, rating: rating } : pickup
    );
    setPickups(updatedPickups);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">My Pickups</h1>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex space-x-4">
          <div>
            <label className="block">Status:</label>
            <select
              className="p-2 border border-gray-300 rounded"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="Requested">Requested</option>
              <option value="Approved">Approved</option>
              <option value="Picked">Picked</option>
              <option value="Confirmed">Confirmed</option>
            </select>
          </div>
          <div>
            <label className="block">Pickup Date:</label>
            <input
              type="date"
              className="p-2 border border-gray-300 rounded"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Pickup List */}
      <div className="space-y-4">
        {filteredPickups.map((pickup) => (
          <div key={pickup.id} className="p-4 border border-gray-300 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h2 className="text-xl font-semibold">{pickup.donor}</h2>
                <p className="text-gray-600">{pickup.foodType} food</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full ${
                  pickup.status === 'Confirmed'
                    ? 'bg-green-600 text-white'
                    : pickup.status === 'Picked'
                    ? 'bg-yellow-500 text-white'
                    : pickup.status === 'Requested'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-500 text-white'
                }`}
              >
                {pickup.status}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-500">Pickup Date: {pickup.pickupDate}</p>
              {pickup.status === 'Picked' || pickup.status === 'Confirmed' ? (
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-full"
                  onClick={() => handleConfirmReceipt(pickup.id)}
                >
                  Confirm Receipt
                </button>
              ) : null}
            </div>
            {pickup.status === 'Confirmed' && (
              <div className="mt-4 flex items-center space-x-2">
                <label className="text-sm">Rate the Donor:</label>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={`text-lg ${pickup.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                    onClick={() => handleRateDonor(pickup.id, star)}
                  >
                    <FaStar />
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPickups;
