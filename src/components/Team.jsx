


import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// Images
import mrtega from "../assets/images/mrtega.jpeg";
import Akinola from "../assets/images/Akinola.jpeg";
import Hazzan from "../assets/images/Hazzan.jpeg";
import Omona from "../assets/images/Omona.jpeg";
import Oladapo from "../assets/images/Oladapo.jpeg";

const teamMembers = [
  {
    img: Akinola,
    name: "Kabir Akinola",
    role: "Product Manager / Business Analyst",
    bio: "Kabir Akinola is a skilled Product Manager and Business Analyst with over 7 years of experience in software engineering and product development. He excels at leading cross-functional teams, defining product strategy, and delivering end-to-end solutions that align with business goals. Kabir specializes in translating complex requirements into scalable, user-focused technology products, bridging strategy, innovation, and execution to create measurable impact.",
  },
  {
    img: mrtega,
    name: "Seun Oladuntoye",
    role: "Certified Scrum Master / Project Manager",
    bio: "Oluwaseun Oladuntoye is a Certified Scrum Master, Project Manager, Product Manager, and Business Analyst with over 7 years of software engineering experience. He leads agile teams, drives product strategy, and manages end-to-end project execution from concept to delivery. He specializes in translating business goals into scalable technology solutions, aligning stakeholders, optimizing processes, and transforming ideas into impactful digital products.",
  },
  {
    img: Hazzan,
    name: "Hazzan Shola",
    role: "Programme Manager / Business Analyst ",
    bio: "A results-driven Programme Manager, Business Analyst, and Scrum Master with over 9 years of experience delivering complex digital and enterprise transformation initiatives. He specializes in ERP implementations, AI-enabled solutions, CRM integration, and data-driven change across cross-functional environments.Expert in translating strategic vision into executable roadmaps, leading high-performing Agile teams, and aligning stakeholders to deliver measurable business value.",
  },
  {
    img: Omona,
    name: "Dr Omona-a West",
    role: "Certified Scrum Master/Six Sigma Green Belt",
    bio: "Dr. Omoona West is a Certified Scrum Master and Six Sigma Green Belt with a proven track record of driving operational excellence and delivering high-quality software solutions. She specializes in streamlining processes, optimizing workflows, and leading agile teams to achieve efficiency and measurable results. With expertise in both agile methodologies and process improvement, Dr. Omoona ensures projects are executed with precision, innovation, and impact.",
  },
  {
    img: Oladapo,
    name: "Dr. Oladapo Olukomaiya",
    role: "Data and Information Officer",
    bio: "Dr. Oladapo Olukomaiya is a dedicated Data and Information Officer with extensive experience in managing, analyzing, and safeguarding organizational data. He specializes in transforming complex data into actionable insights, ensuring accuracy, integrity, and accessibility for decision-making processes. Dr. Olukomaiya is passionate about leveraging data-driven strategies to enhance operational efficiency and support organizational growth. His expertise spans database management, data analytics, and information systems, making him a key contributor to any team focused on data excellence.",
  },
  
];


const TeamSlider = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleTap = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative px-4 py-12 font-poppins bg-gradient-to-tr from-fuchsia-50 via-purple-50 to-indigo-50">
      
      {/* Heading */}
      <div className="max-w-2xl mx-auto mb-10 text-center">
        <h2 className="text-[18px] font-bold text-black sm:text-3xl">
          The Minds Behind the Product
        </h2>
        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          A passionate team committed to building scalable, impactful solutions.
        </p>
      </div>

      {/* Slider */}
      <div className="max-w-6xl mx-auto">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {teamMembers.map((member, index) => {
            const isFlipped = activeIndex === index;

            return (
              <SwiperSlide key={index}>
                <div
                  onClick={() => handleTap(index)}
                  className="relative w-full cursor-pointer [perspective:1200px] aspect-square"
                >
                  <div
                    className={`relative h-full w-full rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] ${
                      isFlipped ? "[transform:rotateY(180deg)]" : ""
                    }`}
                  >
                    {/* FRONT */}
                    <div
                      className="absolute inset-0 overflow-hidden rounded-2xl"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <img
                        src={member.img}
                        alt={member.name}
                        className="object-cover w-full h-[430px] rounded-2xl"
                      />
                      <div className="absolute bottom-0 w-full p-3 text-center bg-black/40 backdrop-blur-sm">
                        <h3 className="text-lg font-semibold text-white">
                          {member.name}
                        </h3>
                        <p className="text-sm text-gray-200">
                          {member.role}
                        </p>
                      </div>
                    </div>

                    {/* BACK */}
                    <div
                      className="absolute inset-0 p-4 text-center text-white rounded-2xl bg-black/80 backdrop-blur-sm"
                      style={{
                        transform: "rotateY(180deg)",
                        backfaceVisibility: "hidden",
                      }}
                    >
                      <h3 className="mb-2 text-lg font-semibold">
                        {member.name}
                      </h3>
                      <p className="mb-3 text-sm text-gray-200">
                        {member.role}
                      </p>
                      <div className="overflow-y-auto text-sm leading-relaxed max-h-[60%]">
                        {member.bio}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default TeamSlider;