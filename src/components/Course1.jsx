



// import React from "react";
// import { FaClock, FaCertificate, FaStar } from "react-icons/fa";
// import { IoMdCheckmark } from "react-icons/io";
// import FrameE from "../assets/images/FrameE.png";
// import { motion } from "framer-motion";

// const fadeInUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
// };

// const staggerContainer = {
//   hidden: {},
//   visible: {
//     transition: { staggerChildren: 0.15 },
//   },
// };

// const CoursePage = () => {
//   return (
//     <div className="bg-[#F3F3FF] relative overflow-hidden">

//       {/* HERO / COURSE INTRO */}
//       <section className="relative py-12 px-4 sm:px-8 lg:px-16 pt-[100px] sm:pt-[120px]">
//         <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-2 items-start">

//           {/* LEFT SIDE */}
//           <motion.div
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.3 }}
//             variants={staggerContainer}
//             className="space-y-3 sm:space-y-6 px-2 text-center sm:text-left"
//           >
//             <motion.h1 variants={fadeInUp} className="text-[18px] sm:text-4xl font-bold text-gray-900">
//               Scrum Master Certification Program
//             </motion.h1>

//             <motion.p variants={fadeInUp} className="text-gray-700 text-sm sm:text-base leading-relaxed text-center sm:text-start">
//               Learn the core principles of Scrum, Agile mindset, team roles,
//               sprint planning, and real-world workflows needed to work as a
//               certified Scrum Master.
//             </motion.p>

//             {/* FEATURES */}
//             <motion.div variants={fadeInUp} className="flex flex-row items-center sm:items-start sm:flex-row gap-3 sm:gap-6 ">
//               {[
//                 { icon: FaClock, text: "Duration: 6 Weeks" },
//                 { icon: FaCertificate, text: "Certificate Included" },
//                 { icon: FaStar, text: "Beginner-Friendly" },
//               ].map(({ icon: Icon, text }, idx) => (
//                 <div key={idx} className="flex items-center gap-2 text-gray-700">
//                   <Icon className="text-[#15256E]" />
//                   <span className="text-sm sm:text-[16px]">{text}</span>
//                 </div>
//               ))}
//             </motion.div>

//             <motion.button
//               variants={fadeInUp}
//               className="mt-4 px-6 py-2 sm:py-3 bg-[#15256E] text-white rounded-lg font-semibold hover:bg-[#001489] transition"
//             >
//               Enroll Now
//             </motion.button>
//           </motion.div>
//         </div>

//         {/* PHONE MOCKUP */}
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="static mt-4 lg:absolute lg:left-3/4 lg:-translate-x-1/2 lg:-bottom-52 z-10 flex items-center"
//         >
//           <div className="relative w-[300px] md:w-[300px] bg-black rounded-3xl shadow-2xl overflow-hidden mx-auto p-1">

//             {/* NOTCH */}
//             <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-300 rounded-full" />

//             {/* SCREEN */}
//             <div className="bg-white rounded-3xl p-3 sm:p-5 space-y-3">
//               <img
//                 src={FrameE}
//                 alt="Scrum Master Program"
//                 className="w-full rounded-xl shadow-md"
//               />

//               <div className="space-y-2">
//                 <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
//                   Course Summary
//                 </h2>

//                 <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
//                   {[
//                     "Full Access to Course Videos",
//                     "Downloadable Study Materials",
//                     "Weekly Live Mentorship Session",
//                     "Certificate of Completion",
//                   ].map((item, idx) => (
//                     <motion.p
//                       key={idx}
//                       variants={fadeInUp}
//                       className="flex items-center gap-2 text-gray-700 text-xs sm:text-sm"
//                     >
//                       <BsCheckCircle className="text-[#15256E]" /> {item}
//                     </motion.p>
//                   ))}
//                 </motion.div>

//                 {/* PRICE + BUTTON */}
//                 <motion.div variants={fadeInUp} className="pt-3 space-y-3">
//                   <span className="block text-xl font-bold text-gray-900">$250</span>

//                   <button className="w-full px-4 py-2 bg-[#15256E] text-white rounded-lg font-semibold hover:bg-[#001489] transition text-sm">
//                     Enroll Now
//                   </button>
//                 </motion.div>

