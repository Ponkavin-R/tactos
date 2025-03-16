import React, { useState } from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      title: 'Empowering Tier 3 Students',
      description: 'At Tactos Strategic Solutions, we mentor Tier 3 students from ideation to successful exit.',
      time: '10:00 AM - 11:00 AM',
      day: 'Monday',
      platform: 'YouTube',
      img: '/h1.webp',
      cards: [
        { title: 'Mentorship', imgSrc: 'https://via.placeholder.com/80', alt: 'Mentorship Icon' },
        { title: 'Funding', imgSrc: 'https://via.placeholder.com/80', alt: 'Funding Icon' },
        { title: 'Business Consulting', imgSrc: 'https://via.placeholder.com/80', alt: 'Consulting Icon' }
      ]
    },
    {
      title: 'Driving Sustainable Business Growth',
      description: 'We help businesses navigate challenges, optimize operations, and achieve strategic goals.',
      time: '11:00 AM - 12:00 PM',
      day: 'Wednesday',
      platform: 'Zoom',
      img: '/h2.svg',
      cards: [
        { title: 'Market Analysis', imgSrc: 'https://via.placeholder.com/80', alt: 'Market Analysis Icon' },
        { title: 'Operational Efficiency', imgSrc: 'https://via.placeholder.com/80', alt: 'Efficiency Icon' },
        { title: 'Strategic Planning', imgSrc: 'https://via.placeholder.com/80', alt: 'Planning Icon' }
      ]
    },
    {
      title: 'Building Resilient Businesses',
      description: 'We deliver high-impact strategies that drive business resilience and growth.',
      time: '1:00 PM - 2:00 PM',
      day: 'Friday',
      platform: 'Google Meet',
      img: '/h3.svg',
      cards: [
        { title: 'Business Resilience', imgSrc: 'https://via.placeholder.com/80', alt: 'Resilience Icon' },
        { title: 'Strategic Growth', imgSrc: 'https://via.placeholder.com/80', alt: 'Growth Icon' },
        { title: 'Future Readiness', imgSrc: 'https://via.placeholder.com/80', alt: 'Readiness Icon' }
      ]
    }
  ];

  const handleNext = () => setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 py-6">
      <div className="container mx-auto text-center">
        <div className="overflow-hidden relative w-full">
          <div className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {slides.map((slide, index) => (
              <div key={index} className="w-full flex-shrink-0 px-6">
                <h1 className="text-5xl font-bold text-blue-950">{slide.title}</h1>
                <div className="mt-6 flex justify-center gap-6 overflow-x-auto">
                  {slide.cards.map((card, i) => (
                    <motion.div key={i}
                      className="bg-white shadow-md rounded-xl p-4 w-52 transform transition-all hover:scale-105"
                      whileHover={{ scale: 1.1 }}>
                      <h5 className="text-gray-600 text-sm text-center">{card.title}</h5>
                      <img src={card.imgSrc} alt={card.alt}
                        className="mx-auto my-2 rounded-full h-20 w-20 shadow-lg"/>
                    </motion.div>
                  ))}
                </div>
                <p className="text-gray-500 max-w-2xl mx-auto mt-4">{slide.description}</p>
                <p className="text-blue-950 text-sm mt-2">
                  Catch the insight at <span className="font-semibold">{slide.time}</span>
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Every <span className="font-semibold text-orange-500">{slide.day}</span> on
                  <span className="text-indigo-500"> {slide.platform}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <button onClick={handlePrev} className="text-blue-950 text-2xl">←</button>
          <button onClick={handleNext} className="text-blue-950 text-2xl">→</button>
        </div>
        <div className="flex justify-center  gap-2">
          {slides.map((_, index) => (
            <div key={index} className={`h-3 w-3 rounded-full transition-all ${index === currentIndex ? 'bg-blue-950 scale-125' : 'bg-gray-300'}`}/>
          ))}
        </div>
        <motion.img
          key={currentIndex}
          src={slides[currentIndex].img}
          alt="Slide Image"
          className="w-screen h-96 object-contain rounded-xl "
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </div>
  );
};

export default HeroSection;
