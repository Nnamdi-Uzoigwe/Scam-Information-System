import React from "react";

const HeroSection = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center p-5">
        <h1 className="text-[30px] lg:text-[40px] font-bold text-[#0F766E]">Contact Us</h1>
        <p className="text-lg lg:text-2xl text-gray-500 w-full lg:w-[60%] text-center">
          <b>Were you wrongly accused by someone</b> or you want to make enquiries? 
          Just leave us a message and you will be responded to in no time!
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
