import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    review:
      "This platform exceeded my expectations. The support and tools provided were excellent.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Lee",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "Amazing experience! The community and mentorship really helped our startup grow.",
    rating: 4,
  },
  {
    id: 3,
    name: "Priya Sharma",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "The best support I’ve received as an entrepreneur. Highly recommended!",
    rating: 5,
  },
  {
    id: 4,
    name: "Daniel Kim",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    review:
      "Professional environment and fantastic guidance. Thank you for the great service!",
    rating: 5,
  },
];

// Duplicate testimonials to ensure seamless looping
const loopedTestimonials = [...testimonials, ...testimonials];

const TestimonialCarousel = () => {
  const scrollRef = useRef(null);

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
  }, []);

  return (
    <section className="py-20 bg-gradient-to-r from-white to-[#f9f9fc]">
      <div className="max-w-7xl px-4 mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          What Our Clients Say
        </h2>

        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-scroll scroll-smooth scrollbar-hide"
        >
          {loopedTestimonials.map((t, index) => (
            <motion.div
              key={`${t.id}-${index}`}
              className="flex-shrink-0 w-80 bg-white rounded-3xl shadow-xl p-6 transform transition-transform hover:scale-105"
              initial={{ opacity: 0, rotateY: -90 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                type: "spring",
              }}
              viewport={{ once: true }}
            >
              {/* 3D Image Style */}
              <div className="flex justify-center perspective-1000">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-[70%] h-40 object-cover rounded-xl shadow-xl transform transition-transform duration-500 hover:rotate-y-6"
                  style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                  }}
                />
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-700 font-medium text-base">{t.review}</p>
                <div className="mt-4 flex justify-center gap-1">
                  {Array.from({ length: t.rating }, (_, i) => (
                    <Star key={i} size={16} fill="#facc15" stroke="#facc15" />
                  ))}
                </div>
                <h3 className="mt-3 font-semibold text-lg text-gray-900">{t.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
