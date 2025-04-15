import React, { useState, useEffect } from "react";
import Homehero from '../components/Homehero'
import OurPartner from '../components/OurPartner'
import OurInvestor from '../components/OurInvestor'
import KeyPartners from '../components/KeyPartners'
import Investors from './Investors'
import Mission_Vission from '../components/Mission_Vission'
import Home_Solution from '../components/Home_Solution'
import Logo from "../assest/l2.svg";
import TestimonialCarousel from "../components/Testimonial";

export default function Home() {
    const [scale, setScale] = useState(1);
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const newScale = 1 + scrollY * 0.0005;
        setScale(newScale);
      };
  
      const handleVisibility = () => {
        if (window.scrollY < 300) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };
  
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("scroll", handleVisibility);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("scroll", handleVisibility);
      };
    }, []);
  return (
    <div>
           <div
              className="fixed top-0 left-0 w-full h-full z-[-1] bg-cover bg-center"
              style={{
                backgroundImage: `url(${Logo})`,
                transform: `scale(${scale})`,
                backgroundAttachment: "fixed",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                opacity: 0.05,
              }}
            />
        <Homehero/>
        {/* <OurPartner/>
        <OurInvestor/>
        <KeyPartners/> */}
        <Mission_Vission/>
        <Home_Solution/>
        <Investors/>
        <TestimonialCarousel/>
        
  </div>
  )
}
