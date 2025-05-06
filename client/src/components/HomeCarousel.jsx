// CardCarousel.jsx
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import '../App.css'
import Button from './Button';
import { Link } from 'react-router-dom';

const cards = [
  
  {
    id: 1,
    scammerName: 'John D.',
    scamType: 'Email Fraud',
    dateReported: "Apr 10, 2025",
    description: "Received an email appearing to be from my bank, requesting immediate verification of account details due to a supposed security breach. The email contained a link to a fake website designed to capture personal information."
  },
  {
    id: 2,
    scammerName: 'Favour E.',
    scamType: 'Fake Celebrity',
    dateReported: "Dec 12, 2024",
    description: "Encountered a social media profile impersonating actor Will Smith, promoting a fraudulent investment scheme promising high returns. The scammer used doctored images and fake testimonials to appear legitimate."
  },
  {
    id: 3,
    scammerName: 'Regina H.',
    scamType: 'Phone Scam',
    dateReported: "Sep 04, 2023",
    description: "Received a call from someone claiming to be a bank representative, stating there was suspicious activity on my account. They requested my OTP to 'secure' the account, which was then used to authorize unauthorized transactions."
  },
  {
    id: 4,
    scammerName: 'Taiwo U.',
    scamType: 'Phishing Link',
    dateReported: "Aug 23, 2024",
    description: "Got an email that seemed to be from a well-known online retailer, offering a special discount. Clicking the link led to a counterfeit site that mimicked the retailer's login page, aiming to steal my credentials."
  },
];


const HomeCarousel = () => {

  const [reports, setReports] = useState([])
  
  useEffect(()=>{
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://scam-information-system.onrender.com/api/scam-reports/my-reports', {
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
                        <div className="text-sm text-gray-500 mb-1">{report.dateReported}</div>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                          Name of Scammer: {report.scammerName}
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
