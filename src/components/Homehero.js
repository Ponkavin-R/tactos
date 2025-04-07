import React, { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import Logo from "../assest/l2.svg"
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

  return (
    <section className="relative flex flex-col items-center justify-center text-center py-16 px-6 bg-gradient-to-b from-[#fdf6f8] to-[#eef3fd] min-h-screen">
      {/* Sponsor Section */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex gap-4">
        <div className="bg-white px-6 py-3 rounded-xl shadow-lg text-sm font-semibold text-gray-700 border border-gray-200">
          Tactos <br /> <span className="font-bold text-gray-900">Content 1</span>
        </div>
        <div className="bg-white px-6 py-3 rounded-xl shadow-lg text-sm font-semibold text-gray-700 border border-gray-200">
          Tactos <br /> <span className="font-bold text-gray-900">content 2</span>
        </div>
        <div className="bg-white px-6 py-3 rounded-xl shadow-lg text-sm font-semibold text-gray-700 border border-gray-200">
          Tactos <br /> <span className="font-bold text-gray-900">Content 3</span>
        </div>
      </div>

      {/* Show Details 
      <p className="text-gray-600 text-lg mt-10">
        Catch the excitement <span className="font-bold text-blue-600">10:00 AM - 12:00 PM</span>
      </p>*/}
{/* <p className="text-gray-600 text-lg">
        Every <span className="font-bold text-orange-500">Monday & Wednesday</span> on <span className="text-red-500 font-bold">YouTube</span> & <span className="text-purple-500 font-bold">Zoom</span>
      </p> */}

      {/* Title */}
      <h1 className="text-5xl md:text-6xl font-bold mt-6 leading-tight text-blue-950">
        Empowering Students & Businesses <br />
        <span className="text-blue-800">Through Strategic Solutions</span>
      </h1>

      {/* Description */}
      <p className="text-gray-700 mt-6 max-w-2xl text-lg">
        At Tactos Strategic Solutions, we mentor Tier 3 students from ideation to successful exit and help businesses navigate challenges, optimize operations, and achieve strategic goals.
      </p>

      {/* Watch Button */}
      {/* <button className="mt-8 bg-black text-white px-8 py-4 rounded-full flex items-center gap-3 shadow-xl hover:bg-gray-900 transition-all text-lg font-semibold">
        <FaPlay className="text-red-500" /> Watch the Latest Episodes
      </button> */}

      {/* Cards Section */}
      <div className="flex flex-wrap justify-center gap-6 mt-10">
        {[
          { title: 'Mentorship', imgSrc: 'https://c8.alamy.com/comp/2GGGE1A/business-online-training-seminar-or-courses-background-vector-illustration-mentor-doing-presentation-about-marketing-sales-report-e-commerce-2GGGE1A.jpg', alt: 'Mentorship Icon' },
          { title: 'Funding', imgSrc: 'https://cdni.iconscout.com/illustration/premium/thumb/man-explaining-financial-doughnut-chart-calculations-illustration-download-in-svg-png-gif-file-formats--finance-growth-investment-business-persons-pack-illustrations-7342505.png', alt: 'Funding Icon' },
          { title: 'Business Consulting', imgSrc: 'https://cdni.iconscout.com/illustration/premium/thumb/online-consultant-illustration-download-in-svg-png-gif-file-formats--financial-meeting-advice-pack-business-illustrations-4694342.png?f=webp', alt: 'Consulting Icon' },
          { title: 'Market Analysis', imgSrc: 'https://cdni.iconscout.com/illustration/premium/thumb/market-research-and-analysis-illustration-download-in-svg-png-gif-file-formats--analytics-logo-graph-pack-business-illustrations-7249462.png?f=webp', alt: 'Market Analysis Icon' },
          { title: 'Operational Efficiency', imgSrc: 'https://cdni.iconscout.com/illustration/premium/thumb/portfolio-showcase-illustration-download-in-svg-png-gif-file-formats--professional-personal-branding-career-pack-business-illustrations-9909934.png', alt: 'Efficiency Icon' },
          { title: 'Strategic Planning', imgSrc: 'https://static.vecteezy.com/system/resources/previews/011/466/556/non_2x/strategic-planning-illustration-concept-a-flat-illustration-isolated-on-white-background-vector.jpg', alt: 'Planning Icon' }
        ].map((card, index) => (
          <div key={index} className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md w-40 ">
            <img src={card.imgSrc} alt={card.alt} className="w-20 h-20 mb-3 rounded-lg hover:scale-90 duration-300" />
            <p className="text-sm font-semibold text-gray-800">{card.title}</p>
          </div>
        ))}
      </div>

      

      {/* Scroll Zoom Image */}
      <div className="flex justify-center mt-20">
        <img 
          src={Logo}
          alt="Zooming Image" 
          className="transition-transform duration-300" 
          style={{ transform: `scale(${scale})`, maxWidth: "80%" }}
        />
      </div>
    </section>
  );
};

export default HeroSection;