//                 <motion.p variants={fadeInUp} className="text-gray-600 text-xs text-center">
//                   Secure Payment • <span className="font-medium">24/7 Support</span>
//                 </motion.p>
//                 <motion.p variants={fadeInUp} className="text-gray-600 text-xs text-center">
//                   Instant Access After Payment
//                 </motion.p>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </section>

//       {/* COURSE OVERVIEW */}
//       <section className="bg-white py-8 sm:py-16 px-8 sm:px-8">
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.3 }}
//           variants={staggerContainer}
//           className="max-w-6xl mx-auto grid gap-10 md:grid-cols-3"
//         >

         

//           <div className="space-y-4">
//   <motion.h2 variants={fadeInUp} className="text-[18px] sm:text-2xl font-bold text-gray-900">
//     Course Overview
//   </motion.h2>

//   <motion.p variants={fadeInUp} className="text-sm sm:text-base font-semibold text-gray-700">
//     What You’ll Learn
//   </motion.p>

//   <motion.div variants={staggerContainer} className="space-y-2 text-gray-700">
//     {[
//       "Gain a deep understanding of the Agile mindset",
//       "Learn the complete Scrum framework",
//       "Understand Scrum roles and responsibilities",
//       "Master Scrum events and ceremonies",
//       "Use industry tools like Jira or ClickUp",
//       "Apply Scrum to real-life projects",
//     ].map((item, idx) => (
//       <motion.div
//         key={idx}
//         variants={fadeInUp}
//         className="flex flex-row md:flex-row md:items-center md:justify-start gap-2 text-[14px] sm:text-sm md:text-base"
//       >
//         {/* Icon */}
//         <IoMdCheckmark className="text-[#15256E] flex-shrink-0" />

//         {/* Text */}
//         <span>{item}</span>
//       </motion.div>
//     ))}
//   </motion.div>
// </div>


//           {/* WHO THIS IS FOR */}
//           <div className="space-y-4">
//             <motion.h2 variants={fadeInUp} className="text-[18px] sm:text-2xl font-bold text-gray-900">
//               Who This Course Is For
//             </motion.h2>

//             <motion.div variants={staggerContainer} className="space-y-2 text-gray-700">
//               {[
//                 "Beginners who want to start a tech career",
//                 "Anyone switching into project or product roles",
//                 "Professionals who want Scrum Master certification",
//                 "Professionals aiming for career advancement",
//               ].map((item, idx) => (
//                 <motion.p
//                   key={idx}
//                   variants={fadeInUp}
//                   className="flex flex-row md:flex-row md:items-center md:justify-start gap-2 text-[14px] sm:text-sm md:text-base"
//                 >
//                   <IoMdCheckmark className="text-[#15256E] mt-[2px] text-xs sm:text-sm" />
//                   {item}
//                 </motion.p>
//               ))}
//             </motion.div>
//           </div>

//         </motion.div>
//       </section>

//     </div>
//   );
// };

// export default CoursePage;



