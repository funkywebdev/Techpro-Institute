






import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Manage from "../assets/images/Manage.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const words = ["Certified Scrum Product Owner (CSPO)."];

const Hero = () => {
  const navigate = useNavigate();
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
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-white px-4 sm:px-6 lg:px-20 pt-24 sm:pt-28 sm:pb-10 "
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-6">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 flex flex-col gap-3 sm:gap-5 text-center md:text-left"
        >
          {/* BADGE */}
          <span className="inline-block w-fit mx-auto md:mx-0 px-4 py-1.5 rounded-full border border-[#E8ECFF] bg-[#F5F7FF] text-[12px] sm:text-[14px] font-medium text-[#15256E]">
            Industry-Ready IT Certifications
          </span>

          {/* HERO HEADING */}
          <h1 className="
            font-bold 
            text-[16px] sm:text-[28px] md:text-[36px] 
            leading-snug 
            text-black
          ">
            Techpro Institute Master class for Certified Scrum Master (CSM) &{" "}
            <span className="text-[#15256E] block sm:inline">
              {text}
              <span className="animate-pulse">|</span>
            </span>
          </h1>

          {/* HERO PARAGRAPH */}
          <p className="text-gray-600 max-w-lg mx-auto md:mx-0 text-sm sm:text-base md:text-lg leading-relaxed px-2 sm:px-0">
             Transform your career with Scrum certifications and real-world Agile training that sets you apart.
          </p>

          {/* CTA BUTTON */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex justify-center md:justify-start mt-4"
          >
             <Link to="/courses/free-trial" className="
              px-6 py-3 sm:px-7 sm:py-4 
              bg-[#15256E] text-white text-[14px] sm:text-[16px] 
              font-semibold rounded-xl shadow-md hover:shadow-xl 
              transition cursor-pointer
            ">
              Start Free Trial
             </Link>
          </motion.div>
        </motion.div>


        


        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="flex-1 flex justify-center md:justify-end"
        >
          <motion.img
            src={Manage}
            alt="Hero Illustration"
            className="w-full max-w-[350px] sm:max-w-[450px] md:max-w-[600px] drop-shadow-xl"
            animate={{ y: [0, -8, 0] }}
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



