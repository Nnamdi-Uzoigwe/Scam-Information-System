import React from 'react'
import { BsPeopleFill } from "react-icons/bs";

const TeamPage = () => {

  const myArr = [
    {
      id: 1,
      image: "/Honorable.jpeg",
      name: "Ofana Oboh",
      Title: "MERN Stack Developer, Algorithm, Data Structure",
    },
    {
      id: 2,
      image: "/burnbi.jpeg",
      name: "Onye Emmanuel",
      Title: "MERN Stack Developer, Algorithm, Data Structure",
    },
    {
      id: 3,
      image: "/Passport photo.jpeg",
      name: "Nnamdi Uzoigwe",
      Title: "MERN Stack Developer, Algorithm, Data Structure",
    },
    {
      id: 4,
      image: "/STANLEYimg.jpeg",
      name: "Arikpo Stanley",
      Title: "Full Stack Developer, Algorithm, Data Structure",
    },
    {
      id: 5,
      image: "/Passport photo.jpeg",
      name: "Oboh Thankgod",
      Title: "Frontend Developer, Algorithm, Data Structure",
    },
    {
      id: 6,
      image: "/burnbi.jpeg",
      name: "K. Emmanuel",
      Title: "MERN Stack Developer, Algorithm, Data Structure",
    },
  ];

  return (
    <div className='bg-slate-50 px-4 md:px-10 xl:px-20 overflow-hidden border-t-[1.5px] border-gray-200 mb-10'>
      {/* Title */}
      <div className='flex justify-center py-6'>
        <h2 className='flex items-center gap-3 font-bold text-3xl sm:text-4xl text-[#0F766E] text-center'>
          <BsPeopleFill className='text-[#EA580C]' />
          Meet the Team
        </h2>
      </div>

      {/* Team Cards Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 p-4'>
        {myArr.map((item, index) => (
          <div
            key={index}
            className='bg-white flex items-start gap-4 rounded-lg shadow-md p-4 w-full max-w-sm mx-auto'
          >
            <img
              src={item.image}
              alt={item.name}
              className='h-16 w-16 object-cover rounded-full border-2 border-[#0F766E]'
            />
            <div>
              <h1 className='text-xl font-bold text-[#0F766E]'>{item.name}</h1>
              <h3 className='text-gray-600 text-sm'>{item.Title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      
    </div>
  );
};

export default TeamPage;
