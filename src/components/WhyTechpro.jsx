
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
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-white rounded-xl p-6 sm:p-8">

          {/* LEFT: Title + Image */}
          <div className="text-center lg:text-left lg:flex-1">
            <h1 className="text-xl sm:text-3xl font-bold leading-tight mb-1 text-black">
              Why Choose TechPro
            </h1>
            <p className="text-xs sm:text-base text-[#6B7280] max-w-md mx-auto lg:mx-0 mb-2">
              We deliver in-demand industry certifications
            </p>

            <motion.img
              src={Rectangle4323}
              alt="TechPro Illustration"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full max-w-xs sm:max-w-full mx-auto lg:mx-0 mt-4 rounded-xl object-cover"
            />
          </div>

          {/* RIGHT: Stats + Cards */}
          <div className="w-full sm:max-w-3xl mx-auto lg:px-16 space-y-6">

            {/* STATS */}
            <div className="flex justify-between items-center gap-4 text-center">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex-1">
                  <p className="text-xl sm:text-3xl font-bold text-[#001489]">
                    <CountUp
                      start={0}
                      end={stat.number}
                      duration={2}
                      suffix={stat.suffix}
                      enableScrollSpy
                      scrollSpyOnce
                    >
                      {({ countUpRef, start }) => (
                        <span
                          ref={countUpRef}
                          onLoad={start} // ensures CountUp starts when DOM is ready
                        />
                      )}
                    </CountUp>
                  </p>
                  <p className="text-[10px] sm:text-base text-[#6B7280]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* FEATURE CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#F6FBF9] p-4 sm:p-6 rounded-xl shadow-md">
                <h2 className="text-sm sm:text-xl font-semibold mb-1 text-black">
                  Hands-On Projects
                </h2>
                <p className="text-xs sm:text-base text-[#374151]">
                  Build real-world projects that strengthen your skills and portfolio.
                </p>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
                <h2 className="text-sm sm:text-xl font-semibold mb-1 text-black">
                  Practical Learning
                </h2>
                <p className="text-xs sm:text-base text-[#374151]">
                   Five modules simplified scrum frame work with access to over 100 exam questions with guaranteed Pass.
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