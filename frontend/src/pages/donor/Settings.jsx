import React, { useState } from "react";
import { LogOut, Bell, User, Lock, Building } from "lucide-react";
import LogoutButton from "../../components/LogoutButton"; // Import the LogoutButton

const DonorSettings = () => {
  const [profile, setProfile] = useState({
    name: "Ankit Sharma",
    email: "ankit@greenplate.org",
    organization: "Green Plate Restaurant",
    logo: "",
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [password, setPassword] = useState({ current: "", new: "" });

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
            <div>
              <label className="block font-medium mb-1">Logo</label>
              <input
                type="file"
                className="w-full p-3 border rounded-xl"
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    logo: e.target.files[0]?.name || "",
                  })
                }
              />
              {profile.logo && (
                <p className="text-sm text-green-600 mt-1">
                  Uploaded: {profile.logo}
                </p>
              )}
            </div>
          </div>
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
          <button className="mt-4 bg-[#2f5d3a] text-white px-6 py-2 rounded-xl hover:bg-[#264e30]">
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
            <span className="text-lg">
              Enable important alerts via email/SMS
            </span>
          </label>
        </div>

        {/* Logout Button */}
        <div className="flex justify-end">
          <LogoutButton /> {/* Use the LogoutButton component here */}
        </div>
      </div>
    </div>
  );
};

export default DonorSettings;
