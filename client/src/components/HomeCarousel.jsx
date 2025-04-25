// CardCarousel.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import '../App.css'
import Button from './Button';

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
  return (
    <div className="w-full max-w-4xl mx-auto py-10">
      <Swiper
        modules={[Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
          {cards.map((card) => (
            <SwiperSlide key={card.id}>
              <div className="rounded-2xl bg-[#fcfbf9] p-6 h-[300px] flex flex-col  items-center text-center">
                <div className="flex flex-col items-center text-center">
                  <div className="text-sm text-gray-500 mb-1">{card.dateReported}</div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">Name of Scammer: {card.scammerName}</h3>
                  <span className="inline-block bg-red-100 text-red-600 text-xs font-medium px-3 py-1 rounded-full mb-4">
                    {card.scamType}
                  </span>
                  <p className="text-gray-700 text-sm">{card.description}</p>
                </div>
                <div className="mt-6 pb-2 flex justify-center cursor-pointer">
                  <Button>
                    View Full Report
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
</div>
  );
};

export default HomeCarousel;
