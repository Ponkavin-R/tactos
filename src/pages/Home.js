import React, { useState, useEffect } from "react";
import Homehero from '../components/Homehero';
import Investors from './Investors';
import Mission_Vission from '../components/Mission_Vission';
import Home_Solution from '../components/Home_Solution';
import Logo from "../assest/l2.svg";
import TestimonialCarousel from "../components/Testimonial";
import BusinessServices from "../components/BusinessServices";
import Services from "../components/Services";
import TactosIntro from "../components/TactosIntro";
import HeroSection from "../components/HomeInvestInStartups";

export default function Home() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newScale = window.innerWidth > 768 ? 1 + scrollY * 0.0005 : 1;
      setScale(newScale);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  

  return (
    <div className="overflow-x-hidden relative">
      <div
        className="fixed top-0 left-0 w-full h-full z-[-1] bg-no-repeat bg-center pointer-events-none"
        style={{
          backgroundImage: `url(${Logo})`,
          transform: `scale(${scale})`,
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          backgroundSize: window.innerWidth > 768 ? "contain" : "100%", // contain on large, fixed % on mobile
          opacity: 0.05,
        }}
      />

      <Homehero />
      <TactosIntro/>
      <Mission_Vission />
      <Home_Solution />
      <Services />
      <BusinessServices />
      <HeroSection/>
      <Investors />
      <TestimonialCarousel />
    </div>
  );
}
