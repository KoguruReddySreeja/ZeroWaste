import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Flag, Trash2, MapPin } from "lucide-react";
import axios from "../../utils/axios.js";

const PostTableRow = ({ post, fetchPosts }) => {
  const { _id, user, foodType, quantity, expiry, status } = post;
  const navigate = useNavigate();

  // API Call Handlers
  const handleApprove = async () => {
    try {
      await axios.patch(`/admin/posts/${_id}/approve`);
      fetchPosts(); // Refresh data
    } catch (err) {
      console.error("Approval error:", err);
    }
  };

  const handleFlag = async () => {
    try {
      await axios.patch(`/admin/posts/${_id}/flag`);
      fetchPosts();
    } catch (err) {
      console.error("Flag error:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/admin/posts/${_id}`);
      fetchPosts();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleViewMap = () => {
    navigate(`/admin/map?postId=${_id}`);
  };

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-6 py-4">{user?.name}</td>
      <td className="px-6 py-4">{foodType}</td>
      <td className="px-6 py-4">{quantity}</td>
      <td className="px-6 py-4">{new Date(expiry).toLocaleDateString()}</td>
      <td className="px-6 py-4">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            status === "Fresh"
              ? "bg-green-100 text-green-700"
              : status === "Near Expiry"
              ? "bg-yellow-100 text-yellow-800"
              : status === "Expired"
              ? "bg-red-100 text-red-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {status}
        </span>
      </td>
      <td className="px-6 py-4 flex gap-2 justify-center">
        <button title="Approve" onClick={handleApprove} className="text-green-600 hover:text-green-800">
          <CheckCircle size={18} />
        </button>
        <button title="Flag" onClick={handleFlag} className="text-yellow-600 hover:text-yellow-800">
          <Flag size={18} />
        </button>
        <button title="Delete" onClick={handleDelete} className="text-red-600 hover:text-red-800">
          <Trash2 size={18} />
        </button>
        <button title="View on Map" onClick={handleViewMap} className="text-indigo-600 hover:text-indigo-800">
          <MapPin size={18} />
        </button>
      </td>
    </tr>
  );
};

export default PostTableRow;
