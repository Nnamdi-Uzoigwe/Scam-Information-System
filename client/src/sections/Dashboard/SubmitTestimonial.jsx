
import { useState } from 'react';
import { FaBars, FaPaperPlane } from 'react-icons/fa';
import Sidebar from '../../components/Sidebar'; // Adjust path as needed

export default function SubmitTestimonial() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');
      setSuccess(false);
  
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('You must be logged in to submit a testimonial');
        }
  
        const response = await fetch('https://scam-information-system.onrender.com/api/testimonials', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to submit testimonial');
        }
  
        setSuccess(true);
        setFormData({ name: '', message: '' });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block w-64 fixed lg:relative z-50`}>
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Main content container */}
      <div className="flex flex-col flex-1">
        {/* Mobile Topbar */}
        <div className="lg:hidden w-full bg-[#063F3A]">
          <button
            className="cursor-pointer p-4 text-2xl text-white"
            onClick={toggleSidebar}
          >
            <FaBars />
          </button>
        </div>

        {/* Testimonial Form */}
        <div className="max-w-2xl mx-auto p-6 w-full">
          <h1 className="text-2xl font-bold text-[#0F766E] mb-6">Share Your Experience</h1>
          
          {success && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
              Thank you for your testimonial! It has been submitted successfully.
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0F766E] focus:border-[#0F766E]"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Your Testimonial
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0F766E] focus:border-[#0F766E]"
                placeholder="Share your experience with our service..."
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center px-6 py-2 bg-[#0F766E] text-white rounded-md hover:bg-[#0d625b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0F766E] disabled:opacity-50"
              >
                {loading ? (
                  'Submitting...'
                ) : (
                  <>
                    <FaPaperPlane className="mr-2" />
                    Submit Testimonial
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}