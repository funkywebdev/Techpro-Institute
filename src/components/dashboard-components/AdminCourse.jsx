


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const AdminCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [freeTrialCourse, setFreeTrialCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Fetch enrolled courses
        const res = await api.get("/v1/enrollment/details");
        const enrollment = res.data.data;

        // Fetch free trial course info
        const freeTrialRes = await api.get("/v1/courses/scrum-master/preview");
        setFreeTrialCourse(freeTrialRes.data.data);

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

  if (loading) return <p className="p-4 text-gray-600">Loading courses...</p>;
  if (!courses.length && !freeTrialCourse)
    return <p className="p-4 text-gray-600">No courses found.</p>;

  return (
    <div className="p-4 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">

      {/* ================= FREE TRIAL CARD ================= */}
      {freeTrialCourse && (
        <div className="flex flex-col items-center bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full max-w-xs overflow-hidden">
          
          {/* Topic */}
          <div className="w-full bg-teal-600 text-white text-center py-2 font-semibold text-base md:text-lg">
            Start Free Course
          </div>

          {/* Free Trial Image */}
          <img
            src={freeTrialCourse.image?.url || "https://via.placeholder.com/250x150?text=Free+Trial"}
            alt={freeTrialCourse.title || "Free Trial Course"}
            className="w-full h-36 md:h-40 object-cover"
          />

          {/* Course Info */}
          <div className="flex flex-col items-center gap-2 p-4 w-full">
            <p className="text-center text-gray-800 font-semibold text-base md:text-lg">
              {freeTrialCourse.title || "Free Trial Course"}
            </p>
            <p className="text-gray-600 text-sm text-center">
              Start your learning journey today!
            </p>

            {/* Button */}
            <Link to={`/courses/free-trial`} className="w-full mt-2">
              <button className="w-full bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800 transition-colors font-medium">
                Start Free Trial
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* ================= ENROLLED COURSES ================= */}
      {courses.map((course) => (
        <div
          key={course.id}
          className="flex flex-col items-center bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full max-w-xs overflow-hidden"
        >
          {/* Topic */}
          <div className="w-full bg-[#15256E] text-white text-center py-2 font-semibold text-base md:text-lg">
            My Course
          </div>

          {/* Course Image */}
          <img
            src={course.image}
            alt={course.title || "Course"}
            className="w-full h-36 md:h-40 object-cover"
          />

          {/* Course Info */}
          <div className="flex flex-col items-center gap-2 p-4 w-full">
            <p className="text-center text-gray-800 font-semibold text-base md:text-lg">
              {course.title || "Untitled Course"}
            </p>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-gray-200 rounded-full mt-1">
              <div
                className="h-3 bg-[#15256E] rounded-full transition-all"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <p className="text-gray-600 text-xs md:text-sm mt-1 text-center">
              {course.progress}% completed
            </p>

            {/* Button */}
            <Link
              to={course.progress === 100 ? "/certificate" : `/preview/${course.id}`}
              className="w-full mt-2"
            >
              <button className="w-full bg-[#15256E] text-white px-4 py-2 rounded-md hover:bg-[#0f1f5a] transition-colors">
                {course.progress === 100 ? "Print Certificate" : "Continue Learning"}
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminCourse;