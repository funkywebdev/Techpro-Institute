// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Manage from "../assets/images/Manage.png";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// // ─── Typewriter config (unchanged) ───────────────────────────────────────────
// const words = ["Certified Scrum Product Owner (CSPO)."];

// // ─── Ease ─────────────────────────────────────────────────────────────────────
// const smooth = [0.22, 1, 0.36, 1];

// // ─── Stagger container ────────────────────────────────────────────────────────
// const container = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.16, delayChildren: 0.1 } },
// };

// const item = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: smooth } },
// };

// // ─── Hero ─────────────────────────────────────────────────────────────────────
// const Hero = () => {
//   const navigate = useNavigate();
//   const [text, setText] = useState("");
//   const [wordIndex, setWordIndex] = useState(0);
//   const [isDeleting, setIsDeleting] = useState(false);

//   // Typewriter — completely unchanged
//   useEffect(() => {
//     const currentWord = words[wordIndex];
//     const speed = isDeleting ? 60 : 100;

//     const timeout = setTimeout(() => {
//       setText((prev) =>
//         isDeleting
//           ? currentWord.substring(0, prev.length - 1)
//           : currentWord.substring(0, prev.length + 1)
//       );

//       if (!isDeleting && text === currentWord) {
//         setTimeout(() => setIsDeleting(true), 1200);
//       }

//       if (isDeleting && text === "") {
//         setIsDeleting(false);
//         setWordIndex((prev) => (prev + 1) % words.length);
//       }
//     }, speed);

//     return () => clearTimeout(timeout);
//   }, [text, isDeleting, wordIndex]);

//   return (
//     <section
//       id="hero"
//       className="relative w-full px-4 pt-24 overflow-hidden bg-white sm:px-6 lg:px-20 sm:pt-28 sm:pb-10"
//     >

//       {/* ══════════════ BACKGROUND ══════════════ */}

//       {/* Mesh gradient — top right */}
//       <motion.div
//         className="absolute -top-48 -right-48 w-[700px] h-[700px] rounded-full pointer-events-none"
//         style={{
//           background:
//             "radial-gradient(ellipse at center, rgba(21,37,110,0.07) 0%, rgba(59,91,219,0.04) 40%, transparent 70%)",
//         }}
//         animate={{ scale: [1, 1.07, 1], rotate: [0, 8, 0] }}
//         transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
//       />

//       {/* Mesh gradient — bottom left */}
//       <motion.div
//         className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
//         style={{
//           background:
//             "radial-gradient(ellipse at center, rgba(21,37,110,0.055) 0%, transparent 65%)",
//         }}
//         animate={{ scale: [1, 1.1, 1] }}
//         transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
//       />

//       {/* Fine dot grid */}
//       <div
//         className="absolute inset-0 pointer-events-none"
//         style={{
//           backgroundImage:
//             "radial-gradient(circle, rgba(21,37,110,0.15) 1px, transparent 1px)",
//           backgroundSize: "32px 32px",
//           opacity: 0.016,
//         }}
//       />

//       {/* Horizontal shimmer line — top */}
//       <motion.div
//         className="absolute inset-x-0 top-0 h-px pointer-events-none"
//         style={{
//           background:
//             "linear-gradient(90deg, transparent 5%, rgba(21,37,110,0.15) 40%, rgba(59,91,219,0.2) 55%, rgba(21,37,110,0.15) 70%, transparent 95%)",
//         }}
//         initial={{ opacity: 0, scaleX: 0 }}
//         animate={{ opacity: 1, scaleX: 1 }}
//         transition={{ duration: 1.4, ease: smooth, delay: 0.2 }}
//       />

//       {/* Soft floating orbs */}
//       {[
//         { size: 52, top: "20%", left: "3.5%", duration: 5, delay: 0 },
//         { size: 28, top: "62%", left: "7%", duration: 7, delay: 1.8 },
//         { size: 18, top: "18%", right: "4.5%", duration: 6, delay: 0.9 },
//         { size: 38, bottom: "18%", right: "8%", duration: 8, delay: 2.5 },
//       ].map((orb, i) => (
//         <motion.div
//           key={i}
//           className="absolute rounded-full pointer-events-none"
//           style={{
//             width: orb.size,
//             height: orb.size,
//             top: orb.top,
//             left: orb.left,
//             right: orb.right,
//             bottom: orb.bottom,
//             background:
//               "radial-gradient(circle, rgba(21,37,110,0.10) 0%, transparent 70%)",
//           }}
//           animate={{ y: [0, -12, 0], opacity: [0.4, 0.85, 0.4] }}
//           transition={{
//             duration: orb.duration,
//             repeat: Infinity,
//             ease: "easeInOut",
//             delay: orb.delay,
//           }}
//         />
//       ))}

//       {/* ══════════════ CONTENT ══════════════ */}
//       <div className="relative z-10 flex flex-col items-center gap-8 mx-auto max-w-7xl md:flex-row md:gap-6">

//         {/* ────────── LEFT CONTENT ────────── */}
//         <motion.div
//           variants={container}
//           initial="hidden"
//           animate="visible"
//           className="flex flex-col flex-1 gap-3 text-center sm:gap-5 md:text-left"
//         >

