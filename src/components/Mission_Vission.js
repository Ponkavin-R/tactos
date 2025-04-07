import { useState } from "react";

const Mission_Vission = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-24 relative bg-gray-50">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1">
          {/* Image Section */}
          <div className="w-full justify-center items-start gap-6 grid sm:grid-cols-2 grid-cols-1 lg:order-first order-last">
            <div className="pt-24 lg:justify-center sm:justify-end justify-start items-start gap-2.5 flex">
              <img
                className="rounded-xl object-cover shadow-lg hover:scale-150 duration-300"
                src="https://www.shutterstock.com/image-vector/expert-concept-professional-business-adviser-600nw-2156782475.jpg"
                alt="Our Vision"
              />
            </div>
            <img
              className="sm:ml-0 ml-auto rounded-xl object-cover shadow-lg hover:scale-150 duration-300"
              src="https://cdn.prod.website-files.com/645258dee17c72222bca47d8/67602817dc6705d27f670b26_3dbf75f7-d969-4c82-aa12-b1e295fa819a.webp"
              alt="Our Mission"
            />
          </div>

          {/* Content Section */}
          <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
            <div className="w-full flex-col justify-center items-start gap-8 flex">
              <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                <h2 className="text-gray-900 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                  Our Vision & Mission
                </h2>
                <p className="text-gray-600 text-lg font-medium leading-relaxed lg:text-start text-center">
                  At Tactos Strategic Solutions, we mentor Tier 3 students from ideation to successful exit.
                </p>
                <p className="text-gray-600 text-lg font-medium leading-relaxed lg:text-start text-center">
                  We help businesses navigate challenges, optimize operations, and achieve strategic goals.
                </p>
              </div>
              <div className="w-full lg:justify-start justify-center items-center sm:gap-10 gap-5 inline-flex">
                <div className="flex-col justify-start items-start inline-flex">
                  <h3 className="text-indigo-600 text-4xl font-bold font-manrope leading-normal">33+</h3>
                  <h6 className="text-gray-500 text-base font-normal leading-relaxed">Years of Experience</h6>
                </div>
                <div className="flex-col justify-start items-start inline-flex">
                  <h4 className="text-indigo-600 text-4xl font-bold font-manrope leading-normal">125+</h4>
                  <h6 className="text-gray-500 text-base font-normal leading-relaxed">Successful Projects</h6>
                </div>
                <div className="flex-col justify-start items-start inline-flex">
                  <h4 className="text-indigo-600 text-4xl font-bold font-manrope leading-normal">52+</h4>
                  <h6 className="text-gray-500 text-base font-normal leading-relaxed">Happy Clients</h6>
                </div>
              </div>
            </div>
            <button
              className="sm:w-fit w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 ease-in-out rounded-lg shadow-lg text-white font-medium"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Read Less" : "Read More"}
            </button>
            {isExpanded && (
              <div className="mt-6 p-6 bg-white shadow-lg rounded-lg transition-all duration-700 ease-in-out animate-fade-in">
                <p className="text-gray-700 text-lg leading-relaxed">
                  At Tactos Strategic Solutions, we are committed to empowering Tier 3 students and businesses with strategic insights and innovative solutions that drive sustainable growth. Our expertise spans a diverse range of industries, enabling us to offer tailored advisory services that meet the unique needs of our clients.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed mt-4">
                  Our vision is to provide Tier 3 students with the exposure and skills required to lead and achieve as entrepreneurs. We mentor them from the ideation stage until their successful exit.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed mt-4">
                  We partner with organizations at every stage of their journey, from startups to established enterprises, helping them navigate challenges, optimize operations, and achieve their strategic objectives.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed mt-4">
                  As a trusted advisor, we pride ourselves on our ability to deliver high-impact strategies that not only solve immediate problems but also position our clients for long-term success. Whether it's through market analysis, operational optimization, or strategic planning, Tactos Strategic Solutions is your partner in building a resilient and future-ready business.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission_Vission;
