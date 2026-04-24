

// import React, { useState, useEffect } from "react";
// import { IoMdCheckmark } from "react-icons/io";
// import { BsChevronDown } from "react-icons/bs";
// import { motion, AnimatePresence } from "framer-motion";
// import { useParams, useNavigate } from "react-router-dom";
// import { useUserRegion } from "../hooks/useUserRegion";
// import api from "../api/axios";

// // ─── Animation Variants ────────────────────────────────────────────────────────

// const ease = [0.22, 1, 0.36, 1];

// const fadeInUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
// };

// const staggerContainer = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.15 } },
// };

// // ─── CoursePage ────────────────────────────────────────────────────────────────

// const CoursePage = () => {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const { countryCode, regionReady } = useUserRegion();

//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [openIndex, setOpenIndex] = useState(null);
//   const [imgLoaded, setImgLoaded] = useState(false);

//   // ── API (completely unchanged) ──
//   useEffect(() => {
//     if (!regionReady) return;

//     const fetchCourse = async () => {
//       try {
//         const res = await api.get(`/v1/courses/${slug}`);
//         console.log(res);
//         setCourse(res.data.data || {});
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to load course data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourse();
//   }, [regionReady, slug]);

//   const toggle = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   const handleEnroll = () => {
//     navigate(`/signup?course=${slug}`);
//   };

//   // ── Loading ──
//   if (!regionReady || loading) {
//     return (
//       <div className="flex flex-col items-center justify-center py-40">
//         <div className="w-12 h-12 border-4 border-[#15256E] border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   // ── Error ──
//   if (error) {
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="py-20 font-semibold text-center text-red-500"
//       >
//         {error}
//       </motion.div>
//     );
//   }

//   return (
//     <div className="bg-[#F3F3FF] relative overflow-hidden">

//       {/* ── HERO ── */}
//       <section className="relative py-12 px-6 sm:px-22 pt-[100px] sm:pt-[120px]">
//         <div className="grid items-start gap-10 mx-auto max-w-7xl lg:grid-cols-2">

//           {/* LEFT */}
//           <motion.div
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.3 }}
//             variants={staggerContainer}
//             className="space-y-3 text-center sm:space-y-5 sm:text-left"
//           >
//             {/* Eyebrow label */}
//             <motion.p
//               variants={fadeInUp}
//               className="text-[11px] sm:text-xs font-semibold tracking-[0.12em] uppercase text-[#15256E]/70"
//             >
//               Online Course
//             </motion.p>

//             <motion.h1
//               variants={fadeInUp}
//               className="text-2xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl"
//             >
//               {course.title || "Untitled Course"}
//             </motion.h1>

//             {/* Thin accent line under title */}
//             <motion.div
//               variants={fadeInUp}
//               className="hidden sm:block h-[3px] w-10 rounded-full bg-[#15256E] mx-0"
//             />

//             <motion.p
//               variants={fadeInUp}
//               className="text-sm leading-[1.8] text-gray-500 sm:text-[15px] max-w-lg mx-auto sm:mx-0"
//             >
//               {course.description || "No description available."}
//             </motion.p>

//             <motion.div variants={fadeInUp}>
//               <motion.button
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.97 }}
//                 onClick={handleEnroll}
//                 className="mt-4 sm:mt-2 px-7 py-2.5 sm:py-3 bg-[#15256E] text-white rounded-lg font-semibold text-sm sm:text-base tracking-wide hover:bg-[#001489] transition shadow-md hover:shadow-lg"
//               >
//                 Enroll Now
//               </motion.button>
//             </motion.div>
//           </motion.div>

//           {/* COURSE IMAGE CARD */}
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, ease }}
//             viewport={{ once: true }}
//             className="static z-10 flex items-center sm:mt-6 lg:absolute lg:left-3/4 lg:-translate-x-1/2 lg:-bottom-62"
//           >
//             <motion.div
//               whileHover={{ y: -6, boxShadow: "0 24px 48px -12px rgba(21,37,110,0.22)" }}
//               transition={{ type: "spring", stiffness: 220, damping: 20 }}
//               className="relative w-[300px] bg-black rounded-3xl shadow-2xl overflow-hidden mx-auto p-1"
//             >
//               <div className="absolute left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-300 rounded-full" />