//           {/* BADGE */}
//           <motion.div variants={item}>
//             <motion.span
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.98 }}
//               transition={{ type: "spring", stiffness: 340, damping: 22 }}
//               className="inline-flex items-center gap-2 w-fit mx-auto md:mx-0 px-4 py-1.5 rounded-full
//                 border
//                 text-[12px] sm:text-[14px] font-semibold text-[#15256E]
//                 shadow-[0_1px_8px_rgba(21,37,110,0.10)] cursor-default select-none"
//             >
//               {/* Live ping dot */}
//               <span className="relative flex h-[7px] w-[7px] flex-shrink-0">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#15256E] opacity-35" />
//                 <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-[#15256E]" />
//               </span>
//               Industry-Ready IT Certifications
//             </motion.span>
//           </motion.div>

//           {/* HEADING */}
//           <motion.h1
//             variants={item}
//             className="font-bold text-[18px] sm:text-[30px] md:text-[38px] leading-[1.18] tracking-tight text-gray-900"
//           >
//             Techpro Institute Master class for Certified Scrum Master (CSM) &{" "}
//             <span className="relative text-[#15256E] block sm:inline">
//               {text}
//               {/* Crisp blinking cursor */}
//               <motion.span
//                 animate={{ opacity: [1, 0, 1] }}
//                 transition={{ duration: 0.85, repeat: Infinity, ease: "linear" }}
//                 className="inline-block ml-[2px] w-[2.5px] h-[0.88em] rounded-sm bg-[#15256E] align-middle"
//               />
//             </span>
//           </motion.h1>

//           {/* PARAGRAPH */}
//           <motion.p
//             variants={item}
//             className="text-gray-500 max-w-lg mx-auto md:mx-0 text-sm sm:text-base md:text-[17px] tracking-[0.01em] px-2 sm:px-0"
//           >
//             Transform your career with Scrum certifications and real-world Agile training that sets you apart.
//           </motion.p>

//           {/* CTA BUTTON */}
//           <motion.div
//             variants={item}
//             className="flex justify-center mt-4 md:justify-start"
//           >
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="relative"
//             >
//               {/* Button ambient glow */}
//               <motion.span
//                 className="absolute inset-0 pointer-events-none rounded-xl"
//                 style={{
//                   background: "rgba(21,37,110,0.22)",
//                   filter: "blur(16px)",
//                   transform: "translateY(4px) scaleX(0.88)",
//                 }}
//                 initial={{ opacity: 0 }}
//                 whileHover={{ opacity: 1 }}
//                 transition={{ duration: 0.3 }}
//               />
//               <Link
//                 to="/courses/free-trial"
//                 className="relative overflow-hidden inline-flex items-center gap-2.5
//                   px-6 py-3 sm:px-7 sm:py-4
//                   bg-[#15256E] text-white
//                   text-[14px] sm:text-[16px] font-semibold tracking-wide
//                   rounded-xl
//                   shadow-[0_4px_20px_rgba(21,37,110,0.30)]
//                   hover:shadow-[0_8px_36px_rgba(21,37,110,0.42)]
//                   transition-shadow duration-300 cursor-pointer"
//               >
//                 {/* Sweep fill */}
//                 <motion.span
//                   className="absolute inset-0 bg-[#0b1c5c]"
//                   initial={{ scaleX: 0 }}
//                   whileHover={{ scaleX: 1 }}
//                   style={{ originX: 0 }}
//                   transition={{ duration: 0.32, ease: "easeInOut" }}
//                 />
//                 <span className="relative z-10">Start Free Trial</span>
//                 {/* Looping arrow */}
//                 <motion.svg
//                   className="relative z-10 w-[15px] h-[15px]"
//                   fill="none"
//                   viewBox="0 0 16 16"
//                   animate={{ x: [0, 4, 0] }}
//                   transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
//                 >
//                   <path
//                     d="M3 8h10M9 4l4 4-4 4"
//                     stroke="currentColor"
//                     strokeWidth="1.8"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </motion.svg>
//               </Link>
//             </motion.div>
//           </motion.div>

//         </motion.div>

//         {/* ────────── RIGHT IMAGE ────────── */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.93, x: 36 }}
//           animate={{ opacity: 1, scale: 1, x: 0 }}
//           transition={{ duration: 1.0, ease: smooth, delay: 0.2 }}
//           className="relative flex justify-center flex-1 md:justify-end"
//         >
//           {/* Inner glow ring */}
//           <motion.div
//             className="absolute inset-0 m-auto w-[210px] h-[210px] sm:w-[300px] sm:h-[300px] rounded-full pointer-events-none"
//             style={{
//               background:
//                 "radial-gradient(circle, rgba(21,37,110,0.11) 0%, rgba(59,91,219,0.05) 50%, transparent 75%)",
//             }}
//             animate={{ scale: [1, 1.14, 1] }}
//             transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
//           />
//           {/* Outer soft ring */}
//           <motion.div
//             className="absolute inset-0 m-auto w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] rounded-full pointer-events-none"
//             style={{
//               background:
//                 "radial-gradient(circle, rgba(21,37,110,0.038) 0%, transparent 68%)",
//             }}
//             animate={{ scale: [1, 1.07, 1] }}
//             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
//           />

