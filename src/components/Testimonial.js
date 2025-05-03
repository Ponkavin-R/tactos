import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import axios from "axios";

const TestimonialCarousel = () => {
  const scrollRef = useRef(null);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/testimonials`)
      .then((res) => setTestimonials([...res.data, ...res.data])) // Duplicated for loop effect
      .catch((err) => console.error("Failed to fetch testimonials", err));
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 1;
      }
    };

    const interval = setInterval(scroll, 20);
    return () => clearInterval(interval);
  }, [testimonials]);

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-r from-white to-[#f9f9fc]">
      <div className="max-w-6xl px-4 mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 sm:mb-8 text-blue-950">
          What Our Clients Say
        </h2>
        <p className="text-center text-sm sm:text-base text-gray-600 mb-8 sm:mb-12">
        Hear from our valued clients who have experienced the transformative impact of our platform. We are proud to be part of their journey!
        </p>

        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto scroll-smooth scrollbar-hide"
        >
          {testimonials.map((t, index) => (
            <motion.div
              key={`${t._id}-${index}`}
              className="flex-shrink-0 w-60 sm:w-72 bg-white rounded-3xl shadow-xl p-4 sm:p-6 transform transition-transform hover:scale-105"
              initial={{ opacity: 0, rotateY: -90 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                type: "spring",
              }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center perspective-1000">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-[50%] sm:w-[60%] h-28 sm:h-36 object-cover rounded-xl shadow-xl transform transition-transform duration-500 hover:rotate-y-6"
                  style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                  }}
                />
              </div>

              <div className="mt-4 sm:mt-6 text-center">
                <p className="text-gray-700 font-medium text-sm sm:text-base">{t.review}</p>
                <div className="mt-3 sm:mt-4 flex justify-center gap-1">
                  {Array.from({ length: t.rating }, (_, i) => (
                    <Star key={i} size={14} fill="#facc15" stroke="#facc15" />
                  ))}
                </div>
                <h3 className="mt-3 font-semibold text-sm sm:text-lg text-gray-900">{t.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
