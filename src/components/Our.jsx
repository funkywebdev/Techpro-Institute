



// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { useUserRegion } from "../hooks/useUserRegion";

// const containerVariants = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.18 } },
// };

// const cardVariants = {
//   hidden: { opacity: 0, y: 24, scale: 0.97 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: { duration: 0.5, ease: "easeOut" },
//   },
// };

// const Our = () => {
//   const navigate = useNavigate();
//   const { countryCode, regionReady } = useUserRegion();
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!regionReady) return;

//     const fetchCourses = async () => {
//       try {
//         const res = await api.get(
//           "/v1/courses"
//         );
//         const data = Array.isArray(res.data) ? res.data : res.data.data;
//         setCourses(data || []);
//       } catch (err) {
//         console.log("api error".response)
//         console.error("API ERROR ❌", err);
//         setError(err.response.data.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, [regionReady]);

//   if (!regionReady || loading) {
//     return (
//       <div className="flex items-center justify-center py-20">
//         <div className="w-12 h-12 border-4 border-[#15256E] border-t-transparent rounded-full animate-spin"></div>
//         <span className="ml-4 text-sm text-gray-500 sm:text-base">
        
//         </span>
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="py-20 text-center text-red-500">{error}</div>;
//   }

//   return (
//     <motion.section
//       variants={containerVariants}
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true }}
//       className="px-2 py-8 sm:py-12 bg-gray-50"
//     >
//       <div className="mb-8 text-center sm:mb-10">
//         <h1 className="text-lg font-bold text-gray-900 sm:text-xl md:text-3xl">
//           Our Featured Courses
//         </h1>
//         <p className="max-w-md mx-auto mt-1 text-xs text-gray-600 sm:text-sm md:text-base">
//           Build the skills you need to break into tech.
//         </p>
//       </div>

//       <div className="grid max-w-6xl grid-cols-1 gap-5 px-6 mx-auto sm:grid-cols-2 md:grid-cols-3">
//         {courses.map((course) => (
//           <motion.div
//             key={course.id}
//             variants={cardVariants}
//             whileHover={{ y: -6 }}
//             transition={{ type: "spring", stiffness: 200, damping: 18 }}
//             className="flex flex-col p-4 bg-white shadow-md rounded-xl sm:p-5"
//           >
//             <img
//               src={course.image?.url}
//               alt={course.title}
//               className="object-cover w-full mb-3 rounded-lg h-36"
//             />
//             <h2 className="mb-1 text-sm font-semibold text-gray-900 sm:text-base md:text-lg">
//               {course.title}
//             </h2>
//             <p className="mb-3 text-xs leading-relaxed text-gray-600 sm:text-sm">
//               {course.description}
//             </p>
//             <div className="flex justify-between text-[11px] sm:text-xs text-gray-500 mb-4">
//               <span>⏱ Duration</span>
//               <span>📊 Level</span>
//             </div>
//             <motion.button
//               whileTap={{ scale: 0.96 }}
//               onClick={() => navigate(`/course/${course.slug}`)}
//               className="mt-auto w-full py-2 sm:py-2.5 rounded-lg border border-[#15256E] text-[#15256E] font-semibold text-xs sm:text-sm hover:bg-[#15256E] hover:text-white transition-colors duration-300 cursor-pointer"
//             >
//               View Course
//             </motion.button>
//           </motion.div>
//         ))}
//       </div>
//     </motion.section>
//   );
// };

// export default Our;


import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useUserRegion } from "../hooks/useUserRegion";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Our = () => {
  const navigate = useNavigate();
  const { regionReady } = useUserRegion();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!regionReady) return;

    const fetchCourses = async () => {
      try {
        const res = await api.get("/v1/courses");
        const data = Array.isArray(res.data) ? res.data : res.data.data;
        setCourses(data || []);
      } catch (err) {
        console.error("API ERROR ❌", err);
        setError(err?.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [regionReady]);

  if (!regionReady || loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-[#15256E] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="py-20 text-center text-red-500">{error}</div>;
  }

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="px-2 py-8 sm:py-12 bg-gray-50"
    >
      <div className="mb-8 text-center sm:mb-10">
        <h1 className="text-lg font-bold text-gray-900 sm:text-xl md:text-3xl">
          Our Featured Courses
        </h1>
        <p className="max-w-md mx-auto mt-1 text-xs text-gray-600 sm:text-sm md:text-base">
          Build the skills you need to break into tech.
        </p>
      </div>

      <div className="grid max-w-6xl grid-cols-1 gap-5 px-6 mx-auto sm:grid-cols-2 md:grid-cols-3">
        {courses.map((course) => (
          <motion.div
            key={course.id}
            variants={cardVariants}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="flex flex-col p-4 bg-white shadow-md rounded-xl sm:p-5"
          >
            <img
              src={course.image?.url}
              alt={course.title}
              className="object-cover w-full mb-3 rounded-lg h-36"
            />

            <h2 className="mb-1 text-sm font-semibold text-gray-900 sm:text-base md:text-lg">
              {course.title}
            </h2>

            {/* ✅ Shortened Description */}
            <p className="mb-3 text-xs leading-relaxed text-gray-600 sm:text-sm">
              {course.description
                ? course.description.length > 80
                  ? course.description.slice(0, 80) + "..."
                  : course.description
                : ""}
            </p>

            <div className="flex justify-between text-[11px] sm:text-xs text-gray-500 mb-4">
              <span>⏱ Duration</span>
              <span>📊 Level</span>
            </div>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate(`/course/${course.slug}`)}
              className="mt-auto w-full py-2 sm:py-2.5 rounded-lg border border-[#15256E] text-[#15256E] font-semibold text-xs sm:text-sm hover:bg-[#15256E] hover:text-white transition-colors duration-300 cursor-pointer"
            >
              View Course
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Our;