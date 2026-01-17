import React from "react";
import { motion } from "framer-motion";
import HeroImage from "../assets/images/heroImage.png";

const Hero = () => {
  // Animation variants
  const textVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const buttonVariant = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.5 },
    },
    hover: {
      scale: 1.05,
      y: -3,
      transition: { yoyo: Infinity, duration: 0.4, ease: "easeInOut" },
    },
  };

  const imageVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
    },
    hover: {
      scale: 1.03,
      y: [0, -5, 0], // subtle floating animation
      transition: { yoyo: Infinity, duration: 2, ease: "easeInOut" },
    },
  };

  return (
    <section className="w-full overflow-hidden px-4 sm:px-20 pt-[90px]  sm:py-[50px] sm:pt-[120px] ">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">

        {/* Text Content */}
        <motion.div
          variants={textVariant}
          initial="hidden"
          animate="visible"
          className="flex-1 flex flex-col gap-4 text-center md:text-left"
        >
          {/* Badge */}
          <p className="inline-block w-fit mx-auto md:mx-0 px-3 py-1.5 text-[#15256E border border-[#E8ECFF] rounded-full text-xs sm:text-sm md:text-base">
            Industry-Ready IT Certifications
          </p>

          {/* Heading */}
          <h1 className="font-bold text-[20px] sm:text-4xl md:text-[42px] leading-snug md:leading-tight">
            Build in-demand IT skills. Get certified.{" "}
            <span className="text-[#15256E] block sm:inline">
              Advance your career
            </span>
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-xl mx-auto md:mx-0 leading-relaxed">
            Back your IT skills with industry-recognised certifications that prove
            your expertise and make you more competitive in today’s job market.
          </p>

          {/* CTA */}
          <motion.div
            variants={buttonVariant}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="flex justify-center md:justify-start"
          >
            <button className="mt-4 px-6 py-2.5 sm:px-7 sm:py-3 md:px-8 md:py-4 bg-[#15256E] text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-[#15256E] transition-all duration-300 shadow-md hover:shadow-lg">
              Start Free Trial
            </button>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div
          variants={imageVariant}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="flex-1 flex justify-center md:justify-end"
        >
          <img
            src={HeroImage}
            alt="Hero Illustration"
            className="w-full max-w-[360px] sm:max-w-[480px] md:max-w-[600px]"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
