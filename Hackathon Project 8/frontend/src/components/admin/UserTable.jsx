import React from "react";
import UserRow from "./UserRow";

const UserTable = ({ users, loading, onViewPosts }) => {
  return (
    <div className="bg-white rounded-xl shadow overflow-auto">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-100 text-gray-700 font-semibold">
          <tr>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Email</th>
            <th className="px-6 py-3 text-left">Role</th>
            <th className="px-6 py-3 text-center">Joined</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-500">
                Loading users...
              </td>
            </tr>
          ) : users.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-500">
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <UserRow key={user._id} user={user} onViewPosts={onViewPosts} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
