import React, { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import Logo from "../assest/l2.svg";

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
    <section className="relative flex flex-col items-center justify-center text-center px-6 min-h-[80vh] overflow-hidden py-10"> {/* ⬅ reduced height & padding */}
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fdf6f8] to-[#eef3fd] z-[-1]" />

      {/* Title */}
      <h1
        className={`text-lg md:text-xl px-4 font-semibold leading-snug text-blue-950 transition-opacity duration-1000 ease-in-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        At TACTOS, we safeguard startups and entrepreneurs from unreliable tech
        solution providers
      </h1>

      {/* Description */}
      <p
        className={`text-gray-700 mt-2 max-w-xl text-sm md:text-base transition-opacity duration-1000 ease-in-out delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        Acting as a trusted intermediary, we connect you with vetted and
        reliable tech partners. Just share your budget—we’ll ensure your project
        is delivered on time, within budget, and without compromise.
      </p>

      {/* Cards Section */}
      <div className="flex flex-wrap w-screen justify-center gap-6 mt-8">
        {[
          {
            title: "Mentorship",
            imgSrc:
              "https://c8.alamy.com/comp/2GGGE1A/business-online-training-seminar-or-courses-background-vector-illustration-mentor-doing-presentation-about-marketing-sales-report-e-commerce-2GGGE1A.jpg",
            alt: "Mentorship Icon",
          },
          {
            title: "Funding",
            imgSrc:
              "https://cdni.iconscout.com/illustration/premium/thumb/man-explaining-financial-doughnut-chart-calculations-illustration-download-in-svg-png-gif-file-formats--finance-growth-investment-business-persons-pack-illustrations-7342505.png",
            alt: "Funding Icon",
          },
          {
            title: "Business Consulting",
            imgSrc:
              "https://cdni.iconscout.com/illustration/premium/thumb/online-consultant-illustration-download-in-svg-png-gif-file-formats--financial-meeting-advice-pack-business-illustrations-4694342.png?f=webp",
            alt: "Consulting Icon",
          },
          {
            title: "Market Analysis",
            imgSrc:
              "https://cdni.iconscout.com/illustration/premium/thumb/market-research-and-analysis-illustration-download-in-svg-png-gif-file-formats--analytics-logo-graph-pack-business-illustrations-7249462.png?f=webp",
            alt: "Market Analysis Icon",
          },

          {
            title: "Incubation",
            imgSrc:
              "https://static.vecteezy.com/system/resources/previews/011/466/556/non_2x/strategic-planning-illustration-concept-a-flat-illustration-isolated-on-white-background-vector.jpg",
            alt: "Planning Icon",
          },
          {
            title: "IT Solutions",
            imgSrc:
              "https://static.vecteezy.com/system/resources/previews/011/466/556/non_2x/strategic-planning-illustration-concept-a-flat-illustration-isolated-on-white-background-vector.jpg",
            alt: "Planning Icon",
          },
          {
            title: "Auxiliation",
            imgSrc:
              "https://static.vecteezy.com/system/resources/previews/011/466/556/non_2x/strategic-planning-illustration-concept-a-flat-illustration-isolated-on-white-background-vector.jpg",
            alt: "Planning Icon",
          },
        ].map((card, index) => (
          <div
            key={index}
            className="group relative flex flex-col items-center bg-white p-2 rounded-md hover:shadow-2xl shadow-md w-24 sm:w-24 hover:scale-105 transition-all duration-300"
          >
            <span className="absolute bottom-0 left-0 w-0.5 h-0 bg-gradient-to-t from-blue-500 via-pink-500 to-purple-500 transition-all duration-300 group-hover:h-full"></span>
            <span className="absolute top-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 transition-all duration-300 delay-100 group-hover:w-full"></span>
            <span className="absolute top-0 right-0 w-0.5 h-0 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 transition-all duration-300 delay-200 group-hover:h-full"></span>
            <img
              src={card.imgSrc}
              alt={card.alt}
              className="w-14 h-14 mb-2 rounded-lg hover:scale-90 duration-300"
            />
            <p className="text-xs font-medium text-gray-800 text-center">
              {card.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
