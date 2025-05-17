import React, { useState, useEffect } from "react";
import axios from "axios";

const Investors = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getTypeColor = (type) => {
    const colors = {
      "Our Partner": "bg-blue-500",
      "Our Investor": "bg-green-500",
      "Key Partner": "bg-purple-500",
    };
    return colors[type] || "bg-gray-500";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/ourinvestors`);
        setTestimonials(res.data);
        setIsLoaded(true); // set this once data is fetched
      } catch (err) {
        console.error("Failed to fetch investors:", err);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="py-12 bg-gray-100 overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 text-center mb-4 sm:mb-6">
          Our Network
        </h2>
        <p className="text-sm sm:text-base text-center text-gray-600 mb-8 sm:mb-12">
          We proudly collaborate with industry leaders, visionary investors, and strategic partners to accelerate growth and deliver impactful results.
        </p>

        <div className="relative w-full overflow-hidden">
          {isLoaded && testimonials.length > 0 && (
            <div className="infinite-carousel-container">
              <div className="infinite-carousel-track">
                {[...Array(8)].map((_, dupIndex) => (
                  testimonials.map((item, index) => (
                    <div key={`set${dupIndex}-${item.name}-${index}`} className="carousel-item">
                      <div className="w-48 h-48 rounded-lg bg-white shadow-md flex flex-col items-center justify-center p-4 cursor-pointer hover:shadow-lg transition-shadow">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getTypeColor(
                            item.type
                          )} text-white font-medium mb-2`}
                        >
                          {item.type}
                        </span>
                        <div className="w-24 h-24 rounded-full overflow-hidden mb-3 flex items-center justify-center border-2 border-gray-200">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <p className="text-center text-base font-medium text-gray-800">
                          {item.name}
                        </p>
                      </div>
                    </div>
                  ))
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .infinite-carousel-container {
          width: 100%;
          overflow: hidden;
          position: relative;
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }
        
        .infinite-carousel-track {
          display: flex;
          width: fit-content;
          transform: translateZ(0);
          will-change: transform;
          animation: scroll 25s linear infinite;
          backface-visibility: hidden;
          perspective: 1000px;
        }
        
        .carousel-item {
          flex-shrink: 0;
          padding: 0 1rem;
          width: 16rem;
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-16rem * ${testimonials.length}));
          }
        }
      `}</style>
    </div>
  );
};

export default Investors;
