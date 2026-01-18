



import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import Rectangle4323 from "../assets/images/Rectangle4323.png";

const stats = [
  { number: 500, suffix: "+", label: "Learners Trained" },
  { number: 10, suffix: "+", label: "Years Experience" },
  { number: 100, suffix: "%", label: "Practical Curriculum" },
];

const WhyTechpro = () => {
  return (
    <section className="bg-[#F8FAFF] py-12 px-4 md:px-8 lg:px-18">
      <div className="max-w-7xl mx-auto">
        {/* Header + Stats */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8  bg-white rounded-xl p-6 sm:p-8">
          
          {/* Title + Image */}
          <div className="text-center lg:text-left lg:flex-1">
            <h1 className="text-xl sm:text-3xl font-bold leading-tight mb-1 ">
              Why Choose TechPro
            </h1>
            <p className="text-xs sm:text-base text-[#6B7280] max-w-full sm:max-w-md mx-auto lg:mx-0 mb-1">
              We deliver in-demand industry certifications
            </p>
          
            <motion.img
              src={Rectangle4323}
              alt="TechPro Illustration"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full max-w-xs mx-auto rounded-xl object-cover sm:max-w-full sm:mx-0 mt-6 sm:mt-4 order-last sm:order-first"
            />
          </div>

          {/* Stats + Feature Cards */}
          <div className="w-full sm:max-w-3xl mx-auto px-0 sm:px-8 lg:px-16 space-y-4 sm:space-y-6">
            
            {/* Stats */}
            <div className="flex flex-row sm:flex-row justify-between items-center gap-4 sm:gap-6 text-center">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex-1">
                  <p className="text-xl sm:text-3xl font-bold text-[#001489]">
                    <CountUp
                      start={0}
                      end={stat.number}
                      duration={2}
                      suffix={stat.suffix}
                      enableScrollSpy={true} // animates only when visible
                      scrollSpyOnce={true}
                    />
                  </p>
                  <p className="text-[10px] sm:text-base text-[#6B7280]">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6">
              <div className="bg-[#F6FBF9] p-3 sm:p-6 rounded-xl shadow-md">
                <h2 className="text-sm sm:text-xl font-semibold mb-1 sm:mb-2">
                  Hands-On Projects
                </h2>
                <p className="text-xs sm:text-base text-[#374151]">
                  Build real-world projects that strengthen your skills and portfolio.
                </p>
              </div>

              <div className="bg-white p-3 sm:p-6 rounded-xl shadow-md">
                <h2 className="text-sm sm:text-xl font-semibold mb-1 sm:mb-2">
                  Practical Learning
                </h2>
                <p className="text-xs sm:text-base text-[#374151]">
                  Join TechPro Institute and gain practical experience, industry knowledge, and certification.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyTechpro;


