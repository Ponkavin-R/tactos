import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import axios from "axios";

const TestimonialCarousel = () => {
  const [testimonials, setTestimonials] = useState([
    {
      _id: "1",
      name: "Sarah Johnson",
      review: "This platform has completely transformed how we approach our business strategy. Highly recommended!",
      rating: 5,
      image: "/api/placeholder/200/200"
    },
    {
      _id: "2",
      name: "Michael Chen",
      review: "The insights we've gained have been invaluable. Our team is more productive than ever before.",
      rating: 4,
      image: "/api/placeholder/200/200"
    },
    {
      _id: "3",
      name: "Emily Parker",
      review: "Intuitive interface and excellent customer support. It's been a game-changer for our organization.",
      rating: 5,
      image: "/api/placeholder/200/200"
    }
  ]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/testimonials`)
      .then((res) => {
        setTestimonials([...res.data, ...res.data]); // Duplicate for smooth loop
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error("Failed to fetch testimonials", err);
        setIsLoaded(true); // Still show default testimonials
      });
  }, []);

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-r from-white to-[#f9f9fc] overflow-hidden">
      <div className="max-w-6xl px-4 mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 sm:mb-8 text-blue-950">
          What Our Clients Say
        </h2>
        <p className="text-center text-sm sm:text-base text-gray-600 mb-8 sm:mb-12">
          Hear from our valued clients who have experienced the transformative impact of our platform. We are proud to be part of their journey!
        </p>

        {isLoaded && testimonials.length > 0 && (
          <div className="testimonial-carousel-container">
            <div className="testimonial-carousel-track">
              {[...Array(6)].map((_, dupIndex) =>
                testimonials.map((testimonial, index) => (
                  <div
                    key={`set${dupIndex}-${testimonial._id}-${index}`}
                    className="testimonial-item"
                  >
                    <div className="testimonial-card">
                      <div className="flex justify-center perspective-1000">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-[60%] h-36 object-cover rounded-xl shadow-xl transform transition-transform duration-500 hover:rotate-y-6"
                          style={{
                            transformStyle: "preserve-3d",
                            backfaceVisibility: "hidden",
                          }}
                        />
                      </div>

                      <div className="mt-6 text-center">
                        <p className="text-gray-700 font-medium text-base line-clamp-4">{testimonial.review}</p>
                        <div className="mt-4 flex justify-center gap-1">
                          {Array.from({ length: testimonial.rating }, (_, i) => (
                            <Star key={i} size={14} fill="#facc15" stroke="#facc15" />
                          ))}
                        </div>
                        <h3 className="mt-3 font-semibold text-lg text-gray-900">{testimonial.name}</h3>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Styling for carousel and fixed card height */}
      <style>{`
        .testimonial-carousel-container {
          width: 100%;
          overflow: hidden;
          position: relative;
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          padding: 1rem 0;
        }

        .testimonial-carousel-track {
          display: flex;
          transform: translateZ(0);
          will-change: transform;
          animation: testimonialScroll 40s linear infinite;
          backface-visibility: hidden;
          perspective: 1000px;
          width: fit-content;
        }

        .testimonial-item {
          flex-shrink: 0;
          padding: 0 1.5rem;
          width: 20rem;
        }

        .testimonial-card {
          width: 100%;
          background: white;
          border-radius: 1.5rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          padding: 1.5rem;
          height: 24rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.3s;
        }

        .testimonial-card:hover {
          transform: scale(1.05);
        }

        @keyframes testimonialScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-20rem * ${testimonials.length}));
          }
        }

        /* Optional: line clamp for review text to avoid overflow */
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default TestimonialCarousel;
