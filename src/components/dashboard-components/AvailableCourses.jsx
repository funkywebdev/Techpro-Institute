import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { IoMdCheckmark } from "react-icons/io";

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const AvailableCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("https://techproinstitute.org/api/v1/courses");
        console.group("Courses API Response");
        console.log(res.data);
        console.groupEnd();
        setCourses(res.data?.data || []);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading)
    return <p className="text-center py-10 text-gray-600">Loading courses…</p>;

  if (!courses || courses.length === 0)
    return <p className="text-center py-10 text-gray-600">No courses available.</p>;

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-6 text-start">
          <h1 className="text-[16px] sm:text-[18px] font-semibold text-gray-900">
            Explore Courses
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Learn new skills and grow your career
          </p>
        </div>

        {/* COURSES GRID */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <motion.div
              key={course.id}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col"
            >
              {/* IMAGE */}
              <div className="h-36 overflow-hidden rounded-t-xl">
                <img
                  src={course.image?.url || "https://via.placeholder.com/400x200"}
                  alt={course.title || "Course Image"}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 flex flex-col flex-1">
                {/* TITLE */}
                <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 capitalize">
                  {course.title || "Untitled Course"}
                </h2>

                {/* DESCRIPTION */}
                <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                  {course.description || "No description available."}
                </p>

                {/* MODULES */}
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                  <IoMdCheckmark className="text-[#15256E] text-sm" />
                  {course.modules_count || 0} Module
                  {course.modules_count > 1 && "s"}
                </div>

                {/* PRICE */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-900">
                    {course.price
                      ? `${course.price.currency} ${course.price.amount}`
                      : "Free"}
                  </span>
                  {course.price?.region && (
                    <span className="text-[10px] px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                      {course.price.region}
                    </span>
                  )}
                </div>

                {/* BUTTON */}
                <button
                  onClick={() => navigate(`/enrollment/${course.id}`)}
                  className="mt-auto w-full py-1.5 text-xs sm:text-sm bg-[#15256E] text-white font-medium rounded-lg hover:bg-[#0f1f5a] transition-colors"
                >
                  Enroll
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailableCourses;