



import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const { countryCode, regionReady } = useUserRegion();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!regionReady) return;

    const fetchCourses = async () => {
      try {
        // ✅ Use plain axios, no token
        const res = await axios.get("https://lms.techproinstitute.org/api/v1/courses");
        console.log("Courses response:", res.data); // 👈 debug response
        const data = Array.isArray(res.data) ? res.data : res.data.data;
        setCourses(data || []);
      } catch (err) {
        console.error("API ERROR ❌", err);
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [regionReady]);

  if (!regionReady || loading) {
    return (
      <div className="py-20 text-center text-gray-500">
        Detecting region and loading courses...
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
      className="py-8 sm:py-12 px-4 bg-gray-50"
    >
      <div className="text-center mb-8 sm:mb-10">
        <h1 className="text-lg sm:text-xl md:text-3xl font-bold text-gray-900">
          Our Featured Courses
        </h1>
        <p className="mt-1 text-xs sm:text-sm md:text-base text-gray-600 max-w-md mx-auto">
          Build the skills you need to break into tech.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {courses.map((course) => (
          <motion.div
            key={course.id}
            variants={cardVariants}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="bg-white rounded-xl shadow-md p-4 sm:p-5 flex flex-col"
          >
            <img
              src={course.image?.url}
              alt={course.title}
              className="rounded-lg mb-3 object-cover h-36 w-full"
            />
            <h2 className="font-semibold text-sm sm:text-base md:text-lg mb-1 text-gray-900">
              {course.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mb-3 leading-relaxed">
              {course.description}
            </p>
            <div className="flex justify-between text-[11px] sm:text-xs text-gray-500 mb-4">
              <span>⏱ Duration</span>
              <span>📊 Level</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate(`/course/${course.slug}`)}
              className="mt-auto w-full py-2 sm:py-2.5 rounded-lg border border-[#15256E] text-[#15256E] font-semibold text-xs sm:text-sm hover:bg-[#15256E] hover:text-white transition-colors duration-300"
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
