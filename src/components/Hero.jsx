import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Manage from "../assets/images/Manage.png";

const words = [
  "Advance your career",
  "Become industry-ready",
  "Get certified faster", 
  "Learn from experts",
  "Turn skills into income",
  "Grow with real projects",
  "Upskill with confidence",
  "Stand out professionally",
  "Launch your tech journey",
  "Master practical skills",
  "Prepare for real jobs",
  "Level up your expertise",
  "Learn today, succeed tomorrow",
  "Transform your future",
];

const Hero = () => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const speed = isDeleting ? 60 : 100;

    const timeout = setTimeout(() => {
      setText((prev) =>
        isDeleting
          ? currentWord.substring(0, prev.length - 1)
          : currentWord.substring(0, prev.length + 1)
      );

      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), 1200);
      }

      if (isDeleting && text === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex]);

  return (
    <section id="hero" className="w-full overflow-hidden px-4 sm:px-20 pt-[90px] sm:pt-[120px] sm:pb-[20px]">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 flex flex-col gap-4 text-center md:text-left"
        >
          {/* Badge */}
          <p className="inline-block w-fit mx-auto md:mx-0 px-3 py-1.5 border border-[#E8ECFF] rounded-full text-xs sm:text-sm text-[#15256E]">
            Industry-Ready IT Certifications
          </p>

          {/* Heading */}
          <h1 className="font-bold text-[22px] sm:text-4xl md:text-[42px] leading-snug md:leading-tight">
            Build in-demand IT skills. Get certified.{" "}
            <span className="text-[#15256E] block sm:inline">
              {text}
              <span className="animate-pulse">|</span>
            </span>
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-xl mx-auto md:mx-0 leading-relaxed">
            Back your IT skills with industry-recognised certifications that prove
            your expertise and make you more competitive in today’s job market.
          </p>

          {/* CTA */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex justify-center md:justify-start"
          >
            <button className="mt-4 px-6 py-2.5 sm:px-7 sm:py-3 md:px-8 md:py-4 bg-[#15256E] text-white text-sm sm:text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition">
              Start Free Trial
            </button>
          </motion.div>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="flex-1 flex justify-center md:justify-end"
        >
          <motion.img
            src={Manage}
            alt="Hero Illustration"
            className="w-full max-w-[360px] sm:max-w-[480px] md:max-w-[600px]"
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
