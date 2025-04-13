import React, { useState, useEffect } from "react";
import axios from "axios";
import UserFilterBar from "../../components/admin/UserFilterBar";
import UserTable from "../../components/admin/UserTable";
import UserPostsModal from "../../components/admin/UserPostsModal";

const Users = () => {
  const [filters, setFilters] = useState({ role: "all" });
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/admin/users"); // adjust route if needed
      setUsers(res.data || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFilterChange = (filterKey, value) => {
    setFilters((prev) => ({ ...prev, [filterKey]: value }));
  };

  const handleViewPosts = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const filteredUsers = users.filter((user) => {
    return filters.role === "all" || user.role === filters.role;
  });

  return (
    <div className="p-6 sm:p-8 flex flex-col gap-6 overflow-y-auto h-full bg-gray-50">
      <h1 className="text-3xl font-semibold text-gray-800">User Management</h1>
      <UserFilterBar filters={filters} onFilterChange={handleFilterChange} />
      <UserTable users={filteredUsers} loading={loading} onViewPosts={handleViewPosts} />
      <UserPostsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
      />
    </div>
  );
};

export default Users;
