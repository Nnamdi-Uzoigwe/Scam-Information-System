
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import '../App.css';
import Button from './Button';
import { Link } from 'react-router-dom';

const HomeCarousel = () => {
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const token = sessionStorage.getItem('authToken');
        const response = await fetch('https://scam-information-system.onrender.com/api/scam-reports/', {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch reports');
        }

        const data = await response.json();
        setReports(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch reports');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <Swiper
        modules={[Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        className="h-auto" // Remove fixed height
      >
        {loading ? (
          <SwiperSlide>
            <div className="rounded-2xl bg-[#fcfbf9] p-6 text-center">
              <p>Loading reports...</p>
            </div>
          </SwiperSlide>
        ) : error ? (
          <SwiperSlide>
            <div className="rounded-2xl bg-[#fcfbf9] p-6 text-center">
              <p className="text-red-500">{error}</p>
            </div>
          </SwiperSlide>
        ) : reports.length > 0 ? (
          reports.slice(0, 4).map((report) => (
            <SwiperSlide key={report._id}>
              <div className="rounded-2xl bg-[#fcfbf9] p-6 h-auto min-h-[300px] flex flex-col">
                <div className="flex flex-col justify-center items-center">
                  <div className="text-sm text-gray-500 mb-1">
                    {report.dateReported.split('T')[0]}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Alleged Fraudster: {report.scammerName}
                  </h3>
                  <span className="inline-block bg-red-100 text-red-600 text-xs font-medium px-3 py-1 w-fit rounded-full mb-4">
                    {report.scamType}
                  </span>
                  <p className="text-gray-700 text-sm line-clamp-3">
                    {report.description}
                  </p>
                </div>
                <div className="mt-4 flex justify-center my-0 lg:my-8">
                  <Button className="w-full sm:w-auto">
                    <Link to={`/scam/${report.caseId}`}>View Full Report</Link>
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className="rounded-2xl bg-[#fcfbf9] p-6 text-center">
              <p>No reports found</p>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default HomeCarousel;
