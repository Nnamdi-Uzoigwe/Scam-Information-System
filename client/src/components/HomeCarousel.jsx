// CardCarousel.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const cards = [
  { id: 1, title: 'Card One', description: 'This is the first card' },
  { id: 2, title: 'Card Two', description: 'This is the second card' },
  { id: 3, title: 'Card Three', description: 'This is the third card' },
  { id: 4, title: 'Card Four', description: 'This is the fourth card' },
];

const HomeCarousel = () => {
  return (
    <div className="w-full max-w-4xl mx-auto py-10">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
      >
        {cards.map(card => (
          <SwiperSlide key={card.id}>
            <div className="bg-white rounded-2xl shadow-md p-6 h-48 flex flex-col justify-center items-center text-center">
              <h3 className="text-xl font-bold mb-2">{card.title}</h3>
              <p className="text-gray-600">{card.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeCarousel;
