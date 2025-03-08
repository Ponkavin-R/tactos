import React, { useCallback, useRef } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const KeyPartners = () => {
  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const testimonials = [
    {
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      details: "A wonderful partner, always supporting our mission with great innovation.",
      name: "John Smith",
      position: "CEO, TechWave",
    },
    {
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      details: "Collaborating with this team has been a game changer for our business.",
      name: "Emily Johnson",
      position: "Co-founder, InnovateX",
    },
    {
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      details: "Top-tier service and commitment to excellence at every stage.",
      name: "Michael Lee",
      position: "Director, FutureCorp",
    },
    {
      image: "https://randomuser.me/api/portraits/women/4.jpg",
      details: "Exceptional dedication and expertise in every collaboration.",
      name: "Sophia Martinez",
      position: "Head of Partnerships, Bright Solutions",
    },
  ];

  return (
    <section className="pb-16  bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Our Key Partners
        </h2>
        <p className="text-gray-500 text-center text-lg pb-4">
            What our happy investors say about us
          </p>
        <Swiper 
          slidesPerView={1} 
          spaceBetween={20} 
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 3 },
          }}
          ref={sliderRef} 
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="rounded-lg shadow-lg">
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <TestimonialCard {...testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="mt-6 flex justify-center gap-4">
          <button onClick={handlePrev} className="p-3 rounded-full bg-white shadow-md hover:bg-gray-200 transition-all ease-in-out duration-300">
            ◀
          </button>
          <button onClick={handleNext} className="p-3 rounded-full bg-white shadow-md hover:bg-gray-200 transition-all ease-in-out duration-300">
            ▶
          </button>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ image, details, name, position }) => {
  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md max-w-md mx-auto transition-all ease-in-out duration-300">
      <img src={image} alt={name} className="w-20 h-20 rounded-full shadow-md mb-4" />
      <p className="text-center text-gray-700 italic">"{details}"</p>
      <h4 className="mt-4 text-lg font-semibold text-gray-900">{name}</h4>
      <p className="text-sm text-gray-500">{position}</p>
    </div>
  );
};

export default KeyPartners;
