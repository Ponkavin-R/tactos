import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  const featuredCompanies = [
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
    { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "Facebook", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" },
  ];

  return (
    <div className="bg-gray-50 mx-2">
      {/* Header Section */}
      <div
        className="relative w-full h-[60vh] bg-cover bg-center bg-[url('https://media.licdn.com/dms/image/v2/D5622AQG0uAsS5FRLiw/feedshare-shrink_800/B56ZP9EoIPGsAg-/0/1735117669830?e=1744243200&v=beta&t=yzib1ceM8ygQ2nEtCjeFlyyD_AFBNSctUiPC1ZQZ3Mc')]"
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold">Discover About Us</h1>
            <button className="mt-4 px-6 py-3 bg-blue-950 text-white rounded-lg hover:bg-blue-600">
              Watch Video
            </button>
          </div>
        </div>
      </div>

      {/* Vision & Mission Section */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {[{ title: "Our Vision", content: "Empowering Tier 3 students to become future entrepreneurs through structured mentoring and real-world exposure." },
          { title: "Our Mission", content: "Helping businesses optimize operations and navigate challenges for sustainable growth." }]
          .map((item, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl border border-gray-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
            >
              <h2 className="text-3xl font-bold text-blue-950 mb-4">{item.title}</h2>
              <p className="text-gray-700 leading-relaxed">{item.content}</p>
            </motion.div>
        ))}
      </div>
      {/* Why Choose Us */}
      <div className="container mx-auto px-4 py-16 bg-blue-50 rounded-xl">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-10">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Innovative Solutions", "Expert Team", "Global Reach"].map((reason, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-xl p-6 rounded-lg text-center"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold text-blue-900">{reason}</h3>
              <p className="text-gray-600 mt-2">We offer world-class services to ensure your business stays ahead of the competition.</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Companies Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-blue-950 mb-12 text-center">Our Other Companies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {featuredCompanies.map((company, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white shadow-xl rounded-3xl border border-gray-200 flex flex-col items-center justify-center hover:shadow-2xl hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <img
                src={company.logo}
                alt={company.name}
                className="w-20 h-20 object-contain mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-700">{company.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
