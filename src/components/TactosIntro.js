import React, { useEffect, useRef, useState } from "react";
import imageSrc from "../assest/sr.png"; // Update path if needed

const TactosIntro = () => {
  const sectionRef = useRef(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowContent(entry.intersectionRatio >= 0.65);
      },
      {
        root: null,
        threshold: [0, 0.65, 1],
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-white px-4 lg:px-16 py-10 overflow-hidden relative"
    >
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-7xl h-screen space-y-10 lg:space-y-0 lg:space-x-20">
        {/* Image Section */}
        <div
          className="w-full lg:w-[45%] flex justify-center items-center transition-transform duration-700 ease-out"
          style={{
            transform: showContent ? "translateX(-60px)" : "translateX(0px)",
          }}
        >
          <img
            src={imageSrc}
            alt="Tactos"
            className="w-3/4 max-w-md object-contain rounded-2xl shadow-2xl border-4 border-indigo-200"
          />
        </div>

        {/* Text Section */}
        <div
  className={`w-full lg:w-[70%] min-h-[0vh] transition-all duration-1000 ease-in-out transform ${
    showContent
      ? "opacity-100 translate-x-0"
      : "opacity-0 translate-x-12 pointer-events-none"
  }`}
>
  <div className="bg-gradient-to-br from-white via-blue-100 to-white border border-indigo-200 rounded-3xl shadow-xl p-16 h-full flex flex-col justify-center">
    <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 text-blue-950">
      TACTOS
    </h2>
    <p className="text-gray-800 text-lg leading-relaxed mb-4">
      TACTOS is a startup ecosystem builder, creating a safe, supportive,
      and scalable environment for entrepreneurs and student founders.
      Our mission is to empower innovators with the right mentorship,
      access to funding networks, and essential growth resources — while
      actively safeguarding them from scams and misleading deals.
    </p>
    <p className="text-gray-800 text-lg leading-relaxed">
      We’re building a trustworthy, founder-first ecosystem where
      startups grow with confidence, clarity, and a strong sense of
      community.
    </p>
  </div>
</div>

      </div>

      {/* Extra Scroll Space */}
      <div className="h-screen" />
    </section>
  );
};

export default TactosIntro;
