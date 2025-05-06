// CardCarousel.jsx
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import '../App.css'
import Button from './Button';
import { Link } from 'react-router-dom';

const HomeCarousel = () => {
  const [loading, setLoading] = useState(false)
  const [reports, setReports] = useState([])
  const [error, setError] = useState("")
  
  useEffect(()=>{
    const fetchReports = async () => {
      try {
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
    <div className="w-full max-w-4xl mx-auto py-10">
      <Swiper
        modules={[Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
          {reports.map((report, index) => {
              if (index < 4) {
                return (
                  <SwiperSlide key={report._id || index}>
                    <div className="rounded-2xl bg-[#fcfbf9] p-6 h-auto flex flex-col items-center text-center">
                      <div className="flex flex-col items-center text-center">
                        <div className="text-sm text-gray-500 mb-1">{report.dateReported.split('T')[0]}</div>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                          Alleged Fraudster: {report.scammerName}
                        </h3>
                        <span className="inline-block bg-red-100 text-red-600 text-xs font-medium px-3 py-1 rounded-full mb-4">
                          {report.scamType}
                        </span>
                        <p className="text-gray-700 text-sm">{report.description}</p>
                      </div>
                      <div className="mt-4 mb-6 pb-2 flex justify-center cursor-pointer">
                      <Button> <Link to={`/scam/${report.caseId}`}>View Full Report</Link></Button>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              }
              return null;
            })}
        </Swiper>
</div>
  );
};

export default HomeCarousel;
