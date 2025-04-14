import React, { useState, useEffect } from "react";
import { LogOut, Bell, User, Lock, Building } from "lucide-react";
import axios from "../../utils/axios";
import LogoutButton from "../../components/LogoutButton";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DonorSettings = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    organization: "",
    logo: "",
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [password, setPassword] = useState({ current: "", new: "" });

  // ✅ Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/donor/settings/profile");
        const user = res.data;
        setProfile({
          name: user.name,
          email: user.email,
          organization: user.ngo || "",
          logo: "",
        });
        setNotificationsEnabled(user.notifications?.email ?? true);
      } catch (err) {
        console.error("Error fetching profile:", err);
        toast.error("Failed to fetch profile.");
      }
    };

    fetchProfile();
  }, []);

  // ✅ Handle Save Profile
  const handleSaveProfile = async () => {
    try {
      await axios.put("/donor/settings/profile", {
        name: profile.name,
        email: profile.email,
        ngo: profile.organization,
        notifications: {
          email: notificationsEnabled,
        },
      });
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to update profile.");
    }
  };

  // ✅ Handle Password Update
  const handlePasswordUpdate = async () => {
    try {
      await axios.put("/donor/settings/update-password", {
        currentPassword: password.current,
        newPassword: password.new,
      });
      toast.success("Password updated!");
      setPassword({ current: "", new: "" });
    } catch (err) {
      console.error("Password update failed:", err);
      toast.error("Incorrect current password or server error.");
    }
  };

  return (
    <div className="w-full h-screen overflow-auto bg-[#f6fef8] text-[#2f5d3a]">
      <div className="max-w-5xl mx-auto p-6 pb-20">
        <h1 className="text-3xl font-bold mb-6">⚙️ Settings</h1>

        {/* Profile Section */}
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <User /> Profile Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Full Name</label>
              <input
                type="text"
                className="w-full p-3 border rounded-xl text-[#2f5d3a]"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full p-3 border rounded-xl text-[#2f5d3a]"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
            </div>
            <div>
              <label className="font-medium mb-1 flex items-center gap-1">
                <Building className="w-4 h-4" /> Organization / Restaurant
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-xl text-[#2f5d3a]"
                value={profile.organization}
                onChange={(e) =>
                  setProfile({ ...profile, organization: e.target.value })
                }
              />
            </div>
          </div>
          <button
            className="mt-4 bg-[#2f5d3a] text-white px-6 py-2 rounded-xl hover:bg-[#264e30]"
            onClick={handleSaveProfile}
          >
            Save Profile
          </button>
        </div>

        {/* Password Section */}
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Lock /> Update Password
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Current Password</label>
              <input
                type="password"
                className="w-full p-3 border rounded-xl text-[#2f5d3a]"
                value={password.current}
                onChange={(e) =>
                  setPassword({ ...password, current: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block font-medium mb-1">New Password</label>
              <input
                type="password"
                className="w-full p-3 border rounded-xl text-[#2f5d3a]"
                value={password.new}
                onChange={(e) =>
                  setPassword({ ...password, new: e.target.value })
                }
              />
            </div>
          </div>
          <button
            className="mt-4 bg-[#2f5d3a] text-white px-6 py-2 rounded-xl hover:bg-[#264e30]"
            onClick={handlePasswordUpdate}
          >
            Save Password
          </button>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Bell /> Notifications
          </h2>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={() =>
                setNotificationsEnabled(!notificationsEnabled)
              }
              className="accent-green-600 w-5 h-5"
            />
            Email Notifications
          </label>
          <div className="flex justify-end mt-4">
            <LogoutButton className="bg-[#2f5d3a] text-white px-6 py-2 rounded-xl hover:bg-[#264e30] shadow-md transition-transform transform hover:scale-105" />
          </div>
        </div>
      </div>
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default DonorSettings;
