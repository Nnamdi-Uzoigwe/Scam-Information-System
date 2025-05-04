import React, { useState } from 'react'
import { MdPhoneInTalk, MdMail } from "react-icons/md";
import { TiLocation } from "react-icons/ti";
import { FaInstagram, FaGithubAlt, FaCheckCircle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const DarkSide = () => {
  const [selectChecked, setSelectChecked] = useState("");

  return (
    <div className='flex flex-col lg:flex-row gap-10 p-4 lg:p-10'>
      
      {/* Left Section */}
      <div className='relative overflow-hidden bg-black w-full lg:w-[500px] text-white rounded-2xl p-6 flex flex-col'>
        <h1 className='text-2xl font-semibold'>Contact Information</h1>

        <div className='mt-10 flex flex-col gap-8'>
          <p className='flex items-center gap-5'>
            <MdPhoneInTalk size={23} />
            <span>+234 004 346 4089</span>
          </p>

          <p className='flex items-center gap-5'>
            <MdMail size={23} />
            <span>help@cliffordreporters.com</span>
          </p>

          <p className='flex items-start gap-5'>
            <TiLocation size={23} />
            <span>123 Main Ave, Cyber City, <br />Calabar, Nigeria.</span>
          </p>
        </div>

        <div className='absolute w-36 h-36 bg-green-900 rounded-full top-[470px] right-20 hidden md:block'></div>
        <div className='absolute w-[269px] h-[269px] bg-green-950 rounded-full top-[470px] right-[-60px] hidden md:block'></div>

        <div className='mt-12 flex gap-4'>
          <div className='h-12 w-12 bg-[#1B1B1B] hover:bg-gray-600 rounded-full flex items-center justify-center'>
            <FaXTwitter size={20} />
          </div>
          <div className='h-12 w-12 bg-[#1B1B1B] hover:bg-red-400 rounded-full flex items-center justify-center'>
            <FaInstagram size={20} />
          </div>
          <div className='h-12 w-12 bg-[#1B1B1B] hover:bg-blue-300 rounded-full flex items-center justify-center'>
            <FaGithubAlt size={20} />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className='w-full bg-white rounded-2xl p-4'>
        
        {/* Name Inputs */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='flex flex-col'>
            <label className='font-semibold'>First Name</label>
            <input type="text" placeholder='Enter first name' className='outline-none w-full py-3 border-b-2 border-gray-500' />
          </div>

          <div className='flex flex-col'>
            <label className='font-semibold'>Last Name</label>
            <input type="text" placeholder='Enter last name' className='outline-none w-full py-3 border-b-2 border-gray-500' />
          </div>

          <div className='flex flex-col'>
            <label className='font-semibold'>Email</label>
            <input type="email" placeholder='Enter your email' className='outline-none w-full py-3 border-b-2 border-gray-500' />
          </div>

          <div className='flex flex-col'>
            <label className='font-semibold'>Phone Number</label>
            <input type="tel" placeholder='Enter phone number' className='outline-none w-full py-3 border-b-2 border-gray-500' />
          </div>
        </div>

        {/* Subject Selection */}
        <div className='flex flex-col gap-3 mt-8'>
          <h1 className='text-lg font-semibold'>Select Subject?</h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4'>

            {["General Inquiry", "Partnership Request", "Support", "Feedback"].map((label, index) => (
              <div className='flex items-center gap-3' key={index}>
                <FaCheckCircle
                  onClick={() => setSelectChecked(index.toString())}
                  size={20}
                  className={`cursor-pointer ${selectChecked === index.toString() ? "text-black" : "text-gray-300"}`}
                />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <textarea
            placeholder='Write your message'
            rows={6}
            className='mt-4 p-3 border-2 border-gray-400 rounded-md outline-none resize-none'
          />

          <button className='w-full md:w-[214px] h-[54px] bg-[#0F766E] rounded-md text-white font-semibold self-end mt-4 transition duration-200 transform hover:scale-105'>
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default DarkSide;
