import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from '../../utils/axios'; // Axios instance for API calls

const FeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [totalWasteReduced, setTotalWasteReduced] = useState(0);
  const [pickup, setPickup] = useState(''); // Track pickup info

  // Fetch past feedbacks when the component mounts
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('/receiver/feedbacks');
        setFeedbacks(response.data.feedbacks);
        setTotalWasteReduced(response.data.totalWasteReduced);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleRatingChange = (star) => {
    setRating(star);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmitFeedback = async () => {
    if (rating === 0) {
      alert('Please provide a rating!');
      return;
    }

    if (!pickup) {
      alert('Please specify the pickup details!');
      return;
    }

    try {
      const newFeedback = {
        rating: rating,
        comment: comment,
        pickup: pickup, // Include pickup in the feedback
      };

      const response = await axios.post('/receiver/feedbacks', newFeedback);
      setFeedbacks([response.data.feedback, ...feedbacks]);
      setRating(0);
      setComment('');
      setPickup('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Feedback</h1>

      {/* Encouragement Message */}
      <div className="bg-green-100 p-4 rounded-lg mb-6 text-green-700">
        <p className="font-semibold text-lg">Great Job!</p>
        <p>You’ve helped reduce waste by {totalWasteReduced}kg! Keep it up!</p>
      </div>

      {/* Submit Feedback Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Submit Feedback</h2>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <span className="mr-2">Rating:</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRatingChange(star)}
              className={`text-lg ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              <FaStar />
            </button>
          ))}
        </div>

        {/* Comment */}
        <div className="mb-4">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
            Optional Comment:
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={handleCommentChange}
            rows="4"
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
            placeholder="Was food clean and fresh?"
          ></textarea>
        </div>

        {/* Pickup Details */}
        <div className="mb-4">
          <label htmlFor="pickup" className="block text-sm font-medium text-gray-700">
            Pickup Details:
          </label>
          <input
            id="pickup"
            type="text"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
            placeholder="Pickup location or time"
          />
        </div>

        <button
          onClick={handleSubmitFeedback}
          className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700"
        >
          Submit Feedback
        </button>
      </div>

      {/* Past Feedbacks */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Past Feedbacks</h2>
        {feedbacks.length > 0 ? (
          <div className="space-y-4">
            {feedbacks.map((feedback) => (
              <div
                key={feedback._id}
                className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">{feedback.donor.name}</h3>
                  <span className="text-sm text-gray-500">{new Date(feedback.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="mr-2">Rating:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`text-lg ${feedback.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-700">{feedback.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No past feedbacks available.</p>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
