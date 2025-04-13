// components/admin/UserPostsModal.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const UserPostsModal = ({ userId, onClose }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!userId) return;

      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/admin/users/${userId}/posts`);
        setUserPosts(res.data.posts || []);
        setUserName(res.data.name || "Unknown User");
      } catch (err) {
        console.error("Error fetching user posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [userId]);

  if (!userId) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl"
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4">Posts by {userName}</h2>

        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : userPosts.length > 0 ? (
            userPosts.map((post, index) => (
              <div key={index} className="border p-3 rounded-md bg-gray-50 shadow-sm">
                <h3 className="font-medium">{post.title}</h3>
                <p className="text-sm text-gray-600">{post.description}</p>
                <p className="text-xs text-gray-400 mt-1">Posted on {post.date}</p>
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
