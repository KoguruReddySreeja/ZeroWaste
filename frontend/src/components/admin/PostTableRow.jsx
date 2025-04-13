import React from "react";
import { CheckCircle, Flag, Trash2, MapPin } from "lucide-react";

const PostTableRow = ({ post }) => {
  const { donor, foodType, quantity, expiry, status } = post;

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-6 py-4">{donor}</td>
      <td className="px-6 py-4">{foodType}</td>
      <td className="px-6 py-4">{quantity}</td>
      <td className="px-6 py-4">{expiry}</td>
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
        <button title="Approve" className="text-green-600 hover:text-green-800">
          <CheckCircle size={18} />
        </button>
        <button title="Flag" className="text-yellow-600 hover:text-yellow-800">
          <Flag size={18} />
        </button>
        <button title="Delete" className="text-red-600 hover:text-red-800">
          <Trash2 size={18} />
        </button>
        <button title="View on Map" className="text-indigo-600 hover:text-indigo-800">
          <MapPin size={18} />
        </button>
      </td>
    </tr>
  );
};

export default PostTableRow;