//           {/* Hero image */}
//           <motion.img
//             src={Manage}
//             alt="Hero Illustration"
//             className="relative z-10 w-full max-w-[350px] sm:max-w-[450px] md:max-w-[600px] drop-shadow-2xl sm:mt-14"
//             animate={{ y: [0, -8, 0] }}
//             transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
//           />
//         </motion.div>

//       </div>
//     </section>
//   );
// };

// export default Hero;



import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Manage from "../assets/images/Manage.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// ─── Typewriter config (unchanged) ───────────────────────────────────────────
const words = ["Certified Scrum Product Owner (CSPO)."];

// ─── Ease ─────────────────────────────────────────────────────────────────────
const smooth = [0.22, 1, 0.36, 1];

// ─── Stagger container ────────────────────────────────────────────────────────
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: smooth } },
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter — completely unchanged
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
      className="relative w-full px-4 pt-24 overflow-hidden sm:px-6 lg:px-20 sm:pt-28 sm:pb-10"
      style={{ background: "#ffffff" }}
    >
      {/* ══════════════ CONTENT ══════════════ */}
      <div className="relative z-10 flex flex-col items-center gap-8 mx-auto max-w-7xl md:flex-row md:gap-6">

        {/* ────────── LEFT CONTENT ────────── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col flex-1 gap-3 text-center sm:gap-5 md:text-left"
        >

          {/* BADGE */}
          <motion.div variants={item}>
            <motion.span
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 340, damping: 22 }}
              className="inline-flex items-center gap-2 w-fit mx-auto md:mx-0 px-4 py-1.5 rounded-full
                border
                text-[12px] sm:text-[14px] font-semibold text-[#15256E]
                shadow-[0_1px_8px_rgba(21,37,110,0.10)] cursor-default select-none"
            >
              {/* Live ping dot */}
              <span className="relative flex h-[7px] w-[7px] flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#15256E] opacity-35" />
                <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-[#15256E]" />
              </span>
              Industry-Ready IT Certifications
            </motion.span>
          </motion.div>

          {/* HEADING */}
          <motion.h1
            variants={item}
            className="font-bold text-[18px] sm:text-[30px] md:text-[38px] leading-[1.18] tracking-tight text-gray-900"
          >
            Techpro Institute Master class for Certified Scrum Master (CSM) &{" "}
            <span className="relative text-[#15256E] block sm:inline">
              {text}
              {/* Crisp blinking cursor */}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.85, repeat: Infinity, ease: "linear" }}
                className="inline-block ml-[2px] w-[2.5px] h-[0.88em] rounded-sm bg-[#15256E] align-middle"
              />
            </span>
          </motion.h1>

          {/* PARAGRAPH */}
          <motion.p
            variants={item}
            className="text-gray-500 max-w-lg mx-auto md:mx-0 text-sm sm:text-base md:text-[17px] tracking-[0.01em] px-2 sm:px-0"
          >
            Transform your career with Scrum certifications and real-world Agile training that sets you apart.
          </motion.p>

          {/* CTA BUTTON */}
          <motion.div
            variants={item}
            className="flex justify-center mt-4 md:justify-start"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              {/* Button ambient glow */}
              <motion.span
                className="absolute inset-0 pointer-events-none rounded-xl"
                style={{
                  background: "rgba(21,37,110,0.22)",
                  filter: "blur(16px)",
                  transform: "translateY(4px) scaleX(0.88)",
                }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <Link
                to="/courses/free-trial"
                className="relative overflow-hidden inline-flex items-center gap-2.5
                  px-6 py-3 sm:px-7 sm:py-4
                  bg-[#15256E] text-white
                  text-[14px] sm:text-[16px] font-semibold tracking-wide
                  rounded-xl
                  shadow-[0_4px_20px_rgba(21,37,110,0.30)]
                  hover:shadow-[0_8px_36px_rgba(21,37,110,0.42)]
                  transition-shadow duration-300 cursor-pointer"
              >
                {/* Sweep fill */}
                <motion.span
                  className="absolute inset-0 bg-[#0b1c5c]"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  style={{ originX: 0 }}
                  transition={{ duration: 0.32, ease: "easeInOut" }}
                />
                <span className="relative z-10">Start Free Trial</span>
                {/* Looping arrow */}
                <motion.svg
                  className="relative z-10 w-[15px] h-[15px]"
                  fill="none"
                  viewBox="0 0 16 16"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </Link>
            </motion.div>
          </motion.div>

        </motion.div>

        {/* ────────── RIGHT IMAGE ────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93, x: 36 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.0, ease: smooth, delay: 0.2 }}
          className="relative flex justify-center flex-1 md:justify-end"
        >
          {/* Hero image */}
          <motion.img
            src={Manage}
            alt="Hero Illustration"
            className="relative z-10 w-full max-w-[350px] sm:max-w-[450px] md:max-w-[600px] drop-shadow-2xl sm:mt-14"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;









