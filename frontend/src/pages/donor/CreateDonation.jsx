import React, { useEffect, useState } from "react";
import { Upload, MapPin, Timer, Utensils, Snowflake, Ruler } from "lucide-react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const CreateDonation = () => {
  const [form, setForm] = useState({
    image: null,
    foodType: "veg",
    perishability: "perishable",
    expiry: "",
    pickupTime: "",
    location: "",
    quantity: ""
  });

  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation({ latitude, longitude });
      setForm((prev) => ({
        ...prev,
        location: `${latitude},${longitude}`
      }));
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { image, foodType, perishability, expiry, pickupTime, location, quantity } = form;

      const [lat, lng] = location.split(',').map(Number);

      const formData = new FormData();
      formData.append("foodType", foodType);
      formData.append("perishability", perishability);
      formData.append("expiry", expiry);
      formData.append("pickupTime", pickupTime);
      formData.append("quantity", quantity);
      if (image) formData.append("image", image);
      formData.append("coordinates", JSON.stringify([lng, lat]));

      await axios.post("http://localhost:5000/api/donor/create-donation", formData);
      toast.success("Donation created successfully! 🎉");
      setForm({
        image: null,
        foodType: "veg",
        perishability: "perishable",
        expiry: "",
        pickupTime: "",
        location: "",
        quantity: ""
      });
    } catch (err) {
      toast.error("Failed to create donation. Try again.");
    }
  };

  return (
    <div className="p-6 bg-[#f6fef8] min-h-screen overflow-y-auto">
      <h1 className="text-3xl font-bold text-[#2f5d3a] mb-6">Create a New Donation</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-2xl shadow p-6"
      >
        <div className="col-span-1">
          <label className="block mb-2 text-[#264653] font-medium">Upload Image (optional)</label>
          <div className="flex items-center gap-3">
            <input
              type="file"
              accept="image/*"
              className="border border-gray-300 rounded p-2 w-full"
              onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
            />
            <Upload className="text-[#81b29a] w-6 h-6" />
          </div>
          <p className="text-xs text-gray-500 mt-1">AI may predict quantity from the image.</p>
        </div>

        <div>
          <label className="block mb-2 text-[#264653] font-medium">Food Type</label>
          <select
            value={form.foodType}
            onChange={(e) => setForm({ ...form, foodType: e.target.value })}
            className="w-full border border-gray-300 rounded p-2"
          >
            <option value="veg">🍃 Vegetarian</option>
            <option value="non-veg">🍗 Non-Vegetarian</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-[#264653] font-medium">Perishability</label>
          <select
            value={form.perishability}
            onChange={(e) => setForm({ ...form, perishability: e.target.value })}
            className="w-full border border-gray-300 rounded p-2"
          >
            <option value="perishable">🧊 Perishable</option>
            <option value="non-perishable">📦 Non-Perishable</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-[#264653] font-medium">Expiry Time</label>
          <div className="flex items-center gap-2">
            <input
              type="datetime-local"
              value={form.expiry}
              onChange={(e) => setForm({ ...form, expiry: e.target.value })}
              className="w-full border border-gray-300 rounded p-2"
            />
            <Timer className="w-5 h-5 text-[#f4a261]" />
          </div>
        </div>

        <div>
          <label className="block mb-2 text-[#264653] font-medium">Pickup Time</label>
          <div className="flex items-center gap-2">
            <input
              type="datetime-local"
              value={form.pickupTime}
              onChange={(e) => setForm({ ...form, pickupTime: e.target.value })}
              className="w-full border border-gray-300 rounded p-2"
            />
            <Timer className="w-5 h-5 text-[#f4a261]" />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block mb-2 text-[#264653] font-medium">Location (auto-filled)</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Enter manually if not auto-filled"
              className="w-full border border-gray-300 rounded p-2"
            />
            <MapPin className="w-5 h-5 text-[#81b29a]" />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block mb-2 text-[#264653] font-medium">Estimated Quantity</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              className="w-full border border-gray-300 rounded p-2"
              placeholder="e.g., 2.5 kg or 20 packs"
            />
            <Ruler className="w-5 h-5 text-[#e76f51]" />
          </div>
        </div>

        <div className="md:col-span-2 flex justify-end mt-4">
          <button
            type="submit"
            className="bg-[#2a9d8f] hover:bg-[#21867d] text-white px-6 py-3 rounded-xl font-semibold shadow transition"
          >
            Submit Donation
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDonation;
