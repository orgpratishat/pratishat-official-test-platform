import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ContactImage from '../assets/Contact.svg';
import { useState } from 'react'; // ADD THIS
import axios from 'axios'; // ADD THIS
import LandingHeader from '../components/LandingHeader'
import LandingFooter from '../components/LandingFooter';

export default function Contact() {
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const navigate = useNavigate();

  // ADD THESE STATE VARIABLES
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: 'Select a subject',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ text: '', type: '' });

  const handleContactClick = () => {
    navigate('/contact-us');
  };

  const handleHomeClick = () => {
    navigate('/landing');
  };

  // ADD THIS HANDLER FUNCTION
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.fullName || !formData.email) {
      setSubmitMessage({ text: 'Full Name and Email are required.', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage({ text: '', type: '' });

    try {
      const response = await axios.post(`${API_BASE_URL}/send-contact`, formData);

      setSubmitMessage({ 
        text: response.data.message || 'Message sent successfully!', 
        type: 'success' 
      });
      
      // Reset the form
      setFormData({
        fullName: '',
        email: '',
        subject: 'Select a subject',
        message: ''
      });

    } catch (error) {
      console.error('Submission error:', error);
      const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Failed to send message. Please try again later.';
      setSubmitMessage({ text: errorMsg, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <LandingHeader/>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 py-6 lg:py-12 max-w-7xl mx-auto gap-8 lg:gap-12 relative">
        {/* Decorative circles */}
        <div className="hidden lg:block absolute top-10 right-1/3 w-16 h-16 lg:w-24 lg:h-24 rounded-full bg-orange-100 opacity-50"></div>
        <div className="hidden lg:block absolute bottom-10 right-10 w-20 h-20 lg:w-32 lg:h-32 rounded-full bg-orange-50 opacity-40"></div>
        <div className="hidden lg:block absolute top-1/3 right-1/4 w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-blue-100 opacity-40"></div>

        {/* Left Section - Form */}
        <div className="flex-1 z-10 w-full lg:w-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 lg:mb-12 text-center lg:text-left" style={{ color: "#1a1a4d" }}>
            Let's get in touch
          </h1>

          {/* Status Message Display */}
          {submitMessage.text && (
            <div className={`mb-6 p-4 rounded ${submitMessage.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
              {submitMessage.text}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 w-full max-w-md mx-auto lg:mx-0">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "#1a1a4d" }}>
                Full Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Jonathan Hunter"
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-sm sm:text-base"
                disabled={isSubmitting}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "#1a1a4d" }}>
                Email id<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Jonathan_Hunter@coy.org"
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-sm sm:text-base"
                disabled={isSubmitting}
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "#1a1a4d" }}>
                Subject
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-sm sm:text-base"
                disabled={isSubmitting}
              >
                <option>Select a subject</option>
                <option>General Inquiry</option>
                <option>Support</option>
                <option>Other</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "#1a1a4d" }}>
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your message here"
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white resize-none text-sm sm:text-base"
                disabled={isSubmitting}
              ></textarea>
            </div>

            {/* Send Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-indigo-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded font-semibold hover:bg-indigo-800 flex items-center justify-center gap-2 w-full sm:w-auto text-sm sm:text-base disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send'}
              {!isSubmitting && <span className="text-lg">→</span>}
            </button>
          </form>
        </div>

        {/* Right Section - Illustration */}
        <div className="flex-1 flex items-center justify-center w-full lg:w-auto mt-8 lg:mt-0">
          <img 
            src={ContactImage} 
            alt="Contact illustration" 
            className="w-full max-w-sm sm:max-w-md lg:max-w-xl" 
          />
        </div>
      </div>
      
      {/* Trusted By Section */}
      <LandingFooter/>

    </div>
  );
}