//               <div className="p-4 space-y-3 bg-white rounded-3xl">
//                 {/* Image */}
//                 <div className="relative flex items-center justify-center w-full h-48 overflow-hidden text-gray-400 bg-gray-200 rounded-xl">
//                   {!imgLoaded && !course.image?.url && (
//                     <span className="text-gray-400 text-sm">Course Image</span>
//                   )}
//                   {course.image?.url && (
//                     <motion.img
//                       src={course.image.url}
//                       alt={course.title}
//                       onLoad={() => setImgLoaded(true)}
//                       initial={{ opacity: 0, scale: 1.04 }}
//                       animate={{ opacity: imgLoaded ? 1 : 0, scale: 1 }}
//                       transition={{ duration: 0.55 }}
//                       className="object-cover w-full h-full rounded-xl absolute inset-0"
//                     />
//                   )}
//                 </div>

//                 <section className="">
//                   <div className="">
//                     {/* Card section heading */}
//                     <h2 className="text-[13px] font-bold uppercase tracking-[0.1em] text-gray-400 mb-3">
//                       What's included
//                     </h2>

//                     <div className="space-y-2">
//                       {course.summary?.map((section, idx) => (
//                         <ul key={idx} className="space-y-1.5">
//                           {section.data.items.map((item, i) => (
//                             <motion.li
//                               key={i}
//                               initial={{ opacity: 0, x: -10 }}
//                               whileInView={{ opacity: 1, x: 0 }}
//                               transition={{ duration: 0.35, delay: i * 0.06 }}
//                               viewport={{ once: true }}
//                               className="flex items-start gap-2 text-[13px] leading-snug text-gray-700"
//                             >
//                               <IoMdCheckmark className="text-[#15256E] mt-0.5 flex-shrink-0" />
//                               {item.text}
//                             </motion.li>
//                           ))}
//                         </ul>
//                       ))}

//                       {(!course.summary || course.summary.length === 0) && (
//                         <p className="text-xs text-gray-400 italic">No summary available.</p>
//                       )}
//                     </div>
//                   </div>
//                 </section>

//                 {/* Divider */}
//                 <div className="h-px bg-gray-100" />

//                 <div className="pt-1 space-y-3">
//                   <span className="block text-2xl font-extrabold tracking-tight text-gray-900">
//                     {course.price
//                       ? `${course.price.currency || "NGN"} ${Number(course.price.amount).toLocaleString()}`
//                       : "Free"}
//                   </span>

//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.97 }}
//                     onClick={handleEnroll}
//                     className="w-full px-4 py-2.5 bg-[#15256E] text-white rounded-lg font-semibold hover:bg-[#001489] transition text-sm tracking-wide shadow-sm"
//                   >
//                     Enroll Now
//                   </motion.button>
//                 </div>

//                 {/* Trust signals */}
//                 <div className="space-y-1 pt-1">
//                   <p className="text-[11px] text-center text-gray-400 flex items-center justify-center gap-1">
//                     <span>🔒</span> Secure Payment &nbsp;·&nbsp; 24/7 Support
//                   </p>
//                   <p className="text-[11px] text-center text-gray-400 flex items-center justify-center gap-1">
//                     <span>⚡</span> Instant Access After Payment
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>

//       {/* ── COURSE OVERVIEW ── */}
//       <section className="px-8 py-8 bg-white sm:py-16 lg:px-16">
//         <div className="max-w-6xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.55, ease }}
//             viewport={{ once: true }}
//             className="mb-8"
//           >
//             <h2 className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
//               Course Overview
//             </h2>
//             <div className="mt-2 h-[3px] w-10 rounded-full bg-[#15256E]" />
//           </motion.div>

//           <div className="grid grid-cols-1 space-y-6 sm:grid-cols-4">
//             {course.overview?.map((section, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 24 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, ease, delay: idx * 0.1 }}
//                 viewport={{ once: true }}
//               >
//                 <h3 className="font-bold text-gray-900 text-[15px] sm:text-[17px] mb-3 leading-snug">
//                   {section.type === "what_you_learn"
//                     ? "What You Will Learn"
//                     : section.type === "who_this_course_is_for"
//                     ? "Who This Course Is For"
//                     : section.type}
//                 </h3>
//                 <ul className="space-y-2">
//                   {section.data.items.map((item, i) => (
//                     <motion.li
//                       key={i}
//                       initial={{ opacity: 0, x: -8 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                       transition={{ duration: 0.35, delay: idx * 0.08 + i * 0.05 }}
//                       viewport={{ once: true }}
//                       className="flex items-start gap-2 text-gray-600 text-[13px] sm:text-[14px] leading-relaxed"
//                     >
//                       <IoMdCheckmark className="text-[#15256E] mt-0.5 flex-shrink-0" />
//                       {item.text}
//                     </motion.li>
//                   ))}
//                 </ul>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── COURSE MODULES ── */}
//       <section className="px-6 py-6 bg-white sm:py-10 sm:px-16 lg:px-20">
//         <div className="max-w-lg">
//           <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.55, ease }}
//             viewport={{ once: true }}
//             className="mb-6"
//           >
//             <h2 className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
//               Course Modules
//             </h2>
//             <div className="mt-2 h-[3px] w-10 rounded-full bg-[#15256E]" />
//             {course.modules?.length > 0 && (
//               <p className="mt-2 text-xs text-gray-400">
//                 {course.modules.length} module{course.modules.length !== 1 ? "s" : ""} in this course
//               </p>
//             )}
//           </motion.div>

