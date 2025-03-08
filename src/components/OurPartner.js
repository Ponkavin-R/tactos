import React, { useState } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Harsh P.",
    role: "Product Designer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    feedback:
      "I used to dread doing my taxes every year, but pagedone has made the process so much simpler and stress-free.",
  },
  {
    name: "Jane D.",
    role: "CEO",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    feedback:
      "The user interface of pagedone is so intuitive, I was able to start using it without any guidance.",
  },
  {
    name: "Robert K.",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 4,
    feedback:
      "Pagedone helped me streamline my workflow and saved me hours every week.",
  },
];

const OurPartner = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1 < testimonials.length ? prevIndex + 1 : 0));
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  return (
    <section className="py-12 px-4 bg-gray-50 rounded-lg mt-5 mx-4 border border-gray-300 shadow-lg">
      <h2 className="text-3xl font-bold text-center text-blue-950 uppercase">Our Partners</h2>
      
      <div className="flex flex-col md:flex-row items-center max-w-5xl mx-auto mt-8 space-y-8 md:space-y-0 md:space-x-8">
        {/* Left Side Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-700 leading-snug">
            23 Partners gave their <span className="text-blue-950">Interest in our company</span>
          </h1>
        </div>

        {/* Right Side - Testimonial Cards */}
        <div className="relative w-full md:w-1/2 overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: `-${index * 100}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {testimonials.map((testimonial, i) => (
              <div key={i} className="min-w-full p-6 bg-white shadow-md rounded-lg text-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 mx-auto rounded-full border-4 border-blue-950"
                />
                <h3 className="mt-4 text-xl font-semibold">{testimonial.name}</h3>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
                <p className="mt-3 text-sm text-gray-700">{testimonial.feedback}</p>
              </div>
            ))}
          </motion.div>

          {/* Navigation Buttons */}
          <div className="absolute inset-y-0 left-0 flex items-center">
            <button
              onClick={prevSlide}
              className="p-2 text-blue-700 bg-white rounded-full shadow-md hover:bg-blue-100"
            >
              ←
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button
              onClick={nextSlide}
              className="p-2 text-blue-700 bg-white rounded-full shadow-md hover:bg-blue-100"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurPartner;
