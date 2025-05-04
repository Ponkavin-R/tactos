import React, { useState, useEffect } from "react";
import WL from "../assest/wl.png";
import Wr from "../assest/wr.png";

const HeroSection = () => {
  const [scale, setScale] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newScale = 1 + scrollY * 0.0005;
      setScale(newScale);
    };

    const handleVisibility = () => {
      if (window.scrollY < 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleVisibility);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleVisibility);
    };
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 min-h-screen py-10">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fdf6f8] to-[#eef3fd] z-[-2]" />

      {/* Left Wing */}
      <div
        className="absolute -left-10 top-0 w-[10vw] md:w-[10vw] lg:w-[40vw] h-full bg-cover bg-no-repeat bg-left z-[-1] hidden md:block opacity-75"
        style={{
          backgroundImage: `url(${WL})`,
          transform: `scale(${scale})`,
          transition: "transform 0.2s ease-out",
        }}
      />

      {/* Right Wing */}
      <div
        className="absolute -right-10 -top-16 w-[10vw] md:w-[10vw] lg:w-[40vw] h-full bg-cover bg-no-repeat bg-right z-[-1] hidden md:block opacity-75"
        style={{
          backgroundImage: `url(${Wr})`,
          transform: `scale(${scale})`,
          transition: "transform 0.2s ease-out",
        }}
      />

      {/* Heading */}
      <h1
  className="relative text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-extrabold md:-mt-48 -mt-28 leading-tight mb-4 text-black"
  style={{
    textShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
    position: "relative",
    overflow: "hidden",
  }}
>
  <span className="relative z-10">Tactos — The World for Entrepreneurs</span>
  <span className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/60 to-white/10 animate-metal-shine mix-blend-overlay pointer-events-none" />
</h1>



      {/* Description */}
      <p className="text-gray-600 mt-2 max-w-2xl text-base sm:text-lg transition-opacity duration-1000 ease-in-out delay-300">
        Acting as a Trusted Intermediary — Empowering Ideas and Navigating Risks, Safeguarding Entrepreneurs Every Step of the Way.
      </p>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-6 mt-10 w-full px-2 sm:px-4">
        {[
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
            title: "Network Connects ",
            imgSrc:
              "https://cdni.iconscout.com/illustration/premium/thumb/market-research-and-analysis-illustration-download-in-svg-png-gif-file-formats--analytics-logo-graph-pack-business-illustrations-7249462.png?f=webp",
          },
          {
            title: "Job Portal Access ",
            imgSrc:
              "https://cdni.iconscout.com/illustration/premium/thumb/advanced-ai-technology-with-human-interaction-illustration-download-in-svg-png-gif-file-formats--robotic-brain-digital-transformation-pack-science-illustrations-10841335.png?f=webp",
          },
          {
            title: "IT Solutions",
            imgSrc:
              "https://static.vecteezy.com/system/resources/previews/011/466/556/non_2x/strategic-planning-illustration-concept-a-flat-illustration-isolated-on-white-background-vector.jpg",
          },
        ].map((card, index) => (
          <div
            key={index}
            className="group relative flex flex-col items-center bg-white p-4 rounded-xl hover:shadow-2xl shadow-md transition-all duration-300 w-[100px] sm:w-[100px] md:w-[90px] lg:w-[100px] lg:mt-4 h-auto"
          >
            {/* Gradient border animation */}
            <span className="absolute bottom-0 left-0 w-0.5 h-0 bg-gradient-to-t from-blue-500 via-pink-500 to-purple-500 transition-all duration-300 group-hover:h-full"></span>
            <span className="absolute top-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 transition-all duration-300 delay-100 group-hover:w-full"></span>
            <span className="absolute top-0 right-0 w-0.5 h-0 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 transition-all duration-300 delay-200 group-hover:h-full"></span>

            <img
              src={card.imgSrc}
              alt={card.title}
              className="w-14 h-14 mb-3 rounded-lg hover:scale-90 transition-transform duration-300"
            />
            <p className="text-sm font-medium text-gray-800 text-center">
              {card.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