import React from "react";
import { FaClock, FaCertificate, FaStar } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import FrameE from "../assets/images/FrameE.png";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const CoursePage = () => {
  return (
    <div className="bg-[#F3F3FF] relative overflow-hidden">

      {/* HERO / COURSE INTRO */}
      <section className="relative py-12 px-4 sm:px-8 lg:px-16 pt-[100px] sm:pt-[120px]">
        <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-2 items-start">

          {/* LEFT SIDE */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="space-y-3 sm:space-y-6 px-2 text-center sm:text-left"
          >
            <motion.h1 variants={fadeInUp} className="text-[18px] sm:text-4xl font-bold text-gray-900">
              Scrum Master Certification Program
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-gray-700 text-sm sm:text-base leading-relaxed text-center sm:text-start">
              Learn the core principles of Scrum, Agile mindset, team roles,
              sprint planning, and real-world workflows needed to work as a
              certified Scrum Master.
            </motion.p>

            {/* FEATURES */}
            <motion.div variants={fadeInUp} className="flex flex-row sm:flex-row sm:items-center sm:gap-6 gap-3">
              {[
                { icon: FaClock, text: "Duration: 6 Weeks" },
                { icon: FaCertificate, text: "Certificate Included" },
                { icon: FaStar, text: "Beginner-Friendly" },
              ].map(({ icon: Icon, text }, idx) => (
                <div key={idx} className="flex items-center gap-2 text-gray-700">
                  <Icon className="text-[#15256E]" />
                  <span className="text-sm sm:text-[16px]">{text}</span>
                </div>
              ))}
            </motion.div>

            <motion.button
              variants={fadeInUp}
              className="mt-4 px-6 py-2 sm:py-3 bg-[#15256E] text-white rounded-lg font-semibold hover:bg-[#001489] transition"
            >
              Enroll Now
            </motion.button>
          </motion.div>
        </div>

        {/* PHONE MOCKUP */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="static mt-4 lg:absolute lg:left-3/4 lg:-translate-x-1/2 lg:-bottom-52 z-10 flex items-center"
        >
          <div className="relative w-[300px] md:w-[300px] bg-black rounded-3xl shadow-2xl overflow-hidden mx-auto p-1">

            {/* NOTCH */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-300 rounded-full" />

            {/* SCREEN */}
            <div className="bg-white rounded-3xl p-3 sm:p-5 space-y-3">
              <img
                src={FrameE}
                alt="Scrum Master Program"
                className="w-full rounded-xl shadow-md"
              />

              <div className="space-y-2">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Course Summary
                </h2>

                <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  {[
                    "Full Access to Course Videos",
                    "Downloadable Study Materials",
                    "Weekly Live Mentorship Session",
                    "Certificate of Completion",
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      variants={fadeInUp}
                      className="flex flex-row items-center gap-2 text-gray-700 text-xs sm:text-sm"
                    >
                      <IoMdCheckmark className="text-[#15256E] flex-shrink-0" />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* PRICE + BUTTON */}
                <motion.div variants={fadeInUp} className="pt-3 space-y-3">
                  <span className="block text-xl font-bold text-gray-900">$250</span>

                  <button className="w-full px-4 py-2 bg-[#15256E] text-white rounded-lg font-semibold hover:bg-[#001489] transition text-sm">
                    Enroll Now
                  </button>
                </motion.div>

                <motion.p variants={fadeInUp} className="text-gray-600 text-xs text-center">
                  Secure Payment • <span className="font-medium">24/7 Support</span>
                </motion.p>
                <motion.p variants={fadeInUp} className="text-gray-600 text-xs text-center">
                  Instant Access After Payment
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* COURSE OVERVIEW */}
      <section className="bg-white py-8 sm:py-16 px-8 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto grid gap-10 md:grid-cols-3"
        >

          {/* COURSE OVERVIEW */}
          <div className="space-y-4">
            <motion.h2 variants={fadeInUp} className="text-[18px] sm:text-2xl font-bold text-gray-900">
              Course Overview
            </motion.h2>

            <motion.p variants={fadeInUp} className="text-sm sm:text-base font-semibold text-gray-700">
              What You’ll Learn
            </motion.p>

            <motion.div variants={staggerContainer} className="space-y-2 text-gray-700">
              {[
                "Gain a deep understanding of the Agile mindset",
                "Learn the complete Scrum framework",
                "Understand Scrum roles and responsibilities",
                "Master Scrum events and ceremonies",
                "Use industry tools like Jira or ClickUp",
                "Apply Scrum to real-life projects",
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="flex flex-row sm:flex-row sm:items-center gap-2 text-[14px] sm:text-sm md:text-base"
                >
                  <IoMdCheckmark className="text-[#15256E] flex-shrink-0" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* WHO THIS IS FOR */}
          <div className="space-y-4">
            <motion.h2 variants={fadeInUp} className="text-[18px] sm:text-2xl font-bold text-gray-900">
              Who This Course Is For
            </motion.h2>

            <motion.div variants={staggerContainer} className="space-y-2 text-gray-700">
              {[
                "Beginners who want to start a tech career",
                "Anyone switching into project or product roles",
                "Professionals who want Scrum Master certification",
                "Professionals aiming for career advancement",
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="flex flex-row sm:flex-row sm:items-center gap-2 text-[14px] sm:text-sm md:text-base"
                >
                  <IoMdCheckmark className="text-[#15256E] flex-shrink-0" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </motion.div>
      </section>

    </div>
  );
};

export default CoursePage;
