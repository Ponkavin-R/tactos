import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    name: "Jane D",
    role: "CEO",
    image: "https://pagedone.io/asset/uploads/1696229969.png",
    feedback:
      "Pagedone has made it possible for me to stay on top of my portfolio and make informed decisions quickly.",
  },
  {
    id: 2,
    name: "Harsh P.",
    role: "Product Designer",
    image: "https://pagedone.io/asset/uploads/1696229994.png",
    feedback:
      "Thanks to Pagedone, I feel more informed and confident about my investment decisions than ever before.",
  },
  {
    id: 3,
    name: "Sarah K.",
    role: "Investor",
    image: "https://pagedone.io/asset/uploads/1696229994.png",
    feedback:
      "This platform revolutionized my investment approach. The insights are unparalleled!",
  },
];

const OurInvestor = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Our Investors
          </h2>
          <p className="text-gray-500 text-lg mt-2">
            What our happy investors say about us
          </p>
        </div>

        {/* Swiper Component */}
        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          spaceBetween={20}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
          }}
          className="w-full"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="relative bg-white shadow-xl rounded-3xl p-6 transition-all duration-300 hover:shadow-2xl max-w-lg mx-auto">
                <p className="text-gray-600 text-lg leading-relaxed">
                  {testimonial.feedback}
                </p>

                {/* User Info */}
                <div className="flex items-center gap-4 mt-6">
                  <img
                    className="rounded-full w-12 h-12 object-cover border-2 border-gray-300"
                    src={testimonial.image}
                    alt={testimonial.name}
                  />
                  <div>
                    <h5 className="text-gray-900 font-medium">{testimonial.name}</h5>
                    <span className="text-sm text-gray-500">{testimonial.role}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default OurInvestor;
