import React, { useEffect, useState } from "react";
import axios from "../../utils/axios.js";

const UserPostsModal = ({ user, onClose }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!user?._id) return;
      setLoading(true);
      try {
        const res = await axios.get(`/admin/users/${user._id}/posts`);
        setUserPosts(res.data.posts || []);
      } catch (err) {
        console.error("Error fetching user posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [user]);

  if (!user?._id) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl"
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4">
          Posts by {user.name || "Unknown User"}
        </h2>

        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : userPosts.length > 0 ? (
            userPosts.map((post, index) => (
              <div key={index} className="border p-3 rounded-md bg-gray-50 shadow-sm">
                <h3 className="font-medium">{post.title}</h3>
                <p className="text-sm text-gray-600">{post.description}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Posted on {new Date(post.date).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPostsModal;
