// container/Feedback.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaPaperPlane, FaSmile, FaMeh, FaFrown } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Feedback = () => {
  const user = useSelector(state => state.user?.user);
  const [formData, setFormData] = useState({
    rating: 0,
    category: 'suggestion',
    message: '',
    email: user?.email || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      // Here you would typically send the data to your backend
      console.log('Feedback submitted:', formData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      setFormData({
        rating: 0,
        category: 'suggestion',
        message: '',
        email: user?.email || ''
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRatingIcon = (rating) => {
    if (rating >= 4) return <FaSmile className="text-green-500 text-2xl" />;
    if (rating >= 3) return <FaMeh className="text-yellow-500 text-2xl" />;
    return <FaFrown className="text-red-500 text-2xl" />;
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-4xl mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-secondary rounded-2xl p-12 text-center shadow-lg"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <FaPaperPlane className="text-white text-2xl" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
          <p className="text-gray-300 text-lg mb-6">
            Your feedback has been received. We appreciate you taking the time to help us improve CodeSync.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSubmitted(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Submit Another Feedback
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-secondary rounded-2xl p-8 shadow-lg"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Share Your Feedback</h1>
          <p className="text-gray-300">
            Help us improve CodeSync by sharing your thoughts and suggestions
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Rating Section */}
          <div>
            <label className="block text-white text-lg font-semibold mb-4">
              How would you rate your experience?
            </label>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRatingClick(star)}
                    className={`p-3 rounded-full transition-all ${
                      formData.rating >= star
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                    }`}
                  >
                    <FaStar className="text-xl" />
                  </motion.button>
                ))}
              </div>
              {formData.rating > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-white"
                >
                  {getRatingIcon(formData.rating)}
                  <span className="font-semibold">
                    {formData.rating === 5 ? 'Excellent' :
                     formData.rating === 4 ? 'Good' :
                     formData.rating === 3 ? 'Average' :
                     formData.rating === 2 ? 'Poor' : 'Very Poor'}
                  </span>
                </motion.div>
              )}
            </div>
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-white text-lg font-semibold mb-3">
              Category
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { value: 'suggestion', label: 'Suggestion' },
                { value: 'bug', label: 'Bug Report' },
                { value: 'feature', label: 'Feature Request' },
                { value: 'ui', label: 'UI/UX Feedback' },
                { value: 'performance', label: 'Performance' },
                { value: 'other', label: 'Other' }
              ].map((category) => (
                <motion.label
                  key={category.value}
                  whileHover={{ scale: 1.02 }}
                  className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border-2 ${
                    formData.category === category.value
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="category"
                    value={category.value}
                    checked={formData.category === category.value}
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <span className="font-medium">{category.label}</span>
                </motion.label>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-white text-lg font-semibold mb-3">
              Your Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell us more about your experience, suggestions, or issues..."
              rows="6"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 resize-none transition-all"
              required
            />
          </div>

          {/* Email (optional) */}
          <div>
            <label className="block text-white text-lg font-semibold mb-3">
              Email Address (Optional)
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <p className="text-gray-400 text-sm mt-2">
              Provide your email if you'd like us to follow up with you
            </p>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting || !formData.message}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            className={`w-full py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-3 ${
              isSubmitting || !formData.message
                ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white'
            }`}
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                Submitting...
              </>
            ) : (
              <>
                <FaPaperPlane />
                Submit Feedback
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Feedback;