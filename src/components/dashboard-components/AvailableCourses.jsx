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
    axios
      .get("https://techproinstitute.org/api/v1/courses")
      .then((res) => {
        setCourses(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center py-10 text-gray-600">Loading courses…</p>;
  }

  if (!courses || courses.length === 0) {
    return <p className="text-center py-10 text-gray-600">No courses available.</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-[20px] font-semibold text-gray-900">
            Available Courses
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Browse and enroll in available courses
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
              className="bg-white rounded-xl border border-gray-200 hover:shadow-md transition"
            >
              <div className="p-5 space-y-4">
                {/* TITLE */}
                <h2 className="text-base font-semibold text-gray-900 capitalize">
                  {course?.title || "Untitled Course"}
                </h2>

                {/* DESCRIPTION */}
                <p className="text-sm text-gray-600 line-clamp-2">
                  {course?.description || "No description available."}
                </p>

                {/* META */}
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <IoMdCheckmark className="text-[#15256E]" />
                  {course?.modules_count || 0} Module
                  {course?.modules_count > 1 && "s"}
                </div>

                {/* PRICE */}
                {course?.price ? (
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm font-semibold text-gray-900">
                      {course.price.currency} {course.price.amount}
                    </span>

                    {course.price.region && (
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                        {course.price.region}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm font-semibold text-gray-900">Free</span>
                  </div>
                )}

                {/* ACTIONS */}
                  <button
                    onClick={() => navigate(`/enrollment/${course.id}`)}
                    className="flex-1 px-3 py-2 text-xs font-medium bg-[#15256E] text-white rounded-lg hover:bg-[#001489] transition"
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