import React from "react";

const HeroPage = () => {
  return (
    <div className="bg-slate-50">
      {/* Hero Image and Heading */}
      <div className="relative w-full">
        <img
          src="/aboutHero.jpg"
          alt="Hero"
          className="w-full h-[300px] md:h-[450px] lg:h-[500px] object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-snug">
            LEARN <span className="text-[#ea580c]">MORE ABOUT</span> US, OUR 
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-[#0F766E] mt-6">
              <span className="text-[#ea580c]"> MISSION & OUR</span> GOALS!!!
          </h2>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 p-4 md:p-10 justify-items-center">
        {/* About Us */}
        <div className="bg-white shadow-md w-full h-[250px] flex flex-col justify-center items-center rounded-md p-5 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F766E] mb-2">About Us</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            The Scam Information System raises awareness and helps prevent fraud
            through scam alerts, user reports, and education. It empowers individuals
            to report scams and stay protected from threats like phishing and identity theft.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white shadow-md w-full h-[250px] flex flex-col justify-center items-center rounded-md p-5 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F766E] mb-2">🎯 Our Mission</h2>
          <p className="text-gray-700 text-sm sm:text-base">
            Our mission is to protect people from scams by offering up-to-date info and
            tools to recognize and report fraud. We promote a safer society through
            education and community support.
          </p>
        </div>

        {/* Goals */}
        <div className="bg-white shadow-md w-full h-[250px] flex flex-col justify-center items-center rounded-md p-5 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F766E] mb-2">🎯 Our Goals</h2>
          <p className="text-gray-700 text-sm sm:text-base">
            We aim to educate the public on common scams and create a space for sharing
            experiences and reporting incidents—fostering an informed, vigilant community.
          </p>
        </div>

        {/* How It Works */}
        <div className="bg-white shadow-md w-full h-[250px] flex flex-col justify-center items-center rounded-md p-5 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F766E] mb-2">⚙️ How the System Works</h2>
          <p className="text-gray-700 text-sm sm:text-base">
            The system gathers scam data from users and trusted sources. It categorizes
            and shares updates in real-time, allowing users to report, search, and stay alert.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
