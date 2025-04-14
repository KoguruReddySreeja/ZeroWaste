import React, { useState, useEffect } from "react";
import axios from "../../utils/axios.js"; // adjust the path based on where you keep your axios instance
import PostsFilterBar from "../../components/admin/PostsFilterBar";
import PostTableRow from "../../components/admin/PostTableRow";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [filters, setFilters] = useState({
    status: "All",
    type: "All",
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/admin/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const statusMatch = filters.status === "All" || post.status === filters.status;
    const typeMatch = filters.type === "All" || post.foodType.includes(filters.type);
    return statusMatch && typeMatch;
  });

  return (
    <div className="p-6 sm:p-8 overflow-y-auto h-full bg-gray-50">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Food Posts Moderation</h1>
      <PostsFilterBar filters={filters} setFilters={setFilters} />

      <div className="overflow-x-auto mt-6 bg-white rounded-lg shadow">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="px-6 py-4">Donor</th>
              <th className="px-6 py-4">Food Type</th>
              <th className="px-6 py-4">Quantity</th>
              <th className="px-6 py-4">Expiry</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => <PostTableRow key={post._id} post={post} />)
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">No posts found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Posts;
