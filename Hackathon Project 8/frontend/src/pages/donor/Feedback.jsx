import React, { useEffect, useState } from "react";
import { Star, Heart, Award } from "lucide-react";
import axios from "../../utils/axios";

const DonorFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [mostLovedDish, setMostLovedDish] = useState("—");

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axios.get("/api/donor/feedback");
        setFeedbackList(res.data.feedback);
        setAverageRating(res.data.averageRating);
        setMostLovedDish(res.data.mostLovedDish);
      } catch (error) {
        console.error("Failed to fetch feedback:", error);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div className="bg-[#f6fef8] min-h-screen max-h-screen overflow-y-auto p-6">
      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#2f5d3a]">
          Feedback & Appreciation 💬
        </h1>
        <p className="text-lg text-[#3d5a40] mt-1">
          Here's what recipients say about your donations. You're making a
          difference!
        </p>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4 transform transition duration-300 hover:scale-105 hover:shadow-lg group">
          <Star className="w-8 h-8 text-yellow-500 group-hover:animate-twinkleOnce" />
          <div>
            <p className="text-base text-[#3d5a40] font-semibold">Average Rating</p>
            <p className="text-xl font-bold text-[#2f5d3a]">
              {averageRating.toFixed(1)} / 5
            </p>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4 transform transition duration-300 hover:scale-105 hover:shadow-lg group">
          <Heart className="w-8 h-8 text-red-500 group-hover:animate-beatOnce" />
          <div>
            <p className="text-base text-[#3d5a40] font-semibold">Most Loved Dish</p>
            <p className="text-xl font-bold text-[#2f5d3a]">{mostLovedDish}</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4 transform transition duration-300 hover:scale-105 hover:shadow-lg group">
          <Award className="w-8 h-8 text-[#2a9d8f] group-hover:animate-badgePop" />
          <div>
            <p className="text-base text-[#3d5a40] font-semibold">Badges Earned</p>
            <p className="text-xl font-bold text-[#2f5d3a]">Top Donor ⭐</p>
          </div>
        </div>
      </div>

      {/* Feedback List */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-xl font-bold text-[#2f5d3a] mb-4">Recipient Feedback</h2>
        <div className="space-y-4">
          {feedbackList.length > 0 ? (
            feedbackList.map((fb, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg bg-[#fefefe] hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-semibold text-[#264653] text-lg">{fb.receiverName}</h3>
                  <div className="flex gap-1">
                    {Array.from({ length: fb.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-[#444] mb-2">"{fb.comment}"</p>
                <span className="text-sm text-[#2a9d8f] font-medium">
                  🍛 Dish: {fb.dish || "—"}
                </span>
              </div>
            ))
          ) : (
            <p className="text-[#3d3d3d]">No feedback yet.</p>
          )}
        </div>
      </div>

      {/* Appreciation Note */}
      <div className="bg-[#fef6ed] border-l-4 border-[#f4a261] rounded-xl p-4 text-base text-[#3d3d3d] shadow mb-6">
        🎉 <span className="font-semibold">Thank You!</span> Your kindness spreads
        joy and nourishment across communities.
      </div>
    </div>
  );
};

export default DonorFeedback;
