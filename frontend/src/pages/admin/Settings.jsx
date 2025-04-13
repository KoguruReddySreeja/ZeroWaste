import React, { useState, useEffect } from 'react';
import LogoutButton from '../../components/LogoutButton';
import axios from 'axios';

const SettingsPage = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    ngo: '',
    phone: '',
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
  });
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Fetch the logged-in user's data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:5000/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  // Handle changes for profile inputs
  const handleProfileChange = (e, setter) => setter(e.target.value);

  // Handle notification preference changes
  const handleNotificationChange = (e) => {
    setUserData({
      ...userData,
      notifications: {
        ...userData.notifications,
        [e.target.name]: e.target.checked,
      },
    });
  };

  // Handle password change
  const handlePasswordChange = (e, setter) => setter(e.target.value);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  // Update profile
  const handleUpdateProfile = async () => {
    try {
      const updatedData = {
        name: userData.name,
        email: userData.email,
        ngo: userData.ngo,
        phone: userData.phone,
        notifications: userData.notifications,
      };
      const token = localStorage.getItem('authToken');
      await axios.put('http://localhost:5000/api/user/profile', updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile!');
    }
  };

  // Update password
  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    try {
      const token = localStorage.getItem('authToken');
      await axios.put('http://localhost:5000/api/user/password', { newPassword }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Password updated successfully!');
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Failed to update password!');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Settings</h1>

      {/* Profile Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={userData.name}
              onChange={(e) => handleProfileChange(e, (val) => setUserData({ ...userData, name: val }))}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="ngo" className="block text-sm font-medium text-gray-700">
              NGO/Shelter Information
            </label>
            <input
              type="text"
              id="ngo"
              value={userData.ngo}
              onChange={(e) => handleProfileChange(e, (val) => setUserData({ ...userData, ngo: val }))}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
              Contact Email
            </label>
            <input
              type="email"
              id="contact"
              value={userData.email}
              onChange={(e) => handleProfileChange(e, (val) => setUserData({ ...userData, email: val }))}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
            />
          </div>
        </div>
        <button
          onClick={handleUpdateProfile}
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 mt-4"
        >
          Update Profile
        </button>
      </div>

      {/* Update Email / Password Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Update Email / Password</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              New Email
            </label>
            <input
              type="email"
              id="email"
              value={userData.email}
              onChange={(e) => handleProfileChange(e, (val) => setUserData({ ...userData, email: val }))}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={newPassword}
              onChange={(e) => handlePasswordChange(e, setNewPassword)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => handlePasswordChange(e, setConfirmPassword)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
            />
          </div>
        </div>
        <button
          onClick={handleUpdatePassword}
          className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 mt-4"
        >
          Update Password
        </button>
      </div>

      {/* Notification Preferences Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
        <div className="space-y-4">
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="email"
                checked={userData.notifications.email}
                onChange={handleNotificationChange}
                className="mr-2"
              />
              Receive Email Notifications
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="sms"
                checked={userData.notifications.sms}
                onChange={handleNotificationChange}
                className="mr-2"
              />
              Receive SMS Notifications
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="push"
                checked={userData.notifications.push}
                onChange={handleNotificationChange}
                className="mr-2"
              />
              Receive Push Notifications
            </label>
          </div>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 mt-4"
      >
        Logout
      </button>
    </div>
  );
};

export default SettingsPage;
