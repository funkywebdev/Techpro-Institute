import React from "react";
import { motion } from "framer-motion";
import Group from "../assets/images/Group.png";

const Diamond = () => (
  <span className="inline-block w-2 h-2 bg-[#001489] rotate-45 mt-1"></span>
);

const How = () => {
  // Variants
  const textVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const stepVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" },
    }),
    hover: { y: -3, scale: 1.02, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  const imageVariant = {
    float: {
      y: [0, -12, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section id="about" className="py-12 px-4 sm:px-8 lg:px-16 bg-white">
      <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-2 items-center">

        {/* TEXT */}
        <motion.div
          variants={textVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center lg:text-left lg:order-1"
        >
          <motion.h1
            variants={textVariant}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          >
            How It Works
          </motion.h1>

          <motion.p
            variants={textVariant}
            className="text-sm sm:text-base text-gray-600 mb-8 max-w-md mx-auto lg:mx-0"
          >
            Getting started is simple and straightforward. Sign up, choose a
            course, learn at your own pace, and earn a certificate upon
            completion.
          </motion.p>

          {/* STEPS */}
          <div className="space-y-3">
            {[
              "Create Your Free Account",
              "Enroll in the Course",
              "Learn with Expert Guidance",
              "Get Certified",
            ].map((step, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={stepVariant}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                className="
                  flex items-start gap-3
                  p-4 rounded-xl
                  bg-gray-50
                  text-sm sm:text-base
                  font-medium text-gray-800
                  shadow-sm
                  hover:shadow-md
                  transition
                  lg:bg-transparent lg:p-0 lg:shadow-none
                "
              >
                <Diamond />
                <span>{step}</span>
                <span className="text-gray-400 text-lg">→</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          variants={imageVariant}
          initial="hidden"
          animate={["visible", "float"]}
          className="flex justify-center lg:order-1"
        >
          <img
            src={Group}
            alt="How it works illustration"
            className="
              w-full
              max-w-[300px]
              md:max-w-[500px]
              object-contain
            "
          />
        </motion.div>

      </div>
    </section>
  );
};

export default How;
