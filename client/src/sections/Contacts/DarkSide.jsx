import React, { useState } from "react";
import { MdPhoneInTalk, MdMail } from "react-icons/md";
import { TiLocation } from "react-icons/ti";
import { FaInstagram, FaGithubAlt, FaCheckCircle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { toast } from "react-toastify";

const DarkSide = () => {
  const [selectChecked, setSelectChecked] = useState("");
  const [status, setStatus] = useState ("")
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("https://formspree.io/f/mjkwynzr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Message Sent!");
        toast.success('Message sent!', {
          position: "top-center",
          autoClose: 2000,
        })
        setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
      } else {
        setStatus("Something went wrong!");
        toast.error('Something went wrong!', {
          position: "top-center",
          autoClose: 2000,
        })
      }
    } catch (error) {
      setStatus("Failed to send message!");
      toast.error('Failed to send message!', {
        position: "top-center",
        autoClose: 2000,
      })
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 p-4 lg:p-10">
      {/* Left Section */}
      <div className="relative overflow-hidden bg-black w-full lg:w-[500px] text-white rounded-2xl p-6 flex flex-col">
        <h1 className="text-2xl font-semibold">Contact Information</h1>

        <div className="mt-10 flex flex-col gap-8">
          <p className="flex items-center gap-5">
            <MdPhoneInTalk size={23} />
            <span>+234 004 346 4089</span>
          </p>

          <p className="flex items-center gap-5">
            <MdMail size={23} />
            <span>help@cliffordreporters.com</span>
          </p>

          <p className="flex items-start gap-5">
            <TiLocation size={23} />
            <span>
              123 Main Ave, Cyber City, <br />
              Calabar, Nigeria.
            </span>
          </p>
        </div>

        <div className='absolute w-36 h-36 bg-green-900 rounded-full top-[470px] right-20 hidden md:block'></div>
        <div className='absolute w-[269px] h-[269px] bg-green-950 rounded-full top-[470px] right-[-60px] hidden md:block'></div>

        <div className='mt-46 flex gap-4'>
        <div className='mt-10 flex justify-center md:justify-start gap-4'>
          <div className='h-12 w-12 bg-[#1B1B1B] hover:bg-gray-600 rounded-full flex items-center justify-center'>
            <FaXTwitter size={20} />
          </div>
          <div className="h-12 w-12 bg-[#1B1B1B] hover:bg-red-400 rounded-full flex items-center justify-center">
            <FaInstagram size={20} />
          </div>
          <div className="h-12 w-12 bg-[#1B1B1B] hover:bg-blue-300 rounded-full flex items-center justify-center">
            <FaGithubAlt size={20} />
          </div>
        </div>
      </div>

    </div>
      {/* Right Section */}
      <div className=" w-full bg-white rounded-2xl p-4">
        
        <form id="Get in Touch">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="font-semibold">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              className="outline-none w-full py-3 border-b-2 border-gray-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              className="outline-none w-full py-3 border-b-2 border-gray-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="outline-none w-full py-3 border-b-2 border-gray-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="outline-none w-full py-3 border-b-2 border-gray-500"
            />
          </div>
          </div>

          {/* Subject Selection */}
          <div className="flex flex-col gap-3 mt-8">
            <h1 className="text-lg font-semibold">Select Subject?</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {[
                "General Inquiry",
              "Partnership Request",
              "Support",
              "Feedback",
            ].map((label, index) => (
              <div className="flex items-center gap-3" key={index}>
                <FaCheckCircle
                  onClick={() => setSelectChecked(index.toString())}
                  size={20}
                  className={`cursor-pointer ${
                    selectChecked === index.toString()
                      ? "text-black"
                      : "text-gray-300"
                  }`}
                />
                <input 
                  type="radio" 
                  name="subject" 
                  value={label}
                  checked={selectChecked === index.toString()}
                  onChange={() => setSelectChecked(index.toString())}
                  className="hidden"
                />
                <span>{label}</span>
              </div>
            ))}
            </div>

            <textarea
              name="message"
              placeholder="Write your message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className="mt-4 p-3 border-2 border-gray-400 rounded-md outline-none resize-none"
              required
            />

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full md:w-[214px] h-[54px] bg-[#0F766E] rounded-md text-white font-semibold self-end mt-4 transition duration-200 transform hover:scale-105"
          >
            Send Message
          </button>
          </div>
        </form>

        {status && <p className="mt-4 text-2xl text-gray-600">{status}</p>  }

      </div>
    </div>
  );
};

export default DarkSide;
