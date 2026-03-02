
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
      } catch (err) {
        console.error("Error fetching courses:", err);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <Spinner />;
  if (!courses.length)
    return <p className="p-4 text-gray-600 text-center">No courses found.</p>;

  return (
    <div className="p-4 md:p-8">
      {/* ================= START FREE COURSE BUTTON ================= */}
      <div className="flex justify-end mb-6">
        <Link to="/courses/free-trial">
          <button className="px-4 py-2 bg-[#15256E] text-white rounded text-sm flex items-center gap-2 hover:bg-[#0f1f5a] transition-colors">
            Start Free Trail
          </button>
        </Link>
      </div>

      {/* ================= ENROLLED COURSES ================= */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {courses.map((course) => (
          <div
            key={course.id}
            className="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full max-w-xs overflow-hidden cursor-pointer"
          >
            {/* Course Image */}
            <img
              src={course.image}
              alt={course.title || "Course"}
              className="w-full h-36 md:h-40 object-cover"
            />

            {/* Course Details */}
            <div className="flex flex-col items-center gap-2 p-4 w-full">
              <p className="text-center text-gray-800 font-semibold text-base md:text-lg">
                {course.title || "Untitled Course"}
              </p>

              {/* Progress Bar */}
              <div className="w-full h-3 bg-gray-200 rounded-full mt-1">
                <div
                  className="h-3 bg-[#15256E] rounded-full transition-all"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <p className="text-gray-600 text-xs md:text-sm mt-1 text-center">
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