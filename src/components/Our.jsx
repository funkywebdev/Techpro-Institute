


// import React from "react"
// import { motion } from "framer-motion"
// import FrameD from "../assets/images/FrameD.png"
// import FrameE from "../assets/images/FrameE.png"
// import FrameF from "../assets/images/FrameF.png"

// const cardVariant = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0 },
// }

// const Our = () => {
//   return (
//     <motion.section
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true }}
//       transition={{ staggerChildren: 0.15 }}
//       className="py-10 sm:py-14 px-4 bg-white"
//     >
//       {/* Header */}
//       <div className="text-center mb-10">
//         <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#111827]">
//           Our Featured Courses
//         </h1>
//         <p className="mt-2 text-sm sm:text-base text-[#6B7280] max-w-md mx-auto">
//           Build the skills you need to break into tech.
//         </p>
//       </div>

//       {/* Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        
//         {/* CARD */}
//         {[
//           {
//             img: FrameD,
//             title: "Introduction to Scrum",
//             level: "Beginner",
//             btn: "Start Free",
//           },
//           {
//             img: FrameE,
//             title: "Certified Scrum Master",
//             level: "Intermediate",
//             btn: "View Details",
//           },
//           {
//             img: FrameF,
//             title: "Scrum Product Owner",
//             level: "Advanced",
//             btn: "View Details",
//           },
//         ].map((course, index) => (
//           <motion.div
//             key={index}
//             variants={cardVariant}
//             whileHover={{ y: -6 }}
//             className="bg-white rounded-xl shadow-md p-5 flex flex-col"
//           >
//             <img
//               src={course.img}
//               alt={course.title}
//               className="rounded-lg mb-4"
//             />

//             <h2 className="font-semibold text-lg mb-2 text-[#111827]">
//               {course.title}
//             </h2>

//             <p className="text-sm text-[#6B7280] mb-4">
//               Learn Scrum frameworks, agile leadership, and real-world practices
//               to prepare you for certification and industry roles.
//             </p>

//             <div className="flex justify-between text-xs text-[#6B7280] mb-5">
//               <span>⏱ 4–6 Weeks</span>
//               <span>📊 {course.level}</span>
//             </div>

//             {/* BUTTON */}
//             <motion.button
//               whileTap={{ scale: 0.95 }}
//               className="mt-auto w-full py-2.5 rounded-lg border border-[#15256E] text-[#15256E] font-semibold text-sm
//                          hover:bg-[#15256E] hover:text-white transition-all duration-300"
//             >
//               {course.btn} →
//             </motion.button>
//           </motion.div>
//         ))}
//       </div>
//     </motion.section>
//   )
// }

// export default Our



import React from "react"
import { motion } from "framer-motion"
import FrameD from "../assets/images/FrameD.png"
import FrameE from "../assets/images/FrameE.png"
import FrameF from "../assets/images/FrameF.png"

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

const Our = () => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="py-8 sm:py-12 px-4 bg-white"
    >
      {/* Header */}
      <div className="text-center mb-8 sm:mb-10">
        <h1 className="text-lg sm:text-xl md:text-3xl font-bold text-[#111827]">
          Our Featured Courses
        </h1>
        <p className="mt-1 text-xs sm:text-sm md:text-base text-[#6B7280] max-w-md mx-auto">
          Build the skills you need to break into tech.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {[
          {
            img: FrameD,
            title: "Introduction to Scrum",
            level: "Beginner",
            btn: "Start Free",
          },
          {
            img: FrameE,
            title: "Certified Scrum Master",
            level: "Intermediate",
            btn: "View Details",
          },
          {
            img: FrameF,
            title: "Scrum Product Owner",
            level: "Advanced",
            btn: "View Details",
          },
        ].map((course, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="bg-white rounded-xl shadow-md p-4 sm:p-5 flex flex-col"
          >
            <img
              src={course.img}
              alt={course.title}
              className="rounded-lg mb-3"
            />

            <h2 className="font-semibold text-sm sm:text-base md:text-lg mb-1 text-[#111827]">
              {course.title}
            </h2>

            <p className="text-xs sm:text-sm text-[#6B7280] mb-3 leading-relaxed">
              Learn Scrum frameworks, agile leadership, and real-world practices
              to prepare you for certification and industry roles.
            </p>

            <div className="flex justify-between text-[11px] sm:text-xs text-[#6B7280] mb-4">
              <span>⏱ 4–6 Weeks</span>
              <span>📊 {course.level}</span>
            </div>

            <motion.button
              whileTap={{ scale: 0.96 }}
              className="mt-auto w-full py-2 sm:py-2.5 rounded-lg border border-[#15256E]
                         text-[#15256E] font-semibold text-xs sm:text-sm
                         hover:bg-[#15256E] hover:text-white transition-colors duration-300"
            >
              {course.btn} 
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default Our