//           <div className="space-y-3">
//             {course.modules?.length > 0 ? (
//               course.modules.map((module, index) => (
//                 <motion.div
//                   key={module.id || index}
//                   initial={{ opacity: 0, y: 18 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.45, ease, delay: index * 0.07 }}
//                   viewport={{ once: true }}
//                   className={`overflow-hidden bg-white border rounded-lg transition-all duration-300
//                     ${openIndex === index ? "border-[#15256E]/30 shadow-sm" : "border-gray-200"}`}
//                 >
//                   {/* Header */}
//                   <button
//                     onClick={() => toggle(index)}
//                     aria-expanded={openIndex === index}
//                     className="flex items-center justify-between w-full px-5 py-4 transition hover:bg-gray-50"
//                   >
//                     <div className="flex items-center gap-3">
//                       {/* Module number badge */}
//                       <span
//                         className={`flex-shrink-0 w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center transition-colors duration-200
//                           ${openIndex === index ? "bg-[#15256E] text-white" : "bg-gray-100 text-gray-500"}`}
//                       >
//                         {index + 1}
//                       </span>
//                       <span className="text-[12px] sm:text-[14px] font-medium text-gray-800 text-left">
//                         {module.title}
//                       </span>
//                     </div>

//                     <motion.div
//                       animate={{ rotate: openIndex === index ? 180 : 0 }}
//                       transition={{ duration: 0.3, ease }}
//                     >
//                       <BsChevronDown
//                         className={`flex-shrink-0 text-gray-400 transition-colors duration-200 ${
//                           openIndex === index ? "text-[#15256E]" : ""
//                         }`}
//                       />
//                     </motion.div>
//                   </button>

//                   {/* Animated accordion panel */}
//                   <AnimatePresence initial={false}>
//                     {openIndex === index && module.description && (
//                       <motion.div
//                         key="content"
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: "auto", opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         transition={{ duration: 0.35, ease }}
//                         className="overflow-hidden"
//                       >
//                         <div className="px-5 py-4 bg-[#F8F9FF] border-t border-gray-100">
//                           <div
//                             className="text-[13px] leading-[1.8] text-gray-600"
//                             dangerouslySetInnerHTML={{ __html: module.description }}
//                           />
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </motion.div>
//               ))
//             ) : (
//               <p className="text-sm text-gray-400 italic">No modules available yet.</p>
//             )}
//           </div>
//         </div>
//       </section>

//     </div>
//   );
// };

// export default CoursePage;






import React, { useState, useEffect } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { BsChevronDown } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useUserRegion } from "../hooks/useUserRegion";
import api from "../api/axios";

// ─── Animation Variants ────────────────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

// ─── CoursePage ────────────────────────────────────────────────────────────────

const CoursePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { countryCode, regionReady } = useUserRegion();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  // ── API (completely unchanged) ──
  useEffect(() => {
    if (!regionReady) return;
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/v1/courses/${slug}`);
        console.log(res);
        setCourse(res.data.data || {});
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load course data.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [regionReady, slug]);

  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);
  const handleEnroll = () => navigate(`/signup?course=${slug}`);

  // ── Loading ──
  if (!regionReady || loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <div className="w-12 h-12 border-4 border-[#15256E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ── Error ──
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-20 font-semibold text-center text-red-500"
      >
        {error}
      </motion.div>
    );
  }

  return (
    // Subtle dot-grid background on the whole page — professional, non-intrusive
    <div
      className="bg-[#F3F3FF] relative overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(21,37,110,0.07) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >

      {/* ── HERO ── */}
      <section className="relative py-12 px-6 sm:px-22 pt-[100px] sm:pt-[120px]">
        <div className="grid items-start gap-10 mx-auto max-w-7xl lg:grid-cols-2">

          {/* LEFT */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="space-y-3 text-center sm:space-y-5 sm:text-left"
            // Crisp sub-pixel text rendering
            style={{ WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale" }}
          >
            {/* Eyebrow */}
            <motion.p
              variants={fadeInUp}
              className="text-[11px] sm:text-xs font-semibold tracking-[0.12em] uppercase text-[#15256E]/70"
            >
              Online Course
            </motion.p>

            <motion.h1
              variants={fadeInUp}
              className="text-2xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl"
            >
              {course.title || "Untitled Course"}
            </motion.h1>

            {/* Accent rule */}
            <motion.div
              variants={fadeInUp}
              className="hidden sm:block h-[3px] w-10 rounded-full bg-gradient-to-r from-[#15256E] to-[#3B5BDB]"
            />

            <motion.p
              variants={fadeInUp}
              className="text-sm leading-[1.85] text-gray-500 sm:text-[15px] max-w-lg mx-auto sm:mx-0"
            >
              {course.description || "No description available."}
            </motion.p>

            <motion.div variants={fadeInUp}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleEnroll}
                className="mt-4 sm:mt-2 px-7 py-2.5 sm:py-3 bg-[#15256E] text-white rounded-lg font-semibold text-sm sm:text-base tracking-wide hover:bg-[#001489] transition-all duration-200 shadow-[0_4px_14px_rgba(21,37,110,0.35)] hover:shadow-[0_6px_20px_rgba(21,37,110,0.45)]"
              >
                Enroll Now
              </motion.button>
            </motion.div>
          </motion.div>

          {/* COURSE IMAGE CARD */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            viewport={{ once: true }}
            className="static z-10 flex items-center sm:mt-6 lg:absolute lg:left-3/4 lg:-translate-x-1/2 lg:-bottom-62"
          >
            <motion.div
              whileHover={{ y: -6, boxShadow: "0 32px 64px -16px rgba(21,37,110,0.28)" }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              // Ring border gives a premium inset-shadow feel
              className="relative w-[300px] bg-black rounded-3xl shadow-2xl overflow-hidden mx-auto p-1 ring-1 ring-black/10"
            >
              <div className="absolute left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-300 rounded-full" />

              <div
                className="p-4 space-y-3 bg-white rounded-3xl"
                style={{ WebkitFontSmoothing: "antialiased" }}
              >
                {/* Image */}
                <div className="relative flex items-center justify-center w-full h-48 overflow-hidden text-gray-400 bg-gray-200 rounded-xl">
                  {!imgLoaded && !course.image?.url && (
                    <span className="text-gray-400 text-sm">Course Image</span>
                  )}
                  {course.image?.url && (
                    <motion.img
                      src={course.image.url}
                      alt={course.title}
                      onLoad={() => setImgLoaded(true)}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: imgLoaded ? 1 : 0, scale: 1 }}
                      transition={{ duration: 0.55 }}
                      className="object-cover w-full h-full rounded-xl absolute inset-0"
                    />
                  )}
                </div>

                <section>
                  <div>
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400 mb-3">
                      What's Included
                    </h2>

                    <div className="space-y-2">
                      {course.summary?.map((section, idx) => (
                        <ul key={idx} className="space-y-1.5">
                          {section.data.items.map((item, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.35, delay: i * 0.06 }}
                              viewport={{ once: true }}
                              className="flex items-start gap-2 text-[12.5px] leading-snug text-gray-700 group"
                            >
                              {/* Icon gets a soft pill on hover */}
                              <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-[#EEF0FA] flex items-center justify-center group-hover:bg-[#15256E]/15 transition-colors duration-200">
                                <IoMdCheckmark className="text-[#15256E] text-[9px]" />
                              </span>
                              {item.text}
                            </motion.li>
                          ))}
                        </ul>
                      ))}

                      {(!course.summary || course.summary.length === 0) && (
                        <p className="text-xs text-gray-400 italic">No summary available.</p>
                      )}
                    </div>
                  </div>
                </section>

                {/* Gradient divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                <div className="pt-1 space-y-3">
                  <span className="block text-2xl font-extrabold tracking-tight text-gray-900">
                    {course.price
                      ? `${course.price.currency || "NGN"} ${Number(course.price.amount).toLocaleString()}`
                      : "Free"}
                  </span>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleEnroll}
                    className="w-full px-4 py-2.5 bg-[#15256E] text-white rounded-lg font-semibold hover:bg-[#001489] transition-all duration-200 text-sm tracking-wide shadow-[0_3px_10px_rgba(21,37,110,0.3)] hover:shadow-[0_5px_16px_rgba(21,37,110,0.4)]"
                  >
                    Enroll Now
                  </motion.button>
                </div>

                {/* Trust signals */}
                <div className="space-y-1 pt-1">
                  <p className="text-[11px] text-center text-gray-400 flex items-center justify-center gap-1">
                    <span>🔒</span> Secure Payment &nbsp;·&nbsp; 24/7 Support
                  </p>
                  <p className="text-[11px] text-center text-gray-400 flex items-center justify-center gap-1">
                    <span>⚡</span> Instant Access After Payment
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── COURSE OVERVIEW ── */}
      {/* White card lifts off the dot-grid bg with a crisp border */}
      <section className="px-8 py-8 bg-white sm:py-16 lg:px-16 shadow-[0_-1px_0_0_rgba(0,0,0,0.04)]">
        <div className="max-w-6xl mx-auto" style={{ WebkitFontSmoothing: "antialiased" }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
              Course Overview
            </h2>
            <div className="mt-2 h-[3px] w-10 rounded-full bg-gradient-to-r from-[#15256E] to-[#3B5BDB]" />
          </motion.div>

          <div className="grid grid-cols-1 space-y-6 sm:grid-cols-4">
            {course.overview?.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="font-bold text-gray-900 text-[15px] sm:text-[17px] mb-3 leading-snug">
                  {section.type === "what_you_learn"
                    ? "What You Will Learn"
                    : section.type === "who_this_course_is_for"
                    ? "Who This Course Is For"
                    : section.type}
                </h3>
                <ul className="space-y-2">
                  {section.data.items.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: idx * 0.08 + i * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-2 text-gray-600 text-[13px] sm:text-[14px] leading-relaxed group"
                    >
                      <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-[#EEF0FA] flex items-center justify-center group-hover:bg-[#15256E]/15 transition-colors duration-200">
                        <IoMdCheckmark className="text-[#15256E] text-[9px]" />
                      </span>
                      {item.text}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COURSE MODULES ── */}
      <section className="px-6 py-6 bg-white sm:py-10 sm:px-16 lg:px-20 shadow-[0_-1px_0_0_rgba(0,0,0,0.04)]">
        <div className="max-w-lg" style={{ WebkitFontSmoothing: "antialiased" }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <h2 className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
              Course Modules
            </h2>
            <div className="mt-2 h-[3px] w-10 rounded-full bg-gradient-to-r from-[#15256E] to-[#3B5BDB]" />
            {course.modules?.length > 0 && (
              <p className="mt-2 text-xs text-gray-400 font-medium">
                {course.modules.length} module{course.modules.length !== 1 ? "s" : ""} in this course
              </p>
            )}
          </motion.div>

          <div className="space-y-2.5">
            {course.modules?.length > 0 ? (
              course.modules.map((module, index) => (
                <motion.div
                  key={module.id || index}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease, delay: index * 0.07 }}
                  viewport={{ once: true }}
                  className={`overflow-hidden bg-white rounded-xl transition-all duration-300 ring-1
                    ${openIndex === index
                      ? "ring-[#15256E]/25 shadow-[0_4px_16px_rgba(21,37,110,0.10)]"
                      : "ring-gray-200/80 hover:ring-gray-300 hover:shadow-sm"
                    }`}
                >
                  {/* Header */}
                  <button
                    onClick={() => toggle(index)}
                    aria-expanded={openIndex === index}
                    className="flex items-center justify-between w-full px-5 py-4 transition-colors duration-150 hover:bg-gray-50/70 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {/* Number badge */}
                      <span
                        className={`flex-shrink-0 w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center transition-all duration-200
                          ${openIndex === index
                            ? "bg-[#15256E] text-white shadow-[0_2px_6px_rgba(21,37,110,0.35)]"
                            : "bg-gray-100 text-gray-500"
                          }`}
                      >
                        {index + 1}
                      </span>
                      <span className="text-[12px] sm:text-[14px] font-medium text-gray-800 text-left leading-snug">
                        {module.title}
                      </span>
                    </div>

                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3, ease }}
                    >
                      <BsChevronDown
                        className={`flex-shrink-0 transition-colors duration-200 text-sm
                          ${openIndex === index ? "text-[#15256E]" : "text-gray-400"}`}
                      />
                    </motion.div>
                  </button>

                  {/* Accordion panel */}
                  <AnimatePresence initial={false}>
                    {openIndex === index && module.description && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 py-4 bg-[#F5F6FF] border-t border-[#15256E]/8">
                          <div
                            className="text-[13px] leading-[1.85] text-gray-600"
                            dangerouslySetInnerHTML={{ __html: module.description }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            ) : (
              <p className="text-sm text-gray-400 italic">No modules available yet.</p>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};

export default CoursePage;