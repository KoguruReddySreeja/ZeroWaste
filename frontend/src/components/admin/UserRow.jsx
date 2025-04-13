import React from "react";
import { Eye } from "lucide-react";

const UserRow = ({ user, onViewPosts }) => {
  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : "N/A";

  return (
    <tr className="border-b hover:bg-gray-50 transition duration-300">
      <td className="py-3 px-4">{user?.name || "N/A"}</td>
      <td className="py-3 px-4">{user?.email || "N/A"}</td>
      <td className="py-3 px-4 capitalize">{user?.role || "N/A"}</td>
      <td className="py-3 px-4 text-center">{joinedDate}</td>
      <td className="py-3 px-4 text-center">
        <button
          onClick={() => onViewPosts(user)}
          className="text-blue-600 hover:underline flex items-center justify-center gap-1"
        >
          <Eye size={16} />
          View Posts
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
