
import { useEffect, useState } from "react";
import LoadingState from "../../components/LoadingState";

export default function HomeCarousel() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const token = sessionStorage.getItem('authToken');
        const response = await fetch('https://scam-information-system.onrender.com/api/testimonial', {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch testimonials');
        }

        const data = await response.json();
        setTestimonials(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch testimonials');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);
  
  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          What Our Users Are Saying
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingState />
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">
            {error}
          </div>
        ) : testimonials.length > 0 ? (
          <>
            {/* Top 2 Testimonials */}
            <div className="flex flex-col md:flex-row gap-6 mb-10">
              {testimonials.slice(0, 2).map((testimonial, index) => (
                <div
                  key={`top-${index}`}
                  className={`flex-1 p-6 rounded-xl shadow-md transition-all hover:shadow-lg ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                  }`}
                >
                  <p className="text-gray-700 mb-4 italic">"{testimonial.message}"</p>
                  <p className="font-semibold text-[#0F766E]">— {testimonial.name}</p>
                </div>
              ))}
            </div>

            {/* Bottom 3 Testimonials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {testimonials.slice(2, 6).map((testimonial, index) => (
                <div
                  key={`bottom-${index}`}
                  className={`p-5 rounded-xl shadow transition-all hover:shadow-lg ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                  }`}
                >
                  <p className="text-gray-700 mb-3 italic">"{testimonial.message}"</p>
                  <p className="font-semibold text-[#0F766E]">— {testimonial.name}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-10 text-gray-500">
            No testimonials available yet.
          </div>
        )}
      </div>
    </section>
  );
}