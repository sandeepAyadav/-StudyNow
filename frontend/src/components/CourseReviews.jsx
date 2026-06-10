import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviewsByCourse, postCourseReview, resetReviewState } from '../slice/reviewSlice';

function CourseReviews({ courseId }) {
  const dispatch = useDispatch();
  
  const { reviews, reviewCount, loading, submitting, success, error } = useSelector((state) => state.review);
  const { user } = useSelector((state) => state.auth);

  const [star, setStar] = useState(5);
  const [comment, setComment] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchReviewsByCourse(courseId));
    }
  }, [courseId, dispatch]);

  useEffect(() => {
    if (success) {
      setComment("");
      setStar(5);
      dispatch(resetReviewState());
    }
  }, [success, dispatch]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    dispatch(postCourseReview({ courseId, star, comment }));
  };

  return (
    <div className="mt-12 border-t border-gray-200 pt-8 max-w-4xl mx-auto px-4">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        Student Feedback ({reviewCount})
      </h3>

     
      {user && user.role !== "Teacher" ? (
        <form onSubmit={handleReviewSubmit} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-10 space-y-4">
          <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
            Write a Review
          </h4>

         
          <div className="flex flex-col space-y-1">
            <label className="text-xs font-semibold text-gray-500">Rating Valuation</label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setStar(num)}
                  onMouseEnter={() => setHoveredStar(num)}
                  onMouseLeave={() => setHoveredStar(0)}
                  className="text-2xl transition-transform duration-100 transform active:scale-95 focus:outline-hidden"
                >
                  <span className={(hoveredStar || star) >= num ? "text-amber-400" : "text-gray-200"}>
                    ★
                  </span>
                </button>
              ))}
              <span className="text-xs font-bold text-gray-400 pl-2">({star} / 5)</span>
            </div>
          </div>

         
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-semibold text-gray-500">Share your learning experience</label>
            <textarea
              rows="3"
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What did you like or dislike about this course? How can the instructor improve?"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none"
            />
          </div>

         
          <div className="flex items-center justify-between pt-1">
            <div className="text-xs max-w-[70%]">
              {error && <span className="text-red-600 font-medium">❌ {error}</span>}
              {success && <span className="text-emerald-600 font-medium">🎉 Review submitted!</span>}
            </div>
            
            <button
              type="submit"
              disabled={submitting}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-5 rounded-xl text-xs shadow-sm transition disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
            >
              {submitting ? "Uploading..." : "Submit Review"}
            </button>
          </div>
        </form>
      ) : (
        !user && (
          <div className="p-4 bg-gray-50 rounded-xl border text-center text-sm text-gray-500 mb-8 font-medium">
            Please <span className="text-indigo-600 font-bold underline cursor-pointer">Login</span> as a student to submit your course reviews.
          </div>
        )
      )}

      {loading ? (
        <p className="text-center text-gray-400 text-sm animate-pulse py-6">Syncing user opinions...</p>
      ) : reviews.length > 0 ? (
        <div className="space-y-5">
          {reviews.map((rev) => (
            <div key={rev._id} className="bg-gray-50/50 border border-gray-100 rounded-xl p-5 flex space-x-4 animate-fade-in">
              
             
              <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0 uppercase text-xs">
                {rev.userId?.name ? rev.userId.name.substring(0, 2) : "ST"}
              </div>

            
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-bold text-gray-800">
                    {rev.userId?.name || "Verified Student"}
                  </h5>
                  
                  <div className="text-amber-400 text-xs tracking-tight">
                    {"★".repeat(rev.star)}{"☆".repeat(5 - rev.star)}
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                  {rev.comment}
                </p>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 italic text-sm py-8 border border-dashed rounded-xl">
          No feedback scores recorded for this track yet. Be the first to review!
        </p>
      )}
    </div>
  );
}

export default CourseReviews;