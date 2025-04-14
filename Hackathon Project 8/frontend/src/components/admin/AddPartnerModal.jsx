// components/admin/AddPartnerModal.jsx
import React, { useState } from "react";
import { X } from "lucide-react";

const AddPartnerModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    contact: "",
    email: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black">
          <X />
        </button>
        <h2 className="text-xl font-semibold mb-4">Add New Partner</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Partner Name"
            className="w-full border rounded-md px-3 py-2"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="w-full border rounded-md px-3 py-2"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            className="w-full border rounded-md px-3 py-2"
            required
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border rounded-md px-3 py-2"
            required
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Add Partner
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPartnerModal;
