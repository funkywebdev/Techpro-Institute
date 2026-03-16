
import React, { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";
import api from "../../api/axios";

/* =========================
   Spinner Component
========================= */
const Spinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="w-12 h-12 border-4 border-[#15256E] border-t-transparent rounded-full animate-spin" />
  </div>
);

const AdminCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/v1/enrollment/details");
        const enrollment = res.data.data;

        if (!enrollment || !enrollment.course) {
          setCourses([]);
          setLoading(false);
          return;
        }

        const coursesArray = Array.isArray(enrollment) ? enrollment : [enrollment];
        const coursesWithProgress = coursesArray.map((enroll) => ({
          id: enroll.course.id,
          title: enroll.course.title,
          image: enroll.course.image?.url || "https://via.placeholder.com/150",
          progress: Number(enroll.progress) || 0,
        }));

        setCourses(coursesWithProgress);
   

    } catch (error) {
        const message =
          error?.response?.data?.message || "Failed to load courses";
        console.error("Error message:", message);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

 
   if (loading) return <Spinner />;


  if (error)
  return (
    <p className="mt-10 font-medium text-center text-red-500">
      {error}
    </p>
  );

if (!courses.length)
  return (
    <p className="mt-10 text-center text-gray-600">
      No courses found.
    </p>
  );

  return (
    <div className="p-4 md:p-8">
      {/* ================= START FREE COURSE BUTTON ================= */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {courses.map((course) => (
          <div
            key={course.id}
            className="flex flex-col w-full max-w-xs overflow-hidden transition-shadow duration-300 bg-white shadow-lg cursor-pointer rounded-xl hover:shadow-2xl"
          >
            {/* Course Image */}
            <img
              src={course.image}
              alt={course.title || "Course"}
              className="object-cover w-full h-36 md:h-40"
            />

            {/* Course Details */}
            <div className="flex flex-col items-center w-full gap-2 p-4">
              <p className="text-base font-semibold text-center text-gray-800 md:text-lg">
                {course.title || "Untitled Course"}
              </p>

              {/* Progress Bar */}
              <div className="w-full h-3 mt-1 bg-gray-200 rounded-full">
                <div
                  className="h-3 bg-[#15256E] rounded-full transition-all"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-center text-gray-600 md:text-sm">
                {course.progress}% completed
              </p>

              {/* Action Button */}
              <Link
                to={course.progress === 100 ? "/certificate" : `/preview/${course.id}`}
                className="w-full mt-2"
              >
                <button className="w-full bg-[#15256E] text-white px-4 py-2 rounded-md hover:bg-[#0f1f5a] transition-colors cursor-pointer">
                  {course.progress === 100 ? "Print Certificate" : "Continue Learning"}
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCourse;