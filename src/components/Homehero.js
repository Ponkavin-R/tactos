import React, { useState, useEffect } from "react";
import WL from "../assest/wl.png";
import Wr from "../assest/wr.png";
import { motion } from "framer-motion";
import "../App.css";

const HeroSection = () => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newScale = 1 + scrollY * 0.0005;
      setScale(newScale);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cards = [
    {
      title: "Mentorship",
      imgSrc:
        "https://c8.alamy.com/comp/2GGGE1A/business-online-training-seminar-or-courses-background-vector-illustration-mentor-doing-presentation-about-marketing-sales-report-e-commerce-2GGGE1A.jpg",
    },
    {
      title: "Funding Access",
      imgSrc:
        "https://cdni.iconscout.com/illustration/premium/thumb/man-explaining-financial-doughnut-chart-calculations-illustration-download-in-svg-png-gif-file-formats--finance-growth-investment-business-persons-pack-illustrations-7342505.png",
    },
    {
      title: "Incubation",
      imgSrc:
        "https://cdni.iconscout.com/illustration/premium/thumb/boy-is-explaining-business-incubation-center-illustration-download-in-svg-png-gif-file-formats--startup-support-mentorship-programs-ethics-laws-pack-illustrations-10269632.png",
    },
    {
      title: "Startup Validation",
      imgSrc:
        "https://cdni.iconscout.com/illustration/premium/thumb/online-consultant-illustration-download-in-svg-png-gif-file-formats--financial-meeting-advice-pack-business-illustrations-4694342.png?f=webp",
    },
    {
      title: "Network Connects",
      imgSrc:
        "https://cdni.iconscout.com/illustration/premium/thumb/market-research-and-analysis-illustration-download-in-svg-png-gif-file-formats--analytics-logo-graph-pack-business-illustrations-7249462.png?f=webp",
    },
    {
      title: "Job Portal Access",
      imgSrc:
        "https://cdni.iconscout.com/illustration/premium/thumb/advanced-ai-technology-with-human-interaction-illustration-download-in-svg-png-gif-file-formats--robotic-brain-digital-transformation-pack-science-illustrations-10841335.png?f=webp",
    },
    {
      title: "IT Solutions",
      imgSrc:
        "https://static.vecteezy.com/system/resources/previews/011/466/556/non_2x/strategic-planning-illustration-concept-a-flat-illustration-isolated-on-white-background-vector.jpg",
    },
  ];

  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 min-h-screen pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#fdf6f8] to-[#eef3fd] z-[-2] pt-24" />

      {/* Left Wing */}
      <div
        className="wing left-wing"
        style={{
          backgroundImage: `url(${WL})`,
          transform: `scale(${scale})`,
        }}
      />

      {/* Right Wing */}
      <div
        className="wing right-wing"
        style={{
          backgroundImage: `url(${Wr})`,
          transform: `scale(${scale})`,
        }}
      />

      <h1
        className="relative text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-extrabold md:-mt-[193px] -mt-[113px] leading-tight mb-4 text-black"
        style={{
          textShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
        }}
      >
        <span className="relative z-10">
          Tactos — The World for Entrepreneurs
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/60 to-white/10 animate-metal-shine mix-blend-overlay pointer-events-none" />
      </h1>

      <div className="mt-4 flex flex-wrap justify-center gap-2 text-base sm:text-lg max-w-3xl text-center">
        {[
          { text: "Empowering Innovation,", color: "text-blue-600" },
          { text: "Building Startup Ecosystem,", color: "text-pink-600" },
          { text: "Safeguarding Startups", color: "text-purple-600" },
        ].map((item, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.2, duration: 0.6 }}
            className={`${item.color} font-semibold`}
          >
            {item.text}
          </motion.span>
        ))}
      </div>

{/* Cards positioned over wings */}
<div className="cards-container flex flex-wrap justify-center gap-6">
  {cards.map((card, index) => (
    <div
      key={index}
      className="group relative custom-card bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Gradient border animation */}
      <span className="absolute bottom-0 left-0 w-0.5 h-0 bg-gradient-to-t from-blue-500 via-pink-500 to-purple-500 transition-all duration-300 group-hover:h-full z-10" />
      <span className="absolute top-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 transition-all duration-300 delay-100 group-hover:w-full z-10" />
      <span className="absolute top-0 right-0 w-0.5 h-0 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 transition-all duration-300 delay-200 group-hover:h-full z-10" />

      {/* Card Content */}
      <div className="z-20 flex flex-col items-center justify-center">
        <img
          src={card.imgSrc}
          alt={card.title}
          className="w-12 h-12 mb-2 rounded-full object-cover hover:scale-90 transition-transform duration-300"
        />
        <p className="text-xs sm:text-sm font-medium text-gray-800 text-center px-1">
          {card.title}
        </p>
      </div>
    </div>
  ))}
</div>

    </section>
  );
};

export default HeroSection;
