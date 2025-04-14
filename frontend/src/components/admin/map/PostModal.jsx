import React from "react";

const PostModal = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-20 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-xl p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-600"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {post.user?.name || "Donor"}'s Food Post
        </h2>
        <div className="space-y-2">
          <p><strong>Type:</strong> {post.foodType}</p>
          <p><strong>Quantity:</strong> {post.quantity}</p>
          <p><strong>Status:</strong> {post.status}</p>
          <p><strong>Perishability:</strong> {post.perishability}</p>
          <p><strong>Pickup Time:</strong> {new Date(post.pickupTime).toLocaleString()}</p>
          <p><strong>Expires At:</strong> {new Date(post.expiry).toLocaleString()}</p>
        </div>
        {post.imageURL && (
          <img src={post.imageURL} alt="Food" className="mt-4 rounded shadow w-full max-h-64 object-cover" />
        )}
        <div className="mt-6 flex justify-end">
          <button
            className="bg-gray-700 hover:bg-gray-900 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
